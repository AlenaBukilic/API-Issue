const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise; 

const connection = mongoose.connect(process.env.DATABASE);

beforeEach(() => connection.db.dropDatabase());