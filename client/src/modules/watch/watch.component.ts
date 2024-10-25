import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Jikan } from '../common-shared/services/jikan';
import { Episode } from '../common-shared/models/jikan/episode';
import { TextBuilderService } from '../common-shared/services/text-builder.service';
import { Anime } from '../common-shared/models/jikan/anime';

@Component({
  selector: 'app-watch',
  standalone: true,
  imports: [],
  templateUrl: './watch.component.html',
  styleUrl: './watch.component.scss'
})
export class WatchComponent implements OnInit {

  animeId!: number;
  correctSlug?: string;
  anime?: Anime;
  // animeEpisodes
  episode?: Episode;

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
      const episodeParam = queryParams.get('ep');
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
