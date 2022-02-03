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
    show: false,
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
  console.log(mainWindow.isVisible());
  tray.on("click", (event, bounds) => {
    // positionnement du click
    const { x, y } = bounds;
    // on récupère les dimensions de la fenêtre
    const { width, height } = mainWindow.getBounds();
    if (mainWindow.isVisible()) {
      mainWindow.hide();
    } else {
      const yPosition = process.platform === 'darwin' ? y : y - height;
      mainWindow.setBounds({
        x: x - width/2,
        y: yPosition,
        width,
        height
      });
      mainWindow.show();

    }
  });
}

app.on("ready", () => {
  createWindow();
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
