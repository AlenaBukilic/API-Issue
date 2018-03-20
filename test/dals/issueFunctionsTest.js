const chai = require('chai');
const expect = require('chai').expect;

chai.use(require('chai-http'));

const testIssue = require('../dals/issueFunctions');

describe('Check dals issue functions', function(){
    this.timeout(5000);

    describe('A function that saves an issue', function() {
        
        it('should save the issue', function() {
            return chai.request(testIssue)
                .post('/issues')
                .send({
                    title: "First issue",
                    description: "Something is not working",
                    name: "Alena"
                })
                .then(function(res){
                    expect(res).to.have.status(201);
                    expect(res).to.be.json;
                    expect(res.body).to.be.an('object').that.includes({ title: "First issue",
                    description: "Something is not working",
                    name: "Alena"});
                });
        });

        it('should return Bad Request', function(){
            return chai.request(testIssue)
                .post('/issues')
                .type('form')
                .send({
                    title: "First issue",
                    description: "Something is not working",
                    name: "Alena"
                })
                .then(function(res){
                    throw new Error('Invalid content type!');
                })
                .catch(function(err){
                    expect(err).to.have.status(400);
                });
        });
    });
    describe('A function that shows issues', function() {
        
        it('should show the issues', function() {
           return chai.request(testIssue)
            .get('/issues')
            .then(function(res){
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.be.an('array');
                expect(res.body.results).to.be.an('object');                
            });
        });

        it('should return Not found', function(){
            return chai.request(testIssue)
                .get('/INVALID_PATH')
                .then(function(res){
                    throw new Error('Path exists!');
                })
                .catch(function(err){
                    expect(err).to.have.status(404);
                });
        });

    });
    describe('A function that edits an issue', function() {
        
        it('should edit the issues', function(done) {
            return chai.request(testIssue)
                .put('/issues/{id}')
                .send({
                    description: "Something new",
                    name: "Not Alena"
                })
                .then(function(res){
                    expect(res).to.have.status(201);
                    expect(res).to.be.json;
                    expect(res.body).to.be.an('object').that.includes({ title: "First issue",
                    description: "Something new",
                    name: "Not Alena"});
                });;
        });

        it('should return Bad Request', function(){
            return chai.request(testIssue)
                .put('/issues/{id}')
                .type('form')
                .send({
                    description: "Something new",
                    name: "Not Alena"
                })
                .then(function(res){
                    throw new Error('Invalid content type!');
                })
                .catch(function(err){
                    expect(err).to.have.status(400);
                });
        });
    });
    describe('A function that deletes an issue', function() {
        
        it('should delete the issue', function(done) {
            return chai.request(testIssue)
                .delete('/issues/{id}')
                .then(function(res){
                    expect(res).to.have.status(200);
                    expect(res).to.be.null;
            });
        });

        it('should return Not found if issue doesn\'t exist', function(){
            return chai.request(testIssue)
                .delete('/INVALID_PATH')
                .then(function(res){
                    throw new Error('Issue does\'t exist!');
                })
                .catch(function(err){
                    expect(err).to.have.status(404);
                });
        });
    });
    describe('A function that marks an issue complete', function() {
        
        it('should mark complete the issue', function(done) {
            return chai.request(testIssue)
                .patch('/issues/{id}')
                .send({
                    completed: "Completed"
                })
                .then(function(res){
                    expect(res).to.have.status(201);
                    expect(res).to.be.json;
                    expect(res.body).to.be.an('object').that.includes({
                    completed: "Completed"});
                });;
        });

        it('should return Bad Request', function(){
            return chai.request(testIssue)
                .patch('/issues/{id}')
                .type('form')
                .send({
                    completed: "Completed"
                })
                .then(function(res){
                    throw new Error('Invalid content type!');
                })
                .catch(function(err){
                    expect(err).to.have.status(400);
                });
        });
    });
    describe('A function that marks an issue pending', function() {
        
        it('should mark pending the issue', function(done) {
            return chai.request(testIssue)
                .patch('/issues/{id}')
                .send({
                    completed: "Pending"
                })
                .then(function(res){
                    expect(res).to.have.status(201);
                    expect(res).to.be.json;
                    expect(res.body).to.be.an('object').that.includes({
                    completed: "Pending"});
                });;
        });

        it('should return Bad Request', function(){
            return chai.request(testIssue)
                .patch('/issues/{id}')
                .type('form')
                .send({
                    completed: "Pending"
                })
                .then(function(res){
                    throw new Error('Invalid content type!');
                })
                .catch(function(err){
                    expect(err).to.have.status(400);
                });
        });
    });
    describe('A function that inserts a comment', function() {
        
        it('should insert the comment', function(done) {
            return chai.request(testIssue)
                .post('/issues/{id}/comments')
                .send({
                    comments:[{
                        text: "My first test comment"
                    }]
                })
                .then(function(res){
                    expect(res).to.have.status(201);
                    expect(res).to.be.json;
                    expect(res.body).to.be.an('array');
                    expect(res.body.results).to.be.an('object').that.includes({text: "My first test comment"});
                });
        });

        it('should return Bad Request', function(){
            return chai.request(testIssue)
                .post('/issues/{id}/comments')
                .type('form')
                .send({
                    comments:[{
                        text: "My first test comment"
                    }]
                })
                .then(function(res){
                    throw new Error('Invalid content type!');
                })
                .catch(function(err){
                    expect(err).to.have.status(400);
                });
        });
    });    
});