const moment = require('moment-timezone');

const getCurrentISTTime = () => {
  return moment().tz('Asia/Kolkata').format();
};

module.exports = { getCurrentISTTime };
