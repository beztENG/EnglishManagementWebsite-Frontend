import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScoreManagementService {

  private baseUrl = 'http://localhost:8080/teacher-communication';

  constructor(private http: HttpClient) {}

  getScore(classId: string, studentId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/get-score/${classId}/${studentId}`);
  }

  createScore(classId: string, studentId: string, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', token);
    return this.http.post(`${this.baseUrl}/create-score/${classId}/${studentId}`, null, { headers });
  }

  editScore(classId: string, studentId: string, midterm: number, finalExam: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/edit-score/${classId}/${studentId}`, null, {
      params: { midterm: midterm.toString(), finalExam: finalExam.toString() },
      responseType: 'text' as 'json'
    });
  }
}
