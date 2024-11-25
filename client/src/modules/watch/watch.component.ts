import { Component, ElementRef, inject, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Jikan } from '../common-shared/services/jikan';
import { Episode } from '../common-shared/models/jikan/episode';
import { Anime } from '../common-shared/models/jikan/anime';
import { QueryParams } from '../common-shared/constants/query-params';
import { CommonModule } from '@angular/common';
import { EpisodePaginationComponent } from './components/episode-pagination/episode-pagination.component';
import { SingleEpisodePaginationComponent } from './components/single-episode-pagination/single-episode-pagination.component';
import { PlayerContainerComponent } from './components/player-container/player-container.component';
import { EpisodeDetailsComponent } from './components/episode-details/episode-details.component';
import { RouteHelperService } from '../common-shared/services/route-helper.service';

@Component({
  selector: 'app-watch',
  standalone: true,
  imports: [
    CommonModule,
    EpisodePaginationComponent,
    SingleEpisodePaginationComponent,
    PlayerContainerComponent,
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

  private renderer = inject(Renderer2);
  private el = inject(ElementRef);

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
    this.fetchAnime(this.animeId);

    this.route.queryParamMap.subscribe(queryParams => {
      if (this.anime && this.anime.episodes > 1) {
        const episodeParam = queryParams.get(QueryParams.episode);
        const episode = episodeParam ? +episodeParam : 1;
        this.fetchEpisode(this.animeId, episode);
      }
    });
  }

  fetchAnime(animeId: number) {
    this.jikan.getAnimeById(animeId).subscribe({
      next: (response) => {
        this.anime = response.data;
        this.correctSlug = this.routeHelper.getSlugRoute(response.data).replace('/', '');
        this.routeHelper.updateUrlWithCorrectSlug(this.route.snapshot.paramMap.get('slugId'), this.correctSlug, 'watch/');
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

  // TODO: Figure out CSS & HTML instead of this ugly JS approach
  extendMainContainer() {
    const main = this.el.nativeElement.querySelector('#main');
    this.renderer.addClass(main, 'extended');
  }

  private navigateToHome(): void {
    this.router.navigate(['']);
  }
}
