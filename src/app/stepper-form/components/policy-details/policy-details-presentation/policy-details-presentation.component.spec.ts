import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyDetailsPresentationComponent } from './policy-details-presentation.component';

describe('PolicyDetailsPresentationComponent', () => {
  let component: PolicyDetailsPresentationComponent;
  let fixture: ComponentFixture<PolicyDetailsPresentationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PolicyDetailsPresentationComponent]
    });
    fixture = TestBed.createComponent(PolicyDetailsPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
