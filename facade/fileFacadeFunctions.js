const DalsFileController = require('../dals/fileFunctions');

exports.uploadFacade = DalsFileController.uploadFile;

exports.downloadFacade = DalsFileController.downloadFile;