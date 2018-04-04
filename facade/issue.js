const DalsIssue = require('../dals/issue.js');

exports.create = DalsIssue.create;

exports.view = DalsIssue.view;

exports.edit = DalsIssue.edit;

exports.destroy = DalsIssue.destroy;

exports.statusChange = DalsIssue.statusChange;

exports.comment = DalsIssue.comment;