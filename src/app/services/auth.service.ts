import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private _http: HttpClient
  ) { }

  login(email: string, password: string) {
    const body = { email, password };
    return this._http.post<APIResponse>(`${environment.API_URL}/api/auth/login`, body)
  }

  register(user: User) {
    return this._http.post<APIResponse>(`${environment.API_URL}/api/auth/register`, user);
  }

  logout() {
    localStorage.removeItem('token');
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  emailValidator() {
    const emailRegex =
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return (control: any) => {
      if (!control.value) return null;
      return emailRegex.test(control.value) ? null : { email: true };
    };
  }

}

export interface APIResponse {
  message: string;
  token: string;
}

