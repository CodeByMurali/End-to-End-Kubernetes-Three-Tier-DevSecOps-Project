/*
This is a Mongoose schema used in Node.js applications to interact with a MongoDB database. Here's a breakdown:

What Is This?
MongoDB: A NoSQL database that stores data in a JSON-like format.
Mongoose: A Node.js library that provides a structured way to define and interact with MongoDB collections using schemas.
Schema: A blueprint that defines the structure and rules for documents in a MongoDB collection.

*/


const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    task: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model("task", taskSchema);
