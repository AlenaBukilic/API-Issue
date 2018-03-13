const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FileSchema = new mongoose.Schema({
    url:{
        type: String,
        required: true
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

module.exports = mongoose.model('File', FileSchema);