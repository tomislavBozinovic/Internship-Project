const fs = require('fs');
const dayjs = require('dayjs');
const Report = require('../models/report');
const logger = require('../logger/winston');
const { 
  REPORTS_DELETED_SUCCESS, 
  NO_REPORTS_TO_DELETE } = require('../constants/info');

const fiveDaysAgo = dayjs(new Date()).subtract(5, 'd');

const deleteOldReports = async () => {
  try {
    const query = { createdAt: { $lt: fiveDaysAgo.startOf('day') }};
    const oldReportsPath = await Report.find(query).distinct('path');
    if(!oldReportsPath.length) {
      logger.info(NO_REPORTS_TO_DELETE);
    } else {
      oldReportsPath.forEach(path => fs.existsSync(path) && fs.unlinkSync(path));
      await Report.deleteMany({ createdAt: { $lt: fiveDaysAgo.startOf('day') }});
      logger.info(REPORTS_DELETED_SUCCESS);
    }
  } catch (error) {
    logger.error(error);
  }
}

module.exports = deleteOldReports;