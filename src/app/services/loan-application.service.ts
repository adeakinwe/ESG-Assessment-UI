import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Customer, LoanApplication, LoanApplicationResDTO } from '../models/loan-application.model';
import { AppConfigService } from './app-config.service';

@Injectable({ providedIn: 'root' })
export class LoanApplicationService {
  private baseApiUrl: string;
  //private baseApiUrl = 'http://localhost:5010/api'; // adjust backend URL

  constructor(private http: HttpClient, private config: AppConfigService) {
    this.baseApiUrl = this.config.baseApiUrl;
  }

  searchCustomer(param: string): Observable<Customer[]> {
    const params = new HttpParams().set('param', param);
      return this.http.get<Customer[]>(`${this.baseApiUrl}/customer/search`, { params });
  }

  submitLoanApplication(payload: LoanApplication): Observable<any> {
    return this.http.post(`${this.baseApiUrl}/loan-application/add`, payload).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(error => {
        console.error('Error submitting loan application:', error);
        return of({ success: false, message: 'Failed to submit loan application' });
      })
    );
  }

    getLoanApplications(): Observable<LoanApplication[]> {
      return this.http.get<LoanApplication[]>(`${this.baseApiUrl}/loan-application/all`);
    }

    getLoanApplicationsById(loanApplicationId: number): Observable<LoanApplicationResDTO> {
      return this.http.get<LoanApplicationResDTO>(`${this.baseApiUrl}/loan-application/${loanApplicationId}`);
    }

    submitLoanApplicationForAppraisal(loanApplicationId: number): Observable<any> {
      return this.http.get(`${this.baseApiUrl}/loan-application/submit-for-appraisal/${loanApplicationId}`).pipe(
        map((response: any) => {
          return response;
        }),
        catchError(error => {
          console.error('Error submitting loan application for appraisal:', error);
          return of({ success: false, message: 'Failed to submit loan application for appraisal' });
        })
      );
    }
}