import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsgAssessmentsComponent } from './esg-assessments.component';

describe('EsgAssessmentsComponent', () => {
  let component: EsgAssessmentsComponent;
  let fixture: ComponentFixture<EsgAssessmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EsgAssessmentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EsgAssessmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
