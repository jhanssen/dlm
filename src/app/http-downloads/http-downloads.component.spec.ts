import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpDownloadsComponent } from './http-downloads.component';

describe('HttpDownloadsComponent', () => {
  let component: HttpDownloadsComponent;
  let fixture: ComponentFixture<HttpDownloadsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HttpDownloadsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HttpDownloadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
