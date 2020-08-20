import { TestBed } from '@angular/core/testing';

import { UpdateResultService } from './update-result.service';

describe('UpdateResultService', () => {
  let service: UpdateResultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateResultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
