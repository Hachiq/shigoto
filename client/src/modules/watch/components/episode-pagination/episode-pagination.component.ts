import { Component, ElementRef, inject, Input, OnInit, Renderer2 } from '@angular/core';
import { AnimeEpisodes } from '../../../common-shared/models/jikan/anime-episodes';
import { CommonModule } from '@angular/common';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { Jikan } from '../../../common-shared/services/jikan';
import { DefaultPopoverService } from '../../../common-shared/services/default-popover.service';

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
  @Input() currentEpisode!: number;

  episodes?: AnimeEpisodes;
  currentPage: number = 1;

  private jikan = inject(Jikan);
  public popoverService = inject(DefaultPopoverService);
  
  constructor() {
    this.popoverService.renderer = inject(Renderer2);
    this.popoverService.el = inject(ElementRef);
  }

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
