const cron = require('node-cron');
const { resolve } = require('path');

module.exports = {
  initCrons: (config) => {
    Object.keys(config).forEach(key => {
      const frequency = config[key].frequency;
      if (cron.validate(frequency)) {
        cron.schedule(frequency, () => {
          const handler = require(resolve(config[key].handler));
          handler();
        })
      }
    });
  }
}