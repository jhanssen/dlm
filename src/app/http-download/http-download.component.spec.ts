import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpDownloadComponent } from './http-download.component';

describe('HttpDownloadComponent', () => {
  let component: HttpDownloadComponent;
  let fixture: ComponentFixture<HttpDownloadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HttpDownloadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HttpDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
