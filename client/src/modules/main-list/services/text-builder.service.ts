import { Injectable } from '@angular/core';

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
}
