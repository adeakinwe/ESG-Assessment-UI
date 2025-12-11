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
  imports: [CommonModule, FormsModule, DropdownModule, ButtonModule, CardModule, SelectButtonModule],
  templateUrl: './esg-assessments.component.html',
  styleUrl: './esg-assessments.component.css'
})
export class EsgAssessmentsComponent {
  loanId!: number
  checklistItems: ChecklistItem[] = [];
  selectedResponses: { [key: number]: number } = {};  

  constructor(private route: ActivatedRoute, private checklistService: ChecklistService) {}

  ngOnInit(): void {
    this.loanId = Number(this.route.snapshot.paramMap.get('id'));
    this.checklistService.getChecklist().subscribe({
      next: (data) => (this.checklistItems = data),
      error: (err) => console.error(err)
    });
  }

  onSelect(itemId: number) {
    console.log('Selected: ', itemId, this.selectedResponses[itemId]);
  }
}
