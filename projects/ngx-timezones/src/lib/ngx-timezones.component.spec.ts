import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxTimezonesComponent } from './ngx-timezones.component';

describe('NgxTimezoneComponent', () => {
  let component: NgxTimezonesComponent;
  let fixture: ComponentFixture<NgxTimezonesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NgxTimezonesComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxTimezonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
