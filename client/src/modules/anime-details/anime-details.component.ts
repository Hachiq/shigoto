import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Jikan } from '../main-list/services/jikan';
import { AnimeFull } from '../common-shared/models/jikan/anime-full';
import { TextBuilderService } from '../common-shared/services/text-builder.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-anime-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './anime-details.component.html',
  styleUrl: './anime-details.component.scss'
})
export class AnimeDetailsComponent {
  animeId!: number;
  correctSlug?: string;
  anime?: AnimeFull;

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
        this.fetchAnimeDetails(this.animeId);
      } else {
        this.navigateToHome();
      }
    } else {
      this.navigateToHome();
    }
  }

  private fetchAnimeDetails(id: number): void {
    this.jikan.getAnimeFullById(id).subscribe({
      next: (response) => {
        this.anime = response.data;
        this.correctSlug = this.textBuilder.getAnimeDetailsRoute(response.data).replace('/', '');
        this.updateUrlWithCorrectSlug();
      },
      error: () => {
        this.navigateToHome();
      }
    });
  }

  private updateUrlWithCorrectSlug(): void {
    const currentSlug = this.route.snapshot.paramMap.get('slugId');
    if (currentSlug !== this.correctSlug) {
      this.router.navigate([`${this.correctSlug}`], { replaceUrl: true });
    }
  }

  private navigateToHome(): void {
    this.router.navigate(['']);
  }
}
