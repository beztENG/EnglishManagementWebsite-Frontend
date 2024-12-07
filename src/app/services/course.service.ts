import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'http://localhost:8080/course';


  constructor(private http: HttpClient) {}

  getAllCourses(): Observable<any> {
    return this.http.get(`${this.apiUrl}/all`);
  }

  activateCourse(courseId: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/activate/${courseId}`, {});
  }
  
  deactivateCourse(courseId: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/deactivate/${courseId}`, {});
  }

  getCourseById(courseId: string) {
    return this.http.get<any>(`${this.apiUrl}/get/${courseId}`);
  }
  
  updateCourse(course: any) {
    return this.http.put<any>(`${this.apiUrl}/update`, course);
  }

  addCourse(course: any): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/add`, course);
  }

  getAvailableCourses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/available`);
  }
}
