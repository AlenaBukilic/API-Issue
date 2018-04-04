const FacadeIssue = require('../facade/file.js');

exports.upload = (req, res) => {
    const file = req.payload.file;
    const issueId = req.params.issueId;
    return FacadeIssue.upload(file, issueId); 
}

exports.download = (req, res) => {
    const fileId = req.params.id;
    return FacadeIssue.download(fileId)
        .then((file) => {
            return res.response(file.stream)
                .type(file.type)
                .header('Content-type', file.type)
                .header('Content-length', file.stream.length)
    });
}
