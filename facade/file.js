const saveFile = require('../utils/file');
const DalsFileController = require('../dals/file');

exports.uploadFacade = (file, issueId) => {
    
    return new Promise((resolve, reject) => {

        saveFile.save(file, issueId)
            .then((params) => {
                return resolve(DalsFileController.save(params));
            })
            .catch(reject);
    });
}

exports.downloadFacade = DalsFileController.download;