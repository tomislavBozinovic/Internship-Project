require('dotenv/config')
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const swaggerUI = require('swagger-ui-express');
const swaggerSpec  = require('./swagger/config');
const morgan = require('morgan');
const logger = require('./logger/winston');
const router = require('./router');
const sendEmail = require('./node-mailer/index');
const config = require('./config');
const { app: { serverPort }, db: { connectionString } } = config;
const Employee = require('./models/employee');
const seedDb = require('./seeding/seedDatabase');
const cronConfig = require('./cronjobs/config');
const scheduler = require('./cronjobs/scheduler');

const app = express();
app.use(morgan('combined', { stream: logger.stream }));
app.use(cors());
app.use(express.json({ limit: '50mb'}));
app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.use(router);

mongoose.connect(connectionString)
.then(() => logger.info('DB connection successful!'))
.catch(err => {
  logger.fatal(err.message);
  sendEmail(`Could not connect to database: ${err.message}`);
});

(async () => {
  const employees = await Employee.find();
  if(!employees.length) seedDb();
})();

app.listen(serverPort, (error) => {
  if(error) {
    sendEmail(error.message);
    logger.fatal(error.message);
  }
  logger.info(`The server is running on port ${serverPort}`);
  scheduler.initCrons(cronConfig);
});
