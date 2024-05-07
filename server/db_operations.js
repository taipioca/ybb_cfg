const axios = require("axios");
require("dotenv").config();
const { google } = require("googleapis");
const YBB_PROJECTS_SPREADSHEETID = process.env.YBB_PROJECTS_SPREADSHEETID;
const YBB_NEIGHBORHOODS_SPREADSHEETID =
  process.env.YBB_NEIGHBORHOODS_SPREADSHEETID;
const GEOCODE_API_KEY = process.env.GEOCODE_API_KEY;
const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);
// console.log("credentials:", credentials);

const intializeClient = async () => {
  const auth = new google.auth.GoogleAuth({
    credentials: credentials,
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  // const intializeClient = async () => {
  //   const auth = new google.auth.GoogleAuth({
  //     keyFile: "server/credentials.json",
  //     scopes: "https://www.googleapis.com/auth/spreadsheets",
  //   });

  // Create client instance for auth
  const client = await auth.getClient();

  // Instance of Google Sheets API
  const googleSheets = google.sheets({ version: "v4", auth: client });
  return [auth, googleSheets];
};

// Makes an api to google's Geocoder and logs lat and lng of first result
const getLatLng = async (address) => {
  return axios
    .get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GEOCODE_API_KEY}`
    )
    .then((response) => response.data.results[0].geometry.location);
};

const getNeighborhoods = async () => {
  const [auth, googleSheets] = await intializeClient();
  const spreadsheetInfo = await googleSheets.spreadsheets.get({
    spreadsheetId: YBB_NEIGHBORHOODS_SPREADSHEETID,
  });
  // Get the names of all the sheets
  const sheets = spreadsheetInfo.data.sheets.map(
    (sheet) => sheet.properties.title
  );
  // Get metadata about spreadsheet

  // All the sheets from the spreadsheet
  let spreadsheetData = await googleSheets.spreadsheets.values.batchGet({
    auth,
    spreadsheetId: YBB_NEIGHBORHOODS_SPREADSHEETID,
    ranges: [sheets],
    valueRenderOption: "UNFORMATTED_VALUE",
  });
  // Get all the rows from these sheets
  spreadsheetData = spreadsheetData.data.valueRanges.map((sheet) => {
    return { values: sheet.values, title: sheet.range.split("'")[1] };
  });
  // Intializing the dictionary we'll return
  const neighborhoodData = { sources: {}, filters: [], maxes: {}, images: {} };
  let sheetStats;
  let source;
  let i;
  // For each sheet populate the dictionary with it's statistics
  spreadsheetData.forEach((sheet, index) => {
    sheetStats = sheet.values.shift().slice(1);
    if (sheet.title == "Neighborhood Images") {
      sheet.values.forEach((neighborhood) => {
        neighborhoodData[neighborhood[0]] = {
          ...neighborhoodData[neighborhood[0]],
          image: neighborhood[1] ? neighborhood[1] : null,
        };
      });
    } else {
      source = sheet.values.pop()[0];
      maxes = sheet.values.pop().slice(1);
      neighborhoodData["filters"].push({
        title: sheet.title,
        filters: sheetStats,
      });
      // Get maxes
      for (i = 0; i < sheetStats.length; i++) {
        neighborhoodData["maxes"][sheetStats[i]] = maxes[i];
      }
      // Get all statistics for each neighborhood
      sheet.values.forEach((neighborhood) => {
        for (i = 0; i < sheetStats.length; i++) {
          if (neighborhood[i + 1]) {
            neighborhoodData[neighborhood[0]] = {
              ...neighborhoodData[neighborhood[0]],
              [sheetStats[i]]: neighborhood[i + 1],
            };
          }
          neighborhoodData["sources"] = {
            ...neighborhoodData["sources"],
            [sheetStats[i]]: source,
          };
        }
      });
    }
  });
  return neighborhoodData;
};
const getLocations = async () => {
  const [auth, googleSheets] = await intializeClient();
  // Get metadata about spreadsheet
  // Read rows from spreadsheet

  const getRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId: YBB_PROJECTS_SPREADSHEETID,
    range: "Working Document",
  });
  getRows.data.values.shift();
  const categories = new Set();
  const locations = await Promise.all(
    getRows.data.values.map(async (place) => {
      const position = await getLatLng(place[0]);
      if (place[1]) {
        categories.add(place[1]);
      }
      return {
        position,
        address: place[0],
        type: place[1],
        year: place[2] ? place[2] : null,
        image: place[3] ? place[3] : null,
        name: place[4] ? place[4] : null,
        description: place[5] ? place[5] : null,
      };
    })
  );
  return [locations, Array.from(categories)];
};

module.exports = { getLocations, getNeighborhoods };
