import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsgAssessmentComponent } from './esg-assessment.component';

describe('EsgAssessmentComponent', () => {
  let component: EsgAssessmentComponent;
  let fixture: ComponentFixture<EsgAssessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EsgAssessmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EsgAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
