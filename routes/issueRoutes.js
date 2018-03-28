const IssueController = require('../controllers/issueController.js');
const Joi = require('joi');

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
        path: '/patch/{id}/{status}',
        method: 'PATCH',
        handler: IssueController.statusChange,
        options: {
            validate: {
                params: {
                    status: 'complete' || 'pending'
                }
            }
        }
    },
    {
        path: '/issues/{id}/comments',
        method: 'POST',
        handler: IssueController.comment
    }
];