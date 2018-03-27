const chai = require('chai');
const expect = require('chai').expect;
const mongoose = require('mongoose');
const fs = require('fs');
const stream = require('stream');

chai.use(require('chai-http'));

const testSave = require('../../facade/fileFacadeFunctions.js');

describe('Facade', function(){
    this.timeout(5000);

    describe('Save file function', function(){

        describe('Valid params', function(){

            let file, issueId;
            before((done) => {
                file = fs.createReadStream('./test/facade/fakeFile.txt');
                file.hapi = {};
                file.hapi.filename = "fakeFile.txt";
                issueId = "5ab25c27f608fb1f201413e5";
                done();
            });

            it('should save file', function(done){
                
                testSave.uploadFacade(file, issueId)
                .then((file) => {
                    expect(file).to.not.be.null;
                    done();
                })
                .catch(done);
            });
        });
        describe('Invaild params', function() {

            let file, issueId;
            before((done) => {
                file = fs.createReadStream('./test/facade/fakeFile.txt');
                issueId = "1";
                done();
            });
            it('should not save file', function(done){

                testSave.uploadFacade(file, issueId)
                .then(done, (err) => {
                    expect(err).to.not.be.null;
                    expect(err.name).to.equal('TypeError');            
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
                fileId = "5aba3427d2b3db26a8e2d076";
                done();
            });

            it('should go to download dals', function(done){
                
                testSave.downloadFacade(fileId)
                .then((result) => {
                    expect(result).to.be.an('object');
                    expect(result.path).to.not.null;
                    done();
                })
                .catch(done);
            });

        });  
        describe('Invaild params', function() {

            let fileId;
            before((done) => {
                fileId = "1";
                done();
            });
            it('should not download', function(done){

                testSave.downloadFacade(fileId)
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
