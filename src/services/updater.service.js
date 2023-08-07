const { autoUpdater } = require('electron-updater');


class UpdaterService {

    //silent download
    autoDownloadUpdate = autoUpdater.autoDownload = true; 
    installUpdateOnAppQuit = autoUpdater.autoInstallOnAppQuit = true;
    
    updateCheckAndNotifier = autoUpdater.checkForUpdatesAndNotify()

    constructor(){
        this.autoDownloadUpdate;
        this.installUpdateOnAppQuit
    }
//------------- Auto updates ---------------
/* This will immediately download an update, 
 then install when the app quits.       */ 
//------------------------------------------
    checkForUpdateAndNotify = () => {
       return this.updateCheckAndNotifier
    }

}

module.exports = UpdaterService;

