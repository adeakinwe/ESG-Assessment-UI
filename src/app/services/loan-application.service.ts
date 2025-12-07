import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { Customer, LoanApplication } from '../models/loan-application.model';

@Injectable({ providedIn: 'root' })
export class LoanApplicationService {
  private apiUrl = 'https://localhost:5001/api'; // adjust backend URL

  constructor(private http: HttpClient) {}

  // Search customer with mock delay and pipe+map
  searchCustomer(code: string): Observable<Customer[]> {
    // Mock data for demonstration
    const mockCustomers: Customer[] = [
      { customerId: 1, customerCode: 'CUST001', customerName: 'John Doe', sector: 'Finance' },
      { customerId: 2, customerCode: 'CUST002', customerName: 'Jane Smith', sector: 'Energy' },
      { customerId: 3, customerCode: 'CUST003', customerName: 'Bob Johnson', sector: 'Manufacturing' },
      { customerId: 4, customerCode: 'CUST004', customerName: 'Alice Brown', sector: 'Technology' }
    ];

    return of(mockCustomers).pipe(
      delay(500), // simulate backend response time
      map(customers =>
        customers.filter(c => c.customerCode.toLowerCase().includes(code.toLowerCase()))
      )
    );
  }

  submitLoanApplication(payload: LoanApplication): Observable<any> {
    // Real backend call:
    // return this.http.post(`${this.apiUrl}/loanapplications`, payload);

    // Mock submission for demo:
    console.log('Submitting loan application:', payload);
    return of({ success: true }).pipe(delay(500));
  }
}