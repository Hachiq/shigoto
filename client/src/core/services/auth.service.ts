import { Injectable } from '@angular/core';
import { COMMON_SHARED_CONFIGURATION } from '../../modules/common-shared/configuration/common-shared.config';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from '../../modules/common-shared/services/storage/local-storage.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = `${environment.apiUrl}/${COMMON_SHARED_CONFIGURATION.auth.url}`

  constructor(
    private http: HttpClient,
    private storage: LocalStorageService
  ) { }

  public login(request: any): Observable<string> {
    this.storage.clear();

    const response = this.http.post(
      `${this.baseUrl}/login`,
      request,
      {
        responseType: 'text',
        withCredentials: true
      }
    );

    this.storage.store(COMMON_SHARED_CONFIGURATION.auth.tokenKey, response)

    return response;
  }

  public register(request: any): Observable<any> {
    const response = this.http.post(`${this.baseUrl}/register`, request);
    return response;
  }

  public async isAuthenticated() {
    const token = await this.getToken()
    return !!token;
  }

  public async getAuthorizationHeaders() {
    const token =  this.getToken();

    let headers;
    if (token) {
      headers = { Authorization: `Bearer ${token}` }
    }
    return headers;
  }

  private  getToken() {
    return  this.storage.retrieve(COMMON_SHARED_CONFIGURATION.auth.tokenKey);
  }
}
