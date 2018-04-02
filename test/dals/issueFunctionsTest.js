const chai = require('chai');
const expect = require('chai').expect;
const mongoose = require('mongoose');

chai.use(require('chai-http'));

const Issue = require('../../models/issueModel');
const testIssue = require('../../dals/issueFunctions');
const seeder = require('../seeder.js');

describe('Dals API issues', function(){
    this.timeout(5000);

    let fakeIssue, fakeIssueId;
    beforeEach((done) => {
       seeder.createTestIssue()
        .then((result) => {
            fakeIssue = result;
            fakeIssueId = fakeIssue._id;
            done();
        });
    });

    describe('Create issue function', function(){
    
        describe('Valid params', function() {
            
            const testIssueCreate = {
                title: "First issue",
                description: "Create function dals test",
                name: "Alena"
            }

            it('should save the issue', function(done) {

                testIssue.create(testIssueCreate)
                .then((createdIssue) => {

                    expect(createdIssue).to.be.an('object');
                    expect(createdIssue.title).to.equal(testIssueCreate.title);
                    expect(createdIssue.description).to.equal(testIssueCreate.description);
                    expect(createdIssue.name).to.equal(testIssueCreate.name);

                    done();
                }, done)
                .catch(done);
            });
        });
        describe('Invaild params', function() {

            const testIssueCreateInvalid = {
                title: 1,
                name: null
            }
    
            it('should not save issue', function(done){

                testIssue.create(testIssueCreateInvalid)
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
                .then((issuesShown) => {

                    expect(issuesShown).to.be.an('array');

                    done();
                }, done)
                .catch(done);

            });
        });
    });
    describe('Edit issues function', function(){
    
        describe('Valid params', function(){

            const testIssueEditData = {
                title: 'Edited title',
                description: 'Data for edit',
                name: 'Alena 2'
            }
            it('should edit the issue', function(done) {

                testIssue.edit(fakeIssueId, testIssueEditData)
                .then((issueEdited) => {

                    expect(issueEdited).to.be.an('object');
                    expect(issueEdited.title).to.equal(testIssueEditData.title);
                    expect(issueEdited.description).to.equal(testIssueEditData.description);
                    expect(issueEdited.name).to.equal(testIssueEditData.name);

                    done();
                }, done)
                .catch(done);
            });
        });
        describe('Invaild params', function() {
    
            it('should not edit the issue', function(done){

                testIssue.edit(1, undefined)
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

            it('should delete the issues', function(done) {

                testIssue.destroy(fakeIssueId)
                .then((issueForDelete) => {
                    expect(issueForDelete).to.be.an('object');
                })
                .then((issueDeleted) => {
                    expect(issueDeleted).to.be.undefined;
                    done();
                }, done)
                .catch(done);
            });
        });
        describe('Invaild params', function() {

            it('should not delete', function(done){

                testIssue.destroy(1)
                .then(done, (err) => {
                    expect(err).to.be.an('object');
                    expect(err.name).to.equal('CastError');
                    done();
                })
                .catch(done);
            });
        });
    });
    describe('Status change function', function(){
    
        describe('Valid params', function(){

            const statusData = {
                status: 'Complete'
            }

            it('should change issue status', function(done) {

                testIssue.statusChange(fakeIssueId, statusData.status)
                .then((issueStatus) => {

                    expect(issueStatus).to.be.an('object');
                    expect(issueStatus.status).to.equal('Complete');

                    done();
                }, done)
                .catch(done);
            });
        });
        describe('Invaild params', function() {

            it('should not change issue status', function(done){

                testIssue.statusChange(1, undefined)
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

            const commentData = {
                comments: {
                    text: 'some comment text for testing'
                }
            }

            it('should add comment', function(done) {

                testIssue.comment(fakeIssueId, commentData)
                .then((issueComment) => {
                    
                    expect(issueComment).to.be.an('object');                    
                    expect(issueComment.comments[issueComment.comments.length - 1].text).to.equal(commentData.comments.text);

                    done();
                }, done)
                .catch(done);
            });
        });
        describe('Invaild params', function() {

            it('should not add comment', function(done){

                testIssue.comment(1, undefined)
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

