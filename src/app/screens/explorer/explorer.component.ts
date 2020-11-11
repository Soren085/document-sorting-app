import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ImagesService } from 'src/app/core/services/images/images.service';
import { FileManagerService } from 'src/app/core/services/file-manager/file-manager.service';

@Component({
  selector: 'app-browser',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.scss'],
})
export class ExplorerComponent implements OnInit {
  images: string[];
  directory: string[];

  constructor(
    private imagesService: ImagesService,
    private cdr: ChangeDetectorRef,
    private fileManager: FileManagerService,
  ) {}

  ngOnInit(): void {
    this.imagesService.images.subscribe((value) => {
      this.images = value;

      this.cdr.detectChanges();
    });
    this.imagesService.directory.subscribe((value) => {
      this.directory = value;

      this.cdr.detectChanges();
    });
    this.imagesService.navigateDirectory('.');
  }

  public navigateDirectory(path): void {
    this.imagesService.navigateDirectory(path);
  }

  public selectFolder(): void {
    this.fileManager.selectFolder();
  }
}
