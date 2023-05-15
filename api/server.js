// SUNUCUYU BU DOSYAYA KURUN

// SERVERINIZI EXPORT EDİN {}

const express = require("express");
const server = express();

server.get("/", (req, res) => {
  res.send("Server is up and running!...");
});

module.exports = server;
