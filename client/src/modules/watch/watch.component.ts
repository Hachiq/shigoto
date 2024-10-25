import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Jikan } from '../common-shared/services/jikan';
import { Episode } from '../common-shared/models/jikan/episode';
import { TextBuilderService } from '../common-shared/services/text-builder.service';
import { Anime } from '../common-shared/models/jikan/anime';
import { QueryParams } from '../common-shared/constants/query-params';
import { AnimeEpisodeData } from '../common-shared/models/jikan/anime-episode-data';
import { CommonModule } from '@angular/common';
import { EpisodePaginationComponent } from './episode-pagination/episode-pagination.component';
import { PlayerComponent } from './player/player.component';
import { EpisodeDetailsComponent } from './episode-details/episode-details.component';
import { PaginationComponent } from "../common-shared/components/pagination/pagination.component";

// TODO: Split into different components.
@Component({
  selector: 'app-watch',
  standalone: true,
  imports: [CommonModule, EpisodePaginationComponent, PlayerComponent, EpisodeDetailsComponent, PaginationComponent],
  templateUrl: './watch.component.html',
  styleUrl: './watch.component.scss'
})
export class WatchComponent implements OnInit {

  animeId!: number;
  correctSlug?: string;
  anime?: Anime;
  animeEpisodes?: AnimeEpisodeData;
  episode?: Episode;

  currentPage: number = 1;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private jikan = inject(Jikan);
  public textBuilder = inject(TextBuilderService);

  constructor() {
    this.route.paramMap.subscribe(params => {
      const slugId = params.get('slugId');
      if (!slugId) {
        this.navigateToHome();
      }
      this.animeId = this.textBuilder.getIdFromSlug(slugId);
    });
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(queryParams => {
      const episodeParam = queryParams.get(QueryParams.episode);
      this.fetchAnime(this.animeId, episodeParam);
    });
  }

  fetchAnime(animeId: number, episodeParam: string | null) {
    this.jikan.getAnimeById(animeId).subscribe({
      next: (response) => {
        this.anime = response.data;
        this.correctSlug = this.textBuilder.getSlugRoute(response.data).replace('/', '');
        this.updateUrlWithCorrectSlug();
        if (response.data && response.data.episodes > 1) {
          const episode = episodeParam ? +episodeParam : 1;
          this.fetchEpisode(animeId, episode);
          this.fetchAnimeEpisodes(animeId, this.currentPage);
        } else {
          this.router.navigate([], {
            relativeTo: this.route,
            queryParamsHandling: ''
          });
        }
      }
    });
  }

  fetchEpisode(animeId: number, episode: number) {
    this.jikan.getAnimeEpisodeById(animeId, episode).subscribe({
      next: (response) => {
        this.episode = response.data;
      }
    });
  }

  fetchAnimeEpisodes(animeId: number, page: number) {
    this.jikan.getAnimeEpisodes(animeId, page).subscribe({
      next: (response) => {
        this.animeEpisodes = response;
      }
    });
  }

  private updateUrlWithCorrectSlug(): void {
    const currentSlug = this.route.snapshot.paramMap.get('slugId');
    if (currentSlug !== this.correctSlug) {
      this.router.navigate([`watch/${this.correctSlug}`], { replaceUrl: true });
    }
  }

  private navigateToHome(): void {
    this.router.navigate(['']);
  }
}
