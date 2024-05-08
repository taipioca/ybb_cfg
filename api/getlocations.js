const db_operations = require("../server/db_operations");

module.exports = async (req, res) => {
  const locations_categories = await db_operations.getLocations();
  res.send(locations_categories);
};
