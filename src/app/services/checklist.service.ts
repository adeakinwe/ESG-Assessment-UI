import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChecklistItem } from '../models/checklist.model';
@Injectable({ providedIn: 'root' })
export class ChecklistService {
  private apiUrl = 'https://esg-risk-assessment-api-e8d8fsg7dgcbd7am.canadacentral-01.azurewebsites.net/api/checklist';

  constructor(private http: HttpClient) {}

  getChecklist(): Observable<ChecklistItem[]> {
    return this.http.get<ChecklistItem[]>(`${this.apiUrl}/checklist-item`);
  }

  submitAssessment(payload: any) {
  return this.http.post(
    `${this.apiUrl}/submit-esg-assessment`,
    payload
  );
}

getAssessmentByLoan(loanApplicationId: number) {
  return this.http.get<any[]>(
    `${this.apiUrl}/loan-application/${loanApplicationId}`
  );
}

getEsgAssessmentSummary(loanApplicationId: number) {
  return this.http.get<any[]>(
    `${this.apiUrl}/checklist-summary/${loanApplicationId}`
  );
}
}