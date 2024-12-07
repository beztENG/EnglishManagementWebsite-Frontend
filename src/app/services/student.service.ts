// src/app/services/student.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private baseUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) {}

  getUsersByRole(roleId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/get-by-role/${roleId}`);
  }
 
  getProfileStatus(userId: string): Observable<{ profileExists: boolean }> {
    return this.http.get<{ profileExists: boolean }>(`${this.baseUrl}/${userId}/profile-status`);
  }

  private getHeaders() {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer your-token-here`,
      }),
    };
  }
}