import { Route } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoanApplicationComponent } from './loan-application/loan-application.component';
import { LoanApplicationListComponent } from './loan-application-list/loan-application-list.component';
import { EsgAssessmentsComponent } from './esg-assessments/esg-assessments.component';
import { EsgAiPreScreenComponent } from './esg-ai-pre-screen/esg-ai-pre-screen.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

export const routes: Route[] = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  //{ path: 'profile-customer', component: ProfileCustomerComponent },
  { path: 'loan-application', component: LoanApplicationComponent, canActivate: [AuthGuard] },
  { path: 'loan-applications', component: LoanApplicationListComponent, canActivate: [AuthGuard] },
  { path: 'esg-assessment/:id/:submitted', component: EsgAssessmentsComponent, canActivate: [AuthGuard] },
  { path: 'esg-pre-screen/:id', component: EsgAiPreScreenComponent, canActivate: [AuthGuard] },
  // { path: 'esg-checklist', component: EsgAssessmentsComponent, canActivate: [AuthGuard] },
];
