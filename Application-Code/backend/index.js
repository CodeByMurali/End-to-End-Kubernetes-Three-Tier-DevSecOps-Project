// Importing necessary modules
const tasks = require("./routes/tasks"); // Task routes for handling task-related API endpoints
const connection = require("./db"); // Database connection logic
const cors = require("cors"); // Middleware to enable Cross-Origin Resource Sharing (CORS)
const express = require("express"); // Express framework for building the server
const app = express(); // Initializing the Express application
const mongoose = require('mongoose'); // Mongoose library for MongoDB interaction

// Establishing database connection
connection();

app.use(express.json()); // Middleware to parse incoming JSON requests
app.use(cors()); // Enabling CORS for all routes

// Health check endpoints

// Basic health check to verify if the server is running
app.get('/healthz', (req, res) => {
    res.status(200).send('Healthy'); // Responds with HTTP 200 if the server is running
});

// Variable to track the previous database connection state
let lastReadyState = null;

// Readiness check to verify if the server is ready to handle requests
app.get('/ready', (req, res) => {
    // Check if the database connection is established (readyState === 1)
    const isDbConnected = mongoose.connection.readyState === 1;

    // Log changes in the database readyState for debugging
    if (isDbConnected !== lastReadyState) {
        console.log(`Database readyState: ${mongoose.connection.readyState}`);
        lastReadyState = isDbConnected;
    }

    // If database is connected, respond with HTTP 200; otherwise, HTTP 503
    if (isDbConnected) {
        res.status(200).send('Ready');
    } else {
        res.status(503).send('Not Ready');
    }
});

// Startup check to confirm if the server has started correctly
app.get('/started', (req, res) => {
    // Since the endpoint is reachable, it implies the server started successfully
    res.status(200).send('Started');
});

// Route for handling task-related API requests
app.use("/api/tasks", tasks);

// Define the port on which the server listens (from environment variable or default 3500)
const port = process.env.PORT || 3500;

// Start the server and log the port number
app.listen(port, () => console.log(`Listening on port ${port}...`));
