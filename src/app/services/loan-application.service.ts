import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, delay, catchError } from 'rxjs/operators';
import { Customer, LoanApplication } from '../models/loan-application.model';

@Injectable({ providedIn: 'root' })
export class LoanApplicationService {
  private apiUrl = 'http://localhost:5010/api'; // adjust backend URL

  constructor(private http: HttpClient) {}

  // Search customer with mock delay and pipe+map
  // searchCustomer(code: string): Observable<Customer[]> {
  //   // Mock data for demonstration
  //   const mockCustomers: Customer[] = [
  //     { customerId: 1, customerCode: 'CUST001', customerName: 'John Doe', sector: 'Finance' },
  //     { customerId: 2, customerCode: 'CUST002', customerName: 'Jane Smith', sector: 'Energy' },
  //     { customerId: 3, customerCode: 'CUST003', customerName: 'Bob Johnson', sector: 'Manufacturing' },
  //     { customerId: 4, customerCode: 'CUST004', customerName: 'Alice Brown', sector: 'Technology' }
  //   ];

  //   return of(mockCustomers).pipe(
  //     delay(500), // simulate backend response time
  //     map(customers =>
  //       customers.filter(c => c.customerCode.toLowerCase().includes(code.toLowerCase()))
  //     )
  //   );
  // }

  searchCustomer(param: string): Observable<Customer[]> {
    const params = new HttpParams().set('param', param);
      return this.http.get<Customer[]>(`${this.apiUrl}/customer/search`, { params });
  }

  // submitLoanApplication(payload: LoanApplication): Observable<any> {
  //   // Real backend call:
  //   return this.http.post(`${this.apiUrl}/loanapplications`, payload);

  //   // Mock submission for demo:
  //   // console.log('Submitting loan application:', payload);
  //   // return of({ success: true }).pipe(delay(500));
  // }

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
}