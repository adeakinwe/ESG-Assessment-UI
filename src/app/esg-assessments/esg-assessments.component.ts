import { Component } from '@angular/core';
import { ChecklistService } from '../services/checklist.service';
import { ChecklistItem } from '../models/checklist.model';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

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
    ConfirmDialogModule
  ],
  templateUrl: './esg-assessments.component.html',
  styleUrl: './esg-assessments.component.css'
})
export class EsgAssessmentsComponent {

  loanApplicationId!: number;
  checklistItems: ChecklistItem[] = [];

  // checklistItemId -> responseValue
  selectedResponses: { [key: number]: number } = {};

  constructor(
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private checklistService: ChecklistService
  ) { }

  ngOnInit(): void {
    this.loanApplicationId = Number(this.route.snapshot.paramMap.get('id'));

    this.checklistService.getChecklist().subscribe({
      next: (data) => {
        this.checklistItems = data;
        // ✅ Load existing assessment 
        this.loadExistingAssessment();
      },
      error: (err) => console.error(err)
    });
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

    // 2️⃣ Build body
    const body = {
      loanApplicationId: this.loanApplicationId,
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
      next: (res: any) => alert(`${res.message}`),
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
      },
      error: (err: any) => console.error(err)
    });
  }
}