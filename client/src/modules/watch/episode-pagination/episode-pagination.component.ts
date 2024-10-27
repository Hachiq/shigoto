import { Component, inject, Input, OnInit } from '@angular/core';
import { AnimeEpisodeData } from '../../common-shared/models/jikan/anime-episode-data';
import { CommonModule } from '@angular/common';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { Jikan } from '../../common-shared/services/jikan';

@Component({
  selector: 'app-episode-pagination',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RouterModule],
  templateUrl: './episode-pagination.component.html',
  styleUrl: './episode-pagination.component.scss'
})
export class EpisodePaginationComponent implements OnInit {
  iplay = faPlay;

  @Input() animeId!: number;
  @Input() route!: string;
  @Input() currentEpisode?: number;

  episodes?: AnimeEpisodeData;
  currentPage: number = 1;

  private jikan = inject(Jikan);

  ngOnInit(): void {
    this.fetchAnimeEpisodes(this.animeId, this.currentPage);
  }

  setCurrent(id: number) {
    this.currentEpisode = id;
  }

  fetchAnimeEpisodes(animeId: number, page: number) {
    this.jikan.getAnimeEpisodes(animeId, page).subscribe({
      next: (response) => {
        this.episodes = response;
      }
    });
  }
}
