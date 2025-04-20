import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { AuthResponse } from '../../interfaces/auth-response';
import { RegisterRequest } from '../../interfaces/register-request';
import { RegisterResponse } from '../../interfaces/register-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }
  
  login(data: { email: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/api/auth`, data);
  }

  register( data: RegisterRequest): Observable<RegisterResponse>{
    return this.http.post<RegisterResponse>(`${this.apiUrl}/api/users`, data);
  }

  validateToken(token: string): Observable<AuthResponse> {
    const headers = new HttpHeaders({
      'x-token': token
    })

    return this.http.get<AuthResponse>(`${this.apiUrl}/api/auth`, { headers })
  }
}
