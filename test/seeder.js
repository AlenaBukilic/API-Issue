const mongoose = require('mongoose');
const Issue = require('../models/issue');

exports.createTestIssue = () => {
    return new Promise((resolve, reject) => {
        Issue.create({
            title: "Route issue",
            description: "Create route issue test",
            name: "Blah"
        }, (err, data) => {
            if(err){
                return reject(err);
            }
            return resolve(data);
        });
    });
};