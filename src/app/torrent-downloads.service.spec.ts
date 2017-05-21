import { TestBed, inject } from '@angular/core/testing';

import { TorrentDownloadsService } from './torrent-downloads.service';

describe('TorrentDownloadsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TorrentDownloadsService]
    });
  });

  it('should be created', inject([TorrentDownloadsService], (service: TorrentDownloadsService) => {
    expect(service).toBeTruthy();
  }));
});
