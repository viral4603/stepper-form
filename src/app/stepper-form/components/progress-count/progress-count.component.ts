import { Component, Input } from '@angular/core';
import { StepperCountService } from '../../services/stepper-count.service';

@Component({
  selector: 'app-progress-count',
  templateUrl: './progress-count.component.html',
  styleUrls: ['./progress-count.component.scss']
})
export class ProgressCountComponent {

  private _steps!: number;
  public get value(): number {
    return this._steps;
  }
  @Input() public set steps(v: number) {
    if (v) {
      this._steps = v;
      this.styleExpression = {
        width: `${(v - 1) * 25}%`
      }
    }
  }
  public get steps() {
    return this._steps
  }

  public styleExpression: any;
  constructor(private _stepperCountService:StepperCountService) {

  }
  /**
 * @description This will provide value to active tab through subjet
 */
  setActiveTab(tabValue: number): void {
    this._stepperCountService.setActiveTab(tabValue)
  }
}
