const DalsIssueController = require('../dals/fileFunctions');

exports.uploadFacade = DalsIssueController.uploadFile;

exports.downloadFacade = DalsIssueController.downloadFile;