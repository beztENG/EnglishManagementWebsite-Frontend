import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassManagementService {
  private ClassManagementUrl = 'http://localhost:8080/class-management';
  private ClassSupervisionUrl = 'http://localhost:8080/class';

  constructor(private http: HttpClient) {}

  //Class management section
  getAllClassManagement(): Observable<any[]> {
    return this.http.get<any[]>(`${this.ClassManagementUrl}/get-all`);
  }

  hideCourse(courseId: string): Observable<any> {
    return this.http.put(`${this.ClassManagementUrl}/hide/${courseId}`, {});
  }

  exposeCourse(courseId: string): Observable<any> {
    return this.http.put(`${this.ClassManagementUrl}/expose/${courseId}`, {});
  }

  addClassToCourse(courseId: string, classId: string): Observable<string> {
    return this.http.put<string>(`${this.ClassManagementUrl}/add-class/${courseId}/${classId}`, {}, { responseType : 'json'});
  }

  removeClassFromCourse(courseId: string, classId: string): Observable<string> {
    return this.http.put<string>(`${this.ClassManagementUrl}/remove-class/${courseId}/${classId}`, {}, { responseType : 'json'});
  }

  createClassManagement(classManagement: any): Observable<any> {
    return this.http.post(`${this.ClassManagementUrl}/create`, classManagement);
  }

  //Class supervision section
  getAllClasses(): Observable<any> {
    return this.http.get(`${this.ClassSupervisionUrl}/get-all`);
  }

  createClass(classInfo: any): Observable<any> {
    return this.http.post(`${this.ClassSupervisionUrl}/create`, classInfo);
  }

  viewClass(classId: string): Observable<any> {
    return this.http.get(`${this.ClassSupervisionUrl}/view/${classId}`);
  }

  updateClass(classId: string, updatedClass: any): Observable<any> {
    return this.http.put(`${this.ClassSupervisionUrl}/update/${classId}`, updatedClass);
  }

  
}
