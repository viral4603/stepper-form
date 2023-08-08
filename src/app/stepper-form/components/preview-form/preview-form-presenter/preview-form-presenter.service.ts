import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FormPreviewComponent } from 'src/app/shared/form-preview/form-preview.component';
import { StepperCountService } from 'src/app/stepper-form/services/stepper-count.service';

@Injectable()
export class PreviewFormPresenterService {
  public printEnable$:Observable<any>
  public sendFormData$:Observable<any>;
  private sendFormData:Subject<any>;
  private printEnable:Subject<any>;


  constructor(private overlay: Overlay, private _stepperCount: StepperCountService
  ) { 
    this.printEnable = new Subject<any>();
    this.sendFormData = new Subject<any>();
    this.printEnable$ = this.printEnable.asObservable()
    this.sendFormData$ = this.sendFormData.asObservable()
  }
  /**
   * @description open Overlay of form Deatils
   */
  public showDetailsOverlay() {

    const overlayConfig = {
      positionStrategy: this.overlay.position().global().centerHorizontally().top('20px'),
      hasBackdrop: true,
      width: '968px',
    }

    const portal = new ComponentPortal(FormPreviewComponent)
    const overlayRef = this.overlay.create(overlayConfig)
    const overlayComponent = overlayRef.attach(portal)

    overlayRef.backdropClick().subscribe((res: any) => {
      overlayRef.detach()
    })

    overlayComponent.instance.close.subscribe((res: any) => {
      if (res) {
        overlayRef.detach()
        this.setActiveTab(5)
      }
    })
    const formData: any = {}
    for (let i = 0; i < localStorage.length; i++) {
      const objectKey = localStorage.key(i)
      const value = localStorage.getItem(`${objectKey}`)
      if (value) {
        formData[`${objectKey}`] = JSON.parse(value)
      }
    }

    overlayComponent.instance.print.subscribe((res: any) => {
      if (res) {
        this.printEnable.next(formData)
        overlayRef.detach()
      }
    })

    overlayComponent.instance.submitdata.subscribe((res: any) => {
        this.sendFormData.next(formData)
        overlayRef.detach()
        this._stepperCount.setActiveTab(5)
    })
    overlayComponent.instance.formData = formData;
  }

  setActiveTab(tab:number) {
    this._stepperCount.setActiveTab(tab)
  }
}
