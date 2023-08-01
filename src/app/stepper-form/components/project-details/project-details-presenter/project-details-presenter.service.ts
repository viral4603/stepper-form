import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { StepperCountService } from 'src/app/stepper-form/services/stepper-count.service';

@Injectable()
export class ProjectDetailsPresenterService {

  constructor(private _fb: FormBuilder, private _stepperCount: StepperCountService) {

  }
  /**
   * Initialize form group
   * @returns formGroup
   */
  buildProjectDetailsForm() {
    return this._fb.group({
      projectName: [, Validators.required],
      roll: [, Validators.required],
      startDate: [, Validators.required],
      endDate: [, Validators.required],
      system: [, Validators.required],
      mouse: [, Validators.required],
      keyboard: [, Validators.required]
    })
  }
  /**
   * @description submit form data
   */
  submitForm() {
    this._stepperCount.setActiveTab(5)
  }

  /**
   * @description navigate previous button
   */
  navigatePrevious() {
    this._stepperCount.setActiveTab(3)
  }

}
