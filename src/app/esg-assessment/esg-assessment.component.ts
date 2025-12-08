import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-esg-assessment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './esg-assessment.component.html',
  styleUrls: ['./esg-assessment.component.css']
})
export class EsgAssessmentComponent implements OnInit {

  loanId!: number;
  totalScore = 0;
  riskRating = '';
  
  // Sample checklist (later fetched from API)
  checklist = [
    {
      id: 1,
      item: 'Does the company comply with environmental standards?',
      weight: 10,
      type: 'yesno',
      response: null, // yes or no
      score: 0
    },
    {
      id: 2,
      item: 'Level of carbon footprint management',
      weight: 15,
      type: 'levels',
      response: null, // low / medium / high
      score: 0
    },
    {
      id: 3,
      item: 'Sustainability reporting maturity',
      weight: 20,
      type: 'levels',
      response: null,
      score: 0
    }
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loanId = Number(this.route.snapshot.paramMap.get('id'));
  }

  updateScore(item: any) {
    if (item.type === 'yesno') {
      item.score = item.response === 'yes' ? item.weight : 0;
    } else {
      switch (item.response) {
        case 'low':
          item.score = item.weight * 0.3;
          break;
        case 'medium':
          item.score = item.weight * 0.6;
          break;
        case 'high':
          item.score = item.weight;
          break;
      }
    }

    this.calculateTotals();
  }

  calculateTotals() {
    this.totalScore = this.checklist
      .map(c => c.score)
      .reduce((a, b) => a + b, 0);

    // Determine rating
    if (this.totalScore >= 35) this.riskRating = 'Low Risk';
    else if (this.totalScore >= 20) this.riskRating = 'Medium Risk';
    else this.riskRating = 'High Risk';
  }
}