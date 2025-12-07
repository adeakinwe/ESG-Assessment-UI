import { Route, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoanApplicationComponent } from './loan-application/loan-application.component';

export const routes: Route[] = [
{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },
{ path: 'dashboard', component: DashboardComponent },
//{ path: 'profile-customer', component: ProfileCustomerComponent },
{ path: 'loan-application', component: LoanApplicationComponent },
//{ path: 'credit-applications', component: CreditApplicationsComponent }
];