const mongoose = require('mongoose');
const fs = require('fs');
const mime = require('mime-types');

const path = require('path');
const Issue = require(path.resolve('./models/issue'));
const File = require('../models/file');

exports.save = (params) => {

    const { issueId, fileName, path } = params;    

    return new Promise((resolve, reject) => {

        File.create({
            path: path,
            fileName: fileName,
            issue: issueId
        }, (err, file) => {
            if(err){
                return reject(err);
            }
            return resolve(insertIdInIssue(file));
        });
    });
}

const insertIdInIssue = (file) => {
    
    return new Promise((resolve, reject) => {
 
        Issue.findOne({ _id: file.issue })
        .then((issue) => {
            issue.files.push(file._id);
            issue.save();
            return resolve(file);
        })
        .catch(reject);
    });
}

exports.download = (fileId) => {

    return new Promise((resolve, reject) => {
        File.findOne({ _id: fileId })
        .then((file) => {

            const path = file.path;
            const rstream = fs.createReadStream(path);
            const extType = mime.lookup(path);
        
            return resolve({
                stream: rstream,
                type: extType
            });
        })
        .catch(reject);
    });         
}