import { AppUpdater } from "electron-updater";
import LoggerHelper from "../../helpers/logger.helper";
import { UPDATE_EVENT } from "../../enums";
import { dialog } from "electron";

// Class for subscribing to updaters
export default class EventUpdateService {

    updater: AppUpdater;
    private readonly logFileName: string = "update_updaters";
    private loggerHelper = new LoggerHelper(this.logFileName)

    constructor(autoUpdater: AppUpdater){
        this.updater = autoUpdater;
    }

    public initializeUpdateEvents () {
        this.checkingForUpdate();
    }
    private checkingForUpdate () {
       this.updater.on(UPDATE_EVENT.check, () => {
            this.loggerHelper.writeToFile(UPDATE_EVENT.check)
            // Todo Dialog
            dialog.showMessageBox({
                title: `Update in progress. Hold on tight !!!`,
                message: `message`,
                buttons: ["OK"],
                type: "info",
                noLink: true
              });
          })
    }
}