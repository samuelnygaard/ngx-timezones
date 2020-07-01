import { TestBed } from '@angular/core/testing';

import { NgxTimezoneService } from './ngx-timezone.service';

describe('NgxTimezoneService', () => {
  let service: NgxTimezoneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxTimezoneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
