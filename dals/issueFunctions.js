const mongoose = require('mongoose');
const Issue = mongoose.model('Issue');

const callback = (err, issue) => {
    if(err){
        reply(err).code(500);
    }
    return res.response(issue);
};
exports.create = (attr, callback) => {
    Issue.create({
        title: attr.title,
        description: attr.description,
        name: attr.name
    }, callback);
}

exports.view = (req, res) => {
    return Issue.find({}, (err, issue) => {
        if(err){
            reply(err).code(404);
        }
        return res.response(issue);
    });
}

exports.edit = (attr, callback) => {
    Issue.findOneAndUpdate({ _id: attr.id }, attr, { new: true }, callback);
}

exports.destroy = (attr, callback) => {
    Issue.findOneAndRemove({ _id: attr.id }, callback);
}

exports.completed = (attr, callback) => {
    Issue.findOneAndUpdate({ _id: attr.id }, {
        completed: 'Complete'
    }, { new: true }, callback);
}

exports.pending = (attr, callback) => {
    Issue.findOneAndUpdate({ _id: attr.id }, {
        completed: 'Pending'
    }, { new: true }, callback);
}

exports.comment = (attr, callback) => {

    let issue, comment;

    Issue.findOne({ _id: attr.id })
        .then(function(issueForUpdate){
            issue = issueForUpdate;

            comment = {
                text: attr.text
            };
            issue.comments.push(comment);

            return issue.save();
        })
        .then(callback);
}
