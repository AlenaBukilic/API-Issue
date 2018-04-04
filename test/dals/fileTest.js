const chai = require('chai');
const expect = require('chai').expect;
const mongoose = require('mongoose');
const fs = require('fs');
const stream = require('stream');

chai.use(require('chai-http'));

const testDals = require('../../dals/file');
const saveFile = require('../../utils/file.js');
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

    describe('Upload file function', function(){
    
        describe('Valid params', function(){   
            
            let params;
            beforeEach((done) => {
            saveFile.save(fakeFile, fakeIssueId)
            .then((result) => {
                params = result;
                done();
                });
            });
        
            it('should save file', function(done){  
 
                testDals.save(params)
                .then((fileCreated) => {
                    
                    expect(fileCreated).to.be.an('object');
                    expect(fileCreated.path).to.be.equal(params.path);
                    expect(fileCreated.fileName).to.be.equal(params.fileName);
                                        
                    done();
                }, done)
                .catch(done);
            });
        });
        describe('Invaild params', function() {

            let fileName, path, params;
            fileName = undefined;
            path = null;  
            
            it('should not save', function(done){

                params = { fileName, path };         
                
                testDals.save(params, fakeIssueId)
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

        beforeEach((done) => {
            saveFile.save(fakeFile, fakeIssueId)
            .then((result) => {
                testDals.save(result)
                .then((result) => {
                    fakeFileId = result._id;
                    done();
                });
            });
        });
       
        describe('Valid file id', function(){

            it('should download file', function(done){
                
                testDals.download(fakeFileId)
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

                testDals.download(1)
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