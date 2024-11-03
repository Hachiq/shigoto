import { inject, Injectable } from '@angular/core';
import { Anime } from '../models/jikan/anime';
import { AnimeFull } from '../models/jikan/anime-full';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class RouteHelperService {

  private location = inject(Location);

  constructor() { }

  getIdFromSlug(slugId: string | null): number {
    const id = slugId?.match(/.+-(\d+)$/)?.[1];
    return id ? Number(id) : 0;
  }
  
  getSlugRoute(anime: Anime | AnimeFull): string {
    if (!anime) {
      return '/';
    }

    const cleanedTitle = anime.title
      .replace(/[;:().]/g, '')
      .replace(/\s+/g, '-')
      .toLowerCase();

    return `/${cleanedTitle}-${anime.mal_id}`;
  }

  buildPageUrl(route: string, page: number): string {
    return `${route}?page=${page}`;
  }

  updateUrlWithCorrectSlug(
    currentSlug: string | null, 
    correctSlug: string, 
    prefix: string = ''
  ): void {
    if (currentSlug !== correctSlug) {
      this.location.replaceState(`${prefix}${correctSlug}`);
    }
  }
}
