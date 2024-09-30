import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { COMMON_SHARED_CONFIGURATION } from '../../common-shared/configuration/common-shared.config';

@Injectable({
  providedIn: 'root'
})
export class Jikan {
  baseUrl = `${environment.jikanUrl}`

  constructor(private http: HttpClient) { }

  getListByCategory(type: string, page: number) {
    return this.http.get(`${this.baseUrl}/${COMMON_SHARED_CONFIGURATION.jikan.anime}?page=${page}&type=${type}&order_by=popularity`);
  }
}
