import { Component, OnInit } from '@angular/core';
import { IpcRenderer } from 'electron';
import { ImagesService } from './core/services/images/images.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'document-sorting-app';

  private ipc: IpcRenderer;

  constructor(private imagesService: ImagesService) {
    if ((window as any).require) {
      try {
        this.ipc = (window as any).require('electron').ipcRenderer;
      } catch (e) {
        throw e;
      }
    } else {
      console.warn('App not running inside Electron!');
    }
  }

  public createFolder(): void {
    this.ipc.send('createFolder');
  }

}
