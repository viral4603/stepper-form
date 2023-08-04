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
  @Output() public close: EventEmitter<boolean>;

  private _formData: any;
  public get formData(): any {
    return this._formData;
  }
  @Input() public set formData(v: any) {
    this._formData = v;
  }

  constructor() {
    this.close = new EventEmitter<boolean>()
  }
  closeOverlay() {
    this.close.emit(true)
  }

  get getKeyOfObject(): string[] {
    return Object.keys(this.formData)
  }
  
  getNestedKey(key:string):string[] {
    return Object.keys(this.formData[`${key}`])
  }
  get framworkSkills():string[] {
    return Object.keys(this.formData['skillDetails']['framework'])
  }
  get programmingLangugesSkill():string[]
  {
   return Object.keys(this.formData['skillDetails']['programmingLanguges'])
 }
}
