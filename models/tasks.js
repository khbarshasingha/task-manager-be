const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'in progress', 'completed'],
        default: 'pending'
    },
     taskId: {
        type: String,
        required:false
    }

}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);
