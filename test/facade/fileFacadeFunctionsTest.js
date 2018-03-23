// const chai = require('chai');
// const expect = require('chai').expect;

// chai.use(require('chai-http'));

// const testFileFacade = require('../facade/fileFacadeFunctions');

// describe('Check facade file functions', function(){
//     this.timeout(5000);

//     describe('A function that saves a file', function() {
//         it('should save the file', function(done) {
//             testFileFacade.uploadFacade((err,fn) => {
//                 expect(err).to.be.null;
//                 expect(fn).to.have.been.called;

//                 done();
//             });
//         });
//     });
//     describe('A function that downloads a file', function() {
//         it('should download file', function(done) {
//             testFileFacade.downloadFacade((err,fn) => {
//                 expect(err).to.be.null;
//                 expect(fn).to.have.been.called;

//                 done();
//             });
//         });
//     });
// });