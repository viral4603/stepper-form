import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { StepperCountService } from 'src/app/stepper-form/services/stepper-count.service';
import { ProgressCountService } from '../progress-count-presenter/progress-count.service';
import { CountWidgetStyle, StyleCss } from 'src/app/stepper-form/model/index.model';

@Component({
  selector: 'app-progress-count-presentation',
  templateUrl: './progress-count-presentation.component.html',
  styleUrls: ['./progress-count-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ProgressCountService]
})
export class ProgressCountPresentationComponent {
  /** set count widget style */
  @Input() public set countWidgetstyles(styles: CountWidgetStyle) {
    if (styles) {
      this._countWidgetstyles = styles;
      //set widget colors
      for (let key in styles.colors) {
        this.rootElement.style.setProperty(`--${key}`, styles.colors[key]);
      }
    }
  }
  /**getter for count widget style */
  public get countWidgetstyles(): CountWidgetStyle {
    return this._countWidgetstyles;
  }

  /** input setter for active step number */
  @Input() public set steps(setpsNumber: number) {
    if (setpsNumber) {
      this._steps = setpsNumber;
      if (this.countWidgetstyles.orientation === 'vertical') {
        this.styleExpression = {
          height: `${(setpsNumber - 1) * 20}%`,
        }
      }
      else {
        this.styleExpression = {
          width: `${(setpsNumber - 1) * 20}%`,
        }
      }
    }
  }
  /** getter active step */
  public get steps() {
    return this._steps
  }

  /** style for progress bar width */
  public styleExpression!: StyleCss;
  /** subscriber of form validation*/
  public formValidtionSubscription!: Subscription;

  /** flag for final step reach */
  public isLastStepReach: boolean;

  /** custom styles for count widget */
  private _countWidgetstyles!: any;
  /** active steps */
  private _steps!: number;
  /** orientation */

  public get stepCountClass(): string[] {
    const result: string[] = []
    if (this.countWidgetstyles.shape === 'square') {
      result.push('rounded')
    }
    else {
      result.push('rounded-circle')
    }
    return result;
  }
  public rootElement: HTMLElement;


  constructor(private stepperCountService: StepperCountService,
    private progressCountPresenter: ProgressCountService) {
    this.isLastStepReach = false;
    this.rootElement = document.querySelector(':root') as HTMLElement;
  }

  ngOnInit(): void {
    this.formValidtionSubscription = this.stepperCountService.lastStepReached$.subscribe((res: boolean) => {
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
    this.formValidtionSubscription.unsubscribe()
  }

}
