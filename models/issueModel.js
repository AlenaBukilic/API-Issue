const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    comments: [String],
    files: String
});

module.exports = mongoose.model('Issue', IssueSchema);