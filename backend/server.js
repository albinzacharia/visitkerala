// backend/server.js
const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());
app.get("/api/user/:userId", (req, res) => {
  // MySQL connection
  const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "visitkerala",
  });

  db.connect((err) => {
    if (err) throw err;
    console.log("Connected to MySQL database");
  });

  // API route to handle payment submissions
  app.post("/api/booking", (req, res) => {
    const { username, package, price, datedet } = req.body;
    const query =
      "INSERT INTO booking (username, package, price, date) VALUES (?, ?, ?, ?)";

    db.query(query, [username, package, price, datedet], (err, result) => {
      if (err) {
        console.error("Error inserting payment:", err);
        res.status(500).send("Server error");
      } else {
        res.status(200).send("Payment processed successfully");
      }
    });
  });
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
