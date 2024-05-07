const express = require("express");
const db_operations = require("./db_operations");
const router = express.Router();

router.get("/getlocations", async (req, res) => {
  console.log("getlocations");
  const locations_categories = await db_operations.getLocations();
  res.send(locations_categories);
});
router.get("/getdata", async (req, res) => {
  console.log("getdata");
  const neighborhoodData = await db_operations.getNeighborhoods();
  res.send(neighborhoodData);
});
module.exports = router;
