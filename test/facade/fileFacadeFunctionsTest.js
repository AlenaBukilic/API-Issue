const chai = require('chai');
const expect = require('chai').expect;
const mongoose = require('mongoose');
const fs = require('fs');
const stream = require('stream');

chai.use(require('chai-http'));

const testSave = require('../../facade/fileFacadeFunctions.js');
const seeder = require('../seeder.js');

describe('Facade API files', function(){
    this.timeout(5000);

    let fakeIssue, fakeIssueId, fakeFile, fakeFileId;
    beforeEach((done) => {
       seeder.createTestIssue()
        .then((result) => {
            fakeIssue = result;
            fakeIssueId = fakeIssue._id;
            fakeFile = fs.createReadStream('./test/facade/fakeFile.txt');
            fakeFile.hapi = {};
            fakeFile.hapi.filename = 'fakeFile.txt';
            done();
        });
    });
    beforeEach((done) => {
        testSave.uploadFacade(fakeFile, fakeIssueId)
        .then((result) => {
            fakeFileId = result._id;
            done();
        });
    });

    describe('Save file function', function(){

        describe('Valid params', function(){

            it('should save file', function(done){
                
                testSave.uploadFacade(fakeFile, fakeIssueId)
                .then((savedFile) => {
                    expect(savedFile).to.be.an('object');
                    expect(savedFile.fileName).to.include('fakeFile.txt');
                    expect(savedFile.path).to.include('./tmp');
                    expect(savedFile.issue).to.include(fakeIssueId);                    
                    done();
                })
                .catch(done);
            });
        });
        describe('Invaild params', function() {

            it('should not save file', function(done){

                testSave.uploadFacade(fakeFile, 1)
                .then(done, (err) => {
                    expect(err).to.not.be.null;
                    expect(err.name).to.equal('ValidationError');            
                    done();
                })
                .catch(done);
            });
        });
    });
    describe('Download file function', function(){
        
        describe('Valid file id', function(){

            it('should download file', function(done){
                
                testSave.downloadFacade(fakeFileId)
                .then((fileExport) => {
                    expect(fileExport).to.be.an('object');
                    expect(fileExport.stream.path).to.include('fakeFile.txt');
                    expect(fileExport.type).to.equal('text/plain');
                    done();
                })
                .catch(done);
            });

        });  
        describe('Invaild file id', function() {

            it('should not download', function(done){

                testSave.downloadFacade(1)
                .then(done, (err) => {
                    expect(err).to.not.be.null;
                    expect(err.name).to.equal('CastError');            
                    done();
                })
                .catch(done);
            });
        });  
    });
        
});
