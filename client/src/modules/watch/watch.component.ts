import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Jikan } from '../common-shared/services/jikan';
import { Episode } from '../common-shared/models/jikan/episode';
import { Anime } from '../common-shared/models/jikan/anime';
import { QueryParams } from '../common-shared/constants/query-params';
import { CommonModule } from '@angular/common';
import { EpisodePaginationComponent } from './components/episode-pagination/episode-pagination.component';
import { SingleEpisodePaginationComponent } from './components/single-episode-pagination/single-episode-pagination.component';
import { PlayerComponent } from './components/player/player.component';
import { EpisodeDetailsComponent } from './components/episode-details/episode-details.component';
import { RouteHelperService } from '../common-shared/services/route-helper.service';

@Component({
  selector: 'app-watch',
  standalone: true,
  imports: [
    CommonModule,
    EpisodePaginationComponent,
    SingleEpisodePaginationComponent,
    PlayerComponent,
    EpisodeDetailsComponent
  ],
  templateUrl: './watch.component.html',
  styleUrl: './watch.component.scss'
})
export class WatchComponent implements OnInit {

  animeId!: number;
  correctSlug!: string;
  anime?: Anime;
  episode?: Episode;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private jikan = inject(Jikan);
  private routeHelper = inject(RouteHelperService);

  constructor() {
    this.route.paramMap.subscribe(params => {
      const slugId = params.get('slugId');
      if (!slugId) {
        this.navigateToHome();
      }
      this.animeId = this.routeHelper.getIdFromSlug(slugId);
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
        this.correctSlug = this.routeHelper.getSlugRoute(response.data).replace('/', '');
        this.updateUrlWithCorrectSlug();
        if (response.data && response.data.episodes > 1) {
          const episode = episodeParam ? +episodeParam : 1;
          this.fetchEpisode(animeId, episode);
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
