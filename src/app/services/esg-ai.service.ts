import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { PreScreenRequest, EsgAiRecommendationDTO } from '../models/esg-ai.model';

@Injectable({ providedIn: 'root' })
export class EsgAiRecommendationService {
  private apiUrl = 'http://localhost:5010/api'; // adjust backend URL

  constructor(private http: HttpClient) {}

  preScreen(request: PreScreenRequest): Observable<any> {
    return this.http.post<EsgAiRecommendationDTO>(`${this.apiUrl}/esg-ai-recommendation/pre-screen`, request).pipe(
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
    return this.http.get<any>(`${this.apiUrl}/esg/explainability/${loanApplicationId}`).pipe(
          map((response: any) => {
            return response;
          }),
          catchError(error => {
            console.error('Error obtaining explainability info:', error);
            return of({ success: false, message: 'Failed to obtain explainability info' });
          })
        );
  }
}
