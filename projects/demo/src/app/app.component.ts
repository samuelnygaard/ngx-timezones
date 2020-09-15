import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  offsetName = 'UTC';
  altName = 'GMT';
  tmp;
  showOffset = true;
  timezone: string;
  guessedTimezone: string;
  offsetTimezone: string;
  disabled = false;

  get importCode(): string {
    return `import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Import the module
import { NgxTimezonesModule } from 'ngx-timezones';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    // Include the module in the import section
    NgxTimezonesModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}`;
  }

  get code(): string {
    return `<ngx-timezones [(timezone)]="timezone" [disabled]="disabled"></ngx-timezones>`;
  }

  get code1(): string {
    return `<ngx-timezones
    [guess]="true"
    [(timezone)]="guessedTimezone">
 </ngx-timezones>`;
  }

  get code2(): string {
    return `<ngx-timezones
    [guess]="true"
    [showOffset]="showOffset"
    [offsetName]="offsetName"
    [(timezone)]="offsetTimezone">
 </ngx-timezones>`;
  }
}
