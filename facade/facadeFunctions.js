import { uploadFile, downloadFile } from '../dals/dalsFunctions';
import { completed, pending } from '../dals/dalsFunctions';

const mongoose = require('mongoose');
const Issue = mongoose.model('Issue');
const File = mongoose.model('File');

exports.createFacade = (req, res) => {
    Issue.save({
        title: req.payload.title,
        description: req.payload.description,
        name: req.payload.name
    }, (err, issue) => {
        if(err){
            reply(err).code(500);
        }
        return res.response(issue);
    });
}

exports.viewFacade = (req,res) => {
    Issue.find({}, (err, issue) => {
        if(err){
            reply(err).code(404);
        }
        return reply(issue);
    });
}

exports.editFacade = (req,res) => {
    Issue.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true, // return updated issue
        runValidators: true
    }).then((err, issue) => {
        if(err){
            reply(err).code(404);
        }
        return reply(issue);
    });
}

exports.destroyFacade = (req,res) => {
    Issue.findOneAndRemove({ _id: req.params.id }, (err, issue) => {
        if(err){
            reply(err).code(404);
        }
        return reply(issue);
    });
}

exports.markCompletedFacade = completed();

exports.markPendingFacade = pending();

exports.commentFacade = (req, res) => {
    Issue.findOneAndUpdate({ _id: req.params.id }, req.body, {
        comments: [{
            text: req.payload.text,
            createdAt: {
                type: Date,
                default: Date.now
            }
        }]
    }).then((err, issue) => {
        if(err){
            reply(err).code(404);
        }
        return reply(issue);
    });
}

exports.uploadFacade = (req, res) => {
    Issue.findOne({ _id: req.params.id })
        .then(uploadFile);
}

exports.downloadFacade = downloadFile();