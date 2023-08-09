import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StepperFormData } from 'src/app/stepper-form/model/index.model';

@Component({
  selector: 'app-form-preview',
  templateUrl: './form-preview.component.html',
  styleUrls: ['./form-preview.component.scss'],
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class FormPreviewComponent {
  /** input for all form data that display in preview form */
  @Input() public set formData(value: StepperFormData) {
    this._formData = value;
  }
  /** getter of form fata */
  public get formData(): StepperFormData {
    return this._formData;
  }
  /** custom event for colse overlay */
  @Output() public close: EventEmitter<boolean>;
  /** custom event for print form */
  @Output() public print: EventEmitter<boolean>;
  /** custom event for submit form data */
  @Output() public submitdata: EventEmitter<any>;

  /*form data */
  private _formData!: StepperFormData;

  constructor() {
    this.close = new EventEmitter<boolean>()
    this.print = new EventEmitter<boolean>()
    this.submitdata = new EventEmitter<any>()
  }
  /**
   * emit custome event for close overlay
   */
  public closeOverlay(): void {
    this.close.emit(true)
  }
  /**
   * emit prit form 
   */
  public printForm(): void {
    this.print.emit(true)
  }
  /**
   * emit submit form
   */
  public submitForm(): void {
    this.submitdata.emit()
  }

  // get getKeyOfObject(): string[] {
  //   return Object.keys(this.formData)
  // }

  // getNestedKey(key: string): string[] {
  //   return Object.keys(this.formData[`${key}`])
  // }

  /** get all property in frameworks */
  get framworkSkills(): string[] {
    return Object.keys(this.formData['skillDetails']['framework'])
  }
  /** get all property programming languges */
  get programmingLangugesSkill(): string[] {
    return Object.keys(this.formData['skillDetails']['programmingLanguges'])
  }
}
