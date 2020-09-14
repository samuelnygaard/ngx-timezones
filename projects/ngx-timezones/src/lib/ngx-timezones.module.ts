import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { NgxTimezonesComponent } from './ngx-timezones.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [NgxTimezonesComponent],
  imports: [
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSelectModule,
    FormsModule,
    MatFormFieldModule,
    NgxMatSelectSearchModule,
  ],
  exports: [NgxTimezonesComponent],
})
export class NgxTimezonesModule {}
