import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
const electron = (window as any).require('electron');

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  images = new BehaviorSubject<string[]>([]);

  directory = new BehaviorSubject<string[]>([]);

  constructor() {
    electron.ipcRenderer.on('getImagesResponse', (event, images) => {
      this.images.next(images);
    });
    electron.ipcRenderer.on('getDirectoryResponse', (event, directory) => {
      this.directory.next(directory);
    });
  }
  public navigateDirectory(path): void {
    electron.ipcRenderer.send('navigateDirectory', path);
  }

}
