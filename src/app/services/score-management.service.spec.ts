import { TestBed } from '@angular/core/testing';

import { ScoreManagementService } from './score-management.service';

describe('ScoreManagementService', () => {
  let service: ScoreManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScoreManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
