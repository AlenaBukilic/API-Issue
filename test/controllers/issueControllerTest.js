const chai = require('chai');
const expect = require('chai').expect;
const mongoose = require('mongoose');

chai.use(require('chai-http'));

const Issue = require('../../models/issueModel');
const path = require('path');
const File = require(path.resolve('./models/fileModel'));

const testIssue = require('../../controllers/issueController');

describe('Controller issues', function(){
    this.timeout(5000);

    describe('Create issueController function', function(){
    
        
    });
});