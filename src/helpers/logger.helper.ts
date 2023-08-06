import log from "electron-log";
import * as path from "path";
import os from "os";

export default class LoggerHelper {
  private homeDirectory = os.homedir();
  private logFileName: string;

  constructor(logFileName: string) {
    this.logFileName = logFileName;
    this.createLogFile();
  }

  private createLogFile() {
    try {
      log.transports.file.resolvePath = () =>
        path.join(this.homeDirectory, `GRC_APP/logs/${this.logFileName}.log`);
    } catch (error: any) {
      alert(`Write to file failed ${JSON.stringify(error.message)}`);
    }
  }

  public writeToFile( title: string, type?: string) {
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
