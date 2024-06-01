const axios = require("axios");
require("dotenv").config();
const { google } = require("googleapis");
const YBB_PROJECTS_SPREADSHEETID = process.env.YBB_PROJECTS_SPREADSHEETID;
const YBB_NEIGHBORHOODS_SPREADSHEETID =
  process.env.YBB_NEIGHBORHOODS_SPREADSHEETID;
const redis = require("redis");
const GEOCODE_API_KEY = process.env.GEOCODE_API_KEY;
const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);

const intializeClient = async () => {
  const auth = new google.auth.GoogleAuth({
    credentials: credentials,
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  // Create client instance for auth
  const client = await auth.getClient();

  // Instance of Google Sheets API
  const googleSheets = google.sheets({ version: "v4", auth: client });
  return [auth, googleSheets];
};

// Given a valid address returns a corresponding lat and lng using google's geocode api
const getLatLng= async (address) => {
    try{
      const client = redis.createClient({
        url: process.env.REDIS_URL
    });
      client.on('error', (err) => console.log('Redis Client Error', err));
      await client.connect();
      return await fetchWithCaching(client, address)
    }
    catch (error){
      console.log("Error connecting to redis: ", error);
      if (client.isOpen){
        await client.disconnect()
      }
      return await fetchNoCaching(address)
    }
};

const fetchWithCaching = async (client, address)=>{
  const storedLatLng = await client.get(address);
    if (storedLatLng){
      console.log("Used this cached address LatLng: ", storedLatLng)
      await client.disconnect();
      return JSON.parse(storedLatLng);
    }
    else{
      return axios
    .get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GEOCODE_API_KEY}`
    )
    .then(async (response) => {
      try {
        await client.set(address, JSON.stringify(response.data.results[0].geometry.location), {EX: 60*60*24*365})
        await client.disconnect();
        console.log("Saved: ", address, ": ", response.data.results[0].geometry.location)
        return response.data.results[0].geometry.location
      }
      catch (error) {
        if (client.isOpen){
          await client.disconnect()
        }
        console.log(`Error getting Lat and Lng of ${address}: ${error}`)
        return false;
      }
    });
}};

const fetchNoCaching = async (address) => {
  return axios
  .get(
  `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GEOCODE_API_KEY}`
  )
  .then(async (response) => {
    try {
    return response.data.results[0].geometry.location}
    catch (error) {
      console.log(`Error getting Lat and Lng of ${address}: ${error}`)
      return false;
    }
  });
}

const getNeighborhoods = async () => {
  const [auth, googleSheets] = await intializeClient();
  const spreadsheetInfo = await googleSheets.spreadsheets.get({
    spreadsheetId: YBB_NEIGHBORHOODS_SPREADSHEETID,
  });
  // Get the names of all the sheets
  const sheets = spreadsheetInfo.data.sheets.map(
    (sheet) => sheet.properties.title
  );

  // Get all the sheets from the spreadsheet
  let spreadsheetData = await googleSheets.spreadsheets.values.batchGet({
    auth,
    spreadsheetId: YBB_NEIGHBORHOODS_SPREADSHEETID,
    ranges: [sheets],
    valueRenderOption: "UNFORMATTED_VALUE",
  });
  // Make a variable representing a single sheet (values: rows of sheet, title: sheet title)
  spreadsheetData = spreadsheetData.data.valueRanges.map(
    (sheet) => {return ({"values": sheet.values, "title": sheet.range.split("'")[1],})}
  );
  // Intializing the dictionary we'll return representing the neighborhoodData
  const neighborhoodData = { sources: {}, filters: [], maxes: {}, images: {} };
  let sheetStats;
  let source;
  let i;
  // For each sheet, populate the dictionary with it's statistics
  spreadsheetData.forEach((sheet, index) => {
    // Removing top row which contains filter names
    sheetStats = sheet.values.shift().slice(1);

    if (sheet.title == "Neighborhood Images"){
      sheet.values.forEach((neighborhood) => {
      neighborhoodData[neighborhood[0]] = {...neighborhoodData[neighborhood[0]], image: neighborhood[1] ? neighborhood[1] : null, }})
    }

    else{
      source = sheet.values.pop()[0];
      maxes = sheet.values.pop().slice(1);
      neighborhoodData["filters"].push({title: sheet.title, filters: sheetStats});
      // Set maxes
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
      });}
  });
  return neighborhoodData;
};
const getLocations = async () => {
  const [auth, googleSheets] = await intializeClient();
  const getLocationRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId: YBB_PROJECTS_SPREADSHEETID,
    range: "In Use",
  });
  const getCatsRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId: YBB_PROJECTS_SPREADSHEETID,
    range: "Categories",
  })
  // Removing top rows serving only as visual aid to user of spreadsheet
  getCatsRows.data.values.shift()
  getLocationRows.data.values.shift();
  // Making categorires to keep track of unique categories
  const categories = new Set()
  // Getting each location object rep
  const locations = await Promise.all(
    getLocationRows.data.values.map(async (place) => {
      const position = await getLatLng(place[0]);
      if (position) {
        if (place[1]){
          categories.add(place[1])
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
      }
    })
  );
  
  const filteredLocations = locations.filter(location => location !== undefined);
  // Getting markers
  const markers = {}
  getCatsRows.data.values.forEach((category) => {
      markers[category[0]] = category[1] ? category[1] : null
    })
  return [filteredLocations, Array.from(categories), markers];
};

module.exports = { getLocations, getNeighborhoods };
