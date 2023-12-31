import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PolicyDetails } from 'src/app/stepper-form/constant/stpper.constant';
import { StepperCountService } from 'src/app/stepper-form/services/stepper-count.service';

@Injectable()
export class PolicyDetailsPresenterService {

  constructor(private _fb: FormBuilder, private _stepperCount: StepperCountService) { }
  buildPolicyForm() {
    return this._fb.group({
      communicateTerm: [false, Validators.requiredTrue],
      documentTerm: [false, Validators.requiredTrue],
      securityTerm: [false, Validators.requiredTrue],
      collaborativeTerm: [false, Validators.requiredTrue],
    })
  }
  /**
 * @description submit form data
 */
  submitForm(value:any) {
    localStorage.setItem(PolicyDetails,JSON.stringify(value)) 
  }

  /**
   * @description navigate previous button
   */
  navigatePrevious(tab: number) {
    this._stepperCount.setActiveTab(tab)
  }
}
