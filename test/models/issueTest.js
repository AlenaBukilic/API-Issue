const expect = require('chai').expect;
const model = require('../../models/issue');

describe('IssueModel - create', function() {

    it('should check properties', function(done) {
        
        const issue = {
            title: "First issue",
            description: "Testing issueModel",
            name: "Alena"
        };

        model.create(issue, (err, issue) => {
            expect(err).to.be.null;

            expect(issue).to.exist;
            expect(issue).to.be.an('object');

            expect(issue.title).to.exist;
            expect(issue.title).to.be.a('string');
            expect(issue.title).to.be.equal('First issue');

            expect(issue.description).to.exist;
            expect(issue.description).to.be.a('string');
            expect(issue.description).to.be.equal('Testing issueModel');

            expect(issue.name).to.exist;
            expect(issue.name).to.be.a('string');
            expect(issue.name).to.be.equal('Alena');
            
            done();
        });
    });
});