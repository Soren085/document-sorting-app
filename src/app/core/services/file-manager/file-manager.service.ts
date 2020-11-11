import { Injectable } from '@angular/core';
import { IpcRenderer, Remote } from 'electron';

@Injectable({
  providedIn: 'root'
})
export class FileManagerService {
  private ipc: IpcRenderer;
  private remote: Remote;
  private dialog: any;

  constructor() {
    if ((window as any).require) {
      try {
        this.ipc = (window as any).require('electron').ipcRenderer;
        this.remote = (window as any).require('electron').remote;
        this.dialog = this.remote.require('electron').dialog;
      } catch (e) {
        throw e;
      }
    } else {
      console.warn('App not running inside Electron!');
    }

  }

  public selectFolder(): void {
    this.dialog.showOpenDialog({
      properties: ['openDirectory']
    }).then(res => {
      console.log(res);
    });
  }
}
