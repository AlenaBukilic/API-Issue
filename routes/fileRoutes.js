const FileController = require('../controllers/fileController');

module.exports = [
    {
        path: '/files',
        method: 'POST',
        handler: FileController.upload
    },
    {
        path: '/files/{id}',
        method: 'GET',
        handler: FileController.download
    }
];