const mongoose = require('mongoose');
const fs = require('fs');
const mime = require('mime-types');

const path = require('path');
const Issue = require(path.resolve('./models/issueModel'));
const File = require('../models/fileModel');

exports.uploadFile = (params) => {

    const { issueId, fileName, path } = params;

    return new Promise((resolve, reject) => {
 
        File.create({
            path: path,
            fileName: fileName,
            issue: issueId,
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
    });
}

exports.downloadFile = (fileId) => {

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

