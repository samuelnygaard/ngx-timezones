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

  get code(): string {
    return `<ngx-timezones [(timezone)]="timezone"></ngx-timezones>`;
  }

  get code1(): string {
    return '<button (click)="ngxTimezone.guessedTimezone()">Guess timezone</button>';
  }

  get code2(): string {
    return `<ngx-timezones
    [guess]="true"
    [showOffset]="${this.showOffset}"
    offsetName="${this.offsetName}"
    [(timezone)]="guessedTimezone">
 </ngx-timezones>`;
  }
}
