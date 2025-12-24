import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { PreScreenRequest, EsgAiRecommendationDTO } from '../models/esg-ai.model';
import { AppConfigService } from './app-config.service';

@Injectable({ providedIn: 'root' })
export class EsgAiRecommendationService {
  private baseApiUrl: string;
  //private baseApiUrl = 'https://esg-risk-assessment-api-e8d8fsg7dgcbd7am.canadacentral-01.azurewebsites.net/api'; // adjust backend URL

  constructor(private http: HttpClient, private config: AppConfigService) {
    this.baseApiUrl = this.config.baseApiUrl;
  }

  preScreen(request: PreScreenRequest): Observable<any> {
    return this.http.post<EsgAiRecommendationDTO>(`${this.baseApiUrl}/esg-ai-recommendation/pre-screen`, request).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(error => {
        console.error('Error obtaining pre-screening info:', error);
        return of({ success: false, message: 'Failed to obtain pre-screening info' });
      })
    );
  }

  getExplainability(loanApplicationId: number): Observable<any> {
    return this.http.get<any>(`${this.baseApiUrl}/esg/explainability/${loanApplicationId}`).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(error => {
        console.error('Error obtaining explainability info:', error);
        return of({ success: false, message: 'Failed to obtain explainability info' });
      })
    );
  }

  getFinalRecommendation(loanApplicationId: number): Observable<any> {
    return this.http.get<any>(`${this.baseApiUrl}/esg-ai-recommendation/final/${loanApplicationId}`).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(error => {
        console.error('Error obtaining final recommendation:', error);
        return of({ success: false, message: 'Failed to obtain final recommendation' });
      })
    );
  }
}
