const mongoose = require('mongoose');
const fs = require('fs');

const Issue = require('../models/issueModel');
const FacadeFileController = require('../facade/fileFacadeFunctions.js');

exports.saveFile = (file) => {

    return new Promise((resolve, reject) => {

        const fileName = Date.now() + '-' + file.hapi.filename;
        const path = './tmp/' + fileName;
        const params = { fileName, path };
        const wstream = fs.createWriteStream(path);
        wstream.on('finish', () => {
            return resolve(params);            
        });
        wstream.on('error', (err) => {
            return reject(err);
        });

        file.pipe(wstream);
    });

}

exports.saveFileData = (file, issueId) => {
    
    return new Promise((resolve, reject) => {

        Issue.findOne({ _id: issueId })
        .then((issue) => {
            issue.files.push(file._id);
            issue.save();
            return resolve(file);
        })
        .catch(reject);
    });
}