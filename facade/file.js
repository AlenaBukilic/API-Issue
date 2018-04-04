const saveFile = require('../utils/file');
const DalsFile = require('../dals/file');

exports.upload = (file, issueId) => {
    
    return new Promise((resolve, reject) => {

        saveFile.save(file, issueId)
            .then((params) => {
                return resolve(DalsFile.save(params));
            })
            .catch(reject);
    });
}

exports.download = DalsFile.download;