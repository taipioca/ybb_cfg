const express = require("express");
const router = express.Router();
const axios = require("axios")
require("dotenv").config();
const {google} = require("googleapis")
const spreadsheetId = process.env.spreadsheetId
const GEOCODE_API_KEY = process.env.GEOCODE_API_KEY

router.get("/hello", (req, res)=>{
    res.send("hello")
})
router.get("/getlocations", async (req, res)=>{
    const auth = new google.auth.GoogleAuth({
        keyFile: "server/credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets"
    })

    // Create client instance for auth
    const client  = await auth.getClient()
    
    // Instance of Google Sheets API
    const googleSheets = google.sheets({version: "v4", auth: client})

    // Makes an api to google's Geocoder and logs lat and lng of first result
    const getLatLng = async (address)=>{
    return(
    axios
    .get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GEOCODE_API_KEY}`)
    .then((response) => response.data.results[0].geometry.location)
    )};
    // Get metadata about spreadsheet

    // Read rows from spreadsheet
    const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "Sheet1",
    })
    getRows.data.values.shift()
    console.log(getRows.data.values)
    const locations = await Promise.all(getRows.data.values.map( async (place)=>{
        const address = await getLatLng(place[0])
        return ({
            address,
            type: place[1],
            description: place[2] ? place[2] : null})
    }))
    res.send(locations)
})
module.exports = router;