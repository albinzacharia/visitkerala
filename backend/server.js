const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // Replace with your MySQL password
  database: "visitkerala",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    throw err;
  }
  console.log("Connected to MySQL database");
});
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });
app.use("/uploads", express.static("uploads"));
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
        res.status(200).json(result[0]);
      } else {
        res.status(404).send("User not found");
      }
    }
  });
});
app.delete("/api/deleteTour/:id", (req, res) => {
  const id = req.params.id;

  // First, fetch the imageUrl for the tour to be deleted
  const fetchQuery = "SELECT imageUrl FROM tours WHERE id = ?";
  db.query(fetchQuery, [id], (err, result) => {
    if (err) {
      console.error("Error fetching tour details:", err);
      return res.status(500).send("Server error");
    }

    if (result.length === 0) {
      return res.status(404).send("Tour not found");
    }

    const imageUrl = result[0].imageUrl;

    // Delete from database
    const deleteQuery = "DELETE FROM tours WHERE id = ?";
    db.query(deleteQuery, [id], (err, result) => {
      if (err) {
        console.error("Error deleting tour:", err);
        return res.status(500).send("Server error");
      }

      // Delete image file from server
      if (imageUrl) {
        const imagePath = path.join(__dirname, imageUrl);
        fs.unlink(imagePath, (err) => {
          if (err) {
            console.error("Error deleting image file:", err);
          } else {
            console.log("Image file deleted successfully");
          }
        });
      }

      console.log("Tour deleted successfully");
      res.status(200).send("Tour deleted successfully");
    });
  });
});
app.get("/api/users", (req, res) => {
  const query = "SELECT * FROM users";

  db.query(query, (err, result) => {
    if (err) {
      console.error("Error fetching users:", err);
      res.status(500).send("Server error");
    } else {
      res.status(200).json(result);
    }
  });
});
app.get("/api/bookings/", (req, res) => {
  const query = "SELECT * FROM booking";

  db.query(query, (err, result) => {
    if (err) {
      console.error("Error fetching booking history:", err);
      res.status(500).send("Server error");
    } else {
      res.status(200).json(result);
    }
  });
});
app.post("/api/updateBookingStatus/:id", (req, res) => {
  const bookingId = req.params.id;
  const { status } = req.body;

  // Get the current status of the booking
  const fetchQuery = "SELECT status FROM booking WHERE id = ?";
  db.query(fetchQuery, [bookingId], (err, results) => {
    if (err) {
      console.error("Error fetching booking status:", err);
      return res.status(500).send("Server error");
    }

    if (results.length === 0) {
      return res.status(404).send("Booking not found");
    }

    const currentStatus = results[0].status;

    // Check if the current status is 'Cancelled'
    if (currentStatus === "Cancelled") {
      return res
        .status(400)
        .send("Cannot update status of a cancelled booking");
    }

    // Update the booking status
    const updateQuery = "UPDATE booking SET status = ? WHERE id = ?";
    db.query(updateQuery, [status, bookingId], (err, result) => {
      if (err) {
        console.error("Error updating booking status:", err);
        return res.status(500).send("Server error");
      }

      console.log("Booking status updated successfully");
      res.status(200).send("Booking status updated successfully");
    });
  });
});


