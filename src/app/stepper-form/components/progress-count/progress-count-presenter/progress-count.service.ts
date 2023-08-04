import { Injectable } from '@angular/core';
import { StepperCountService } from 'src/app/stepper-form/services/stepper-count.service';

@Injectable()
export class ProgressCountService {
  constructor(private _stepperCountService: StepperCountService) {

  }

  /**
 * @description This will provide value to active tab through subjet
 */
  setActiveTab(options: any): void {
    if (options.navigateTo > options.activeTab && options.navigateTo === options.activeTab + 1 && !options.isLastStepReach ||
      options.isLastStepReach || options.navigateTo < options.activeTab) {
      this._stepperCountService.submitFormByTab(options)
    }
  }
}
