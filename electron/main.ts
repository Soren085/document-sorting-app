import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import * as url from 'url';
import * as fs from 'fs';

let win: BrowserWindow;

function createWindow(): void {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    }
  });
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, `/../../dist/index.html`),
      protocol: 'file:',
      slashes: true,
    })
  );

  win.webContents.openDevTools();

  // reset window after close
  win.on('closed', () => {
    win = null;
  });
}

app.on('ready', createWindow);

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

// Quit when all windows are closed.

app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar

  // to stay active until the user quits explicitly with Cmd + Q

  if (process.platform !== 'darwin') {
    app.quit();
  }
});

/* Channels */

ipcMain.on('navigateDirectory', (event, returnedPath) => {
  process.chdir(returnedPath);
  getImages();
  getDirectory();
});

/* Functions */

function getImages(): void {
  const cwd = process.cwd();

  fs.readdir('.', { withFileTypes: true }, (err, files) => {
    if (!err) {
      const re = /(?:\.([^.]+))?$/;

      const images = files
        .filter(
          (file) =>
            file.isFile() && ['jpg', 'png'].includes(re.exec(file.name)[1])
        )
        .map((file) => `file://${cwd}/${file.name}`);

      win.webContents.send('getImagesResponse', images);
    }
  });
}

function isRoot(): any {
  return path.parse(process.cwd()).root === process.cwd();
}

function getDirectory(): void {
  fs.readdir('.', { withFileTypes: true }, (err, files) => {
    if (!err) {
      const directories = files
        .filter((file) => file.isDirectory())
        .map((file) => file.name);

      if (!isRoot()) {
        directories.unshift('..');
      }

      win.webContents.send('getDirectoryResponse', directories);
    }
  });
}
