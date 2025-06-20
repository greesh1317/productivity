// electron/main.js
const { app, BrowserWindow } = require('electron');
const { blockSites } = require('./blocker');

function createWindow() {
  const win = new BrowserWindow({ width: 800, height: 600 });
  win.loadURL('http://localhost:3000'); // Or your deployed frontend
}

app.whenReady().then(createWindow);

// IPC communication for blocking
const { ipcMain } = require('electron');
ipcMain.on('block-sites', (event, sites) => {
  blockSites(sites);
});