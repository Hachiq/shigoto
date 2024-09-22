import { Injectable } from '@angular/core';
import { COMMON_SHARED_CONFIGURATION } from '../../modules/common-shared/configuration/common-shared.config';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from '../../modules/common-shared/services/storage/local-storage.service';
import { map, mergeMap, Observable, of, tap, throwError } from 'rxjs';
import { RegisterRequest } from '../models/register.request';
import { LoginRequest } from '../models/login.request';
import { Helpers } from '../../modules/common-shared/services/helpers';
import { User } from '../../modules/common-shared/models/user';
import { VALIDATORS } from '../../modules/common-shared/constants/validators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = `${environment.apiUrl}/${COMMON_SHARED_CONFIGURATION.auth.url}`

  isAuthenticated$: Observable<boolean | undefined>;

  constructor(
    private http: HttpClient,
    private storage: LocalStorageService
  ) {
    this.isAuthenticated$ = this.storage.isAuthenticated$;
  }

  login(request: LoginRequest) {
    return this.http.post(
      `${this.baseUrl}/login`,
      request,
      {
        responseType: 'text',
        withCredentials: true
      }
    ).pipe(
      mergeMap((response: any) => {
        try {
          const parsedResponse = JSON.parse(response);
          if (parsedResponse.errorType === "InvalidCredentials") {
            return throwError(() => new Error(VALIDATORS.InvalidCredentials));
          }
          return throwError(() => new Error('Error during logging in'))
        } catch {
          return of(response);
        }
      }),
      tap((loginResponse) => {
        this.setToken(loginResponse);
      })
    );
  }

  register(request: RegisterRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, request).pipe(
      mergeMap((registerResponse: any) => {
        if (registerResponse.hasConflict) {
          return throwError(() => new Error(VALIDATORS.Conflict));
        }
        return this.login(registerResponse);
      }),
      tap((loginResponse) => {
        this.setToken(loginResponse);
      })
    );
  }

  public refreshToken() : Observable<string> {
    const response = this.http.get(
      `${this.baseUrl}/refresh-token`,
      {
        responseType: 'text',
        withCredentials: true
      }
    );
    return response;
  }

  public logout(): Observable<any> {
    this.clearToken();
    const response = this.http.get(`${this.baseUrl}/logout`, { withCredentials: true });
    return response;
  }

  public async getAuthorizationHeaders() {
    const token = await this.getToken();

    let headers;
    if (token) {
      headers = { Authorization: `Bearer ${token}` }
    }
    return headers;
  }

  public async getCurrentUser(): Promise<User> {
    const token = await this.getToken();
    const decodedJwt = Helpers.decodeJwt(token);
    const user = {
      id: decodedJwt?.payload.id,
      name: decodedJwt?.payload.name,
      email: decodedJwt?.payload.email
    };
    return user;
  }

  async clearToken() {
    await this.storage.remove(COMMON_SHARED_CONFIGURATION.auth.tokenKey);
  }

  public async setToken(token: string) {
    await this.storage.store(COMMON_SHARED_CONFIGURATION.auth.tokenKey, token);
  }

  private async getToken() {
    return await this.storage.retrieve(COMMON_SHARED_CONFIGURATION.auth.tokenKey);
  }

  public setAuthState(state: boolean) {
    this.storage.authState.next(state)
  }
}
