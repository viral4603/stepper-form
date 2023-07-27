import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormContainerComponent } from './form-container/form-container.component';
import { FormPresentationComponent } from './form-container/form-presentation/form-presentation.component';
import { ProgressCountComponent } from './components/progress-count/progress-count.component';
import { BasicDetailsPresentationComponent } from './components/basic-details/basic-details-presentation/basic-details-presentation.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { SkillRatingPresentationComponent } from './components/skill-rating/skill-rating-presentation/skill-rating-presentation.component';
import { AddressDetailsPresentationComponent } from './components/address-details/address-details-container/address-details-presentation.component';
import { ProjectDetailsPresentationComponent } from './components/project-details/project-details-presentation/project-details-presentation.component';
import { PolicyDetailsPresentationComponent } from './components/policy-details/policy-details-presentation/policy-details-presentation.component';
import { CustomRangeSliderComponent } from '../shared/custom-range-slider/custom-range-slider.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    FormContainerComponent,
    FormPresentationComponent,
    ProgressCountComponent,
    BasicDetailsPresentationComponent,
    SkillRatingPresentationComponent,
    AddressDetailsPresentationComponent,
    ProjectDetailsPresentationComponent,
    PolicyDetailsPresentationComponent,
  ],
  imports: [
    CommonModule,
    NgSelectModule,
    CustomRangeSliderComponent,
    FormsModule
  ],
  exports:[
    FormContainerComponent
  ]
})
export class StepperFormModule { }
