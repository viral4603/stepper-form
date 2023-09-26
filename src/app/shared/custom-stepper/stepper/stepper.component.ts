import { CommonModule } from '@angular/common';
import { AfterContentInit, Component, ContentChildren, Input, QueryList } from '@angular/core';
import { StepComponent } from '../step/step.component';
import { CountWidgetStyles } from '../model';

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements AfterContentInit {

  /** custom style for count widget */
  /** set count widget style */
  @Input() public set customStyle(styles: CountWidgetStyles) {
    if (styles) {
      //set widget colors
      for (let key in styles.colors) {
        this.rootElement.style.setProperty(`--${key}`, styles.colors[key]);
      }
    }
  }

  /** get steps component */
  @ContentChildren(StepComponent) steps!: QueryList<StepComponent>;


  /** active step number */
  public currentStep: number;
  /** current active form instance */
  public currentForm!: StepComponent;
  /** root elemnet refernce for setting css varible */
  public rootElement: HTMLElement;

  /** get progress bar width */
  get progressbarStyle() {
    return {
      width: `calc(${this.currentStep * (100 / (this.steps.length - 1))}% - ${(this.currentStep * 40)}px)`
    }
  }
  /** get width of progress bar card */
  get itemWidth() {
    return {
      width: `calc(${100 / (this.steps.length - 1)}% - 40px)`
    }
  }
  /** get current form validation state */
  get isCurrentFormValid(): boolean {
    return this.currentForm.childComponentRef.getFormData().valid
  }


  constructor() {
    this.currentStep = 0;
    this.rootElement = document.querySelector(':root') as HTMLElement
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
      this.submitForm()
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
      this.submitForm()
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
    this.submitForm()
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
