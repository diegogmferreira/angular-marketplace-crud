import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  getUserToken(): string {
    return localStorage.getItem('auth-token') || '';
  }

  setUserToken(token: string): void {
    localStorage.setItem('auth-token', token);
  }
}
