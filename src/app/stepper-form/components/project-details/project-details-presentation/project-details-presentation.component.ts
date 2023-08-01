import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProjectDetailsPresenterService } from '../project-details-presenter/project-details-presenter.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-project-details-presentation',
  templateUrl: './project-details-presentation.component.html',
  styleUrls: ['./project-details-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ProjectDetailsPresenterService]
})
export class ProjectDetailsPresentationComponent {
  public cars: any = [
    { id: 1, name: 'Volvo' },
    { id: 2, name: 'Saab' },
    { id: 3, name: 'Opel' },
    { id: 4, name: 'Audi' },
  ];
  public today:string = new Date().toISOString().split('T')[0];
  public isFormValid: boolean;
  get formContorls() {
    return this.projectDetailsForm.controls
  }
  public projectDetailsForm: FormGroup;
  constructor(private _projectDetailsPresenterService: ProjectDetailsPresenterService) {
    this.isFormValid = true;
    this.projectDetailsForm = this._projectDetailsPresenterService.buildProjectDetailsForm()
  }

  /**
   * call presenter method 
   */
  submitForm() {
    if (this.projectDetailsForm.status !== 'VALID') {
      this.isFormValid = false
    }
    else {
      console.log(this.projectDetailsForm)
      this._projectDetailsPresenterService.submitForm()
    }
  }
  /**
   * switvh to previous tab
   */
  navigateToPrevious() {
    this._projectDetailsPresenterService.navigatePrevious()
  }
}
