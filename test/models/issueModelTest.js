const assert = require('chai').should();
const mongoose = require('mongoose');

const model = require('../models/issueModel');
const Issue = mongoose.model('Issue');

describe('A function that creates an issue', function() {

    it('should create the issue', function(done) {
        
        const issue = {
            title: "First issue",
            description: "Something is not working",
            name: "Alena"
        };

        model.issue.create(issue, (err, issue) => {
            should.not.exist(err);

            should.exist(issue);
            issue.should.be.an('object');

            should.exist(issue.id);
            issue.id.should.be.a('number');
            issue.id.should.be.gte(0);

            should.exist(issue.title);
            issue.title.should.be.a('string');
            issue.title.should.equal('First issue');

            should.exist(issue.description);
            issue.description.should.be.a('string');
            issue.description.should.equal('Something is not working');

            should.exist(issue.name);
            issue.name.should.be.a('string');
            issue.name.should.equal('Alena');
            
            done();
        });
    });
});