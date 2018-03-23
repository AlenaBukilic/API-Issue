const FacadeFileController = require('../facade/fileFacadeFunctions.js');

exports.upload = FacadeFileController.uploadFacade;

exports.download = FacadeFileController.downloadFacade;
