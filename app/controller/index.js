const bcrypt = require("bcrypt");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

//let users = [];
const db = require("../model/db");



function getUsers(req, res) {
  db.users
    .findAll()
    .then((users) => {
      res.json(users);
    })
    .catch((error) => {
      console.error("Error while getting users:", error);
      res.status(500).json({ error: "An error occurred" });
    });
}

function addUsers(req, res) {
  const { name, email, pass, c_pass } = req.body;

  db.users
    .findOne({ where: { email } })
    .then((existingUser) => {
      if (existingUser) {
        return res.status(400).json({ message: "Email already exists" });
      }

      if (pass !== c_pass) {
        return res.status(400).json({ error: "Password tidak cocok" });
      }

      const hashedPassword = bcrypt.hashSync(pass, 10);

      const newUser = {
        nama: name,
        email,
        pass: hashedPassword,
      };

      if (req.file) {
        newUser.image = req.file.filename;
      }

      db.users
      .create(newUser)
      .then(() => {
          res.status(200).json({ message: "Registrasi berhasil" });
        })
        .catch((error) => {
          console.error("Error while creating user:", error);
          res.status(500).json({ error: "An error occurred" });
        });    
    })
    .catch((error) => {
      console.error("Error while checking existing user:", error);
      res.status(500).json({ error: "An error occurred" });
    });
  }

function setUsers(req, res) {
  const { email, pass } = req.body;

  db.users
    .findOne({ where: { email } })
    .then((users) => {
      
      if (!users) {
        return res.status(404).json({ message: "Pengguna tidak ditemukan" });
      }

      bcrypt.compare(pass, users.pass, (err, isMatch) => {
        if (err) {
          console.error("Error during password comparison:", err);
          return res.status(500).json({ error: "An error occurred" });
        }

        if (!isMatch) {
          return res.status(401).json({ message: "Password salah" });
        }

        res.status(200).json({ message: "Login berhasil",data:users.id });
      });
    })
    .catch((error) => {
      console.error("Error while checking user:", error);
      res.status(500).json({ error: "An error occurred" });
    });
}

function getContacts(req, res) {
  db.contacts
    .findAll()
    .then((contacts) => {
      res.json(contacts);
    })
    .catch((error) => {
      console.error("Error while getting users:", error);
      res.status(500).json({ error: "An error occurred" });
    });
}

function setContacts(req, res) {
  
  const { id, name, email, number, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Semua kolom harus diisi" });
  }
  
  const newContact = {
    nama: name,
    email,
    number,
    message,
    user_id: id
  };

  db.contacts
    .create(newContact)
    .then(() => {
      res.status(200).json({ message: "Pesan Anda telah berhasil dikirim"});
    })
    .catch((error) => {
      console.error("Error while saving contact message:", error);
      res.status(500).json({ error: "An error occurred" });
    });
}

function updateProfile(req, res) {
  const { id, name, email, oldPass, newPass } = req.body;

  db.users
    .findOne({ where: { id } })
    .then((users) => {
      if (!users) {
        return res.status(404).json({ message: "Pengguna tidak ditemukan" });
      }

      // Periksa apakah password lama cocok
      bcrypt.compare(oldPass, users.pass, (err, isMatch) => {
        if (err) {
          console.error("Error during password comparison:", err);
          return res.status(500).json({ error: "An error occurred" });
        }

        if (!isMatch) {
          return res.status(401).json({ message: "Password lama salah" });
        }

        // Hash password baru jika ada
        let updatedUser = { nama: name, email };
        if (newPass) {
          const hashedPassword = bcrypt.hashSync(newPass, 10);
          updatedUser.pass = hashedPassword;
        }

        // Tambahkan logika untuk mengganti gambar profil jika diperlukan
        if (req.file) {
          updatedUser.image = req.file.filename;
        }

        // Hapus profil pengguna yang lama
        db.users
          .destroy({ where: { id } })
          .then(() => {
            // Tambahkan data pengguna yang baru
            db.users
              .create(updatedUser)
              .then(() => {
                res.status(200).json({ message: "Profil berhasil diperbarui"});
              })
              .catch((error) => {
                console.error("Error while creating updated user:", error);
                res.status(500).json({ error: "An error occurred" });
              });
          })
          .catch((error) => {
            console.error("Error while deleting old user profile:", error);
            res.status(500).json({ error: "An error occurred" });
          });
      });
    })
    .catch((error) => {
      console.error("Error while checking user:", error);
      res.status(500).json({ error: "An error occurred" });
    });
}

module.exports = {
  getUsers,
  addUsers,
  setUsers,
  getContacts,
  setContacts,
  updateProfile
}
