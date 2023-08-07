const { autoUpdater } = require('electron-updater');


class UpdaterService {

    autoDownloadUpdate = autoUpdater.autoDownload = true;
    installUpdateOnAppQuit = autoUpdater.autoInstallOnAppQuit = true;
    updateCheckAndNotifier = autoUpdater.checkForUpdatesAndNotify()

    constructor(){
        this.autoDownloadUpdate;
        this.installUpdateOnAppQuit
    }

    checkForUpdateAndNotify = () => {
       return this.updateCheckAndNotifier
    }

}

module.exports = UpdaterService;

