// const chai = require('chai');
// const expect = require('chai').expect;

// chai.use(require('chai-http'));

// const testIssueFacade = require('../facade/issueFacadeFunctions');

// describe('Check facade issue functions', function(){
//     this.timeout(5000);

//     describe('A function that saves an issue', function() {
//         it('should save the issue', function(done) {
//             testIssueFacade.createFacade((err,fn) => {
//                 expect(err).to.be.null;
//                 expect(fn).to.have.been.called;

//                 done();
//             });
//         });
//     });
//     describe('A function that shows issues', function() {
//         it('should show issues', function(done) {
//             testIssueFacade.viewFacade((err,fn) => {
//                 expect(err).to.be.null;
//                 expect(fn).to.have.been.called;

//                 done();
//             });
//         });
//     });
//     describe('A function that edits an issue', function() {
//         it('should edit the issue', function(done) {
//             testIssueFacade.editFacade((err,fn) => {
//                 expect(err).to.be.null;
//                 expect(fn).to.have.been.called;

//                 done();
//             });
//         });
//     });
//     describe('A function that deletes an issue', function() {
//         it('should delete the issue', function(done) {
//             testIssueFacade.destroyFacade((err,fn) => {
//                 expect(err).to.be.null;
//                 expect(fn).to.have.been.called;

//                 done();
//             });
//         });
//     });
//     describe('A function that marks complete an issue', function() {
//         it('should mark complete the issue', function(done) {
//             testIssueFacade.markCompletedFacade((err,fn) => {
//                 expect(err).to.be.null;
//                 expect(fn).to.have.been.called;

//                 done();
//             });
//         });
//     });
//     describe('A function that marks pending an issue', function() {
//         it('should mark pending the issue', function(done) {
//             testIssueFacade.markPendingFacade((err,fn) => {
//                 expect(err).to.be.null;
//                 expect(fn).to.have.been.called;

//                 done();
//             });
//         });
//     });
//     describe('A function that saves a comment', function() {
//         it('should save a comment', function(done) {
//             testIssueFacade.commentFacade((err,fn) => {
//                 expect(err).to.be.null;
//                 expect(fn).to.have.been.called;

//                 done();
//             });
//         });
//     });
// });