const { app, BrowserWindow, dialog } = require('electron');
const { autoUpdater } = require('electron-updater');
const fs = require('fs/promises');
const path = require('path');
const os = require('os');
const log = require('electron-log');
log.transports.file.resolvePath = () => path.join(os.homedir(), 'NEW_GRC/logs/electron.log');
log.log(`Application version = ${app.getVersion()}`)
log.info('App starting...')
const  UpdaterService = require('./src/services/updater.service')
const NotificationService = require('./src/services/notification.service')

const updaterService = new UpdaterService();
const notificationService = new NotificationService();

// initialize class
updaterService;

let isInternetAvailable = true;

const enableDevMode = false;

let browserWindow;
const createWindow = () => {
  browserWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  enableDevMode && browserWindow.webContents.openDevTools({ mode: "detach" });

  browserWindow.loadFile("./index.html");
  // browserWindow.loadURL("https://www.nairaland.com/");

  if(!isInternetAvailable){
    return dialog.showMessageBox({
      title: `🛜`,
      message: `No Internet`,
      buttons: ["OK"],
      type: "info",
      noLink: true
    });
  }
  
};

app.whenReady().then(() => {
  createWindow();
  
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();

      // check for updates
      updaterService.checkForUpdateAndNotify()
    }
  });
});


// Subscribing to events


/**
 *   check for update
 *   if update-not-available; do not show anything
 *   if update-available; show something
 *    download-progress && show progress count on modal
 *     on download complete
 *        -> update-downloaded
 *    Give instruction to restart app
 *  
 */


autoUpdater.on('error', async (error) => {
  log.info(`Error in auto-updater. ${error}`)
  if(error.name === 'Error'){
    const param = { title: error.name, detail: error.message  }
   const handleError = await notificationService.presentAndHandleMessage("error", param);

  //  send response to logger but display 'Error updating to users'
   dialog.showMessageBox({
    title: `3`,
    message: JSON.stringify(handleError),
    buttons: ["OK"],
    type: "info",
    noLink: true
  });
  }
})



autoUpdater.on("checking-for-update", (info) => {
  log.info('checking-for-update')
  dialog.showMessageBox({
    title: `1`,
    message: `checking-for-update. Current version ${app.getVersion()}`,
    buttons: ["OK"],
    type: "info",
    noLink: true
  });
})


autoUpdater.on("update-available", (info) => {
  log.info('update-available')
  dialog.showMessageBox({
    title: `2`,
    message: `update-available`,
    buttons: ["OK"],
    type: "info",
    noLink: true
  });
})


autoUpdater.on("update-not-available", (info) => {
  log.info('update-not-available')
  dialog.showMessageBox({
    title: `3`,
    message: `update-not-available`,
    buttons: ["OK"],
    type: "info",
    noLink: true
  });
})

autoUpdater.on("download-progress", (trackProgress) => {
  log.info('\n\ndownload-progress')
  log.info(trackProgress);
  let log_message = "Download speed: " + progressObj.bytesPerSecond;
  log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
  log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
  dialog.showMessageBox({
    title: `5`,
    message: `download-progress ${JSON.stringify(log_message)}`,
    buttons: ["OK"],
    type: "info",
    noLink: true
  });
})



autoUpdater.on("update-downloaded", (info) => {
  log.info('update-downloaded');

  // on update downloaded && Use response = 1 or 0
  autoUpdater.quitAndInstall();  

  dialog.showMessageBox({
    title: `6`,
    message: `$Update complete  ✅ ${JSON.stringify(info)}`,
    buttons: ["OK"],
    type: "info",
    noLink: true
  });
})



app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
