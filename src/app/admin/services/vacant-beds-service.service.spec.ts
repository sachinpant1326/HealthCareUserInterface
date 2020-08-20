import { TestBed } from '@angular/core/testing';

import { VacantBedsServiceService } from './vacant-beds-service.service';

describe('VacantBedsServiceService', () => {
  let service: VacantBedsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VacantBedsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
