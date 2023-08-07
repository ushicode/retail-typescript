const path = require('path');
const os = require('os');
const log = require('electron-log');

class LoggerHelper {
  homeDirectory = os.homedir();
  logFileName;

  constructor(logFileName) {
    this.logFileName = logFileName;
    this.createLogFile();
  }

  createLogFile() {
    try {
      log.transports.file.resolvePath = () =>
        path.join(this.homeDirectory, `GRC_APP/logs/${this.logFileName}.log`);
    } catch (error) {
      alert(`Write to file failed ${JSON.stringify(error.message)}`);
    }
  }

 writeToFile( title, type = 'info') {
    switch (type) {
      case "error":
        log.error(title);
        break;
      case "log":
        log.error(title);
        break;
      default:
        log.info(title);
        break;
    }
  }
}

module.exports = LoggerHelper;