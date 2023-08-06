import { autoUpdater } from "electron-updater";
import EventUpdateService from "./events.update-service";

export  class UpdateService {

    private readonly updateNotifier = autoUpdater.checkForUpdatesAndNotify()
    private eventUpdateService = new EventUpdateService(autoUpdater)

    constructor(){
        autoUpdater.autoDownload = true;
        autoUpdater.autoInstallOnAppQuit = true;
    }

    public checkForUpdates () {
        return this.updateNotifier;
    }

    public setUpdateEvents () {
        this.eventUpdateService.initializeUpdateEvents()
    }
}