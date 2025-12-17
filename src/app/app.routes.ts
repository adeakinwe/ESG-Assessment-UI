import { Route } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoanApplicationComponent } from './loan-application/loan-application.component';
import { LoanApplicationListComponent } from './loan-application-list/loan-application-list.component';
import { EsgAssessmentsComponent } from './esg-assessments/esg-assessments.component';
import { EsgAiPreScreenComponent } from './esg-ai-pre-screen/esg-ai-pre-screen.component';

export const routes: Route[] = [
{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },
{ path: 'dashboard', component: DashboardComponent },
//{ path: 'profile-customer', component: ProfileCustomerComponent },
{ path: 'loan-application', component: LoanApplicationComponent },
{ path: 'loan-applications', component: LoanApplicationListComponent },
{ path: 'esg-assessment/:id/:submitted', component: EsgAssessmentsComponent },
{ path: 'esg-pre-screen/:id', component: EsgAiPreScreenComponent },
// { path: 'esg-checklist', component: EsgAssessmentsComponent },
];