import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ScheduleItem {
  date: string;
  startDate: string;
  endDate: string; 
}

export interface Timetable {
  classId: string;
  schedule: ScheduleItem[];
}

export interface ClassWithTimetable {
  classInfo: any;
  timetable: Timetable | null;
}

@Injectable({
  providedIn: 'root'
})
export class TimetableService {
  private baseUrl = 'http://localhost:8080/timetable';

  constructor(private http: HttpClient) {}

  fetchTimetable(classId: string): Observable<Timetable> {
    return this.http.get<Timetable>(`${this.baseUrl}/get/${classId}`);
  }

  createTimetable(classId: string, schedule: ScheduleItem[]): Observable<Timetable> {
    return this.http.post<Timetable>(`${this.baseUrl}/create/${classId}`, schedule);
}

  updateTimetable(classId: string, schedule: ScheduleItem[]): Observable<Timetable> {
    return this.http.put<Timetable>(`${this.baseUrl}/update/${classId}`, schedule, {responseType: 'text' as 'json'},);
  }

  deleteTimetable(classId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${classId}`);
  }

  getClassesByDate(date: string): Observable<Array<{ classId: string; startDate: string; endDate: string }>> {
    const url = `${this.baseUrl}/classes-by-date?date=${date}`;
    const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` }; 
    return this.http.get<Array<{ classId: string; startDate: string; endDate: string }>>(url, { headers });
  }
  
    getStudentClassesAndTimetable(studentId: string): Observable<ClassWithTimetable[]> {
      const url = `${this.baseUrl}/student/${studentId}`;
      const headers = { Authorization: `Bearer ${localStorage.getItem('authToken')}` };
      return this.http.get<ClassWithTimetable[]>(url, { headers });
    }

  getTeacherSchedule(teacherId: string): Observable<Timetable[]> {
    return this.http.get<Timetable[]>(`${this.baseUrl}/teacher/${teacherId}`);
  }

}