import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly _httpClient = inject(HttpClient);

  validateUser(): Observable<IAuthSuccessResponse> {
    return this._httpClient.get<IAuthSuccessResponse>(`${environment.apiUrl}/protected`)
  }

  login(email: string, password: string): Observable<ILoginSuccessResponse> {
    return this._httpClient.post<ILoginSuccessResponse>(`${environment.apiUrl}/users/login`, { email, password })
  }
}
