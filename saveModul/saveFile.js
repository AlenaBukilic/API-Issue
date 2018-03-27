const mongoose = require('mongoose');
const fs = require('fs');

const FacadeFileController = require('../facade/fileFacadeFunctions.js');

exports.saveFile = (file, issueId) => {

    return new Promise((resolve, reject) => {

        const fileName = Date.now() + '-' + file.hapi.filename;
        const path = './tmp/' + fileName;
        const params = { issueId, fileName, path };
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