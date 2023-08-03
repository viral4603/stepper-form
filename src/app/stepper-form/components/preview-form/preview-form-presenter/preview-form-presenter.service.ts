import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { FormPreviewComponent } from 'src/app/shared/form-preview/form-preview.component';
import { StepperCountService } from 'src/app/stepper-form/services/stepper-count.service';

@Injectable()
export class PreviewFormPresenterService {

  constructor(private overlay: Overlay, private _stepperCount: StepperCountService
  ) { }
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
        this._stepperCount.setActiveTab(5)
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
    overlayComponent.instance.formData = formData;
  }
}
