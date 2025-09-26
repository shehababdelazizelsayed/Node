const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();

app.use(express.json());

const port = 3000;
const jwtSecret = "sec";

const db = mysql
  .createConnection({
    host: "localhost",
    user: "lab",
    password: "password",
    database: "lab5",
  })
  .promise();

const auth = async (req, res, next) => {
  const header = req.headers["authorization"];
  if (!header) return res.status(401).send("token needeed");
  const token = header.split(" ")[1];
  try {
    const user = jwt.verify(token, jwtSecret);
    req.user = user;
    next();
  } catch (err) {
    return res.status(403).send("invalid token");
  }
};
app.get("/", (req, res) => {
  res.send("Home");
});

app.post("/register", async (req, res) => {
  const { name, email, password, age } = req.body;
  if (!name || !email || !password || !age) {
    return res.status(400).send("you need username and password email and age");
  }
  if (password.length < 8) {
    return res.status(400).send("minimum 8 characters");
  }
  try {
    const [mail] = await db.execute("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (mail.length > 0) {
      return res.status(400).send("email already registered");
    }
    const hash = await bcrypt.hash(password, 10);
    const [result] = await db.execute(
      "INSERT INTO users (name, email, password, age) VALUES (?, ?, ?, ?)",
      [name, email, hash, age]
    );
    res.status(201).send("user registered");
    return result;
  } catch (err) {
    res.status(500).send("server error");
    console.log(err);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send("missing email or password");
  }
  try {
    const [users] = await db.execute("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (users.length === 0) {
      return res.status(400).send("no user");
    }
    const user = users[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).send("wrong password");
    }
    const token = jwt.sign({ id: user.id, email: user.email }, jwtSecret, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (err) {
    res.status(500).send("server error");
  }
});

app.get("/profile", auth, async (req, res) => {
  try {
    const [users] = await db.execute(
      "SELECT id, name, email, age FROM users WHERE id = ?",
      [req.user.id]
    );
    if (users.length === 0) {
      return res.status(404).send("user not found");
    }
    res.json(users[0]);
  } catch (err) {
    res.status(500).send("server error");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
