const expect = require('chai').expect;
const model = require('../models/issueModel');

describe('A function that creates an issue', function() {

    it('should create the issue', function(done) {
        
        const issue = {
            title: "First issue",
            description: "Something is not working",
            name: "Alena"
        };

        model.issue.create(issue, (err, issue) => {
            expect(err).to.be.null;

            expect(issue).to.exist;
            expect(issue).to.be.an('object');

            expect(issue.title).to.exist;
            expect(issue.title).to.be.a('string');
            expect(issue.title).to.be.equal('First issue');

            expect(issue.description).to.exist;
            expect(issue.description).to.be.a('string');
            expect(issue.description).to.be.equal('Something is not working');

            expect(issue.name).to.exist;
            expect(issue.name).to.be.a('string');
            expect(issue.name).to.be.equal('Alena');
            
            done();
        });
    });
});