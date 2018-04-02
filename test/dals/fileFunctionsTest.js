const chai = require('chai');
const expect = require('chai').expect;
const mongoose = require('mongoose');
const fs = require('fs');
const stream = require('stream');

chai.use(require('chai-http'));

const Issue = require('../../models/issueModel');
const path = require('path');
const File = require(path.resolve('./models/fileModel'));

const testFile = require('../../dals/fileFunctions');
const FacadeFileController = require('../../facade/fileFacadeFunctions.js');
const seeder = require('../seeder.js');

describe('Dals API files', function(){
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
        FacadeFileController.uploadFacade(fakeFile, fakeIssueId)
        .then((result) => {
            fakeFileId = result._id;
            done();
        });
    });

    describe('Upload file function', function(){
       
        describe('Valid params', function(){

            let fileName, path, params;
            fileName = 'fakeFile.txt';
            path = './tmp/fakeFile.txt';        

            it('should upload file', function(done){

                params = { fileName, path };         
            
                testFile.uploadFile(params, fakeIssueId)
                .then((fileCreated) => {

                    expect(fileCreated).to.be.an('object');
                    expect(fileCreated.path).to.be.equal(path);
                    expect(fileCreated.fileName).to.be.equal(fileName);
                                        
                    done();
                }, done)
                .catch(done);
            });
        });
        describe('Invaild params', function() {

            let fileName, path, params;
            fileName = undefined;
            path = null;  
            
            it('should not upload', function(done){

                params = { fileName, path };         
                
                testFile.uploadFile(params, fakeIssueId)
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
                
                testFile.downloadFile(fakeFileId)
                .then((fileExport) => {
                    expect(fileExport).to.be.an('object');
                    expect(fileExport.stream.path).to.include('fakeFile.txt');
                    expect(fileExport.type).to.equal('text/plain');                                                          
                    done();
                }, done)
                .catch(done);
            });
        });
        describe('Invaild file id', function() {

            it('should not download', function(done){

                testFile.downloadFile(1)
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