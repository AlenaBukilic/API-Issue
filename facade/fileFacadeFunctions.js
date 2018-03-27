const mongoose = require('mongoose');
const fs = require('fs');
const mime = require('mime-types');

const path = require('path');
const Issue = require(path.resolve('./models/issueModel'));
const File = require('../models/fileModel');

const saveModul = require('../saveModul/saveFile');
const DalsFileController = require('../dals/fileFunctions');

exports.uploadFacade = (file, issueId) => {
    
    return new Promise((resolve, reject) => {

        saveModul.saveFile(file, issueId)
            .then((params) => {
                return resolve(DalsFileController.uploadFile(params));
            })
            .catch(reject);
    });
}

exports.downloadFacade = DalsFileController.downloadFile;