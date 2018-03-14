const FacadeFunctions = require('../facade/facadeFunctions');

module.exports = [
    {
        path: '/files',
        method: 'POST',
        handler: FacadeFunctions.upload
    },
    {
        path: '/files/{id}',
        method: 'GET',
        handler: FacadeFunctions.download
    }
];