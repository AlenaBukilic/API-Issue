const DalsIssueController = require('../dals/issue.js');

exports.createFacade = DalsIssueController.create;

exports.viewFacade = DalsIssueController.view;

exports.editFacade = DalsIssueController.edit;

exports.destroyFacade = DalsIssueController.destroy;

exports.statusChangeFacade = DalsIssueController.statusChange;

exports.commentFacade = DalsIssueController.comment;