import { Component, Input } from '@angular/core';
import { AnimeEpisodeData } from '../../common-shared/models/jikan/anime-episode-data';
import { CommonModule } from '@angular/common';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-episode-pagination',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RouterModule],
  templateUrl: './episode-pagination.component.html',
  styleUrl: './episode-pagination.component.scss'
})
export class EpisodePaginationComponent {
  iplay = faPlay;

  @Input() episodes?: AnimeEpisodeData;
  @Input() route!: string;
  @Input() currentEpisode?: number;

  setCurrent(id: number) {
    this.currentEpisode = id;
  }
}
