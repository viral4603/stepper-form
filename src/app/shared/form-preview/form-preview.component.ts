import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

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
  @Input() public set formData(v: any) {
    this._formData = v;
  }
  public get formData(): any {
    return this._formData;
  }

  @Output() public close: EventEmitter<boolean>;
  @Output() public print: EventEmitter<boolean>;
  @Output() public submitdata: EventEmitter<any>;

  private _formData: any;

  constructor() {
    this.close = new EventEmitter<boolean>()
    this.print = new EventEmitter<boolean>()
    this.submitdata = new EventEmitter<any>()
  }
  /**
   * emit custome event for close overlay
   */
  closeOverlay() {
    this.close.emit(true)
  }
  /**
   * emit prit form 
   */
  printForm() {
    this.print.emit(true)
  }
  /**
   * emit submit form
   */
  submitForm() {
    this.submitdata.emit()
  }

  // get getKeyOfObject(): string[] {
  //   return Object.keys(this.formData)
  // }

  // getNestedKey(key: string): string[] {
  //   return Object.keys(this.formData[`${key}`])
  // }
  
  get framworkSkills(): string[] {
    return Object.keys(this.formData['skillDetails']['framework'])
  }
  get programmingLangugesSkill(): string[] {
    return Object.keys(this.formData['skillDetails']['programmingLanguges'])
  }
}
