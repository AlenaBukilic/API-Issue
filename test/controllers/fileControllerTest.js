const chai = require('chai');
const expect = require('chai').expect;
const mongoose = require('mongoose');
const fs = require('fs');
const stream = require('stream');

chai.use(require('chai-http'));

const testController = require('../../controllers/fileController');

describe('Controller files', function(){
    this.timeout(5000);

    // routes req
});
