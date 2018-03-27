const chai = require('chai');
const expect = require('chai').expect;
const mongoose = require('mongoose');
const fs = require('fs');
const stream = require('stream');

chai.use(require('chai-http'));

const Issue = require('../../models/issueModel');
const path = require('path');
const File = require(path.resolve('./models/fileModel'));

describe('File requests', function(){

    const request = chai.request;

    describe('Create file', function(){        

        describe('Valid params', function() {

            it('should save file', function(done){
                request('http://localhost:8000')
                .post('/issues/5ab25c27f608fb1f201413e5/files')
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
        describe('Invaild params', function() {
    
            it('should not save file', function(done){
                request('http://localhost:8000')
                .post('/issues/5aba5d0301f3703b5c72045/comments')
                .attach('file', fs.readFileSync('./test/facade/fakeFile.txt'), 'fakeFile.txt')
                .then(done, (err) => {
                    expect(err).to.not.be.null;
                    expect(err).to.have.status(500);
                    done();
                })
                .catch(done);
            });
        });
    });
});
