const mongoose = require('mongoose');
const dbSeed = require('../seeding/seedDatabase');
const config = require('../config');
const { db: { connectionString }} = config;

const populateDb = async function() {
    mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    await dbSeed();
    process.exit(1);
}

populateDb();