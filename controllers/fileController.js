//import { uploadFacade, downloadFacade } from '../facade/facadeFunctions';
const FacadeFileController = require('../facade/fileFacadeFunctions.js');

exports.upload = FacadeFileController.uploadFacade;

exports.download = FacadeFileController.downloadFacade;
