import { TestBed } from '@angular/core/testing';

import { StepperCountService } from './stepper-count.service';

describe('StepperCountService', () => {
  let service: StepperCountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StepperCountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
