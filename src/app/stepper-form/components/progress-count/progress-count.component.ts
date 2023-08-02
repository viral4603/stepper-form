import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { StepperCountService } from '../../services/stepper-count.service';
import { Subscriber, Subscription } from 'rxjs';

@Component({
  selector: 'app-progress-count',
  templateUrl: './progress-count.component.html',
  styleUrls: ['./progress-count.component.scss']
})
export class ProgressCountComponent implements OnInit, OnDestroy {

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
  public errorOccurOnTab: number;
  public formValidtionSub!: Subscription;
  constructor(private _stepperCountService: StepperCountService) {
    this.errorOccurOnTab = 0;
  }

  ngOnInit(): void {
    this.formValidtionSub = this._stepperCountService.errorTab$.subscribe((res: number) => {
      this.errorOccurOnTab = res;
    })
  }
  /**
 * @description This will provide value to active tab through subjet
 */
  setActiveTab(tabValue: number): void {
    this._stepperCountService.submitFormByTab(tabValue)
    if (tabValue > this.steps && tabValue === this.steps + 1) {
      this._stepperCountService.submitFormByTab(tabValue)
    }
    if (tabValue < this._steps) {
      this._stepperCountService.setActiveTab(tabValue)
    }
  }

  ngOnDestroy(): void {
    this.formValidtionSub.unsubscribe()
  }
}
