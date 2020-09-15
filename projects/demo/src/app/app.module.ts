import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxTimezonesModule } from './../../../ngx-timezones/src/lib/ngx-timezones.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgxTimezonesModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
