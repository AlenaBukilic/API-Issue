const FacadeFunctions = require('../facade/facadeFunctions')

module.exports = [
    {
        path: '/issues',
        method: 'POST',
        handler: FacadeFunctions.create
    },
    {
        path: '/issues',
        method: 'GET',
        handler: FacadeFunctions.view
    },
    {
        path: '/issues/{id}',
        method: 'PUT',
        handler: FacadeFunctions.edit
    },
    {
        path: '/issues/{id}',
        method: 'DELETE',
        handler: FacadeFunctions.destroy
    },
    {
        path: '/issues/{id}/markCompleted',
        method: 'PUT',
        handler: FacadeFunctions.markCompleted
    },
    {
        path: '/issues/{id}/markPending',
        method: 'PUT',
        handler: FacadeFunctions.markPending
    },
    {
        path: '/issues/{id}/comments',
        method: 'PATCH',
        handler: FacadeFunctions.comment
    }
];
