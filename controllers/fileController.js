const FacadeFileController = require('../facade/fileFacadeFunctions.js');
const mongoose = require('mongoose');
const Issue = require('../models/issueModel');

exports.upload = (req, res) => {
    const file = req.payload.file;
    const issueId = req.params.issueId;
    return FacadeFileController.uploadFacade(file, issueId); 
}

exports.download = (req, res) => {
    const fileId = req.params.id;
    return FacadeFileController.downloadFacade(fileId)
        .then((file) => {
            return res.response(file.stream)
                .type(file.type)
                .header('Content-type', file.type)
                .header('Content-length', file.stream.length)
    });
}
