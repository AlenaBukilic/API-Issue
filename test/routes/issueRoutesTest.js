const chai = require('chai');
const expect = require('chai').expect;
const mongoose = require('mongoose');

chai.use(require('chai-http'));

const Issue = require('../../models/issueModel');
const path = require('path');
const File = require(path.resolve('./models/fileModel'));

const testRoutes = require('../../routes/issueRoutes');

describe('Routes requests', function(){

    const request = chai.request;

    describe('Create issue', function(){        

        describe('Valid params', function() {

            let issue;
            before((done) => {
                issue = {
                    title: "Route issue",
                    description: "Create route issue test",
                    name: "Blah"
                };
                done();
            });
            
            it('should save the issue', function(done) {
                request('http://localhost:8000')
                .post('/issues')
                .send(issue)
                .then((response) => {
                    
                    const createdIssue = response.body;

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
                request('http://localhost:8000')
                .post('/issues')
                .send(issue)
                .then(done, (err) => {
                    expect(err).to.not.be.null;
                    expect(err).to.have.status(500);                    
                    done();
                })
                .catch(done);
            });
        });
    });
    describe('View issues', function(){        

        describe('Valid params', function() {
            
            it('should show the issues', function(done) {
                request('http://localhost:8000')
                .get('/issues')
                .then((response) => {
                    const issuesList = response.body;
                    expect(issuesList).to.be.an('array');
                    done();
                }, done)
                .catch(done);
            });
        });
        describe('Invaild params', function() {

            it('should not show the issues', function(done){
                request('http://localhost:8000')
                .get('/issues/1')
                .then(done, (err) => {
                    expect(err).to.not.be.null;
                    expect(err).to.have.status(500);                    
                    done();
                })
                .catch(done);
            });
        });
    });
    describe('Edit issue', function(){        

        describe('Valid params', function() {

            let issue, issueId;
            before((done) => {
                issue = {
                    title: "Edited route issue",
                    description: "All good",
                    name: "lala"
                };
                issueId = issue.id;
                done();
            });
            
            it('should edit the issue', function(done) {
                request('http://localhost:8000')
                .put('/issues/5aba5d0301f3703b5c720459')
                .send(issue)
                .then((response) => {
                    
                    const createdIssue = response.body;

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
    
            it('should not edit issue', function(done){
                request('http://localhost:8000')
                .put('/issues/5aba5d0301f3703b5c72045')
                .send(issue)
                .then(done, (err) => {
                    expect(err).to.not.be.null;
                    expect(err).to.have.status(500);
                    done();
                })
                .catch(done);
            });
        });
    });
    describe('Delete issue', function(){        

        describe('Valid params', function() {

            let issue;

            it('should delete the issue', function(done) {
                request('http://localhost:8000')
                .delete('/issues/5aba5d0301f3703b5c720459')
                .then((response) => { 
                    issue = response.body;
                    expect(issue).to.be.an('object');                    
                })
                .then((issue) => {
                    expect(issue).to.be.undefined;
                    done();
                })
                .catch(done);
            });
        });
        describe('Invaild params', function() {

            it('should not delete issue', function(done){
                request('http://localhost:8000')
                .delete('/issues/5aba5d0301f3703b5c72045')
                .then(done, (err) => {
                    expect(err).to.not.be.null;
                    expect(err).to.have.status(500);                    
                    done();
                })
                .catch(done);
            });
        });
    });
    describe('Mark complete issue', function(){        

        describe('Valid params', function() {
            
            it('should mark complete the issue', function(done) {
                request('http://localhost:8000')
                .patch('/issues/5ab25c27f608fb1f201413e5/markCompleted')
                .then((response) => {
                    
                    const createdIssue = response.body;

                    expect(createdIssue).to.be.an('object');
                    expect(createdIssue.completed).to.equal('Complete');


                    done();
                }, done)
                .catch(done);
            });
        });
        describe('Invaild params', function() {
    
            it('should not mark complete issue', function(done){
                request('http://localhost:8000')
                .put('/issues/5ab25c27f608fb1f201413e/markCompleted')
                .then(done, (err) => {
                    expect(err).to.not.be.null;
                    expect(err).to.have.status(404);
                    done();
                })
                .catch(done);
            });
        });
    });
    describe('Mark pending issue', function(){        

        describe('Valid params', function() {
            
            it('should mark pending the issue', function(done) {
                request('http://localhost:8000')
                .patch('/issues/5ab25c27f608fb1f201413e5/markPending')
                .then((response) => {
                    
                    const createdIssue = response.body;

                    expect(createdIssue).to.be.an('object');
                    expect(createdIssue.completed).to.equal('Pending');


                    done();
                }, done)
                .catch(done);
            });
        });
        describe('Invaild params', function() {
    
            it('should not mark pending issue', function(done){
                request('http://localhost:8000')
                .put('/issues/5ab25c27f608fb1f201413e/markPending')
                .then(done, (err) => {
                    expect(err).to.not.be.null;
                    expect(err).to.have.status(404);
                    done();
                })
                .catch(done);
            });
        });
    });
    describe('Comment on issue', function(){        

        describe('Valid params', function() {

            let issue;
            before((done) => {
                issue = {
                    comments: {
                        text: "routes issue comment"                    
                    }
                };
                done();
            });

            
            it('should comment the issue', function(done) {
                request('http://localhost:8000')
                .post('/issues/5ab25c27f608fb1f201413e5/comments')
                .send(issue)
                .then((response) => {
                    
                    const createdIssue = response.body;

                    expect(createdIssue).to.be.an('object');
                    expect(createdIssue.comments[createdIssue.comments.length - 1].text).to.equal(issue.comments.text);
                    
                    done();
                }, done)
                .catch(done);
            });
        });
        describe.only('Invaild params', function() {

            let issue;
            before((done) => {
                issue = {
                    comments: {
                        text: "bad comment"
                    }
                };
                done();
            });
    
            it('should not comment issue', function(done){
                request('http://localhost:8000')
                .post('/issues/5aba5d0301f3703b5c72045/comments')
                .send(issue)
                .then(done, (err) => {
                    expect(err).to.not.be.null;
                    expect(err).to.have.status(500);
                    done();
                })
                .catch(done);
            });
        });
    });
});