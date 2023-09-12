import { CommonModule } from '@angular/common';
import { AfterContentInit, Component, ContentChildren, QueryList } from '@angular/core';
import { StepComponent } from '../step/step.component';

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements AfterContentInit {

  /** get steps component */
  @ContentChildren(StepComponent) steps!: QueryList<StepComponent>;

  /** active step number */
  public currentStep: number;
  /** current active form instance */
  public currentForm!: StepComponent;

  /** get progress bar width */
  get progressbarStyle() {
    return {
      width: `${this.currentStep * (100 / this.steps.length)}%`,
    }
  }
  /** get width of progress bar card */
  get itemWidth() {
    return {
      width: `${100 / this.steps.length}%`
    }
  }
  /** get current form validation state */
  get isCurrentFormValid(): boolean {
    return this.currentForm.childComponentRef.getFormData().valid
  }


  constructor() {
    this.currentStep = 0;
  }

  ngAfterContentInit(): void {
    this.currentForm = this.steps.toArray()[this.currentStep]
    this.toggleCurrentFormState()
  }

  /**
   * navigate to the next form
   */
  public next() {
    if (this.currentStep < this.steps.length - 1) {
      this.toggleCurrentFormState()
      this.currentStep++;
      this.currentForm = this.steps.toArray()[this.currentStep]
      this.toggleCurrentFormState()
    }
  }

  /**
   * navigate to the previous form
   */
  public prev() {
    if (this.currentStep > 0) {
      this.toggleCurrentFormState()
      this.currentStep--;
      this.currentForm = this.steps.toArray()[this.currentStep]
      this.toggleCurrentFormState()
    }
  }

  /** toggle active state of current form */
  public toggleCurrentFormState() {
    this.currentForm.isActive = !this.currentForm.isActive;
  }
  /**
   * navigate to step while user click on progress count
   */
  public navigateToStep(stepIndex: number) {
    this.currentStep = stepIndex;
    this.toggleCurrentFormState();
    this.currentForm = this.steps.toArray()[this.currentStep]
    this.toggleCurrentFormState()
  }
  /** emit submit event of current form */
  public submitForm() {
    if (this.isCurrentFormValid) {
      this.currentForm.childComponentRef.submitForm()
    }
  }

}
