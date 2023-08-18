import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { StepperCountService } from 'src/app/stepper-form/services/stepper-count.service';
import { ProgressCountService } from '../progress-count-presenter/progress-count.service';
import { StyleCSS } from 'src/app/stepper-form/model/index.model';

@Component({
  selector: 'app-progress-count-presentation',
  templateUrl: './progress-count-presentation.component.html',
  styleUrls: ['./progress-count-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ProgressCountService]
})
export class ProgressCountPresentationComponent {
  /** input setter for active step number */
  @Input() public set steps(v: number) {
    if (v) {
      this._steps = v;
      if(this.orientation === 'vertical') {
        this.styleExpression = {
          height: `${(v - 1) * 20}%`,
        }
      }
      else {
        this.styleExpression = {
          width: `${(v - 1) * 20}%`,
        }
      }
    }
  }
  
  /** getter active step */
  public get steps() {
    return this._steps
  }
  //dynamic css
  @Input() public stpeerCountShape!: string;
  @Input() public orientation!:string;
  /** style for progress bar width */
  public styleExpression!: StyleCSS;
  /** subscriber of form validation*/
  public formValidtionSub!: Subscription;
  /** flag for final step reach */
  public isLastStepReach: boolean;
  /**active steps */
  private _steps!: number;
  /**orientation */

  public get stepCountClass(): string[] {
    const result: string[] = []
    if (this.stpeerCountShape === 'square') {
      result.push('rounded')
    }
    else {
      result.push('rounded-circle')
    }
    return result;
  }

  constructor(private stepperCountService: StepperCountService,
    private progressCountPresenter: ProgressCountService) {
    this.isLastStepReach = false;
  }

  ngOnInit(): void {
    this.formValidtionSub = this.stepperCountService.lastStepReached$.subscribe((res: boolean) => {
      this.isLastStepReach = res;
    })
  }

  /**
 * @description This will provide value to active tab through subjet
 * @param tabValue active tab number 
 */
  setActiveTab(tabValue: number): void {
    const navigationOption = {
      activeTab: this.steps,
      navigateTo: tabValue,
      isLastStepReach: this.isLastStepReach
    }
    this.progressCountPresenter.setActiveTab(navigationOption)
  }

  ngOnDestroy(): void {
    this.formValidtionSub.unsubscribe()
  }

}
