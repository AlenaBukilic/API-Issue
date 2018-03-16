const assert = require('chai').should();
const mongoose = require('mongoose');

const model = require('../models/fileModel');
const File = mongoose.model('File');


describe('A function that creates a file', function() {

    it('should create the file', function(done) {
        
        const file = {
            url: "http://somefile.txt",
            issue: mongoose.Schema.ObjectId
        };

        model.file.create(file, (err, file) => {
            should.not.exist(err);

            should.exist(file);
            file.should.be.an('object');

            should.exist(file.id);
            file.id.should.be.a('number');
            file.id.should.be.gte(0);

            should.exist(file.url);
            file.url.should.be.a('string');

            should.exist(file.issue);
            file.issue.should.be.a('number');

            done();
        });
    });
});