import { app, BrowserWindow } from "electron";
import path from "path";

const enableDevTool = true;

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

  enableDevTool && browserWindow.webContents.openDevTools({ mode: "detach" });

  browserWindow.loadFile("index.html");
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
