import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, delay, catchError } from 'rxjs/operators';
import { Customer, LoanApplication, LoanApplicationResDTO } from '../models/loan-application.model';

@Injectable({ providedIn: 'root' })
export class LoanApplicationService {
  private apiUrl = 'http://localhost:5010/api'; // adjust backend URL

  constructor(private http: HttpClient) {}

  searchCustomer(param: string): Observable<Customer[]> {
    const params = new HttpParams().set('param', param);
      return this.http.get<Customer[]>(`${this.apiUrl}/customer/search`, { params });
  }

  submitLoanApplication(payload: LoanApplication): Observable<any> {
    return this.http.post(`${this.apiUrl}/loan-application/add`, payload).pipe(
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
      return this.http.get<LoanApplication[]>(`${this.apiUrl}/loan-application/all`);
    }

    getLoanApplicationsById(loanApplicationId: number): Observable<LoanApplicationResDTO> {
      return this.http.get<LoanApplicationResDTO>(`${this.apiUrl}/loan-application/${loanApplicationId}`);
    }

    submitLoanApplicationForAppraisal(loanApplicationId: number): Observable<any> {
      return this.http.get(`${this.apiUrl}/loan-application/submit-for-appraisal/${loanApplicationId}`).pipe(
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