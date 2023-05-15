// SUNUCUYU BU DOSYAYA KURUN

// SERVERINIZI EXPORT EDİN {}

const express = require("express");
const server = express();
server.use(express.json());
const Users = require("./users/model");
server.get("/", (req, res) => {
  res.send("Server is up and running!...");
});

// ^---- server ayağa kaldırıldı.

//POST ile yeni bir kullanıcı oluşturduk.
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
      .catch(() => {
        res.status(500);
        json({ message: "Veritabanına kaydedilirken bir hata oluştu" });
      });
  }
});

//GET ile tüm kullanıcı bilgilerini çektik.

server.get("/api/users", (req, res) => {
  Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch(() => {
      res.status(500).json({ message: "Kullanıcı bilgisi alınamadı" });
    });
});

//GET ile id'si belli bir kullanıcı bilgilerini çektik.

server.get("/api/users", (req, res) => {
  const id = req.params.id;
  Users.findById(id)
    .then((user) => {
      if (!user) {
        res
          .status(404)
          .json({ message: "Belirtilen ID'li kullanıcı bulunamadı" });
      } else {
        res.status(200).json(user);
      }
    })
    .catch(() => {
      res.status(500).json({ message: "Kullanıcı bilgisi alınamadı" });
    });
});

//DELETE ile tüm kullanıcı bilgilerini çektik.

server.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;

  Users.remove(id)
    .then((deletedUser) => {
      if (!deletedUser) {
        return res
          .status(404)
          .json({ message: "Belirtilen ID'li kullanıcı bulunamadı" });
      }
      res.json(deletedUser);
    })
    .catch(() => {
      res.status(500).json({ message: "Kullanıcı silinemedi" });
    });
});

//PUT ile belirli bir idsi olan kullanıcı bilgilerini güncelledik.

server.put("/api/users/:id", (req, res) => {
  const id = req.params.id;
  let user = req.body;

  if (!user.name || !user.bio) {
    return res
      .status(400)
      .json({ message: "Lütfen kullanıcı için name ve bio sağlayın" });
  }

  Users.update(id, user)
    .then((updatedUser) => {
      if (!updatedUser) {
        return res
          .status(404)
          .json({ message: "Belirtilen ID'li kullanıcı bulunamadı" });
      } else {
        res.json(updatedUser);
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Kullanıcı bilgisi alınamadı" });
    });
});

module.exports = server;