app.get("/api/bookingStatus/:username", (req, res) => {
  const username = req.params.username;

  const query =
    "SELECT status FROM bookings WHERE username = ? ORDER BY bookingDate DESC LIMIT 1";
  db.query(query, [username], (err, result) => {
    if (err) {
      console.error("Error fetching booking status:", err);
      res.status(500).send("Server error");
    } else {
      if (result.length > 0) {
        res.status(200).json({ status: result[0].status });
      } else {
        res.status(200).json({ status: "No booking yet" });
      }
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
  const query = "SELECT * FROM contactus ORDER BY date DESC";

  db.query(query, (err, result) => {
    if (err) {
      console.error("Error fetching contact messages:", err);
      res.status(500).send("Server error");
    } else {
      res.status(200).json(result);
    }
  });
});
app.post("/api/updateTour", upload.single("image"), (req, res) => {
  const { id, title, description, price, itinerary, inclusions } = req.body;
  let imageUrl = req.body.imageUrl; // Get the existing imageUrl from the request body

  // Check if a new image file has been uploaded
  if (req.file) {
    imageUrl = req.file.path; // Update imageUrl to the new file path
  }

  const query =
    "UPDATE tours SET title = ?, description = ?, price = ?, imageUrl = ?, itinerary = ?, inclusions = ? WHERE id = ?";

  db.query(
    query,
    [title, description, price, imageUrl, itinerary, inclusions, id],
    (err, result) => {
      if (err) {
        console.error("Error updating tour:", err);
        return res.status(500).send("Server error");
      }
      console.log("Tour updated successfully");
      res.status(200).send("Tour updated successfully");
    }
  );
});
app.post("/api/register", (req, res) => {
  const { username, email, phone, firstname, password } = req.body;
  const query =
    "INSERT INTO users (username, email, phone, firstname, password) VALUES (?, ?, ?, ?, ?)";

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
app.post("/api/addReview", (req, res) => {
  const { username, reviewText, tour_id } = req.body;
  const query =
    "INSERT INTO reviews (username, reviewText, tour_id, reviewDate) VALUES (?, ?, ?, NOW())";

  db.query(query, [username, reviewText, tour_id], (err, result) => {
    if (err) {
      console.error("Error adding review:", err);
      return res.status(500).send("Error adding review");
    }
    console.log("Review added successfully");
    res.status(200).send("Review added successfully");
  });
});
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
app.get("/api/reviews/:tour_id", (req, res) => {
  const tour_id = req.params.tour_id;
  const query =
    "SELECT * FROM reviews WHERE tour_id = ? ORDER BY reviewDate DESC";

  db.query(query, [tour_id], (err, result) => {
    if (err) {
      console.error("Error fetching reviews:", err);
      res.status(500).send("Server error");
    } else {
      res.status(200).json(result);
    }
  });
});
app.post("/api/booking", (req, res) => {
  const { username, package, price, datedet } = req.body;
  const query =
    "INSERT INTO booking (username, package, price, date) VALUES (?, ?, ?, ?)";

  db.query(query, [username, package, price, datedet], (err, result) => {
    if (err) {
      console.error("Error processing booking:", err);
      res.status(500).send("Server error");
    } else {
      console.log(
        "Payment processed successfully, go to your userprofile to check the booking status"
      );
      res
        .status(200)
        .send(
          "Payment processed successfully, go to your userprofile to check the booking status"
        );
    }
  });
});
app.get("/api/tours", (req, res) => {
  const query = "SELECT * FROM tours";

  db.query(query, (err, result) => {
    if (err) {
      console.error("Error fetching tours:", err);
      res.status(500).send("Server error");
    } else {
      res.status(200).json(result);
    }
  });
});
app.get("/api/tour/:id", (req, res) => {
  const id = req.params.id;
  const query = "SELECT * FROM tours WHERE id = ?";

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error fetching tour:", err);
      res.status(500).send("Server error");
    } else {
      if (result.length > 0) {
        res.status(200).json(result[0]);
      } else {
        res.status(404).send("Tour not found");
      }
    }
  });
});
app.post("/api/addTour", upload.single("image"), (req, res) => {
  const { title, description, price, itinerary, inclusions } = req.body;
  const imageUrl = req.file ? req.file.path : "";

  const query =
    "INSERT INTO tours (title, description, price, imageUrl, itinerary, inclusions) VALUES (?, ?, ?, ?, ?, ?)";

  db.query(
    query,
    [title, description, price, imageUrl, itinerary, inclusions],
    (err, result) => {
      if (err) {
        console.error("Error adding tour:", err);
        return res.status(500).send("Server error");
      }
      console.log("New tour added successfully");
      res.status(200).send("New tour added successfully");
    }
  );
});

app.post("/api/uploadImage", upload.single("image"), (req, res) => {
  console.log("Inside uploadImage endpoint");
  try {
    if (!req.file) {
      console.log("No file uploaded");
      return res.status(400).send("No file uploaded");
    }
    const imageUrl = `/uploads/${req.file.filename}`;
    console.log("Image uploaded successfully:", imageUrl);
    res.status(200).json({ imageUrl: imageUrl });
  } catch (err) {
    console.error("Error uploading image:", err);
    res.status(500).send("Server error");
  }
});
// Example updateTour endpoint
app.post("/api/updateTour", upload.single("image"), (req, res) => {
  const { id, title, description, price, itinerary, inclusions } = req.body;
  let imageUrl = req.body.imageUrl; // Get the existing imageUrl from the request body

  // Check if a new image file has been uploaded
  if (req.file) {
    imageUrl = `/uploads/${req.file.filename}`; // Update imageUrl to the new file path
  }

  const query =
    "UPDATE tours SET title = ?, description = ?, price = ?, imageUrl = ?, itinerary = ?, inclusions = ? WHERE id = ?";

  db.query(
    query,
    [title, description, price, imageUrl, itinerary, inclusions, id],
    (err, result) => {
      if (err) {
        console.error("Error updating tour:", err);
        return res.status(500).send("Server error");
      }
      console.log("Tour updated successfully");
      res.status(200).send("Tour updated successfully");
    }
  );
});

// Add this endpoint to fetch booking history for a specific user
app.get("/api/bookings/:username", (req, res) => {
  const username = req.params.username;
  const query = "SELECT * FROM booking WHERE username = ?";

  db.query(query, [username], (err, result) => {
    if (err) {
      console.error("Error fetching booking history:", err);
      res.status(500).send("Server error");
    } else {
      res.status(200).json(result);
    }
  });
});
app.post("/api/cancelBooking", (req, res) => {
  const { bookingId, username } = req.body;

  // Get the booking details, including the trip date
  const query = "SELECT * FROM booking WHERE id = ? AND username = ?";
  db.query(query, [bookingId, username], (err, results) => {
    if (err) {
      console.error("Error fetching booking:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Booking not found" });
    }

    const tripDate = new Date(results[0].date);
    const currentDate = new Date();

    // Check if the cancellation is more than 3 days before the trip date
    const timeDifference = tripDate - currentDate;
    const dayDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    if (dayDifference >= 3) {
      // Cancel the booking
      const updateQuery =
        "UPDATE booking SET status = 'Cancelled' WHERE id = ?";
      db.query(updateQuery, [bookingId], (err, result) => {
        if (err) {
          console.error("Error cancelling booking:", err);
          return res.status(500).json({ error: "Internal Server Error" });
        }
        res.json({ success: true });
      });
    } else {
      res.status(400).json({
        error:
          "You can only cancel a booking more than 3 days before the trip date",
      });
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
      console.log("Profile updated successfully for username: ${username}");
      res.status(200).send("Profile updated successfully");
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
