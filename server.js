const Hapi=require('hapi');
const bodyParser = require('body-parser');
//const db = require('./config/db');
const issueRoutes = require('./routes/issueRouts.js')

const mongoose = require('mongoose');
mongoose.connect('mongodb://ch1:ch1@ds111319.mlab.com:11319/ch1');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('Connected to the db');
});

'use strict';

// Create a server with a host and port
const server=Hapi.server({
    host:'localhost',
    port:8000
});

// Add the route
server.route({
    method:'GET',
    path:'/hello',
    handler:function(request,h) {

        return'hello world';
    }
});

server.route(issueRoutes);

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