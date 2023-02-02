import { TestBed } from '@angular/core/testing';

import { AddreService } from './addre.service';

describe('AddreService', () => {
  let service: AddreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
