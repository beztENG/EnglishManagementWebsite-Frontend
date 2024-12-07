import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentManagementService {
  private baseUrl = 'http://localhost:8080/student-management';

  constructor(private http: HttpClient) {}

  addStudentToClass(studentId: string, classId: string): Observable<string> {
    const headers = this.createAuthorizationHeader();
    return this.http.post<string>(`${this.baseUrl}/add-to-class/${studentId}/${classId}`, null, { headers });
  }

  approveWaitingListStudent(studentId: string, classId: string): Observable<string> {
    const headers = this.createAuthorizationHeader();
    return this.http.put<string>(`${this.baseUrl}/approve-waiting/${studentId}/${classId}`, null, { headers });
  }

  private createAuthorizationHeader(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }
}
