const mongoose = require('mongoose');
const Issue = mongoose.model('Issue');
const File = mongoose.model('File');

exports.completed = (req,res) => {
    Issue.findOneAndUpdate({ _id: req.params.id }, req.body, {
        complete: 'Completed'
    }).then((err, issue) => {
        if(err){
            reply(err).code(404);
        }
        return reply(issue);
    });
}

exports.pending = (req,res) => {
    Issue.findOneAndUpdate({ _id: req.params.id }, req.body, {
        complete: 'Pending'
    }).then((err, issue) => {
        if(err){
            reply(err).code(404);
        }
        return reply(issue);
    });
}

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

// exports.create = save();
// ...?