const FileController = require('../controllers/fileController.js');

module.exports = [
    {
        path: '/issues/{issueId}/files',
        method: 'POST',
        config: {
            payload: {
                output: 'stream',
                parse: true,
                allow: 'multipart/form-data'
            }
        },
        handler: FileController.upload
    },
    {
        path: '/files/{id}',
        method: 'GET',
        handler: FileController.download
    }
];