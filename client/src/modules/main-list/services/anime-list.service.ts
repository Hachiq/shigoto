import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { COMMON_SHARED_CONFIGURATION } from '../../common-shared/configuration/common-shared.config';

@Injectable({
  providedIn: 'root'
})
export class AnimeListService {
  baseUrl = `${environment.apiUrl}/${COMMON_SHARED_CONFIGURATION.jikan.url}`

  constructor(private http: HttpClient) { }

  getListByCategory(category: string, page: number) {
    return this.http.get(`${this.baseUrl}?category=${category}&page=${page}`);
  }

  getAny() {
    return this.http.get(`${this.baseUrl}/any`, { responseType: 'text', withCredentials: true });
  }
}
