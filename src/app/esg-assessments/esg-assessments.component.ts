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

@Component({
  selector: 'app-esg-assessments',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DropdownModule,
    ButtonModule,
    CardModule,
    SelectButtonModule
  ],
  templateUrl: './esg-assessments.component.html',
  styleUrl: './esg-assessments.component.css'
})
export class EsgAssessmentsComponent {

  loanId!: number;
  checklistItems: ChecklistItem[] = [];

  // checklistItemId -> responseValue
  selectedResponses: { [key: number]: number } = {};

  constructor(
    private route: ActivatedRoute,
    private checklistService: ChecklistService
  ) {}

  ngOnInit(): void {
    this.loanId = Number(this.route.snapshot.paramMap.get('id'));

    this.checklistService.getChecklist().subscribe({
      next: (data) => this.checklistItems = data,
      error: (err) => console.error(err)
    });
  }

  onSelect(itemId: number) {
    console.log('Selected:', itemId, this.selectedResponses[itemId]);
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
      loanApplicationId: this.loanId,
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
      error: (err) => alert(`Submission failed: ${err.message || err.statusText}`)
    });
  }
}