import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClassRegisterService {
  private baseUrl = 'http://localhost:8080/class-registration'; 
  private baseUrl1 = 'http://localhost:8080/student-management';

  constructor(private http: HttpClient) {}

  registerForClass(classId: string): Observable<string> {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    };
    return this.http.post<string>(`${this.baseUrl}/register/${classId}`, null, {
      headers,
      responseType: 'text' as 'json',
    });
  }
  
  cancelRegistration(classId: string): Observable<string> {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('authToken')}`, 
    };
    return this.http.delete<string>(`${this.baseUrl}/cancel/${classId}`, { headers });
  }

  getClassRegistrations(classId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/get-registrations/${classId}`);
  }

    getWaitingList(classId: string): Observable<any[]> {
      return this.http.get<any[]>(`${this.baseUrl}/waiting-list/${classId}`);
    }

  approveWaitingListStudent(studentId: string, classId: string): Observable<string> {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    };
    return this.http.put<string>(
      `${this.baseUrl1}/approve-waiting/${studentId}/${classId}`,
      {},
      { headers }
    );
  }

  addStudentToClass(studentId: string, classId: string): Observable<string> {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    };
    return this.http.post<string>(
      `${this.baseUrl1}/add-to-class/${studentId}/${classId}`,
      null,
      { headers }
    );
  }
}
