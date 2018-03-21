const chai = require('chai');
const expect = require('chai').expect;
const mongoose = require('mongoose');

chai.use(require('chai-http'));

const Issue = require('../models/issueModel');
const path = require('path');
const File = require(path.resolve('./models/fileModel'));

const testIssue = require('../dals/issueFunctions');

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
    
            it('should not save issue', function(done){
 
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

    describe('View issues function', function(){

        describe('Valid params', function(){

            it('should show issues', function(done){
                testIssue.view((err, issues) => {
                    expect(err).to.be.null;                    

                    expect(callback).to.have.status(200);
                    expect(issues.body).to.be.json;
                    expect(issues.body).to.be.an('array');
                    expect(issue.body.results).to.be.an('object');                
                });
                done();
            });
        });
        describe('Invaild params', function() {

            it('should not show issue', function(done){
 
                testIssue.view((err, issue) => {
                    expect(err).to.have.status(400);
                    expect(callback).to.have.status(404);
                });
                done();
            });
        });
    });
    describe('Edit issues function', function(){
    
        describe('Valid params', function(){

            it('should edit the issues', function(done) {

                const issue = {
                    id: "5ab1011717790c3fd0c0fd6f",
                    title: "Newlly Changed issue",
                    description: "All good",
                    name: "Not Alena"
                };

                testIssue.edit(issue, (err, issue) => {
                    expect(err).to.be.null;
                    
                    expect(callback).to.have.status(201);
                    expect(issue).to.be.json;
                    expect(issue.body).to.be.an('object').that.includes({ 
                        title: "Newlly Changed issue",
                        description: "All good",
                        name: "Not Alena"
                    });
                });
                done();
            });
        });
        describe('Invaild params', function() {

            it('should not edit the issue', function(done){
 
                testIssue.edit((err, issue) => {
                    expect(err).to.have.status(400);
                    expect(callback).to.have.status(500);
                });
                done();
            });
        });
    });
    describe('Delete issues function', function(){
    
        describe('Valid params', function(){

            it('should delete the issues', function(done) {

                const issue = {
                    id: "5ab0fea36ff7ff3c38402293",
                };

                testIssue.destroy(issue, (err, issue) => {
                    expect(err).to.be.null;
                    
                    expect(callback).to.have.status(200);
                    expect(issue).to.be.null;
                });
                done();
            });
        });
        describe('Invaild params', function() {

            it('should not delete', function(done){
 
                testIssue.destroy((err, issue) => {
                    expect(err).to.have.status(400);
                    expect(callback).to.have.status(500);
                });
                done();
            });
        });
    });
    describe('Mark issue complete', function(){
    
        describe('Valid params', function(){

            it('should mark complete an issue', function(done) {

                const issue = {
                    id: "5ab1011717790c3fd0c0fd6f",
                };

                testIssue.completed(issue, (err, issue) => {
                    expect(err).to.be.null;
                    
                    expect(callback).to.have.status(201);
                    expect(issue).to.be.json;
                    expect(issue.body).to.be.an('object').that.includes({ 
                        completed: "Completed"
                    });
                });
                done();
            });
        });
        describe('Invaild params', function() {

            it('should not change to completed', function(done){
 
                testIssue.completed((err, issue) => {
                    expect(err).to.have.status(400);
                    expect(callback).to.have.status(500);
                });
                done();
            });
        });
    });
    describe('Mark issue pending', function(){
    
        describe('Valid params', function(){

            it('should mark an issue pending', function(done) {

                const issue = {
                    id: "5ab1011717790c3fd0c0fd6f"
                };

                testIssue.pending(issue, (err, issue) => {
                    expect(err).to.be.null;
                    
                    expect(callback).to.have.status(201);
                    expect(issue).to.be.json;
                    expect(issue.body).to.be.an('object').that.includes({ 
                        completed: "Pending"
                    });
                });
                done();
            });
        });
        describe('Invaild params', function() {

            it('should not change to pending', function(done){
 
                testIssue.pending((err, issue) => {
                    expect(err).to.have.status(400);
                    expect(callback).to.have.status(500);
                });
                done();
            });
        });
    });
    describe('Add comment on issue', function(){
    
        describe('Valid params', function(){

            it('should add comment', function(done) {

                const issue = {
                    id: "5ab1011717790c3fd0c0fd6f",
                    text: "last comment"
                };

                testIssue.comment(issue, (err, issue) => {
                    expect(err).to.be.null;
                    
                    expect(callback).to.have.status(201);
                    expect(issue).to.be.json;
                    expect(issue.body).to.be.an('object');
                });
                done();
            });
        });
        describe('Invaild params', function() {

            it('should not add comment', function(done){
 
                testIssue.comment((err, issue) => {
                    expect(err).to.have.status(400);
                    expect(callback).to.have.status(500);
                });
                done();
            });
        });
    });
});