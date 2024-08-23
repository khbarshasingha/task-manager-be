const express = require('express');
const router = express.Router();
const Task = require('../models/tasks');
const authMiddleware = require('../middleware/authMiddleware');
// Create a new task
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { title, description } = req.body;
        const task_id=Math.random().toString(36).substring(2,9);
        
        const newTask = new Task({
            title,
            description,
            status: 'pending',
            user: req.user.id,
            taskId:task_id
        });
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all tasks
router.get('/',authMiddleware, async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Update a task
router.put('/:id', async (req, res) => {
    try {
        const { title, description, status } = req.body;
        const updatedTask = await Task.findOneAndUpdate(
           {taskId: req.params.id},
            { title, description, status },
            { new: true }
        );
        if (!updatedTask) return res.status(404).json({ error: 'Task not found' });
        res.json(updatedTask);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a task
router.delete('/:id', async (req, res) => {
    try {
        const deletedTask = await Task.findOneAndDelete({taskId: req.params.id});
        if (!deletedTask) return res.status(404).json({ error: 'Task not found' });
        res.json({ message: 'Task deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
