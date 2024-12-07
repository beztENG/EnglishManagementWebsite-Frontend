import { TestBed } from '@angular/core/testing';

import { ClassRegisterService } from './class-register.service';

describe('ClassRegisterService', () => {
  let service: ClassRegisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClassRegisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
