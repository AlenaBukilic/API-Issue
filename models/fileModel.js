const mongoose = require('mongoose');
// http://mongoosejs.com/docs/populate.html
const Schema = mongoose.Schema;

const FileSchema = new Schema({
    path:{
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