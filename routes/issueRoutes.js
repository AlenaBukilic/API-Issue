const IssueController = require('../controllers/issueController');

module.exports = [
    {
        path: '/issues',
        method: 'POST',
        handler: IssueController.create
    },
    {
        path: '/issues',
        method: 'GET',
        handler: IssueController.view
    },
    {
        path: '/issues/{id}',
        method: 'PUT',
        handler: IssueController.edit
    },
    {
        path: '/issues/{id}',
        method: 'DELETE',
        handler: IssueController.destroy
    },
    {
        path: '/issues/{id}/markCompleted',
        method: 'PATCH',
        handler: IssueController.markCompleted
    },
    {
        path: '/issues/{id}/markPending',
        method: 'PATCH',
        handler: IssueController.markPending
    },
    {
        path: '/issues/{id}/comments',
        method: 'PATCH',
        handler: IssueController.comment
    }
];