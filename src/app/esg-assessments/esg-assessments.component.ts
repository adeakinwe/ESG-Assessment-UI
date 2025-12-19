import { Component, ElementRef, ViewChild } from '@angular/core';
import { ChecklistService } from '../services/checklist.service';
import { ChecklistItem } from '../models/checklist.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { ProgressBarModule } from 'primeng/progressbar';
import { ChipModule } from 'primeng/chip';
import { LoanApplicationService } from '../services/loan-application.service';
import { EsgAiRecommendationService } from '../services/esg-ai.service';
@Component({
  selector: 'app-esg-assessments',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DropdownModule,
    ButtonModule,
    CardModule,
    SelectButtonModule,
    ConfirmDialogModule,
    ProgressBarModule,
    ChipModule
  ],
  templateUrl: './esg-assessments.component.html',
  styleUrl: './esg-assessments.component.css'
})
export class EsgAssessmentsComponent {
  @ViewChild('summarySection', { static: false }) summarySection?: ElementRef;

  summary: any = null; // Holds the API summary
  loanApplicationId!: number;
  checklistItems: ChecklistItem[] = [];
  assessmentComment: string = this.summary?.comment || '';
  submittedForAppraisal: boolean = false;
  isReadOnly: boolean = false;
  explainability: any = null;
  finalRecommendation: any = null;
  mlSignals: any = null;
  finalRiskLabel = '';
  finalRiskClass = '';

