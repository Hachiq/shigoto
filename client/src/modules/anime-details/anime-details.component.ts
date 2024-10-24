import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Jikan } from '../main-list/services/jikan';
import { AnimeFull } from '../common-shared/models/jikan/anime-full';
import { TextBuilderService } from '../common-shared/services/text-builder.service';
import { CommonModule } from '@angular/common';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-anime-details',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './anime-details.component.html',
  styleUrl: './anime-details.component.scss'
})
export class AnimeDetailsComponent implements OnInit {
  iplay = faPlay;

  animeId!: number;
  correctSlug?: string;
  anime?: AnimeFull;

  shortDescription = true;

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
    this.fetchAnimeDetails(this.animeId);
  }

  private fetchAnimeDetails(id: number): void {
    this.jikan.getAnimeFullById(id).subscribe({
      next: (response) => {
        this.anime = response.data;
        this.correctSlug = this.textBuilder.getSlugRoute(response.data).replace('/', '');
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

  toggleDescription() {
    this.shortDescription = !this.shortDescription;
  }

  private navigateToHome(): void {
    this.router.navigate(['']);
  }
}
