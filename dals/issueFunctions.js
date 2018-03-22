const mongoose = require('mongoose');
const Issue = mongoose.model('Issue');

exports.create = (req, res) => {
    return Issue.create({
        title: req.payload.title,
        description: req.payload.description,
        name: req.payload.name
    }, (err, data) => {
        if(err){
            res.response(err).code(500);
        }
        return res.response(data);
    });
}

exports.view = (req, res) => {
    return Issue.find({}, (err, data) => {
        if(err){
            res.response(err).code(404);
        }
        return res.response(data);
    });
}

exports.edit = (req, res) => {
    return Issue.findOneAndUpdate({ _id: req.params.id }, 
        req.payload, { new: true }, (err, data) => {
            if(err){
                res.response(err).code(404);
            }
            return res.response(data);
        });
}

exports.destroy = (req, res) => {
    return Issue.findOneAndRemove({ _id: req.params.id }, (err, data) => {
        if(err){
            res.response(err).code(404);
        }
        return res.response(data);
    });
}

exports.completed = (req, res) => {
   return Issue.findOneAndUpdate({ _id: req.params.id }, {
        completed: 'Complete'
    }, { new: true }, (err, data) => {
        if(err){
            res.response(err).code(404);
        }
        return res.response(data);
    });
}

exports.pending = (req, res) => {
    return Issue.findOneAndUpdate({ _id: req.params.id }, {
         completed: 'Pending'
     }, { new: true }, (err, data) => {
         if(err){
            res.response(err).code(404);
         }
         return res.response(data);
     });
}

exports.comment = (req, res) => {
    let issue, comment;
    return Issue.findOne({ _id: req.params.id })
        .then((issueForUpdate) => {
            issue = issueForUpdate;

            comment = {
                text: req.payload.comment
            };
            issue.comments.push(comment);

            return issue.save();
        });
}
