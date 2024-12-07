import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private baseUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) {}

  getUsersByRole(roleId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/get-by-role/${roleId}`);
  }
 
  getProfileStatus(userId: string): Observable<{ profileExists: boolean }> {
    return this.http.get<{ profileExists: boolean }>(`${this.baseUrl}/${userId}/profile-status`);
  }
}
