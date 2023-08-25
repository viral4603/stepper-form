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
  @Input() public set steps(setpsNumber: number) {
    if (setpsNumber) {
      this._steps = setpsNumber;
      if (this.orientation === 'vertical') {
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

  
  public get orientation() : string {
    return this._orientation;
  }
  @Input() public set orientation(value: string) {
    if (value) {
      this._orientation = value;
    }
  }
  
  //dynamic css
  @Input() public stpeerCountShape!: string;  
  @Input() public styles!:any ; 

  /** style for progress bar width */
  public styleExpression!: StyleCSS;
  /** subscriber of form validation*/
  public formValidtionSub!: Subscription;
  /** flag for final step reach */
  public isLastStepReach: boolean;
  /**active steps */
  private _steps!: number;
  /**orientation */
  private _orientation!: string;

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
  public rootElement = document.querySelector(':root') as HTMLElement;


  constructor(private stepperCountService: StepperCountService,
    private progressCountPresenter: ProgressCountService) {
    this.isLastStepReach = false;
  }

  ngOnInit(): void {
    this.formValidtionSub = this.stepperCountService.lastStepReached$.subscribe((res: boolean) => {
      this.isLastStepReach = res;
    })
    //set setps widget dynamic styles
    for (let key in this.styles) {
      this.rootElement.style.setProperty(`--${key}`, this.styles[key]);
    }
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
