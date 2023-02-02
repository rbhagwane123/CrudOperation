import { TestBed } from '@angular/core/testing';

import { EmailpassService } from './emailpass.service';

describe('EmailpassService', () => {
  let service: EmailpassService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmailpassService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
