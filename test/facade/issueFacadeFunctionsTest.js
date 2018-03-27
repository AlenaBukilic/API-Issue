const chai = require('chai');
const expect = require('chai').expect;
const mongoose = require('mongoose');

chai.use(require('chai-http'));

const Issue = require('../../models/issueModel');
const path = require('path');
const File = require(path.resolve('./models/fileModel'));

const testIssueFacade = require('../../facade/issueFacadeFunctions');

describe('Facade issues', function(){
    this.timeout(5000);

    describe('Create issue', function(){
    
        describe('Valid params', function() {
            
            let issue;
            before((done) => {
                issue = {
                    title: "Second issue",
                    description: "Create function test",
                    name: "Alena"
                };
                done();
            });
            it('should save the issue', function(done) {

                testIssueFacade.createFacade(issue)
                .then((createdIssue) => {

                    expect(createdIssue).to.be.an('object');
                    expect(createdIssue.title).to.equal(issue.title);
                    expect(createdIssue.description).to.equal(issue.description);
                    expect(createdIssue.name).to.equal(issue.name);

                    done();
                }, done)
                .catch(done);
            });
        });
        describe('Invaild params', function() {

            let issue;
            before((done) => {
                issue = {
                    title: 0,
                    name: null
                };
                done();
            });
    
            it('should not save issue', function(done){

                testIssueFacade.createFacade(issue)
                .then(done, (err) => {
                    expect(err).to.be.an('object');
                    expect(err.name).to.equal('ValidationError');
                    done();
                })
                .catch(done);
            });
        });
    });

    describe('View issues function', function(){

        describe('Valid params', function(){

            it('should show issues', function(done){

                testIssueFacade.viewFacade()
                .then((issues) => {

                    expect(issues).to.be.an('array');

                    done();
                }, done)
                .catch(done);
            });
        });
        describe('Invaild params', function() {

            it('should not show issue', function(done){

                testIssueFacade.viewFacade(issue)
                .then(done, (err) => {
                    expect(err).to.be.an('object');
                    expect(err.name).to.equal('ReferenceError');
                    done();
                })
                .catch(done);

            });
        });
    });
    describe('Edit issues function', function(){
    
        describe('Valid params', function(){

            let issue, issueId;
            before((done) => {
                issue = {
                    id: "5ab8d3a3b547d91ab0aef53e",
                    title: "Changed issue",
                    description: "All good",
                    name: "Not Alena"
                };
                issueId = issue.id;
                done();
            });
            it('should edit the issue', function(done) {

                testIssueFacade.editFacade(issueId, issue)
                .then((issueEdit) => {

                    expect(issueEdit).to.be.an('object');
                    expect(issueEdit.title).to.equal(issue.title);
                    expect(issueEdit.description).to.equal(issue.description);
                    expect(issueEdit.name).to.equal(issue.name);

                    done();
                }, done)
                .catch(done);
            });
        });
        describe('Invaild params', function() {

            let issue;
            before((done) => {
                issue = {
                    title: 0,
                    name: null
                };
                done();
            });
    
            it('should not edit the issue', function(done){

                testIssueFacade.editFacade(issue)
                .then(done, (err) => {
                    expect(err).to.be.an('object');
                    expect(err.name).to.equal('CastError');
                    done();
                })
                .catch(done);
            });
        });
    });
    describe('Delete issues function', function(){
    
        describe('Valid params', function(){

            let issueId;
            before((done) => {
                const issue = {
                    id: "5aba4417b76f4a27c0d44bf7"
                };
                issueId = issue.id;
                done();
            });

            it('should delete the issues', function(done) {

                testIssueFacade.destroyFacade(issueId)
                .then((issueDelete) => {
                    expect(issueDelete).to.be.an('object');
                })
                .then((issue) => {
                    expect(issue).to.be.undefined;
                    done();
                }, done)
                .catch(done);
            });
        });
        describe('Invaild params', function() {

            const issueId = "1";

            it('should not delete', function(done){

                testIssueFacade.destroyFacade(issueId)
                .then(done, (err) => {
                    expect(err).to.be.an('object');
                    expect(err.name).to.equal('CastError');
                    done();
                })
                .catch(done);
            });
        });
    });
    describe('Mark issue complete', function(){
    
        describe('Valid params', function(){

            let issueId;
            before((done) => {
                issue = {
                    id: "5ab25c27f608fb1f201413e5"
                };
                issueId = issue.id;
                done();
            });

            it('should mark complete an issue', function(done) {

                testIssueFacade.markCompletedFacade(issueId)
                .then((issueMarkComplete) => {

                    expect(issueMarkComplete).to.be.an('object');
                    expect(issueMarkComplete.completed).to.equal('Complete');

                    done();
                }, done)
                .catch(done);
            });
        });
        describe('Invaild params', function() {

            const issueId = '1';

            it('should not change to completed', function(done){

                testIssueFacade.markCompletedFacade(issueId)
                .then(done, (err) => {
                    expect(err).to.be.an('object');
                    expect(err.name).to.equal('CastError');            
                    done();
                })
                .catch(done);
            });
        });
    });
    describe('Mark issue pending', function(){
    
        describe('Valid params', function(){

            let issueId;
            before((done) => {
                issue = {
                    id: "5ab25c27f608fb1f201413e5"
                };
                issueId = issue.id;
                done();
            });

            it('should mark pending an issue', function(done) {

                testIssueFacade.markPendingFacade(issueId)
                .then((issueMarkPending) => {

                    expect(issueMarkPending).to.be.an('object');
                    expect(issueMarkPending.completed).to.equal('Pending');

                    done();
                }, done)
                .catch(done);
            });
        });
        describe('Invaild params', function() {

            const issueId = '1';

            it('should not change to pending', function(done){

                testIssueFacade.markPendingFacade(issueId)
                .then(done, (err) => {
                    expect(err).to.be.an('object');
                    expect(err.name).to.equal('CastError');            
                    done();
                })
                .catch(done);
            });
        });
    });
    describe('Add comment on issue', function(){
    
        describe('Valid params', function(){

            let issueId, issue;
            before((done) => {
                issue = {
                    id: "5ab25c27f608fb1f201413e5",
                    comments: {
                        text: "test comment"                    
                    }
                };
                issueId = issue.id;
                done();
            });

            it('should add comment', function(done) {

                testIssueFacade.commentFacade(issueId, issue)
                .then((issueComment) => {
                    
                    expect(issueComment).to.be.an('object');                    
                    expect(issueComment.comments[issueComment.comments.length - 1].text).to.equal(issue.comments.text);

                    done();
                }, done)
                .catch(done);
            });
        });
        describe('Invaild params', function() {

            let issueId, issue;
            before((done) => {
                issue = {
                    id: "1",
                    comments: {
                        text: undefined                    
                    }
                };
                issueId = issue.id;
                done();
            });
            it('should not add comment', function(done){

                testIssueFacade.commentFacade(issueId, issue)
                .then(done, (err) => {
                    expect(err).to.be.an('object');
                    expect(err.name).to.equal('CastError');            
                    done();
                })
                .catch(done);
            });
        });
    });
});

