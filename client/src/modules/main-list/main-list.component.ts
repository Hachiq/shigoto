import { Component, inject } from '@angular/core';
import { ActivatedRoute, Params, UrlSegment } from '@angular/router';
import { CATEGORY_TITLES } from './constants/category-titles';
import { Jikan } from '../common-shared/services/jikan';
import { ANIME_TYPES } from './constants/anime-types';
import { MainSidebarComponent } from "./components/main-sidebar/main-sidebar.component";
import { AnimeListItemComponent } from './components/anime-list-item/anime-list-item.component';
import { AnimeSearch } from '../common-shared/models/jikan/anime-search';
import { CommonModule } from '@angular/common';
import { TextBuilderService } from '../common-shared/services/text-builder.service';
import { PaginationComponent } from '../common-shared/components/pagination/pagination.component';
import { switchMap } from 'rxjs/operators';
import { QueryParams } from '../common-shared/constants/query-params';
import { ANIME_LIST_ROUTES } from './constants/anime-list-routes';

@Component({
  selector: 'app-main-list',
  standalone: true,
  imports: [CommonModule, MainSidebarComponent, AnimeListItemComponent, PaginationComponent],
  templateUrl: './main-list.component.html',
  styleUrl: './main-list.component.scss'
})
export class MainListComponent {
  title!: string;
  originalRoute!: string;
  animeList?: AnimeSearch;
  currentPage!: number;

  private route = inject(ActivatedRoute);
  private jikan = inject(Jikan);

  constructor() {
    this.route.url.pipe(
      switchMap((url: UrlSegment[]) => {
        const route = url[0]?.path || '';
        this.originalRoute = route;
        this.title = this.getTitle(route);
        const type = this.getType(route);

        return this.route.queryParams.pipe(
          switchMap((params: Params) => {
            this.currentPage = params[QueryParams.page] ? +params[QueryParams.page] : 1;
            return route === ANIME_LIST_ROUTES.most_popular
              ? this.jikan.getTopAnime(type, this.currentPage)
              : this.jikan.getListByType(type, this.currentPage);
          })
        );
      })
    ).subscribe({
      next: (response) => this.animeList = response
    });
  }

  private getTitle(route: string): string {
    return Object.keys(CATEGORY_TITLES).find(key => CATEGORY_TITLES[key] === route) ?? '';
  }

  private getType(route: string): string {
    return Object.keys(ANIME_TYPES).find(key => ANIME_TYPES[key] === route) ?? '';
  }
}
