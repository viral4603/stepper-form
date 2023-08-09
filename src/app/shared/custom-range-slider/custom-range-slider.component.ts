import { CommonModule } from '@angular/common';
import { Component, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
type defineSkill = "None" | "Basic" | "Demonstrating" | "Proficient" | "Expert";
@Component({
  selector: 'app-custom-range-slider',
  templateUrl: './custom-range-slider.component.html',
  styleUrls: ['./custom-range-slider.component.scss'],
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomRangeSliderComponent),
      multi: true
    },
  ],
  imports: [
    CommonModule
  ]
})

export class CustomRangeSliderComponent implements ControlValueAccessor {
  //provide value of control
  public sliderValue!: string | number;
  /**
   * mark contorl as changed and assign value
   * @param value input range value
   */
  public onChange: (value: number) => void = (value) => {
    this.sliderValue = value
  };
  /**
   * mark custom conrol as touched 
   */
  public onTouched: (value: any) => void = (value) => {
  };
  /**
   * assign value to control during control initilization
   * @param value initial value
   */
  public writeValue(value: number): void {
    if (value) {
      this.sliderValue = value;
    } else {
      this.sliderValue = 0;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
  }
  /**
   * assign value to input control and appear lable that indicate levels
   * @param event
   */
  onSliderChange(event: Event): void {
    if (event.target instanceof HTMLInputElement) {
      //target element range input
      const targetElement = event.target
      //value of range input
      const value = +targetElement.value
      //get lable element where tooltip appeare
      const label = targetElement.nextElementSibling as HTMLElement
      //get max value of range slider
      const max = +targetElement.max
      //get min value of range slider
      const min = +targetElement.min
      //get width of input element 
      const getOffcetWidth = targetElement.offsetWidth;
      //setp difference 
      const stepDiffrence = max - min;
      //ge value distance between to range
      const rangeDistance = getOffcetWidth / stepDiffrence;
      //lable left postion 
      const left = (value * rangeDistance) - rangeDistance;

      //css style for label
      label.style.left = `${left}px`
      label.style.visibility = 'visible'
      //convert number value in in string and assign to lable
      label.innerHTML = this.convertToSkillName(value)
      //invoke onchange and onTouched to assign values and state changes
      this.onChange(value)
      this.onTouched(value)

      //hide appear lable 
      setTimeout(() => {
        label.style.visibility = 'hidden'
      }, 1000)

    }
  }

  /**
   * @description define skill levels on basis of value
   * @param value range value select by user 
   */
  convertToSkillName(value: number): any {
    switch (value) {
      case 1:
        return 'None'
      case 2:
        return 'Basic'
      case 3:
        return 'Demonstrating'
      case 4:
        return 'Proficient'
      case 5:
        return 'Expert'
    }
  }
}
