import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FormPreviewComponent } from 'src/app/shared/form-preview/form-preview.component';
import { StepperFormData } from 'src/app/stepper-form/model/index.model';
import { StepperCountService } from 'src/app/stepper-form/services/stepper-count.service';

@Injectable()
export class PreviewFormPresenterService {
  /** Observable for subscribe print data to presentation */
  public printEnable$: Observable<StepperFormData>
  /** Observale for subscribe form data to presenatation */
  public sendFormData$: Observable<StepperFormData>;
  /** Subject for emit form data */
  private sendFormData: Subject<StepperFormData>;
  /** Subject for emit print data */
  private printEnable: Subject<StepperFormData>;


  constructor(private overlay: Overlay, private _stepperCount: StepperCountService
  ) {
    this.printEnable = new Subject<StepperFormData>();
    this.sendFormData = new Subject<StepperFormData>();
    this.printEnable$ = this.printEnable.asObservable()
    this.sendFormData$ = this.sendFormData.asObservable()
  }
  /**
   * @description open Overlay of form Deatils
   */
  public showDetailsOverlay() {
    /** overlay configartion */
    const overlayConfig = {
      positionStrategy: this.overlay.position().global().centerHorizontally().top('20px'),
      hasBackdrop: true,
      width: '968px',
    }
    /** component that attached to overlay */
    const portal = new ComponentPortal(FormPreviewComponent)
    /** instace of overlay */
    const overlayRef = this.overlay.create(overlayConfig)
    /** instance of overlay component */
    const overlayComponent = overlayRef.attach(portal)

    /** close overlay on click out side of it */
    overlayRef.backdropClick().subscribe((res: any) => {
      overlayRef.detach()
      this.setActiveTab(5)
    })
    /** close overlay on click close button */
    overlayComponent.instance.close.subscribe((res: boolean) => {
      if (res) {
        overlayRef.detach()
        this.setActiveTab(5)
      }
    })
    /** get form data from local storage */
    const formData: StepperFormData = {} as StepperFormData;
    for (let i = 0; i < localStorage.length; i++) {
      const objectKey = localStorage.key(i) as keyof StepperFormData
      const value = localStorage.getItem(`${objectKey}`)
      if (value) {
        formData[`${objectKey}`] = JSON.parse(value)
      }
    }
    /** print form data */
    overlayComponent.instance.print.subscribe((res: boolean) => {
      if (res) {
        this.printEnable.next(formData)
        overlayRef.detach()
      }
    })
    /**submit form data  */
    overlayComponent.instance.submitdata.subscribe(() => {
      this.sendFormData.next(formData)
      overlayRef.detach()
    })
    overlayComponent.instance.formData = formData;
  }
  /**
   * navigate to tab
   * @param tab tab number where user will navigate
   */
  public setActiveTab(tab: number) {
    this._stepperCount.setActiveTab(tab)
  }
}
