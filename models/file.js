const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FileSchema = new Schema({
    path:{
        type: String,
        required: true
    },
    fileName:{
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    issue: [{
        type: Schema.Types.ObjectId,
        ref: 'Issue'
    }]
});

module.exports = mongoose.model('File', FileSchema);