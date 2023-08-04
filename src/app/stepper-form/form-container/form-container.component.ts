import { Component, OnInit } from '@angular/core';
import { StpperService } from '../stpper.service';

@Component({
  selector: 'app-form-container',
  templateUrl: './form-container.component.html',
  styleUrls: ['./form-container.component.scss']
})
export class FormContainerComponent implements OnInit {
  public countryAndState: any;
  public countryAndCity:any;
  constructor(private stepperService: StpperService) {

  }
  ngOnInit(): void {
    this.stepperService.getCountryAndState().subscribe((res: any) => {
      this.countryAndState = res.data;
    })
    this.stepperService.getCities().subscribe((res) => {
      this.countryAndCity = res.data;
    })
  }
}
