const chai = require('chai');
const expect = require('chai').expect;
const mongoose = require('mongoose');

chai.use(require('chai-http'));

const Issue = require('../models/issueModel');
const testIssue = require('../dals/issueFunctions');
// test coment
const path = require('path');
const File = require(path.resolve('./models/fileModel'));

describe('API issues', function(){
    this.timeout(5000);

    describe('Create issue function', function(){
    
        describe('Valid params', function() {
            
            it('should save the issue', function(done) {

                const issue = {
                    title: "Second issue",
                    description: "Create function test",
                    name: "Alena"
                };

                testIssue.create(issue, (err, issue) => {
                    expect(err).to.be.null;
                    
                    expect(callback).to.have.status(201);
                    expect(issue).to.be.json;
                    expect(issue.body).to.be.an('object').that.includes({ 
                        title: "Second issue",
                        description: "Create function test",
                        name: "Alena"
                    });
                });
                done();
            });
        });
        describe('Invaild params', function() {
    
            it.only('should not save issue', function(done){

                const issue = {
                    title: 0,
                    name: null
                };
                // chai uncaught assertionerror expected object to have property status???
                testIssue.create(issue, (err, issue) => {
                    expect(err).to.have.status(400);
                    expect(callback).to.have.status(500);
                });
                done();
            });
        });
    });
});