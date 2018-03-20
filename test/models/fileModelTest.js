const expect = require('chai').expect;
const model = require('../models/fileModel');

describe('A function that creates a file', function() {

    it('should create a file', function(done) {
        
        const file = {
            url: "http://somefile.com",
            issue: 1
        };

        model.file.create(file, (err, file) => {
            expect(err).to.be.null;

            expect(file).to.exist;
            expect(file).to.be.an('object');

            expect(file.id).to.ok;
            expect(file.id).to.be.a('number');
            expect(file.id).to.be.gte(0);

            expect(file.url).to.exist;
            expect(file.url).to.be.a('string');
            expect(file.url).to.be.equal('http://somefile.com');

            expect(file.issue).to.exist;
            expect(file.issue).to.be.a('number');
            expect(file.issue).to.be.equal(1);
            
            done();
        });
    });
});