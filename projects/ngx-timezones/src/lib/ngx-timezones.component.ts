import { countryZones } from './ngx-timezones.data';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import * as moment from 'moment-timezone';
import { startWith, map } from 'rxjs/operators';

interface TimezoneGroup {
  country: string;
  iso: string;
  showGroup?: boolean;
  zones: { zone: string; name: string; offset: string }[];
}

@Component({
  selector: 'ngx-timezones',
  template: ` <mat-form-field style="width: 100%"
    ><mat-select [formControl]="timezoneCtrl" [placeholder]="placeholder">
      <mat-option>
        <ngx-mat-select-search
          [formControl]="searchControl"
          [placeholderLabel]="searchPlaceholder"
          [noEntriesFoundLabel]="noResultsLabel"
        ></ngx-mat-select-search>
      </mat-option>
      <ng-template let-option ngFor [ngForOf]="timezoneGroupsOptions | async">
        <mat-optgroup
          *ngIf="option.showGroup || option.zones.length > 1; else singleOption"
          [label]="option.country + ' (' + option.zones.length + ')'"
        >
          <mat-option *ngFor="let zone of option.zones" [value]="zone.zone">
            {{ zone.name }}
            <span>{{ showOffset ? formatOffset(zone.offset) : '' }}</span>
          </mat-option>
        </mat-optgroup>
        <ng-template #singleOption>
          <mat-option [value]="option.zones[0].zone">
            {{ option.zones[0].name }}
            <span>{{
              showOffset ? formatOffset(option.zones[0].offset) : ''
            }}</span>
          </mat-option>
        </ng-template>
      </ng-template>
    </mat-select>
  </mat-form-field>`,
})
export class NgxTimezonesComponent implements OnInit {
  timezoneCtrl = new FormControl();
  timezoneGroups!: TimezoneGroup[];
  timezoneGroupsOptions!: Observable<TimezoneGroup[]>;
  searchControl = new FormControl();

  @Output() timezoneChange = new EventEmitter<string>();

  @Input() set timezone(timezone: string) {
    this.timezoneCtrl.setValue(timezone);
  }

  @Input() set disabled(value: boolean) {
    if (value) {
      this.timezoneCtrl.disable();
    } else {
      this.timezoneCtrl.enable();
    }
  }

  @Input() guess = false;

  @Input() showOffset = false;
  @Input() placeholder = 'Select timezone';
  @Input() searchPlaceholder = 'Search';
  @Input() noResultsLabel = 'No results';
  @Input() offsetName = 'UTC';

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.initData();
    this.timezoneGroupsOptions = this.searchControl.valueChanges.pipe(
      startWith(''),
      map((query) => (query ? this.filter(query) : this.timezoneGroups.slice()))
    );
    this.timezoneCtrl.valueChanges.subscribe((value) => {
      this.emitTimezone(value);
    });

    if (!this.timezoneCtrl.value && this.guess) {
      this.guessedTimezone();
      this.cdRef.detectChanges();
    }
  }

  guessedTimezone(): void {
    const zone = moment.tz.guess();
    this.timezone = zone;
    this.emitTimezone(zone);
  }

  emitTimezone(zone): void {
    this.timezoneChange.emit(zone);
  }

  initData(): void {
    this.timezoneGroups = Object.keys(countryZones).map((iso: string) => {
      const val = countryZones[iso];
      const hasMultiple = val.zones.length > 1;
      const zones = val.zones.map((x) => {
        return hasMultiple
          ? {
              zone: x,
              name: `${this.formatTimezoneString(x)}`,
              offset: this.offsetOfTimezone(x),
            }
          : {
              zone: x,
              name: val.name,
              offset: this.offsetOfTimezone(x),
            };
      });
      return { iso, country: val.name, zones };
    });
  }

  filter(query: string): TimezoneGroup[] {
    const result: TimezoneGroup[] = [];

    for (const z of this.timezoneGroups) {
      if (z.country && z.country.toLowerCase().includes(query.toLowerCase())) {
        result.push(z);
      } else {
        const results = z.zones.filter((x) =>
          x.name.toLowerCase().includes(query.toLowerCase())
        );
        if (results.length > 0) {
          z.zones = results;
          z.showGroup = z.zones.length > 1;
          result.push(z);
        }
      }
    }

    return result;
  }

  formatTimezoneString(zone: string): string {
    const arr = zone.split('/');
    return arr[arr.length - 1].split('_').join(' ');
  }

  offsetOfTimezone(zone: string): string {
    let offset = moment.tz(zone).utcOffset();
    const neg = offset < 0;
    if (neg) {
      offset = -1 * offset;
    }
    const hours = Math.floor(offset / 60);
    const minutes = (offset / 60 - hours) * 60;
    return `${neg ? '-' : '+'}${this.rjust(hours.toString(), 2)}:${this.rjust(
      minutes.toString(),
      2
    )}`;
  }

  formatOffset(offset: string): string {
    return `(${this.offsetName}${offset})`;
  }

  private rjust(value: string, width: number, padding = '0'): string {
    padding = padding || ' ';
    padding = padding.substr(0, 1);
    if (value.length < width) {
      return padding.repeat(width - value.length) + value;
    } else {
      return value;
    }
  }
}
