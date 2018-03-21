const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Issue = require(path.resolve('./models/issueModel'));
const File = require('../models/fileModel');

const internals = {};

internals.saveFile = (file, issueId, resolve, fileName) => {
    File.create({
        path: fileName,
        issue: issueId
    }, (err, file) => {
        if(err){
            return reject(err);
        }

        Issue.findOne({ _id: issueId })
        .then((issue) => {
            issue.files.push(file._id);
            issue.save().then((data) => {
                return resolve(file);
            });
        });
    });
};

exports.uploadFile = (req, res) => {

    const file = req.payload.file;
    const issueId = req.params.issueId;
    return new Promise((resolve, reject) => {

        const fileName = Date.now() + '-' + file.hapi.filename;

        const wstream = fs.createWriteStream(fileName);
        wstream.on('finish', () => {
            internals.saveFile(file, issueId, resolve, fileName);
        });
        wstream.on('error', (err) => {
            return err;
        });

        file.pipe(wstream);
    });
}

exports.downloadFile = (req, res) => {

    const fileId = req.params.id;

        return File.findOne({ _id: fileId })
        .then((file) => {
            
            const path = file.path;
            const rstream = fs.createReadStream(path);
            
            return res.response(rstream)
            .type('application/pdf')
            .header('Content-type', 'application/pdf')
        });         
}

