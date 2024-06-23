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
  password: "", // Enter your MySQL password
  database: "visitkerala",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    throw err;
  }
  console.log("Connected to MySQL database");
});
app.get("/api/user/:username", (req, res) => {
  const username = req.params.username;
  const query =
    "SELECT email, phone, firstname, username FROM users WHERE username = ?";

  db.query(query, [username], (err, result) => {
    if (err) {
      console.error("Error fetching user data:", err);
      res.status(500).send("Server error");
    } else {
      if (result.length > 0) {
        res.status(200).json(result[0]); // Send user data as JSON response
      } else {
        res.status(404).send("User not found");
      }
    }
  });
});
app.get("/api/users", (req, res) => {
  const query = "SELECT * FROM users";

  db.query(query, (err, result) => {
    if (err) {
      console.error("Error fetching users:", err);
      res.status(500).send("Server error");
    } else {
      res.status(200).json(result); // Send users as JSON response
    }
  });
});
app.get("/api/tourpackages", (req, res) => {
  const query = "SELECT * FROM tourpackage";

  db.query(query, (err, result) => {
    if (err) {
      console.error("Error fetching tour packages:", err);
      res.status(500).send("Server error");
    } else {
      res.status(200).json(result); // Send tour packages as JSON response
    }
  });
});

// Endpoint to fetch a single tour package by ID
app.get("/api/tourpackage/:packageId", (req, res) => {
  const packageId = req.params.packageId;
  const query = "SELECT * FROM tourpackage WHERE package_id = ?";

  db.query(query, [packageId], (err, result) => {
    if (err) {
      console.error("Error fetching tour package:", err);
      res.status(500).send("Server error");
    } else {
      if (result.length > 0) {
        res.status(200).json(result[0]); // Send tour package as JSON response
      } else {
        res.status(404).send("Tour package not found");
      }
    }
  });
});

// Endpoint to update a tour package
// Update package details
app.post("/api/updatePackage", (req, res) => {
  const { package_id, description, price } = req.body;
  const query = "UPDATE tourpackage SET description = ?, price = ? WHERE package_id = ?";

  db.query(query, [description, price, package_id], (err, result) => {
    if (err) {
      console.error("Error updating package:", err);
      res.status(500).send("Server error");
    } else {
      console.log(`Package updated successfully for package ID: ${package_id}`);
      res.status(200).send("Package updated successfully");
    }
  });
});
app.post("/api/contactus", (req, res) => {
  const { name, email, message } = req.body;
  const query =
    "INSERT INTO contactus (name, email, message, date) VALUES (?, ?, ?, NOW())";

  db.query(query, [name, email, message], (err, result) => {
    if (err) {
      console.error("Error inserting contact form data:", err);
      res.status(500).send("Server error");
    } else {
      console.log("Contact form data inserted successfully");
      res.status(200).send("Contact form data inserted successfully");
    }
  });
});
app.get("/api/contactus", (req, res) => {
  const query = "SELECT * FROM contactus ORDER BY date DESC"; // Assuming 'date' is the column name for message date

  db.query(query, (err, result) => {
    if (err) {
      console.error("Error fetching contact messages:", err);
      res.status(500).send("Server error");
    } else {
      res.status(200).json(result); // Send contact messages as JSON response
    }
  });
});

// Endpoint to add a new tour package
app.post("/api/addPackage", (req, res) => {
  const { name, description, price } = req.body;
  const query =
    "INSERT INTO tourpackage (name, description, price) VALUES (?, ?, ?)";

  db.query(query, [name, description, price], (err, result) => {
    if (err) {
      console.error("Error adding new tour package:", err);
      res.status(500).send("Server error");
    } else {
      console.log(`New tour package added successfully`);
      res.status(200).send("New tour package added successfully");
    }
  });
});

app.post("/api/updateProfile", (req, res) => {
  const { email, phone, firstname, username } = req.body;
  const query =
    "UPDATE users SET email = ?, phone = ?, firstname = ? WHERE username = ?";

  db.query(query, [email, phone, firstname, username], (err, result) => {
    if (err) {
      console.error("Error updating profile:", err);
      res.status(500).send("Server error");
    } else {
      console.log(`Profile updated successfully for username: ${username}`);
      res.status(200).send("Profile updated successfully");
    }
  });
});
// Register a new user
app.post("/api/register", (req, res) => {
  const { username, email, phone, firstname, password } = req.body;
  const query =
    "INSERT INTO users (username, email, phone, firstname, password) VALUES (?,?,?, ?, ?)";

  db.query(
    query,
    [username, email, phone, firstname, password],
    (err, result) => {
      if (err) {
        console.error("Error registering user:", err);
        res.status(500).send("Server error");
      } else {
        console.log("User registered successfully");
        res.status(200).send("User registered successfully");
      }
    }
  );
});

// Authenticate user login
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
// Add review
app.post("/api/addReview", (req, res) => {
  const { username, reviewText } = req.body;
  const query = "INSERT INTO reviews (username, reviewText, reviewDate) VALUES (?, ?, NOW())";

  db.query(query, [username, reviewText], (err, result) => {
    if (err) {
      console.error("Error adding review:", err);
      res.status(500).send("Server error");
    } else {
      console.log("Review added successfully");
      res.status(200).send("Review added successfully");
    }
  });
});

// Get reviews
app.get("/api/reviews", (req, res) => {
  const query = "SELECT * FROM reviews ORDER BY reviewDate DESC";

  db.query(query, (err, result) => {
    if (err) {
      console.error("Error fetching reviews:", err);
      res.status(500).send("Server error");
    } else {
      res.status(200).json(result);
    }
  });
});
// Process booking
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

// Get username by user ID
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

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
