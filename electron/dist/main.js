"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var path = require("path");
var url = require("url");
var fs = require("fs");
var win;
function createWindow() {
    win = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
        }
    });
    win.loadURL(url.format({
        pathname: path.join(__dirname, "/../../dist/index.html"),
        protocol: 'file:',
        slashes: true
    }));
    win.webContents.openDevTools();
    // reset window after close
    win.on('closed', function () {
        win = null;
    });
}
electron_1.app.on('ready', createWindow);
electron_1.app.on('activate', function () {
    if (win === null) {
        createWindow();
    }
});
// Quit when all windows are closed.
electron_1.app.on('window-all-closed', function () {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
/* Channels */
electron_1.ipcMain.on('navigateDirectory', function (event, returnedPath) {
    process.chdir(returnedPath);
    getImages();
    getDirectory();
});
/* Functions */
function getImages() {
    var cwd = process.cwd();
    fs.readdir('.', { withFileTypes: true }, function (err, files) {
        if (!err) {
            var re_1 = /(?:\.([^.]+))?$/;
            var images = files
                .filter(function (file) {
                return file.isFile() && ['jpg', 'png'].includes(re_1.exec(file.name)[1]);
            })
                .map(function (file) { return "file://" + cwd + "/" + file.name; });
            win.webContents.send('getImagesResponse', images);
        }
    });
}
function isRoot() {
    return path.parse(process.cwd()).root === process.cwd();
}
function getDirectory() {
    fs.readdir('.', { withFileTypes: true }, function (err, files) {
        if (!err) {
            var directories = files
                .filter(function (file) { return file.isDirectory(); })
                .map(function (file) { return file.name; });
            if (!isRoot()) {
                directories.unshift('..');
            }
            win.webContents.send('getDirectoryResponse', directories);
        }
    });
}
