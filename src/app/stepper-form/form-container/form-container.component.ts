import { Component, OnDestroy, OnInit } from '@angular/core';
import { StpperService } from '../stpper.service';
import { SelectOption, StepperFormData } from '../model/index.model';
import { Subject, takeUntil } from 'rxjs';
import { StepperCountService } from '../services/stepper-count.service';

@Component({
  selector: 'app-form-container',
  templateUrl: './form-container.component.html',
  styleUrls: ['./form-container.component.scss']
})
export class FormContainerComponent implements OnInit, OnDestroy {
  /** list of country with state */
  public countryAndState: any;
  /** list of country with city */
  public countryAndCity: any;
  /** list of projects */
  public projectList: SelectOption[];
  /** list of postions */
  public positionList: SelectOption[];
  /** list of framework */
  public frameWorkList: SelectOption[];
  /** list of programming languages */
  public programmingList: SelectOption[];
  /** subject form unsubscribe observers */
  public unSubscribe: Subject<boolean>;

  constructor(private stepperService: StpperService, private _stepper: StepperCountService) {
    this.projectList = [];
    this.positionList = [];
    this.frameWorkList = [];
    this.programmingList = [];
    this.unSubscribe = new Subject<boolean>();
  }

  ngOnInit(): void {
    this.stepperService.getCountryAndState().pipe(takeUntil(this.unSubscribe)).subscribe((res: any) => {
      this.countryAndState = res.data;
    })
    this.stepperService.getCountyAndciy().pipe(takeUntil(this.unSubscribe)).subscribe((res: any) => {
      this.countryAndCity = res.data;
    })
    this.stepperService.getProjects().pipe(takeUntil(this.unSubscribe)).subscribe((res: SelectOption[]) => {
      this.projectList = res;
    })
    this.stepperService.getPositions().pipe(takeUntil(this.unSubscribe)).subscribe((res: SelectOption[]) => {
      this.positionList = res;
    })
    this.stepperService.getFrameworks().pipe(takeUntil(this.unSubscribe)).subscribe((res: SelectOption[]) => {
      this.frameWorkList = res;
    })
    this.stepperService.getProgrammingLangues().pipe(takeUntil(this.unSubscribe)).subscribe((res: SelectOption[]) => {
      this.programmingList = res;
    })
  }
  /**
   * submit final data to server
   * @param data final data 
   */
  postUserData(data: StepperFormData) {
    this.stepperService.saveUserData(data).subscribe((res: any) => {
      localStorage.clear()
      this._stepper.setActiveTab(1)
    }, ((error: any) => {
      throw new Error(error)
    }))
  }

  ngOnDestroy(): void {
    this.unSubscribe.next(true)
    this.unSubscribe.unsubscribe()
  }
}
