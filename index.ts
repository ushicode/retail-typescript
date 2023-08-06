import { app, BrowserWindow } from "electron";
import {UpdateService} from "./src/services/update-service";
import * as path from "path";


const updateService = new UpdateService();

const enableDevMode = true;

let browserWindow: BrowserWindow | null;
const createWindow = (): void => {
  browserWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  enableDevMode && browserWindow.webContents.openDevTools({ mode: "detach" });

  browserWindow.loadFile("index.html");
};

app.whenReady().then(() => {
  createWindow();

  updateService.checkForUpdates()

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

 updateService.setUpdateEvents()

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
