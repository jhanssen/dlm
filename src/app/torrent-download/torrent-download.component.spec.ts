import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TorrentDownloadComponent } from './torrent-download.component';

describe('TorrentDownloadComponent', () => {
  let component: TorrentDownloadComponent;
  let fixture: ComponentFixture<TorrentDownloadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TorrentDownloadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TorrentDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
