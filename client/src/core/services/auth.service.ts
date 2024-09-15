import { Injectable } from '@angular/core';
import { COMMON_SHARED_CONFIGURATION } from '../../modules/common-shared/configuration/common-shared.config';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from '../../modules/common-shared/services/storage/local-storage.service';
import { Observable } from 'rxjs';
import { RegisterRequest } from '../models/register.request';
import { LoginRequest } from '../models/login.request';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = `${environment.apiUrl}/${COMMON_SHARED_CONFIGURATION.auth.url}`

  constructor(
    private http: HttpClient,
    private storage: LocalStorageService
  ) { }

  public login(request: LoginRequest): Observable<string> {
    this.storage.clear();

    const response = this.http.post(
      `${this.baseUrl}/login`,
      request,
      {
        responseType: 'text',
        withCredentials: true
      }
    );

    return response;
  }

  public register(request: RegisterRequest): Observable<any> {
    const response = this.http.post(`${this.baseUrl}/register`, request);
    return response;
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
    const response = this.http.get(`${this.baseUrl}/logout`, { withCredentials: true });
    return response;
  }

  public async isAuthenticated() {
    const token = await this.getToken()
    return !!token;
  }

  public async getAuthorizationHeaders() {
    const token = await this.getToken();

    let headers;
    if (token) {
      headers = { Authorization: `Bearer ${token}` }
    }
    return headers;
  }

  public async setToken(token: string) {
    await this.storage.store(COMMON_SHARED_CONFIGURATION.auth.tokenKey, token)
  }

  private async getToken() {
    return await this.storage.retrieve(COMMON_SHARED_CONFIGURATION.auth.tokenKey);
  }
}
