const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "visitkerala",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    throw err;
  }
  console.log("Connected to MySQL database");
});

app.post("/api/register", (req, res) => {
  const { username, email, password } = req.body;
  const query = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";

  db.query(query, [username, email, password], (err, result) => {
    if (err) {
      console.error("Error registering user:", err);
      res.status(500).send("Server error");
    } else {
      console.log("User registered successfully");
      res.status(200).send("User registered successfully");
    }
  });
});

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const query = "SELECT * FROM users WHERE username = ? AND password = ?";

  db.query(query, [username, password], (err, result) => {
    if (err) {
      console.error("Error logging in:", err);
      res.status(500).send("Server error");
    } else {
      if (result.length > 0) {
        res.status(200).json({ message: "Login successful", user: result[0] });
      } else {
        res.status(401).send("Invalid credentials");
      }
    }
  });
});

app.post("/api/booking", (req, res) => {
  const { username, package, price, datedet } = req.body;
  const query =
    "INSERT INTO booking (username, package, price, date) VALUES (?, ?, ?, ?)";

  db.query(query, [username, package, price, datedet], (err, result) => {
    if (err) {
      console.error("Error inserting payment:", err);
      res.status(500).send("Server error");
    } else {
      console.log("Payment processed successfully");
      res.status(200).send("Payment processed successfully");
    }
  });
});

app.get("/api/user/:userId", (req, res) => {
  const userId = req.params.userId;
  const query = "SELECT username FROM booking WHERE id = ?";

  db.query(query, [userId], (err, result) => {
    if (err) {
      console.error("Error fetching username:", err);
      res.status(500).send("Server error");
    } else {
      if (result.length > 0) {
        res.status(200).json({ username: result[0].username });
      } else {
        res.status(404).send("User not found");
      }
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
