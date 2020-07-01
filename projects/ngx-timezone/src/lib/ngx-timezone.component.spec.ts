import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxTimezoneComponent } from './ngx-timezone.component';

describe('NgxTimezoneComponent', () => {
  let component: NgxTimezoneComponent;
  let fixture: ComponentFixture<NgxTimezoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NgxTimezoneComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxTimezoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
