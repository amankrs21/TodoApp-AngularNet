import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'token';
  private tokenSubject = new BehaviorSubject<string | null>(null);
  token$ = this.tokenSubject.asObservable();

  constructor() {
    // Retrieve token from localStorage on service initialization
    const storedToken = localStorage.getItem(this.tokenKey);
    this.setToken(storedToken);
  }

  setToken(token: string | null) {
    // Store token in localStorage
    if (token) {
      localStorage.setItem(this.tokenKey, token);
    } else {
      localStorage.removeItem(this.tokenKey);
    }

    // Update the subject with the new token value
    this.tokenSubject.next(token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    if (token && !this.isTokenExpired(token)) {
      return true;
    }
    if (token) {
      localStorage.removeItem('token');
    }
    return false;
  }

  private isTokenExpired(token: string): boolean {
    const decodedToken = this.decodeToken(token);
    if (!decodedToken) {
      return true;
    }
    const currentTime = Date.now() / 1000;

    return decodedToken && decodedToken.exp && decodedToken.exp < currentTime;
  }

  private decodeToken(token: string): any {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      console.error('Error decoding token:', e);
      return null;
    }
  }
}
