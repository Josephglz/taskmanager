import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private _http: HttpClient
  ) { }

  login(email: string, password: string) {
    const body = { email, password };
    return this._http.post<LoginResponse>(`${environment.API_URL}/api/auth/login`, body)
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }
}

export interface LoginResponse {
  message: string;
  token: string;
}
