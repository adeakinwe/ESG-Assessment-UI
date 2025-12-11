import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChecklistItem } from '../models/checklist.model';
@Injectable({ providedIn: 'root' })
export class ChecklistService {
  private apiUrl = 'http://localhost:5010/api/checklist';

  constructor(private http: HttpClient) {}

  getChecklist(): Observable<ChecklistItem[]> {
    return this.http.get<ChecklistItem[]>(`${this.apiUrl}/checklist-item`);
  }
}