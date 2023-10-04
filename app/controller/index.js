const bcrypt = require('bcrypt');

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

//let users = [];
const users = require ('../model/users')

function getUsers(req, res) {
  res.json(users);
}

function addUsers(req, res) {
  const { name, email, pass, c_pass } = req.body;

  users.findOne({ where: { email } })
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
    pass: hashedPassword
  };

  if (req.file) {
    newUser.image = req.file.filename;
  }
  
  users.create(newUser)
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

  users.findOne({ where: { email } })
    .then((users) => {//users disi , kak kris user
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

        res.status(200).json({ message: "Login berhasil" });
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
};
