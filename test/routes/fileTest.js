const chai = require('chai');
const expect = require('chai').expect;
const mongoose = require('mongoose');
const fs = require('fs');
const stream = require('stream');

chai.use(require('chai-http'));

const saveFile = require('../../utils/file.js');
const saveDals = require('../../dals/file');
const seeder = require('../seeder.js');

const binaryParser = function (res, cb) {
    res.setEncoding('binary');
    res.data = '';
    res.on('data', function (chunk) {
        res.data += chunk;
    });
    res.on('end', function () {
        cb(null, new Buffer(res.data, 'binary'));
    });
};

describe('File requests', function(){

    let testIssue, testIssueId, testFile, testFileId;
    beforeEach((done) => {
       seeder.createTestIssue()
        .then((result) => {
            testIssue = result;
            testIssueId = testIssue._id;
            testFile = fs.createReadStream('./test/facade/fakeFile.txt');
            testFile.hapi = {};
            testFile.hapi.filename = 'fakeFile.txt';
            done();
        });
    });
    beforeEach((done) => {
        saveFile.save(testFile, testIssueId)
        .then((result) => {
            saveDals.save(result)
            .then((result) => {
                testFileId = result._id;
                done();
            });
        });
    });

    const request = chai.request;

    describe('Upload file', function(){        

        describe('Valid issue Id', function() {

            it('should save file', function(done){
                request('http://localhost:8000')
                .post(`/issues/${testIssueId}/files`)
                .attach('file', fs.readFileSync('./test/facade/fakeFile.txt'), 'fakeFile.txt')
                .then((response) => {
                    expect(response).to.not.be.null;
                    expect(response).to.have.status(200);
                    expect(response.body.path).to.include('fakeFile.txt')
                    done();
                }, done)
                .catch(done);
            });
        });
        describe('Invalid issue Id', function() {
            
            it('should not save file', function(done){
                request('http://localhost:8000')
                .post(`/issues/1/files`)                
                .attach('file', fs.readFileSync('./test/facade/fakeFile.txt'), 'fakeFile.txt')
                .then(done, (err) => {
                    expect(err).to.not.be.null;
                    expect(err).to.have.status(400);
                    done();
                })
                .catch(done);
            });
        });
    });
    describe('Download file', function(){        

        describe('Valid file Id', function() {
            
            it('should download file', function(done){                
                request('http://localhost:8000')
                .get(`/files/${testFileId}`)                
                .buffer()
                .parse(binaryParser)
                .then((response) => {
                    expect(response).to.have.status(200);                    
                    expect(response.body).to.be.instanceOf(Buffer);                   
                    expect(response).to.have.header('content-type', 'text/plain; charset=utf-8');        
                    done();
                }, done)
                .catch(done);
            });
        });
        describe('Invalid file Id', function() {
        
            it('should not download file', function(done){
                request('http://localhost:8000')
                .get('/files/1')                
                .buffer()
                .parse(binaryParser)
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
