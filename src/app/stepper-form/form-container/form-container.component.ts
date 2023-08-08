import { Component, OnDestroy, OnInit } from '@angular/core';
import { StpperService } from '../stpper.service';
import { SelectOption } from '../model/index.model';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-form-container',
  templateUrl: './form-container.component.html',
  styleUrls: ['./form-container.component.scss']
})
export class FormContainerComponent implements OnInit, OnDestroy {

  public countryAndState: any;
  public countryAndCity: any;
  public projectList: SelectOption[];
  public positionList: SelectOption[];
  public frameWorkList: SelectOption[];
  public programmingList: SelectOption[];
  public unSubscribe: Subject<boolean>;

  constructor(private stepperService: StpperService) {
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
   * submit user data 
   */
  postUserData(data: any) {
    this.stepperService.saveUserData(data).subscribe((res: any) => {
      localStorage.clear()
    }, ((error: any) => {
      throw new Error(error)
    }))
  }

  ngOnDestroy(): void {
    this.unSubscribe.next(true)
    this.unSubscribe.unsubscribe()
  }
}
