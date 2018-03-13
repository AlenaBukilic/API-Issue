module.exports = {

    create(req, reply){
        
        Issue.create({
            title: req.payload.title,
            description: req.payload.description,
            name: req.payload.name
        }, (err, issue) => {
            if(err){
                reply(err).code(500);
            }
            return reply.response(issue);
        })

    },
    view(req, reply){
        Issue.view({}, (err, issues) => {
            if(err){
                reply(err).code(404);
            }
            return reply(issues);
        })
    },
    edit(req, reply){
        Issue.edit(req.params.id, (err, issue) => {
            if(err){
                reply(err).code(404);
            }
            return reply(issue);
        })
    },
    destroy(req, reply){
        Issue.destroy(req.params.id, (err, issue) => {
            if(err){
                reply(err).code(404);
            }
            return reply(issue);
        })
    },
    markCompleted(req, reply){
        Issue.markCompleted({
            complete: 'Completed'
        }, (err, issue) => {
            if(err){
                reply(err).code(404);
            }
            return reply(issue);
        })
    },
    markPending(req, reply){
        Issue.markPending({
            complete: 'Pending'
        }, (err, issue) => {
            if(err){
                reply(err).code(404);
            }
            return reply(issue);
        })
    },
    uploadFiles(req, reply){
        File.uploadFiles({
            url: req.payload.url,
            issue: req.params.id
        }, (err, file) => {
            if(err){
                reply(err).code(404);
            }
            return reply(file);
        })
    },
    downloadFiles(req, reply){
        File.uploadFiles(req.params.url, (err, file) => {
            if(err){
                reply(err).code(404);
            }
            return reply(file);
        })
    },
    comment(req, reply){
        Comment.uploadFiles({
            description: req.payload.description,
            name: name.payload.name,
            issue: req.params.id
        }, (err, file) => {
            if(err){
                reply(err).code(404);
            }
            return reply(file);
        })
    },
}