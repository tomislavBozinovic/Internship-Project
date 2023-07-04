module.exports = {
  dailyReport: {
    frequency: '0 3 * * *',
    handler: './server/cronjobs/dailyReport'
  },
  deleteOldReports: {
    frequency: '0 4 * * *',
    handler: './server/cronjobs/deleteOldReports'
  }
}