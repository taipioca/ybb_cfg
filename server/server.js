const express = require("express");
const path = require("path");
const axios = require("axios");
const { google } = require("googleapis");
const http = require("http");
const cors = require("cors");
const app = express();
const api = require("./api");

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, "../dist")));

app.use(
  cors({
    origin: ["http://localhost:5173", "https://ybb-cfg.onrender.com"],
  })
);
app.use("/api", api);
app.use((err, req, res, next) => {
  const status = err.status || 500;
  if (status === 500) {
    // 500 means Internal Server Error
    console.log("The server errored when processing a request!");
    console.log(err);
  }

  res.status(status);
  res.send({
    status: status,
    message: err.message,
  });
});

// hardcode port to 3000 for now
const port = process.env.PORT || 1793;
const server = http.Server(app);
server.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
