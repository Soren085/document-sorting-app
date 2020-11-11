import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ScreensRoutingModule } from './screens-routing.module';
import { CommonModule } from '@angular/common';
import { ExplorerComponent } from './explorer/explorer.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    ExplorerComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ScreensRoutingModule
  ],
  providers: [],
})
export class ScreensModule { }
