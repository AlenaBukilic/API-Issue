const chai = require('chai');
const expect = require('chai').expect;
const mongoose = require('mongoose');

chai.use(require('chai-http'));

const Issue = require('../../models/issueModel');
const path = require('path');
const File = require(path.resolve('./models/fileModel'));

const testIssue = require('../../controllers/issueController');

describe('API issues', function(){
    this.timeout(5000);

    describe('Create issueController function', function(){
    
        describe('Valid params', function() {
            
            it('should pass the issue to facade', function(done) {

                testIssue.create()
                .then((result) => {
                    expect(result).to.be.a('function');

                    done();
                }, done)
                .catch(done);
            });
        });
        describe('Invaild params', function() {
    
            it('should not save issue', function(done){

                testIssue.create()
                .then(done, (err) => {
                    expect(err).to.be.an('object');
                    expect(err.name).to.equal('ValidationError');
                    done();
                })
                .catch(done);
            });
        });
    });
});