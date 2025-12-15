import { Route, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoanApplicationComponent } from './loan-application/loan-application.component';
import { LoanApplicationListComponent } from './loan-application-list/loan-application-list.component';
import { EsgAssessmentsComponent } from './esg-assessments/esg-assessments.component';

export const routes: Route[] = [
{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },
{ path: 'dashboard', component: DashboardComponent },
//{ path: 'profile-customer', component: ProfileCustomerComponent },
{ path: 'loan-application', component: LoanApplicationComponent },
{ path: 'loan-applications', component: LoanApplicationListComponent },
{ path: 'esg-assessment/:id/:submitted', component: EsgAssessmentsComponent },
// { path: 'esg-checklist', component: EsgAssessmentsComponent },
];