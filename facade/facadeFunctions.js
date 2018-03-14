import { uploadFile } from '../dals/dalsFunctions';

const mongoose = require('mongoose');
const Issue = mongoose.model('Issue');
const File = mongoose.model('File');

exports.create = (req, res) => {
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

exports.view = (req,res) => {
    Issue.find({}, (err, issue) => {
        if(err){
            reply(err).code(404);
        }
        return reply(issue);
    });
}

exports.edit = (req,res) => {
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

exports.destroy = (req,res) => {
    Issue.findOneAndRemove({ _id: req.params.id }, (err, issue) => {
        if(err){
            reply(err).code(404);
        }
        return reply(issue);
    });
}

exports.markCompleted = (req,res) => {
    Issue.findOneAndUpdate({ _id: req.params.id }, req.body, {
        complete: 'Completed'
    }).then((err, issue) => {
        if(err){
            reply(err).code(404);
        }
        return reply(issue);
    });
}

exports.markPending = (req,res) => {
    Issue.findOneAndUpdate({ _id: req.params.id }, req.body, {
        complete: 'Pending'
    }).then((err, issue) => {
        if(err){
            reply(err).code(404);
        }
        return reply(issue);
    });
}

exports.comment = (req, res) => {
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

exports.upload = (req, res) => {
    Issue.findOne({ _id: req.params.id })
        .then(uploadFile);
}

exports.download = (req, res) => {
    File.findOne({ _id: req.params.id })
        .then((req, res) => {
            res.file(url);// inert? 
        }).then((err, issue) => {
            if(err){
                reply(err).code(404);
            }
            return reply(issue);
        });
}