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

require('dotenv').config({ path: 'variables.env' });

mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise; 
mongoose.connection.on('error', (err) => {
    console.error(`error not connected to the db`);
  });
  mongoose.connection.on('open', () => {
      console.log('Connected to the db');
  });

// const connection = mongoose.connect(process.env.DATABASE);

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

    console.log('Server running at:', server.info.uri);
};

start();
