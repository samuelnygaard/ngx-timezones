# ngx-timezones

An Angular module for timezones (based on moment.js)

## Demonstration

Go to this website to try out the library:
[https://samuelnygaard.github.io/ng2-timezone-selector/](https://samuelnygaard.github.io/ng2-timezone-selector/)

## Installation

Install the library in your Angular projects root folder:

```bash
npm i ngx-timezones
```

## Importing

Import the `NgxTimezonesModule` in the your `app.module.ts`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
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
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

## Documentation

TODO
