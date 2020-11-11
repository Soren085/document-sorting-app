import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ImagesService } from 'src/app/core/services/images/images.service';

@Component({
  selector: 'app-browser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.scss'],
})
export class BrowserComponent implements OnInit {
  images: string[];
  directory: string[];

  constructor(
    private imagesService: ImagesService,
    private cdr: ChangeDetectorRef
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
  }

  navigateDirectory(path): void {
    this.imagesService.navigateDirectory(path);
  }
}
