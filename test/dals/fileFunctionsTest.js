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

describe('API files', function(){
    this.timeout(5000);

    //dropDatabase

    describe('Upload file function', function(){
       
        describe('Valid params', function(){

            let file, issueId, fileName, path, params;
            before((done) => {
                file = { 
                    path: "./tmp/fakeFile.txt",
                    fileName: "fakeFile.txt",
                    issueId: "5ab8d3a3b547d91ab0aef53e"
                }
                fileName = file.fileName;
                issueId = file.issueId;
                path = file.path;
                params = { issueId, fileName, path };
                done();
            });

            it('should upload file', function(done){
                
                testFile.uploadFile(params)
                .then((file) => {

                    expect(file).to.be.an('object');
                    expect(file.path).to.equal(path);
                    expect(file.fileName).to.equal(fileName);                  

                    done();
                }, done)
                .catch(done);
            });
        });
        describe('Invaild params', function() {

            let file, issueId, fileName, path, params;
            before((done) => {
                file = { 
                    path: undefined,
                    issueId: "5ab8d3a3b547d91ab0ae53e"
                }
                issueId = file.issueId;
                path = file.path;
                params = { issueId, fileName, path };
                done();
            });
            it('should not upload', function(done){

                testFile.uploadFile(params)
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
       
        describe('Valid params', function(){

            let fileId;
            before((done) => {
                fileId = "5ab4d2e254eef13bd0c4a954";
               
                done();
            });

            it('should download file', function(done){
                
                testFile.downloadFile(fileId)
                .then((fileExport) => {

                    expect(fileExport).to.be.an('object');
                    // check if file iz ReadStream /stream.Readable?
                    expect(fileExport).to.be.equal(stream.Readable);                    

                    done();
                }, done)
                .catch(done);
            });
        });
        describe('Invaild params', function() {

            let fileId;
            before((done) => {
                fileId = "1";
               
                done();
            });
            it('should not save to hard disk', function(done){

                testFile.downloadFile(fileId)
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