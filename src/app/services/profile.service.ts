import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profile } from '../components/interfaces/profile.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private baseUrl = 'http://localhost:8080/profile';

  constructor(private http: HttpClient) {}

  getProfile(token: string): Observable<Profile> {
    return this.http.get<Profile>(`${this.baseUrl}/get`);
  }

  createProfile(profile: Profile, token: string): Observable<Profile> {
    return this.http.post<Profile>(`${this.baseUrl}/create`, profile);
  }

  updateProfile(profile: Profile, token: string): Observable<Profile> {
    return this.http.put<Profile>(`${this.baseUrl}/update`, profile);
  }
  

  getProfileByCode(code: string): Observable<Profile> {
    return this.http.get<Profile>(`${this.baseUrl}/get/${code}`);
  }
  
  
}
