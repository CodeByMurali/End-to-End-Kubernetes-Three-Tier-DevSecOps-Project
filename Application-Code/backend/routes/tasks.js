// Import the Task model for database operations
const Task = require("../models/task");

// Import express to create a router for defining API endpoints
const express = require("express");
const router = express.Router();

// POST: Create a new task
// - Takes task data from the request body and saves it to the database.
// - Returns the created task or an error.
router.post("/", async (req, res) => {
    try {
        const task = await new Task(req.body).save(); // Save new task
        res.send(task); // Send the saved task as a response
    } catch (error) {
        res.send(error); // Handle and send errors
    }
});

// GET: Retrieve all tasks
// - Queries the database to fetch all tasks.
// - Returns an array of tasks or an error.
router.get("/", async (req, res) => {
    try {
        const tasks = await Task.find(); // Fetch all tasks
        res.send(tasks); // Send the list of tasks as a response
    } catch (error) {
        res.send(error); // Handle and send errors
    }
});

// PUT: Update a task by ID
// - Takes task updates from the request body and updates the matching task.
// - Returns the updated task or an error.
router.put("/:id", async (req, res) => {
    try {
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id }, // Match task by ID
            req.body // Apply updates from request body
        );
        res.send(task); // Send the updated task as a response
    } catch (error) {
        res.send(error); // Handle and send errors
    }
});

// DELETE: Delete a task by ID
// - Finds and removes the task with the specified ID from the database.
// - Returns the deleted task or an error.
router.delete("/:id", async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id); // Delete task by ID
        res.send(task); // Send the deleted task as a response
    } catch (error) {
        res.send(error); // Handle and send errors
    }
});

// Export the router to use it in the main app
module.exports = router;
