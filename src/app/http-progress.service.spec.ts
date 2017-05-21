import { TestBed, inject } from '@angular/core/testing';

import { HttpProgressService } from './http-progress.service';

describe('HttpProgressService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpProgressService]
    });
  });

  it('should be created', inject([HttpProgressService], (service: HttpProgressService) => {
    expect(service).toBeTruthy();
  }));
});
