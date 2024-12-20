import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { COMMON_SHARED_CONFIGURATION } from '../configuration/common-shared.config';
import { Observable } from 'rxjs';
import { AnimeSearch } from '../models/jikan/anime-search';
import { AnimeFullData } from '../models/jikan/anime-full-data';
import { EpisodeData } from '../models/jikan/episode-data';
import { AnimeData } from '../models/jikan/anime-data';
import { QueryParams } from '../constants/query-params';
import { AnimeEpisodes } from '../models/jikan/anime-episodes';
import { AnimeRelationsData } from '../models/jikan/anime-relations-data';
import { ImagesData } from '../models/images-data';

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

  getListByType(type: string, page: number): Observable<AnimeSearch> {
    const url = `${this.baseUrl}/${COMMON_SHARED_CONFIGURATION.jikan.anime}`;
    const params = new HttpParams()
      .set(QueryParams.page, page)
      .set(QueryParams.limit, this.defaultParams.limit)
      .set(QueryParams.type, type)
      .set(QueryParams.order_by, this.defaultParams.order_by)
      .set(QueryParams.min_score, this.defaultParams.min_score);

    return this.http.get<AnimeSearch>(url, { params });
  }

  getTopAnime(type: string, page: number): Observable<AnimeSearch> {
    const url = `${this.baseUrl}/${COMMON_SHARED_CONFIGURATION.jikan.top}/${COMMON_SHARED_CONFIGURATION.jikan.anime}`;
    const params = new HttpParams()
      .set(QueryParams.page, page)
      .set(QueryParams.type, type)
      .set(QueryParams.limit, this.defaultParams.limit);
    
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

  getAnimeEpisodes(id: number, page: number): Observable<AnimeEpisodes> {
    const url = `${this.baseUrl}/${COMMON_SHARED_CONFIGURATION.jikan.anime}/${id}/episodes`;
    const params = new HttpParams()
      .set(QueryParams.page, page);

    return this.http.get<AnimeEpisodes>(url, { params });
  }

  getAnimeRelations(id: number): Observable<AnimeRelationsData> {
    const url = `${this.baseUrl}/${COMMON_SHARED_CONFIGURATION.jikan.anime}/${id}/relations`;
    return this.http.get<AnimeRelationsData>(url);
  }

  getAnimePictures(id: number): Observable<ImagesData> {
    const url = `${this.baseUrl}/${COMMON_SHARED_CONFIGURATION.jikan.anime}/${id}/pictures`;
    return this.http.get<ImagesData>(url);
  }
}
