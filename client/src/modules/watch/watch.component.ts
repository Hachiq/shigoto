import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Jikan } from '../main-list/services/jikan';
import { Episode } from '../common-shared/models/jikan/episode';
import { TextBuilderService } from '../common-shared/services/text-builder.service';
import { Anime } from '../common-shared/models/jikan/anime';
import { ANIME_TYPES } from '../main-list/constants/anime-types';

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
    this.fetchAnime(this.animeId);
  }

  fetchAnime(animeId: number) {
    this.jikan.getAnimeById(animeId).subscribe({
      next: (response) => {
        this.anime = response.data;
        this.correctSlug = this.textBuilder.getSlugRoute(response.data).replace('/', '');
        this.updateUrlWithCorrectSlug();
        if (response.data && response.data.type.toLowerCase() !== ANIME_TYPES.movie) {
          this.fetchEpisode(animeId, 1);
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
