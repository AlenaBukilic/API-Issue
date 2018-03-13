const IssueController = require('../controllers/issueController');

module.exports = [
    {
        path: 'api/issues',
        method: 'POST',
        handler: IssueController.create
    },
    {
        path: 'api/issues',
        method: 'GET',
        handler: IssueController.view
    },
    {
        path: 'api/issues/{id}',
        method: 'PUT',
        handler: IssueController.edit
    },
    {
        path: 'api/issues/{id}',
        method: 'DELETE',
        handler: IssueController.destroy
    },
    {
        path: 'api/issues/{id}',
        method: 'PUT',
        handler: IssueController.markCompleted
    },
    {
        path: 'api/issues/{id}',
        method: 'PUT',
        handler: IssueController.markPending
    },
    {
        path: 'api/issues/{id}',
        method: 'POST',
        handler: IssueController.uploadFiles
    },
    {
        path: 'api/issues/{id}',
        method: 'GET',
        handler: IssueController.downloadFiles
    },
    {
        path: 'api/issues/{id}',
        method: 'POST',
        handler: IssueController.comment
    },
];