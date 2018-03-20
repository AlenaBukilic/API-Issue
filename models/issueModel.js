const mongoose = require('mongoose');

const IssueSchema = new mongoose.Schema({
    title: {
        type: String,
        required: 'Please enter your issue title'
    },
    description: {
        type: String,
        required: 'Please explain your issue'
    },
    name: {
        type: String,
        required: 'Please leave your name'
    },
    created: {
        type: Date,
        default: Date.now
    },
    completed: {
        type: String,
        default: 'Pending'
    },
    comments: [{
        text: String,
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    files: [{
        type: mongoose.Schema.ObjectId,
        ref: 'File'
    }]
});

module.exports = mongoose.model('Issue', IssueSchema);