const electron = require("electron");
const { app, Tray, BrowserWindow } = electron;

const path = require("path");
const isDev = require("electron-is-dev");

let mainWindow;
let tray = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 300,
    height: 600,
    frame: false,
    resizable: false,
  });
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  mainWindow.on("closed", () => (mainWindow = null));

  const iconName =
    process.platform === "win32" ? "windows-icon.png" : "task.png";
  const iconPath = path.join(__dirname, `./assets/${iconName}`);
  tray = new Tray(iconPath);
}

app.on("ready", () => {
  createWindow();
  //tray = new Tray(path.join(__dirname, `./assets/iconTemplate.png`));
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
