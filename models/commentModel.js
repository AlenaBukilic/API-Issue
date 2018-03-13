const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new mongoose.Schema({
    description: {
        type: String,
        required: 'Leave a comment'
    },
    name: {
        type: String,
        required: 'Please leave your name'
    },
    created: {
        type: Date,
        default: Date.now
    },
    issue: {
        type: String,
        ref: 'Issue'
    }
});

module.exports = mongoose.model('Comment', CommentSchema);