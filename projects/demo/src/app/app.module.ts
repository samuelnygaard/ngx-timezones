import { NgxTimezoneModule } from './../../../ngx-timezone/src/lib/ngx-timezone.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgxTimezoneModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
