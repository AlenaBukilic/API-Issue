'use strict';

const Hapi = require('hapi');
const fs = require('fs');
const bodyParser = require('body-parser'); 
const mongoose = require('mongoose');
const mime = require('mime-types');

const Issue = require('./models/issueModel');
const path = require('path');
const File = require(path.resolve('./models/fileModel'));

const issueRoutes = require('./routes/issueRoutes.js');
const fileRoutes = require('./routes/fileRoutes.js');

// import environmental variables from our variables.env file
require('dotenv').config({ path: 'variables.env' });

// Connect to our Database and handle any bad connections
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
  console.error(`error not connected to the db`);
});
mongoose.connection.on('open', () => {
    console.error('Connected to the db');
});

// Create a server with a host and port
const server = Hapi.server({
    host: 'localhost',
    port: 8000
});

// Add the route
server.route({
    method: 'GET',
    path: '/hello',
    handler: function(request,h) {
        return'hello world';
    }
});

server.route(issueRoutes);
server.route(fileRoutes);

// Start the server
async function start() {

    try {
        await server.start();
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }

    console.log('Server running at:', server.info.uri);
};

start();