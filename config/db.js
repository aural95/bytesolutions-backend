/**
 * Module for establishing a connection to MongoDB Atlas using Mongoose.
 * @module dbConnect
 */

// Import the MongoDB Atlas connection string from the dbconfig module
let atlasdb = require('./dbconfig').ATLASDB;

// Import Mongoose library
const { default: mongoose } = require('mongoose');

/**
 * Connects to MongoDB Atlas using the provided connection string.
 * @function
 * @returns {Object} - Mongoose instance representing the MongoDB connection.
 */
module.exports = function() {
    // Establish a connection to MongoDB Atlas using the provided connection string
    mongoose.connect(atlasdb);

    // Get the MongoDB connection instance
    let mongodb = mongoose.connection;

    // Event: Handle MongoDB connection errors
    mongodb.on("error", console.error.bind(console, "connection error: "));

    // Event: Handle successful MongoDB connection
    mongodb.once("open", () => {
        console.log("Connected to MongoDB Atlas");
    });

    // Return the Mongoose instance representing the MongoDB connection
    return mongoose;
}
