import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
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
