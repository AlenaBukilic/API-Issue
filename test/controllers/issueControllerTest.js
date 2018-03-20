const chai = require('chai');
const expect = require('chai').expect;

chai.use(require('chai-http'));

const testIssueController = require('../controllers/issueController');

describe('Check controller issue functions', function(){
    this.timeout(5000);

    describe('A function that saves an issue', function() {
        it('should save the issue', function(done) {
            testIssueController.create((err,fn) => {
                expect(err).to.be.null;
                expect(fn).to.have.been.called;

                done();
            });
        });
    });
    describe('A function that shows issues', function() {
        it('should show issues', function(done) {
            testIssueController.view((err,fn) => {
                expect(err).to.be.null;
                expect(fn).to.have.been.called;

                done();
            });
        });
    });
    describe('A function that edits an issue', function() {
        it('should edit the issue', function(done) {
            testIssueController.edit((err,fn) => {
                expect(err).to.be.null;
                expect(fn).to.have.been.called;

                done();
            });
        });
    });
    describe('A function that deletes an issue', function() {
        it('should delete the issue', function(done) {
            testIssueController.destroy((err,fn) => {
                expect(err).to.be.null;
                expect(fn).to.have.been.called;

                done();
            });
        });
    });
    describe('A function that marks complete an issue', function() {
        it('should mark complete the issue', function(done) {
            testIssueController.markCompleted((err,fn) => {
                expect(err).to.be.null;
                expect(fn).to.have.been.called;

                done();
            });
        });
    });
    describe('A function that marks pending an issue', function() {
        it('should mark pending the issue', function(done) {
            testIssueController.markPending((err,fn) => {
                expect(err).to.be.null;
                expect(fn).to.have.been.called;

                done();
            });
        });
    });
    describe('A function that saves a comment', function() {
        it('should save a comment', function(done) {
            testIssueController.comment((err,fn) => {
                expect(err).to.be.null;
                expect(fn).to.have.been.called;

                done();
            });
        });
    });
});