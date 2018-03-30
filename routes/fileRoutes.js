const FileController = require('../controllers/fileController.js');
const Joi = require('joi');

module.exports = [
    {
        path: '/issues/{issueId}/files',
        method: 'POST',
        config: {
            payload: {
                output: 'stream',
                parse: true,
                allow: 'multipart/form-data'
            },
            validate: {
                params: {
                    issueId: Joi.string().min(24).max(24)
                }
            }

        },
        handler: FileController.upload
    },
    {
        path: '/files/{id}',
        method: 'GET',
        handler: FileController.download,
        options: {
            validate: {
                params: {
                    id: Joi.string().min(24).max(24)
                }
            }
        }
    }
];