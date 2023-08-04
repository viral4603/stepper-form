import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { StepperCountService } from 'src/app/stepper-form/services/stepper-count.service';
import { ProgressCountService } from '../progress-count-presenter/progress-count.service';

@Component({
  selector: 'app-progress-count-presentation',
  templateUrl: './progress-count-presentation.component.html',
  styleUrls: ['./progress-count-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ProgressCountService]
})
export class ProgressCountPresentationComponent {
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
  public formValidtionSub!: Subscription;
  public isLastStepReach: boolean;
  constructor(private _stepperCountService: StepperCountService,
    private _progressCountPresenter: ProgressCountService) {
    this.isLastStepReach = false;
  }

  ngOnInit(): void {
    this.formValidtionSub = this._stepperCountService.lastStepReached$.subscribe((res: boolean) => {
      this.isLastStepReach = res;
    })
  }

  /**
 * @description This will provide value to active tab through subjet
 */
  setActiveTab(tabValue: number): void {
    const navigationOption = {
      activeTab: this.steps,
      navigateTo: tabValue,
      isLastStepReach: this.isLastStepReach
    }
    this._progressCountPresenter.setActiveTab(navigationOption)
  }

  ngOnDestroy(): void {
    this.formValidtionSub.unsubscribe()
  }

}
