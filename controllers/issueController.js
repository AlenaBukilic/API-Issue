//import { createFacade, viewFacade, editFacade, destroyFacade } from '../facade/facadeFunctions';
//import { markCompletedFacade, markPendingFacade, commentFacade } from '../facade/facadeFunctions';
const FacadeIssueController = require('../facade/issueFacadeFunctions.js');

exports.create = FacadeIssueController.createFacade;

exports.view = FacadeIssueController.viewFacade;

exports.edit = FacadeIssueController.editFacade;

exports.destroy = FacadeIssueController.destroyFacade;

exports.markCompleted = FacadeIssueController.markCompletedFacade;

exports.markPending = FacadeIssueController.markPendingFacade;

exports.comment = FacadeIssueController.commentFacade;