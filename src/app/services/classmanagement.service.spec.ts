import { TestBed } from '@angular/core/testing';

import { ClassmanagementService } from './classmanagement.service';

describe('ClassmanagementService', () => {
  let service: ClassmanagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClassmanagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
