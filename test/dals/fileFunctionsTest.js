// const chai = require('chai');
// const expect = require('chai').expect;

// chai.use(require('chai-http'));

// const testFile = require('../dals/fileFunctions');

// describe('Check dals file functions', function(){
//     this.timeout(5000);

//     describe('A function that saves a file', function() {
        
//         it('should save the file', function() {
//             return chai.request(testFile)
//                 .post('/files')
//                 .send({
//                     url: 'http://somefile.com',
//                     issue: 1
//                 })
//                 .then(function(res){
//                     expect(res).to.have.status(201);
//                     expect(res).to.be.json;
//                     expect(res.body).to.be.an('object').that.includes({ url: 'http://somefile.com',
//                     issue: 1 });
//                 });
//         });

//         it('should return Bad Request', function(){
//             return chai.request(testFile)
//                 .post('/files')
//                 .type('form')
//                 .send({
//                     url: 'http://somefile.com',
//                     issue: 1
//                 })
//                 .then(function(res){
//                     throw new Error('Invalid content type!');
//                 })
//                 .catch(function(err){
//                     expect(err).to.have.status(400);
//                 });
//         });
//     });
//     describe('A function that downloads file', function() {
        
//         it('should download a file', function() {
//            return chai.request(testFile)
//             .get('/files/{id}')
//             .attach('file','file/data.csv')
//             .then(function(res){
//                 expect(res).to.have.status(200);
//             });
//         });

//         it('should return Not found', function(){
//             return chai.request(testFile)
//                 .get('/INVALID_PATH')
//                 .then(function(res){
//                     throw new Error('Not found!');
//                 })
//                 .catch(function(err){
//                     expect(err).to.have.status(404);
//                 });
//         });

//     });
// });