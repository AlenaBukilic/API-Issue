const mongoose = require('mongoose');
const Issue = mongoose.model('Issue');

exports.create = (issue) => {

    return new Promise((resolve, reject) => {
        Issue.create({
            title: issue.title,
            description: issue.description,
            name: issue.name
        }, (err, data) => {
            if(err){
                return reject(err);
            }
            return resolve(data);
        });
    });
}

exports.view = (filterParams) => {

    return new Promise((resolve, reject) => {
        Issue.find({}, (err, data) => {
            if(err){
                return reject(err);
            }
            return resolve(data);
        });
    });
}

exports.edit = (issueId, issueBody) => {

    return new Promise((resolve, reject) => {
        Issue.findOneAndUpdate({ _id: issueId }, issueBody, { new: true}, (err, data) => {
            if(err){
                return reject(err);
            }
            return resolve(data);
        });
    });
}

exports.destroy = (issueId) => {

    return new Promise((resolve, reject) => {
        Issue.findOneAndRemove({ _id: issueId }, (err, data) => {
            if(err){
                return reject(err);
            }
            return resolve(data);
        });
    });
}

exports.completed = (issueId) => {

    return new Promise((resolve, reject) => {
        Issue.findOneAndUpdate({ _id: issueId }, {
            completed: 'Complete'
        }, { new: true }, (err, data) => {
            if(err){
                reject(err);
            }
            return resolve(data);
        });
    });
}

exports.pending = (issueId) => {

    return new Promise((resolve, reject) => {
        Issue.findOneAndUpdate({ _id: issueId }, {
            completed: 'Pending'
        }, { new: true }, (err, data) => {
            if(err){
                reject(err);
            }
            return resolve(data);
        });
    });
}

exports.comment = (issueId, issueBody) => {

    return new Promise((resolve, reject) => {
        let issue, comment;
        Issue.findOne({ _id: issueId})
        .then((issueForUpdate) => {
            issue = issueForUpdate;

            comment = {
                text: issueBody.comments.text
            };
           
            issue.comments.push(comment);

            return issue.save();
        })
        .then(resolve)
        .catch(reject);
    });
    
}
