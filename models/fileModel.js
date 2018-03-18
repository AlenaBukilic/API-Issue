const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
    url:{
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    issue: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Issue'
    }]
});

module.exports = mongoose.model('File', FileSchema);