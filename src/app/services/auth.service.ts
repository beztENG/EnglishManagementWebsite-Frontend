import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'; // <-- Add this import

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth/login';
  private baseUrl = 'http://localhost:8080/auth';
  private registerUrl = 'http://localhost:8080/auth/register';

  constructor(private http: HttpClient) {}

  login(userName: string, password: string): Observable<any> {
    const body = new HttpParams()
        .set('userName', userName)
        .set('password', password);
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    return this.http.post<any>(this.apiUrl, body.toString(), { headers, responseType: 'json' })
        .pipe(tap(response => {
            if (response.token) {
                this.storeToken(response.token);
                console.log('Stored token:', response.token);
            }
        }));
}

  storeToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  clearToken(): void {
    localStorage.removeItem('authToken');
  }

  getCountsByRole(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}` 
    });
    return this.http.get(`${this.baseUrl}/count-by-role`, { headers });
  }

  register(userName: string, password: string, roleId: string): Observable<any> {
    const body = new HttpParams()
      .set('userName', userName)
      .set('password', password)
      .set('roleId', roleId);

    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    return this.http.post(this.registerUrl, body.toString(), { headers });
}

}