import { inject, Injectable, signal } from '@angular/core';
import { COMMON_SHARED_CONFIGURATION } from '../../modules/common-shared/configuration/common-shared.config';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { RegisterRequest } from '../models/register.request';
import { LoginRequest } from '../models/login.request';
import { Helpers } from '../../modules/common-shared/services/helpers';
import { User } from '../../modules/common-shared/models/user';
import { ConfirmEmailRequest } from '../models/confirm-email.request';
import { Response } from '../../modules/common-shared/models/response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = `${environment.apiUrl}/${COMMON_SHARED_CONFIGURATION.auth.url}`

  userSignal = signal<User | null | undefined>(undefined);

  http = inject(HttpClient);

  get user() {
    return this.userSignal;
  }

  fetchUser(): Observable<Response> {
    return this.http.get<Response>(`${this.baseUrl}/user`).pipe(
      tap(response => {
          this.userSignal.set(response.payload)
        }
      )
    );
  }

  clearUser() {
    this.userSignal.set(null);
  }

  login(request: LoginRequest): Observable<Response> {
    return this.http.post<Response>(
      `${this.baseUrl}/login`,
      request
    );
  }

  register(request: RegisterRequest): Observable<Response> {
    return this.http.post<Response>(
      `${this.baseUrl}/register`,
      request
    );
  }

  confirmEmail(request: ConfirmEmailRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/confirm-email`, request)
  }

  logout(): Observable<any> {
    return this.http.get(`${this.baseUrl}/logout`);
  }
}
