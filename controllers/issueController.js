const FacadeIssueController = require('../facade/issueFacadeFunctions.js');

exports.create = (req, res) => {
    const issue = {
        title: req.payload.title,
        description: req.payload.description,
        name: req.payload.name
    };
    return FacadeIssueController.createFacade(issue);
};

exports.view = (req, res) => {
    const params = {};
    // add some params for filtering if needed
    // params.ownerId = req.params.owner;
    return FacadeIssueController.viewFacade(params);
}

exports.edit = (req, res) => {
    const issueId = req.params.id;
    const issueBody = req.payload;
    return FacadeIssueController.editFacade(issueId, issueBody);
}

exports.destroy = (req, res) => {
    const issueId = req.params.id;
    return FacadeIssueController.destroyFacade(issueId);
}

exports.statusChange = (req, res) => {
    const issueId = req.params.id;
    const issueStatus = req.params.status;
    return FacadeIssueController.statusChangeFacade(issueId, issueStatus);
}

exports.comment = (req, res) => {
    const issueId = req.params.id;
    const issueBody = req.payload;
    return FacadeIssueController.commentFacade(issueId, issueBody);
}