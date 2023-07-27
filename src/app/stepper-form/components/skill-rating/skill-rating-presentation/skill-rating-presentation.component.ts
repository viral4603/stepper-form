import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SkillRatingPresenterService } from '../skill-rating-presenter/skill-rating-presenter.service';

@Component({
  selector: 'app-skill-rating-presentation',
  templateUrl: './skill-rating-presentation.component.html',
  styleUrls: ['./skill-rating-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SkillRatingPresenterService]
})
export class SkillRatingPresentationComponent {
  public skillValue: any;
  constructor() {
  }
  public cars: any = [
    { id: 1, name: 'Volvo' },
    { id: 2, name: 'Saab' },
    { id: 3, name: 'Opel' },
    { id: 4, name: 'Audi' },
  ];

}
