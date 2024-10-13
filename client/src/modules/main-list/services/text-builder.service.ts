import { Injectable } from '@angular/core';
import { Anime } from '../../common-shared/models/jikan/anime';
import { AnimeFull } from '../../common-shared/models/jikan/anime-full';

@Injectable({
  providedIn: 'root'
})
export class TextBuilderService {

  constructor() { }

  getDurationInMinutes(duration: string): string {
    const hourRegex = /(\d+)\s*hr/;
    const minuteRegex = /(\d+)\s*min/;
    
    let totalMinutes = 0;
  
    const hoursMatch = duration.match(hourRegex);
    if (hoursMatch) {
      const hours = parseInt(hoursMatch[1], 10);
      totalMinutes += hours * 60;
    }
  
    const minutesMatch = duration.match(minuteRegex);
    if (minutesMatch) {
      const minutes = parseInt(minutesMatch[1], 10);
      totalMinutes += minutes;
    }
  
    return `${totalMinutes}m`;
  }

  getRatingIdentifier(rating: string): string {
    const match = rating.match(/^[A-Za-z0-9+-]+/);
    return match ? match[0] : '';
  }

  isForAdults(rating: string): boolean {
    const identifier = this.getRatingIdentifier(rating);
    return ['R', 'R+', 'Rx'].includes(identifier);
  }

  shortenDescription(text: string): string {
    const maxLength = 130
    if (text.length <= maxLength) {
      return text;
    }
    
    const trimmedText = text.slice(0, maxLength); 
    const lastSpaceIndex = trimmedText.lastIndexOf(' '); 
  
    const finalText = trimmedText.slice(0, lastSpaceIndex);
  
    return finalText + '...';
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
  
  getAnimeDetailsRoute(anime: Anime | AnimeFull): string {
    const cleanedTitle = anime.title
      .replace(/[;:().]/g, '')
      .replace(/\s+/g, '-')
      .toLowerCase();

    return `/${cleanedTitle}-${anime.mal_id}`;
  }

  buildPageUrl(route: string, page: number): string {
    return `${route}?page=${page}`;
  }
}
