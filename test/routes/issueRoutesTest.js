const chai = require('chai');
const expect = require('chai').expect;
const mongoose = require('mongoose');

chai.use(require('chai-http'));

const Issue = require('../../models/issueModel');
const path = require('path');
const File = require(path.resolve('./models/fileModel'));

const seeder = require('../seeder.js');

describe('Issue requests', function(){

    let testIssue, testIssueId;
    beforeEach((done) => {
       seeder.createTestIssue()
        .then((result) => {
            testIssue = result;
            testIssueId = testIssue._id;
            done();
        });
    }); 
    
    const request = chai.request;

    describe('Create issue', function(){        

        describe('Valid params', function() {
            
            it('should save the issue', function(done) {
                
                const createTestIssueValid = {
                    title: 'Just for create',
                    description: 'Testing create new issue fn',
                    name: 'Alena'
                };
                request('http://localhost:8000')
                .post('/issues')
                .send(createTestIssueValid)
                .then((response) => {
                    
                    const createdIssue = response.body;
                    expect(response).to.have.status(200);
                    expect(createdIssue).to.be.an('object');
                    expect(createdIssue.title).to.equal(createTestIssueValid.title);
                    expect(createdIssue.description).to.equal(createTestIssueValid.description);
                    expect(createdIssue.name).to.equal(createTestIssueValid.name);

                    done();
                }, done)
                .catch(done);
            });
        });
        describe('Invaild params', function() {

            const createTestIssueInvalid = {
                title: 654878,
                name: null
            }
    
            it('should not save issue', function(done){
                request('http://localhost:8000')
                .post('/issues')
                .send(createTestIssueInvalid)
                .then(done, (err) => {
                    expect(err).to.not.be.null;
                    expect(err).to.have.status(400);                   
                    done();
                })
                .catch(done);
            });
        });
    });
    describe('View issues', function(){        

        describe('Existing issues', function() {
            
            it('should show the issues', function(done) {
                request('http://localhost:8000')
                .get('/issues')
                .then((response) => {
                    const issuesList = response.body;
                    expect(response).to.have.status(200);
                    expect(issuesList).to.be.an('array');
                    done();
                }, done)
                .catch(done);
            });
        });
        describe('Non existing issues', function() {

            it('should not show the issues', function(done){
                request('http://localhost:8000')
                .get('/issues/1')
                .then(done, (err) => {
                    expect(err).to.not.be.null;
                    expect(err).to.have.status(404);                    
                    done();
                })
                .catch(done);
            });
        });
    });
    describe('Edit issue', function(){        

        describe('Valid params', function() {

            const newDataTestIssueEditValid = {
                title: "New data new title",
                description: "New data for testing edit issue fn",
                name: "Alena 2"
            }
            
            it('should edit the issue', function(done) {
                request('http://localhost:8000')
                .put(`/issues/${testIssueId}`)
                .send(newDataTestIssueEditValid)
                .then((response) => {
                    
                    const createdIssue = response.body;
                    expect(response).to.have.status(200);
                    expect(createdIssue).to.be.an('object');
                    expect(createdIssue.title).to.equal(newDataTestIssueEditValid.title);
                    expect(createdIssue.description).to.equal(newDataTestIssueEditValid.description);
                    expect(createdIssue.name).to.equal(newDataTestIssueEditValid.name);

                    done();
                }, done)
                .catch(done);
            });
        });
        describe('Invaild params', function() {

            const newDataTestIssueEditInvalid = {
                title: 123654,
                description: null,
                name: false
            }
            
            it('should not edit issue', function(done){
                request('http://localhost:8000')
                .put(`/issues/${testIssueId}`)
                .send(newDataTestIssueEditInvalid)
                .then(done, (err) => {
                    expect(err).to.not.be.null;
                    expect(err).to.have.status(400);                    
                    done();
                })
                .catch(done);
            });
        });
    });
    describe('Delete issue', function(){        

        describe('Valid Id', function() {
               
            it('should delete the issue', function(done) {
                request('http://localhost:8000')
                .delete(`/issues/${testIssueId}`)
                .then((response) => { 
                    issue = response.body;
                    expect(response).to.have.status(200);
                    expect(issue).to.be.an('object');                    
                })
                .then((issue) => {
                    expect(issue).to.be.undefined;
                    done();
                })
                .catch(done);
            });
        });
        describe('Invalid Id', function() {

            it('should not delete issue', function(done){
                request('http://localhost:8000')
                .delete('/issues/1')                                                
                .then(done, (err) => {
                    expect(err).to.not.be.null;
                    expect(err).to.have.status(400);                    
                    done();
                })
                .catch(done);
            });
        });
    });
    describe('Change status issue', function(){        

        describe('Valid params', function() {

            const changeStatusData = {
                status: 'Complete'
            }
            
            it('should change status of issue', function(done) {
                request('http://localhost:8000')
                .patch(`/patch/${testIssueId}`)
                .send(changeStatusData)
                .then((response) => {
                    const createdIssue = response.body;
                    expect(response).to.have.status(200);
                    expect(createdIssue).to.be.an('object');
                    expect(createdIssue.status).to.equal('Complete');

                    done();
                }, done)
                .catch(done);
            });
        });
        describe('Invaild params', function() {

            const changeStatusDataInvalid = {
                status: 'Alena'
            }
    
            it('should not change status of issue', function(done){
                request('http://localhost:8000')
                .patch(`/patch/${testIssueId}`)
                .send(changeStatusDataInvalid)                
                .then(done, (err) => {
                    expect(err).to.not.be.null;
                    expect(err).to.have.status(400);                    
                    done();
                })
                .catch(done);
            });
        });
    });
    describe('Comment on issue', function(){        

        describe('Valid params', function() {

            const commentToAdd = {
                comments: {
                    text: "routes issue comment"                    
                }
            } 
            
            it('should comment the issue', function(done) {
                request('http://localhost:8000')
                .post(`/issues/${testIssueId}/comments`)
                .send(commentToAdd)
                .then((response) => {
                    
                    const createdIssue = response.body;
                    expect(response).to.have.status(200);                    
                    expect(createdIssue).to.be.an('object');
                    expect(createdIssue.comments[createdIssue.comments.length - 1].text).to.equal(commentToAdd.comments.text);
                    
                    done();
                }, done)
                .catch(done);
            });
        });
        describe('Invaild params', function() {

            const commentToAddInvalid = {
                comments: {
                    text: null                    
                }
            }

            it('should not comment issue', function(done){
                request('http://localhost:8000')
                .post(`/issues/${testIssueId}/comments`)                
                .send(commentToAddInvalid)
                .then(done, (err) => {
                    expect(err).to.not.be.null;
                    expect(err).to.have.status(400);
                    done();
                })
                .catch(done);
            });
        });
    });
});