const Hapi = require('hapi');
const fs = require('fs');
const bodyParser = require('body-parser'); 
const mongoose = require('mongoose');
const mime = require('mime-types');

const Issue = require('../models/issueModel');
const path = require('path');
const File = require(path.resolve('./models/fileModel'));

const issueRoutes = require('../routes/issueRoutes.js');
const fileRoutes = require('../routes/fileRoutes.js');

require('dotenv').config({ path: 'config/variablesTest.env' });

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

exports.createTestIssue = () => {
    return new Promise((resolve, reject) => {
        Issue.create({
            title: "Route issue",
            description: "Create route issue test",
            name: "Blah"
        }, (err, data) => {
            if(err){
                return reject(err);
            }
            return resolve(data);
        });
    });
};


afterEach((done) => {
    mongoose.connect(db,() => {
        mongoose.connection.db.dropDatabase(() => {
            done();
        })    
    })
});
