const Hapi = require('hapi');
const fs = require('fs');
const bodyParser = require('body-parser'); 
const mongoose = require('mongoose');
const mime = require('mime-types');
const Joi = require('joi');

const issueRoutes = require('../routes/issue.js');
const fileRoutes = require('../routes/file.js');

require('dotenv').config({ path: 'variablesDevelopment/variablesTest.env' });

mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise;

const db = process.env.DATABASE;

const server = Hapi.server({
    host: 'localhost',
    port: 8000
});

server.route(issueRoutes);
server.route(fileRoutes);

async function start() {

    try {
        await server.start();
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }

};

start();

afterEach((done) => {
    mongoose.connect(db,() => {
        mongoose.connection.db.dropDatabase(() => {
            done();
        })    
    })
});

