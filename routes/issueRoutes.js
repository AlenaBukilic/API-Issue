const IssueController = require('../controllers/issueController.js');
const Joi = require('joi');

module.exports = [
    {
        path: '/issues',
        method: 'POST',
        handler: IssueController.create,
        options: {
            validate: {
                payload: {
                    title: Joi.string().min(3).max(30),
                    description: Joi.string().min(3).max(100),
                    name: Joi.string().min(3).max(20)
                }
            }
        }
    },
    {
        path: '/issues',
        method: 'GET',
        handler: IssueController.view
    },
    {
        path: '/issues/{id}',
        method: 'PUT',
        handler: IssueController.edit,
        options: {
            validate: {
                params: {
                    id: Joi.string().min(24).max(24)
                },
                payload: {
                    title: Joi.string().min(3).max(30),
                    description: Joi.string().min(3).max(100),
                    name: Joi.string().min(3).max(20)
                }
            }
        }
    },
    {
        path: '/issues/{id}',
        method: 'DELETE',
        handler: IssueController.destroy,
        options: {
            validate: {
                params: {
                    id: Joi.string().min(24).max(24)
                }
            }
        }
    },
    {
        path: '/patch/{id}',
        method: 'PATCH',
        handler: IssueController.statusChange,
        options: {
            validate: {
                params: {
                    id: Joi.string().min(24).max(24)
                },
                payload: {
                    status: Joi.string().min(7).max(8).regex(/\bcomplete|\bpending/gi)
                }
            }
        }
    },
    {
        path: '/issues/{id}/comments',
        method: 'POST',
        handler: IssueController.comment,
        options: {
            validate: {
                params: {
                    id: Joi.string().min(24).max(24)
                },
                payload: {
                    comments: {
                        text: Joi.string().min(3).max(150)                        
                    }
                }
            }
        }
    }
];
