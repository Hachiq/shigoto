import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { COMMON_SHARED_CONFIGURATION } from '../../common-shared/configuration/common-shared.config';
import { Observable } from 'rxjs';
import { AnimeSearch } from '../../common-shared/models/jikan/anime-search';
import { AnimeFullData } from '../../common-shared/models/jikan/anime-full-data';
import { EpisodeData } from '../../common-shared/models/jikan/episode-data';
import { AnimeData } from '../../common-shared/models/jikan/anime-data';

@Injectable({
  providedIn: 'root'
})
export class Jikan {
  baseUrl = `${environment.jikanUrl}`;

  private readonly defaultParams = {
    limit: '24',
    order_by: 'popularity',
    min_score: '1'
  };

  private http = inject(HttpClient);

  // TODO: A constant for query parameters
  getListByType(type: string, page: number): Observable<AnimeSearch> {
    const url = `${this.baseUrl}/${COMMON_SHARED_CONFIGURATION.jikan.anime}`;
    const params = new HttpParams()
      .set('page', page)
      .set('limit', this.defaultParams.limit)
      .set('type', type)
      .set('order_by', this.defaultParams.order_by)
      .set('min_score', this.defaultParams.min_score);

    return this.http.get<AnimeSearch>(url, { params });
  }

  getAnimeById(id: number): Observable<AnimeData> {
    const url = `${this.baseUrl}/${COMMON_SHARED_CONFIGURATION.jikan.anime}/${id}`;
    return this.http.get<AnimeData>(url);
  }

  getAnimeFullById(id: number): Observable<AnimeFullData> {
    const url = `${this.baseUrl}/${COMMON_SHARED_CONFIGURATION.jikan.anime}/${id}/full`;
    return this.http.get<AnimeFullData>(url);
  }

  getAnimeEpisodeById(id: number, episode: number): Observable<EpisodeData> {
    const url = `${this.baseUrl}/${COMMON_SHARED_CONFIGURATION.jikan.anime}/${id}/episodes/${episode}`;
    return this.http.get<EpisodeData>(url);
  }
}
