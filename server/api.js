const express = require("express");
const db_operations = require("./db_operations");
const router = express.Router();

router.get("/getlocations", async (req, res)=>{
    const locations_categories = await db_operations.getLocations()
    res.send(locations_categories)
})
router.get("/getdata", async (req, res)=>{
    const neighborhoodData = await db_operations.getNeighborhoods()
    res.send(neighborhoodData)
})

module.exports = router;