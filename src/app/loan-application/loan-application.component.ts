import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { LoanApplicationService } from '../services/loan-application.service';
import { Customer, LoanApplication } from '../models/loan-application.model';
import { debounceTime, distinctUntilChanged, catchError, of } from 'rxjs';
import { AutoCompleteSelectEvent } from 'primeng/autocomplete';

@Component({
  selector: 'app-loan-application',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, InputTextModule, DropdownModule, ButtonModule, CardModule, AutoCompleteModule],
  templateUrl: './loan-application.component.html',
  styleUrls: ['./loan-application.component.css']
})
export class LoanApplicationComponent implements OnInit {
  form: FormGroup;
  filteredCustomers: Customer[] = [];
  loadingCustomer = false;
  customerFound = false;

  products = [
    { label: 'Overdraft', value: '1' },
    { label: 'Term Loan', value: '2' },
    { label: 'Invoice Discounting', value: '3' },
    { label: 'Contingent', value: '4' },
  ];

  currencies = ['NGN', 'USD', 'EUR', 'GBP'];

  constructor(private fb: FormBuilder, private service: LoanApplicationService) {
    this.form = this.fb.group({
      customerId: [''],
      customerCode: ['', Validators.required],
      customerName: [{ value: '', disabled: true }],
      sector: [{ value: '', disabled: true }],
      amount: ['', Validators.required],
      currency: ['', Validators.required],
      tenorDays: ['', Validators.required],
      product: ['', Validators.required],
      interestRate: ['', Validators.required],
      loanPurpose: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  searchCustomer(event: any) {
    const query = event.query;
    if (!query) {
      this.filteredCustomers = [];
      return;
    }

    this.loadingCustomer = true;
    this.service.searchCustomer(query).pipe(
      debounceTime(300),
      distinctUntilChanged(),
      catchError(() => of([]))
    ).subscribe(customers => {
      this.filteredCustomers = customers;
      this.loadingCustomer = false;
    });
  }

  selectCustomer(event: AutoCompleteSelectEvent) {
    const customer = event.value as Customer;
    this.customerFound = true;
    this.form.patchValue({
      customerId: customer.customerId,
      customerCode: customer.customerCode,
      customerName: customer.customerName,
      sector: customer.sector
    }, { emitEvent: false });
  }

  submit() {
    if (this.form.invalid || !this.customerFound) {
      alert('Form invalid or no customer selected');
      return;
    }

    const payload: LoanApplication = { ...this.form.getRawValue() };
    this.service.submitLoanApplication(payload).subscribe({
      next: () => alert('Loan application submitted successfully'),
      error: () => alert('An error occurred while submitting')
    });
  }
}
