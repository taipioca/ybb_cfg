const db_operations = require("../db_operations");

module.exports = async (req, res) => {
  const neighborhoodData = await db_operations.getNeighborhoods();
  res.send(neighborhoodData);
};
