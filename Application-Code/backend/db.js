// Importing Mongoose library for MongoDB interaction
const mongoose = require("mongoose");

// Exporting a function to establish a connection to the database
module.exports = async () => {
    try {
        // Connection options for Mongoose
        const connectionParams = {
            useNewUrlParser: true, // Use new URL string parser to avoid deprecation warnings
            useUnifiedTopology: true, // Use the new Server Discover and Monitoring engine
        };

        // Check if database authentication is enabled (via environment variable USE_DB_AUTH)
        const useDBAuth = process.env.USE_DB_AUTH || false;
        if (useDBAuth) {
            // If authentication is enabled, add username and password to connection parameters
            connectionParams.user = process.env.MONGO_USERNAME; // Database username from environment variable
            connectionParams.pass = process.env.MONGO_PASSWORD; // Database password from environment variable
        }

        // Connect to MongoDB using the connection string and parameters
        await mongoose.connect(
            process.env.MONGO_CONN_STR, // MongoDB connection string from environment variable
            connectionParams
        );

        // Log success message upon successful connection
        console.log("Connected to database.");
    } catch (error) {
        // Log error message if connection fails
        console.log("Could not connect to database.", error);
    }
};
