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
    CommonModule,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomRangeSliderComponent),
      multi: true
    },
  ],
})

export class CustomRangeSliderComponent implements ControlValueAccessor, OnInit {

  ngOnInit(): void {
  }
  public sliderValue!: string | number;
  public onChange: (value: any) => void = (value) => {
    this.sliderValue = this.convertToSkillName(value)
  };
  public onTouched: (value: any) => void = (value) => {
  };
  writeValue(value: number): void {
    this.sliderValue = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    // throw new Error('Method not implemented.');
  }
  onSliderChange(e: any) {
    const value = +e.target.value
    this.onChange(value)
    this.onTouched(value)
    const label = e.target.nextElementSibling
    const max = +e.target.max
    const min = +e.target.min
    const getOffcetWidth = e.target.offsetWidth;
    const stepDiffrence = max - min;
    const leftStepValue = getOffcetWidth / stepDiffrence;
    const left = value * leftStepValue - leftStepValue;
    label.style.left = `${left}px`
    label.style.visibility = 'visible'
    label.innerHTML = this.convertToSkillName(value)
    label.style.visibility = 'visible'
    setTimeout(() => {
      label.style.visibility = 'hidden'
    }, 1000)
  }

  /**
   * @description define skill on basis of value
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
