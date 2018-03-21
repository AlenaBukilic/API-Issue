const expect = require('chai').expect;
const model = require('../../models/fileModel');

describe('FileModel - create', function() {

    it('should check properties', function(done) {
        
        const file = {
            path: "file.doc",

        };

        model.create(file, (err, file) => {
            expect(err).to.be.null;

            expect(file).to.exist;
            expect(file).to.be.an('object');

            expect(file.path).to.exist;
            expect(file.path).to.be.a('string');
            expect(file.path).to.be.equal('file.doc');

            expect(file.issue).to.exist;
            
            done();
        });
    });
});