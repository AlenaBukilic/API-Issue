const mongoose = require('mongoose');
const Issue = mongoose.model('Issue');
const File = mongoose.model('File');

exports.saveFile = (req, res) => {
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

exports.uploadFile = (req, res) => {
    Issue.findOne({ _id: req.params.id })
        .then(saveFile);
}

exports.downloadFile = (req, res) => {
    File.findOne({ _id: req.params.id })
        .then((req, res) => {
            res.file(url);// inert? 
        })
        .then((err, issue) => {
            if(err){
                reply(err).code(404);
            }
            return reply(issue);
        });
}