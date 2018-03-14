const mongoose = require('mongoose');
const File = mongoose.model('File');

exports.uploadFile = (req, res) => {
    const data = req.payload;
    if(data.file){
        File.save({
            url: data.file.hapi.filename,
            issue: issue._id
        }, (err, issue) => {
            if(err){
                reply(err).code(500);
            }
            return res.response(issue);
        });
    }
}

// exports.create = save();
// ...?