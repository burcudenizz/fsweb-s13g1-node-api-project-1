// SUNUCUYU BU DOSYAYA KURUN

// SERVERINIZI EXPORT EDİN {}

const express = require("express");
const server = express();
const Users = require("./users/model");
server.get("/", (req, res) => {
  res.send("Server is up and running!...");
});

// server ayağa kaldırıldı.
server.use(express.json());

//POST
server.post("/api/users", (req, res) => {
  let user = req.body;
  if (!user.name || !user.bio) {
    res
      .status(400)
      .json({ message: "Lütfen kullanıcı için bir name ve bio sağlayın" });
  } else {
    Users.insert(user)
      .then((newUser) => {
        res.status(201).json(newUser);
      })
      .catch((err) => {
        res.status(500);
        json({ message: "Veritabanına kaydedilirken bir hata oluştu" });
      });
  }
});

module.exports = server;
