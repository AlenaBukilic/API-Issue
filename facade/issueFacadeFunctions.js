//import { uploadFile, downloadFile } from '../dals/dalsFunctions';
//import { completed, pending } from '../dals/dalsFunctions';
//import { create, view, edit, destroy, comment } from '../dals/dalsFunctions';
const DalsIssueController = require('../dals/issueFunctions.js');

exports.createFacade = DalsIssueController.create;

exports.viewFacade = DalsIssueController.view;

exports.editFacade = DalsIssueController.edit;

exports.destroyFacade = DalsIssueController.destroy;

exports.markCompletedFacade = DalsIssueController.completed;

exports.markPendingFacade = DalsIssueController.pending;

exports.commentFacade = DalsIssueController.comment;