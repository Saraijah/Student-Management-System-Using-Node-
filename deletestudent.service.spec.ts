import { TestBed } from '@angular/core/testing';

import { DeletestudentService } from './deletestudent.service';

describe('DeletestudentService', () => {
  let service: DeletestudentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeletestudentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
