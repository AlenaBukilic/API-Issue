//import { uploadFacade, downloadFacade } from '../facade/facadeFunctions';
const FacadeIssueController = require('../facade/fileFacadeFunctions.js');

exports.upload = FacadeIssueController.uploadFacade;

exports.download = FacadeIssueController.downloadFacade;