  // checklistItemId -> responseValue
  selectedResponses: { [key: number]: number } = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private confirmationService: ConfirmationService,
    private checklistService: ChecklistService,
    private loanApplicationService: LoanApplicationService,
    private aiService: EsgAiRecommendationService
  ) { }

  ngOnInit(): void {
    this.loanApplicationId = Number(this.route.snapshot.paramMap.get('id'));
    this.submittedForAppraisal = this.route.snapshot.paramMap.get('submitted') === 'true';
    this.isReadOnly = this.submittedForAppraisal;

    this.checklistService.getChecklist().subscribe({
      next: (data) => {
        this.checklistItems = data;
        // ✅ Load existing assessment 
        this.loadExistingAssessment();
      },
      error: (err) => console.error(err)
    });
  }

  get answeredCount(): number {
    return Object.keys(this.selectedResponses).length;
  }

  get totalCount(): number {
    return this.checklistItems.length;
  }

  onSelect(itemId: number) {
    console.log(
      `Checklist ${itemId} selected value:`,
      this.selectedResponses[itemId]
    );
  }

  isAssessmentComplete(): boolean {
    if (!this.checklistItems || this.checklistItems.length === 0) {
      return false;
    }

    return this.checklistItems.every(
      item => this.selectedResponses[item.checklistItemId] !== undefined
    );
  }

  confirmSubmit() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to submit this ESG assessment? You can still update it later.',
      header: 'Confirm ESG Submission',
      icon: 'pi pi-leaf',
      accept: () => {
        this.submitAssessment();
      },
      reject: () => {
        // Optional: toast / console log
        console.log('Submission cancelled');
      }
    });
  }


  // ✅ SUBMIT ALL RESPONSES AT ONCE
  submitAssessment() {

    // 1️⃣ Validation — ensure all answered
    const unanswered = this.checklistItems.filter(
      i => this.selectedResponses[i.checklistItemId] === undefined
    );

    if (unanswered.length > 0) {
      alert('Please respond to all checklist items before submitting.');
      return;
    }

    // ❗ Mandatory comment validation
    if (!this.assessmentComment || this.assessmentComment.trim().length < 10) {
      alert('Please provide a meaningful ESG assessment comment.');
      return;
    }

    // 2️⃣ Build body
    const body = {
      loanApplicationId: this.loanApplicationId,
      comment: this.assessmentComment,
      items: this.checklistItems.map(item => {
        const responseValue = this.selectedResponses[item.checklistItemId];

        const selected = item.responses.find(
          r => r.responseValue === responseValue
        );

        return {
          checklistItemId: item.checklistItemId,
          responseTypeId: item.responseTypeId,
          score: selected?.score ?? 0,
          weight: item.weight,
          comment: null
        };
      })
    };

    // 3️⃣ Submit once
    this.checklistService.submitAssessment(body).subscribe({
      next: (res: any) => {
        alert(`${res.message}`);
        // Reload summary after submission
        this.loadSummary();
      },
      error: (err) => alert(`Submission failed: ${err.error.message || err.statusText}`)
    });
  }

  loadExistingAssessment() {
    this.checklistService.getAssessmentByLoan(this.loanApplicationId).subscribe({
      next: (res: any) => {
        if (!res?.data?.items || res.data.items.length === 0) return;

        const saved = res.data.items;

        saved.forEach((a: any) => {
          const item = this.checklistItems.find(
            i => i.checklistItemId === a.checklistItemId
          );

          if (!item) return;

          const response = item.responses.find(
            r => r.responseValue === a.responseTypeId
          );

          if (response) {
            this.selectedResponses[item.checklistItemId] = response.responseValue;
          }
        });
        // load saved ESG assessment summary
        this.loadSummary();
      },
      error: (err: any) => console.error(err)
    });
  }

  getRatingClass(rating: string) {
    return rating === 'High' ? 'p-chip-danger' :
      rating === 'Medium' ? 'p-chip-warning' : 'p-chip-success';
  }
  loadSummary() {
    this.checklistService.getEsgAssessmentSummary(this.loanApplicationId).subscribe({
      next: (res: any) => {
        this.summary = res.data;
        this.assessmentComment = this.summary?.comment || '';

        this.loadExplainability();
        this.loadFinalRecommendation();
        //Auto scroll to summary
        setTimeout(() => {
          this.summarySection?.nativeElement.scrollIntoView({ behavior: 'smooth' });
        }, 50);
      },
      error: (err: any) => console.error(err)
    });
  }

  getAverageScoreClass(score: number): string {
    if (score >= 65) {
      return 'avg-danger';
    }
    if (score >= 35) {
      return 'avg-warning';
    }
    return 'avg-success';
  }

  submitLoanApplicationForAppraisal() {
    this.loanApplicationService.submitLoanApplicationForAppraisal(this.loanApplicationId).subscribe({
      next: (res: any) => {
        alert(`${res.message}`);
        this.router.navigate(['/loan-applications']);
      },
      error: (err) => alert(`Failed to submit for appraisal: ${err.error.message || err.statusText}`)
    });
  }

  backToPreScreen() {
    this.router.navigate(['/esg-pre-screen', this.loanApplicationId]);
  }

  loadExplainability() {
    this.aiService.getExplainability(this.loanApplicationId).subscribe({
      next: (res: any) => {
        this.explainability = res;
      },
      error: (err) => console.error('Explainability load failed', err)
    });
  }

  loadFinalRecommendation() {
    this.aiService.getFinalRecommendation(this.loanApplicationId).subscribe({
      next: (res: any) => {
        this.finalRecommendation = res;
        this.mlSignals = res.mlSignals;
        this.mapFinalRisk(res.riskLevel);
      },
      error: (err: any) => console.error('Final recommendation load failed', err)
    });
  }

  mapFinalRisk(riskLevel: number) {
    switch (riskLevel) {
      case 3:
        this.finalRiskLabel = 'High ESG Risk';
        this.finalRiskClass = 'p-chip-danger';
        break;
      case 2:
        this.finalRiskLabel = 'Medium ESG Risk';
        this.finalRiskClass = 'p-chip-warning';
        break;
      default:
        this.finalRiskLabel = 'Low ESG Risk';
        this.finalRiskClass = 'p-chip-success';
    }
  }

  getMlRiskClass(riskBand: string): string {
  switch (riskBand) {
    case 'High':
      return 'p-chip-danger';
    case 'Medium':
      return 'p-chip-warning';
    default:
      return 'p-chip-success';
  }
}
}