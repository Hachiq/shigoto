import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Jikan } from '../main-list/services/jikan';
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
export class WatchComponent {

  animeId!: number;
  correctSlug?: string;
  episode?: Episode;
  anime?: Anime;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private jikan = inject(Jikan);
  public textBuilder = inject(TextBuilderService);

  constructor() {
    this.route.paramMap.subscribe(params => {
      const slugId = params.get('slugId');
      if (slugId) {
        this.processSlugId(slugId);
      } else {
        this.navigateToHome();
      }
    });
  }

  private processSlugId(slugId: string): void {
    const parts = slugId.match(/(.+)-(\d+)$/);

    if (parts && parts.length === 3) {
      const id = Number(parts[2]);
      if (!isNaN(id)) {
        this.animeId = id;
        this.fetchAnime(this.animeId);
        this.fetchEpisode(this.animeId, 1); // Do not fetch episode if type === movie
      } else {
        this.navigateToHome();
      }
    } else {
      this.navigateToHome();
    }
  }

  fetchEpisode(animeId: number, episode: number) {
    this.jikan.getAnimeEpisodeById(animeId, episode).subscribe({
      next: (response) => {
        this.episode = response.data;
      }
    });
  }

  fetchAnime(animeId: number) {
    this.jikan.getAnimeById(animeId).subscribe({
      next: (response) => {
        this.anime = response.data;
        this.correctSlug = this.textBuilder.getSlugRoute(response.data).replace('/', '');
        this.updateUrlWithCorrectSlug();
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
