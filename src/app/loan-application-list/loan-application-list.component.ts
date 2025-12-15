import { Component, OnInit } from '@angular/core';
import { TableModule } from "primeng/table";
import { PanelModule } from 'primeng/panel';
import { CommonModule } from '@angular/common';
import { LoanApplicationService } from '../services/loan-application.service';
import { LoanApplication } from '../models/loan-application.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loan-application-list',
  standalone: true,
  imports: [TableModule, PanelModule, CommonModule],
  templateUrl: './loan-application-list.component.html',
  styleUrl: './loan-application-list.component.css'
})
export class LoanApplicationListComponent implements OnInit {
  loanApplications: LoanApplication[] = [];

  ngOnInit() {
    this.loadLoans();
  }

  constructor(private router: Router, private loanService: LoanApplicationService) { }

  loanApp = [
    {
      id: 1,
      customerName: "GreenTech Industries",
      sector: "Renewable Energy",
      product: "ESG Term Loan",
      amount: 50000000,
      interest: 6.5,
      currency: "USD"
    },
    {
      id: 2,
      customerName: "EcoBuild Ltd",
      sector: "Construction",
      product: "Sustainability Loan",
      amount: 15000000,
      interest: 5.2,
      currency: "NGN"
    }
  ];

  onRowSelected(event: any) {
    console.log("Selected loan:", event.data);

    // Navigate, open modal, load details, etc.
    // this.router.navigate(['/loan-details', event.data.id]);
  }

  loadLoans() {
    this.loanService.getLoanApplications().subscribe({
      next: (data) => this.loanApplications = data,
      error: (err) => console.error('Error fetching loans:', err)
    });
  }

  openAssessment(row: LoanApplication) {
    this.router.navigate(['/esg-assessment', row.loanApplicationId, row.submittedForAppraisal]);
  }

  getStatusClass(statusId: number): string {
    switch (statusId) {
      case 0:
        return 'status-pending';
      case 1:
        return 'status-in-progress';
      case 2:
        return 'status-approved';
      case 3:
        return 'status-rejected';
      case 4:
        return 'status-in-progress';
      case 5:
        return 'status-referred';
      default:
        return 'status-pending';
    }
  }

  getRiskClass(riskRatingId: number): string {
  switch (riskRatingId) {
    case 1:
      return 'risk-low';
    case 2:
      return 'risk-medium';
    case 3:
      return 'risk-high';
    default:
      return 'risk-not-rated';
  }
}

}
