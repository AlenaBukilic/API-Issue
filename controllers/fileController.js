const FacadeFileController = require('../facade/fileFacadeFunctions.js');

exports.upload = (req, res) => {
    const file = req.payload.file;
    const issueId = req.params.issueId;
    return FacadeFileController.uploadFacade(file, issueId);
}

exports.download = (req, res) => {
    const fileId = req.params.id;
    return FacadeFileController.downloadFacade(fileId);
}
