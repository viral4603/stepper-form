import { Component, OnInit } from '@angular/core';
import { StpperService } from '../stpper.service';
import { SelectOption } from '../model/index.model';

@Component({
  selector: 'app-form-container',
  templateUrl: './form-container.component.html',
  styleUrls: ['./form-container.component.scss']
})
export class FormContainerComponent implements OnInit {
  public countryAndState: any;
  public countryAndCity: any;
  public projectList: SelectOption[];
  public positionList: SelectOption[];
  public frameWorkList: SelectOption[];
  public programmingList: SelectOption[];

  constructor(private stepperService: StpperService) {
    this.projectList = [];
    this.positionList = [];
    this.frameWorkList = [];
    this.programmingList = [];
  }
  
  ngOnInit(): void {
    this.stepperService.getCountryAndState().subscribe((res: any) => {
      this.countryAndState = res.data;
    })
    this.stepperService.getCountyAndciy().subscribe((res: any) => {
      this.countryAndCity = res.data;
    })
    this.stepperService.getProjects().subscribe((res: SelectOption[]) => {
      this.projectList = res;
    })
    this.stepperService.getPositions().subscribe((res: SelectOption[]) => {
      this.positionList = res;
    })
    this.stepperService.getFrameworks().subscribe((res: SelectOption[]) => {
      this.frameWorkList = res;
    })
    this.stepperService.getProgrammingLangues().subscribe((res: SelectOption[]) => {
      this.programmingList = res;
    })
  }
}
