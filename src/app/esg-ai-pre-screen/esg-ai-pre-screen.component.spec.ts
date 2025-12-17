import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsgAiPreScreenComponent } from './esg-ai-pre-screen.component';

describe('EsgAiPreScreenComponent', () => {
  let component: EsgAiPreScreenComponent;
  let fixture: ComponentFixture<EsgAiPreScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EsgAiPreScreenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EsgAiPreScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
