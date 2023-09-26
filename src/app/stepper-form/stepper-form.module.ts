import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { CustomRangeSliderComponent } from '../shared/custom-range-slider/custom-range-slider.component';
import { FormPreviewComponent } from '../shared/form-preview/form-preview.component';
import { AddressDetailsPresentationComponent } from './components/address-details/address-details-container/address-details-presentation.component';
import { BasicDetailsPresentationComponent } from './components/basic-details/basic-details-presentation/basic-details-presentation.component';
import { PolicyDetailsPresentationComponent } from './components/policy-details/policy-details-presentation/policy-details-presentation.component';
import { PreviewFormPresentationComponent } from './components/preview-form/preview-form-presentation/preview-form-presentation.component';
import { ProgressCountPresentationComponent } from './components/progress-count/progress-count-presentation/progress-count-presentation.component';
import { ProjectDetailsPresentationComponent } from './components/project-details/project-details-presentation/project-details-presentation.component';
import { SkillRatingPresentationComponent } from './components/skill-rating/skill-rating-presentation/skill-rating-presentation.component';
import { FormContainerComponent } from './form-container/form-container.component';
import { FormPresentationComponent } from './form-container/form-presentation/form-presentation.component';
import { StepperCountService } from './services/stepper-count.service';
import { StpperService } from './stpper.service';
import { StepComponent } from '../shared/custom-stepper/step/step.component';
import { StepperComponent } from '../shared/custom-stepper/stepper/stepper.component';


@NgModule({
  declarations: [
    FormContainerComponent,
    FormPresentationComponent,
    BasicDetailsPresentationComponent,
    SkillRatingPresentationComponent,
    AddressDetailsPresentationComponent,
    ProjectDetailsPresentationComponent,
    PolicyDetailsPresentationComponent,
    PreviewFormPresentationComponent,
    ProgressCountPresentationComponent,
  ],
  imports: [
    CommonModule,
    NgSelectModule,
    FormsModule,
    OverlayModule,
    CustomRangeSliderComponent,
    ReactiveFormsModule,
    FormPreviewComponent,
    StepperComponent,
    StepComponent
  ],
  exports: [
    FormContainerComponent
  ],
  providers: [
    StepperCountService,
    StpperService
  ]
})
export class StepperFormModule { }
