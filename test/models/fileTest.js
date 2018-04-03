const expect = require('chai').expect;
const model = require('../../models/file');

describe('FileModel - create', function() {

    it('should check properties', function(done) {
        
        const file = {
            path: "./tmp/fakeFile.txt",
            fileName: "fakeFile.txt"
        };

        model.create(file, (err, file) => {
            expect(err).to.be.null;

            expect(file).to.exist;
            expect(file).to.be.an('object');

            expect(file.path).to.exist;
            expect(file.path).to.be.a('string');
            expect(file.path).to.be.equal('./tmp/fakeFile.txt');

            expect(file.fileName).to.exist;
            expect(file.fileName).to.be.a('string');
            expect(file.fileName).to.be.equal('fakeFile.txt');

            expect(file.issue).to.exist;
            
            done();
        });
    });
});