const chai = require('chai');
const expect = require('chai').expect;
const mongoose = require('mongoose');

chai.use(require('chai-http'));

const Issue = require('../../models/issueModel');
const path = require('path');
const File = require(path.resolve('./models/fileModel'));

const testIssue = require('../../dals/issueFunctions');

describe('API issues', function(){
    this.timeout(5000);

    //dropDatabase

    describe('Create issue function', function(){
    
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

                testIssue.create(issue)
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

                testIssue.create(issue)
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

                testIssue.view()
                .then((issues) => {

                    expect(issues).to.be.an('array');

                    done();
                }, done)
                .catch(done);
            });
        });
        describe('Invaild params', function() {

            it('should not show issue', function(done){

                testIssue.view(issue)
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
                    id: "5ab3e2e43a903617c07074f5",
                    title: "Changed issue",
                    description: "All good",
                    name: "Not Alena"
                };
                issueId = issue.id;
                done();
            });
            it('should edit the issue', function(done) {

                testIssue.edit(issueId, issue)
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

                testIssue.edit(issue)
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
                    id: "5ab4a6eaa91bf509d0aaac0d"
                };
                issueId = issue.id;
                done();
            });

            it('should delete the issues', function(done) {

                testIssue.destroy(issueId)
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

                testIssue.destroy(issueId)
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

                testIssue.completed(issueId)
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

                testIssue.completed(issueId)
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

                testIssue.pending(issueId)
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

                testIssue.pending(issueId)
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

                testIssue.comment(issueId, issue)
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

                testIssue.comment(issueId, issue)
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

