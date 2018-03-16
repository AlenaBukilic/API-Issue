const assert = require('chai').should();
const saveIssue = require('../dals/dalsFunctions');

describe('Dals check functions', function(){
    describe('A function that saves an issue', function() {
        it('should save the issue', function(done) {
            saveIssue.create((err, issue) => {
                should.not.exist(err);
                done();
            });
        });
    });
    describe('A function that shows an issues', function() {
        it('should show the issues', function(done) {
            //TODO
        });
    });
    //all functions from dals?
});