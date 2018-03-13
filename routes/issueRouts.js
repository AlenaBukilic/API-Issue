const IssueController = require('../controllers/issueController');

module.exports = [
    {
        path: '/create',
        method: 'POST',
        handler: IssueController.create
    },
    {
        path: '/view',
        method: 'GET',
        handler: IssueController.view
    },
    {
        path: '/edit/{id}',
        method: 'PUT',
        handler: IssueController.edit
    },
    {
        path: '/destroy/{id}',
        method: 'DELETE',
        handler: IssueController.destroy
    },
    {
        path: '/markComplete/{id}',
        method: 'PUT',
        handler: IssueController.markCompleted
    },
    {
        path: '/markPending/{id}',
        method: 'PUT',
        handler: IssueController.markPending
    },
    {
        path: '/uploadFiles/{id}',
        method: 'POST',
        handler: IssueController.uploadFiles
    },
    {
        path: '/issues/{id}',
        method: 'GET',
        handler: IssueController.downloadFiles
    },
    {
        path: '/comments/{id}',
        method: 'POST',
        handler: IssueController.comment
    },
];