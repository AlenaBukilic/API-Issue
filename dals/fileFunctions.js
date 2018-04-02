const mongoose = require('mongoose');
const fs = require('fs');
const mime = require('mime-types');

const path = require('path');
const Issue = require(path.resolve('./models/issueModel'));
const File = require('../models/fileModel');

const saveModul = require('../saveModul/saveFile');

exports.uploadFile = (params, issueId) => {

    const { fileName, path } = params;    

    return new Promise((resolve, reject) => {
        
        File.create({
            path: path,
            fileName: fileName,
            issue: issueId
        }, (err, file) => {
            if(err){
                return reject(err);
            }
            return resolve(saveModul.saveFileData(file, issueId));
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