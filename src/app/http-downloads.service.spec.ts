import { TestBed, inject } from '@angular/core/testing';

import { HttpDownloadsService } from './http-downloads.service';

describe('HttpDownloadsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpDownloadsService]
    });
  });

  it('should be created', inject([HttpDownloadsService], (service: HttpDownloadsService) => {
    expect(service).toBeTruthy();
  }));
});
