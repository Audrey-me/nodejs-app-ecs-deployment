const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;

// Middleware
app.use(bodyParser.json());
app.use(cors());

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, "/frontend/index.html"));
});



// Define the MongoDB connection URL and options

const mongoUrl = process.env.MONGODB_URL
const mongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };

// Define the database name
const databaseName = "user-account";

// Connect to the MongoDB database when the server starts
let db; // Declare a variable for the database connection

MongoClient.connect(mongoUrl, mongoClientOptions, (err, client) => {
  if (err) {
    console.error('Failed to connect to MongoDB:', err);
  } else {
    console.log('Connected to MongoDB');
    db = client.db(databaseName); // Set the database connection
  }
});

// Process the form data when a POST request is made to /profile
app.post('/profile', (req, res) => {
  const formData = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone
  };

  // Check if the database connection is available
  if (db) {
    // Insert the formData into the "users" collection
    db.collection("users").insertOne(formData, (err, result) => {
      if (err) {
        console.error('Error inserting data into MongoDB:', err);
        res.status(500).json({
          status: 'error',
          message: 'Error storing data in the database'
        });
      } else {
        console.log('Data inserted into MongoDB');
        res.json({
          status: 'success',
          message: 'Data received and stored successfully!'
        });
      }
    });
  } else {
    res.status(500).json({
      status: 'error',
      message: 'Database connection is not available'
    });
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
