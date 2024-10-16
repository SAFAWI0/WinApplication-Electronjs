const { app, BrowserWindow, Menu, Tray } = require("electron");
const path = require("node:path");
const win = require("electron-window-state");
const { MainMenu } = require("./mainmenu");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

let tray,trayMenu,mainWindow

trayMenu = Menu.buildFromTemplate([
  { label: 'Item 1' },
  { role: 'quit' } // تم تصحيح role هنا ليصبح بدون مسافة قبل 'quit'
]);

function createTray() {
  tray = new Tray(path.join(__dirname, '/favicon.ico')); // استخدام path.join للتأكد من المسار
  tray.setToolTip('IDB');
  tray.setContextMenu(trayMenu); // تعيين القائمة للصينية (Tray)
}


let contextMenu = Menu.buildFromTemplate([
  { label: 'Item 1' },
  { role: 'editMenu' } // استخدام EditMenu
]);



function createWindow() {
  createTray();


  // Create the browser window.
  new MainMenu();
  let winStuts = win({
    defaultWidth: 800,
    defaultHeight: 600,
  });


  mainWindow = new BrowserWindow({
    minWidth: 400,
    minHeight: 200,
    width: winStuts.width,
    height: winStuts.height,
    x: winStuts.x,
    y: winStuts.y,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
    icon: path.join(__dirname, '/favicon.ico'),

  });

  // Context menu on right-click
  mainWindow.webContents.on('context-menu', (e) => {
    contextMenu.popup();
  });

  // Load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, "index.html"));

  // Manage the window state
  winStuts.manage(mainWindow);

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// This method will be called when Electron has finished initialization
app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
