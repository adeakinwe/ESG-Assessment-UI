import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoanApplicationService } from '../services/loan-application.service';
import { EsgAiRecommendationService } from '../services/esg-ai.service';
import { LoanApplicationResDTO } from '../models/loan-application.model';
import { EsgAiRecommendationDTO } from '../models/esg-ai.model';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { ProgressBarModule } from 'primeng/progressbar';

@Component({
  selector: 'app-esg-pre-screen',
  standalone: true,
  imports: [CommonModule, ButtonModule, CardModule, ProgressBarModule, ChipModule],
  templateUrl: './esg-ai-pre-screen.component.html',
  styleUrls: ['./esg-ai-pre-screen.component.css']
})
export class EsgAiPreScreenComponent implements OnInit {
  selectedLoan!: LoanApplicationResDTO;
  aiRecommendation!: EsgAiRecommendationDTO;
  loading = false;
  riskLabel = '';
  riskClass = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loanService: LoanApplicationService,
    private aiService: EsgAiRecommendationService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const loanId = params.get('id');
      if (loanId) this.loadLoanDetails(+loanId);
    });
  }

  loadLoanDetails(loanId: number) {
    this.loading = true;
    this.loanService.getLoanApplicationsById(loanId).subscribe({
      next: loan => {
        this.selectedLoan = loan;
        this.getPreScreenRecommendation();
      },
      error: err => {
        console.error('Failed to load loan', err);
        this.loading = false;
      }
    });
  }

  getPreScreenRecommendation() {
    const request = {
      loanApplicationId: this.selectedLoan.loanApplicationId,
      sectorId: this.selectedLoan.sectorId,
      productId: this.selectedLoan.productId,
      loanAmount: this.selectedLoan.amount,
      country: 'NG'
    };

    this.aiService.preScreen(request).subscribe({
      next: res => {
        this.aiRecommendation = res;
        this.mapRisk(res.riskLevel);
        this.loading = false;
      },
      error: err => {
        console.error('Failed to get AI recommendation', err);
        this.loading = false;
      }
    });
  }

    mapRisk(riskLevel: number) {
    switch (riskLevel) {
      case 3:
        this.riskLabel = 'High ESG Risk';
        this.riskClass = 'risk-high';
        break;
      case 2:
        this.riskLabel = 'Medium ESG Risk';
        this.riskClass = 'risk-medium';
        break;
      default:
        this.riskLabel = 'Low ESG Risk';
        this.riskClass = 'risk-low';
    }
  }

  mapImpactClass(impact: string): string {
  switch (impact.toLowerCase()) {
    case 'positive': return 'positive';
    case 'neutral': return 'neutral';
    case 'negative': return 'negative';
    default: return '';
  }
}

  proceedToAssessment() {
    this.router.navigate(['/esg-assessment', this.selectedLoan.loanApplicationId, this.selectedLoan.submittedForAppraisal]);
  }

  backToCreditApplications() {
    this.router.navigate(['/loan-applications']);
  }
}
