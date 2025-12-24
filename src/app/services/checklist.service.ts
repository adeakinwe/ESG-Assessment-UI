import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChecklistItem } from '../models/checklist.model';
import { AppConfigService } from './app-config.service';
@Injectable({ providedIn: 'root' })
export class ChecklistService {
  private baseApiUrl: string;
  //private baseApiUrl = 'https://esg-risk-assessment-api-e8d8fsg7dgcbd7am.canadacentral-01.azurewebsites.net/api/checklist';

  constructor(private http: HttpClient, private config: AppConfigService) {
    this.baseApiUrl = `${this.config.baseApiUrl}/checklist`;
  }

  getChecklist(): Observable<ChecklistItem[]> {
    return this.http.get<ChecklistItem[]>(`${this.baseApiUrl}/checklist-item`);
  }

  submitAssessment(payload: any) {
  return this.http.post(
    `${this.baseApiUrl}/submit-esg-assessment`,
    payload
  );
}

getAssessmentByLoan(loanApplicationId: number) {
  return this.http.get<any[]>(
    `${this.baseApiUrl}/loan-application/${loanApplicationId}`
  );
}

getEsgAssessmentSummary(loanApplicationId: number) {
  return this.http.get<any[]>(
    `${this.baseApiUrl}/checklist-summary/${loanApplicationId}`
  );
}
}