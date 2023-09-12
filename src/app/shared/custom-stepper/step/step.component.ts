import { CommonModule } from '@angular/common';
import { AfterContentInit, AfterViewInit, Component, ContentChild, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-step',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss']
})
export class StepComponent implements AfterContentInit,AfterViewInit {
  /** count widget title */
  @Input() title!: string;

  /** count widget icon */
  @Input() icon!: string;
  /** set current step is active or not */
  public isActive: boolean;
  /** form instance */
  // To get a reference to the child component without being sure about its type
  @ContentChild('childComponent', { static: false }) childComponentRef: any;
  constructor() {
    this.isActive = false;
  }

  ngAfterContentInit(): void {
    // console.log(this.stepForm)\
    // console.log(this.childComponentRef)
    
  }
  ngAfterViewInit() {
    // console.log(this.childComponentRef)
  }

}
