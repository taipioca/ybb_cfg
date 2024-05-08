const db_operations = require("../db_operations");

module.exports = async (req, res) => {
  const locations_categories = await db_operations.getLocations();
  res.send(locations_categories);
};
