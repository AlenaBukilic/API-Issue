const FileController = require('../controllers/fileController');

module.exports = [
    {
        path: '/files',
        method: 'POST',
        handler: FileController.uploadFiles
    },
    {
        path: '/files/{id}',
        method: 'GET',
        handler: FileController.downloadFiles
    }
]