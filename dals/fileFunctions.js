const mongoose = require('mongoose');
const fs = require('fs');
const mime = require('mime-types');

const path = require('path');
const Issue = require(path.resolve('./models/issueModel'));
const File = require('../models/fileModel');

const internals = {};

internals.saveFile = (params) => {

    const { file, issueId, fileName, resolve, reject } = params;

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

exports.uploadFile = (file, issueId) => {
    
    return new Promise((resolve, reject) => {

        const fileName = Date.now() + '-' + file.hapi.filename;
        const params = { file, issueId, fileName, resolve, reject };
        const wstream = fs.createWriteStream(fileName);
        wstream.on('finish', () => {
            internals.saveFile(params);
        });
        wstream.on('error', (err) => {
            return err;
        });

        file.pipe(wstream);
    });
}

exports.downloadFile = (fileId) => {

    return new Promise((resolve, reject) => {
       
        File.findOne({ _id: fileId })
        .then((file) => {
            
            const path = file.path;
            const rstream = fs.createReadStream(path);
            const extType = mime.lookup(path);
        
            return resolve(rstream)
                .type(extType)
                .header('Content-type', extType)
        })
        .catch(reject);
    });         
}

