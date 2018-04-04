const FacadeIssue = require('../facade/issue.js');

exports.create = (req, res) => {
    const issue = {
        title: req.payload.title,
        description: req.payload.description,
        name: req.payload.name
    };
    return FacadeIssue.create(issue);
};

exports.view = (req, res) => {
    const params = {};
    // add some params for filtering if needed
    // params.ownerId = req.params.owner;
    return FacadeIssue.view(params);
}

exports.edit = (req, res) => {
    const issueId = req.params.id;
    const issueBody = req.payload;
    return FacadeIssue.edit(issueId, issueBody);
}

exports.destroy = (req, res) => {
    const issueId = req.params.id;
    return FacadeIssue.destroy(issueId);
}

exports.statusChange = (req, res) => {
    const issueId = req.params.id;
    const issueStatus = req.payload.status;
    return FacadeIssue.statusChange(issueId, issueStatus);
}

exports.comment = (req, res) => {
    const issueId = req.params.id;
    const issueBody = req.payload;
    return FacadeIssue.comment(issueId, issueBody);
}