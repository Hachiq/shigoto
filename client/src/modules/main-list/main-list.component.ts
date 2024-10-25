import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CATEGORY_TITLES } from './constants/category-titles';
import { Jikan } from '../common-shared/services/jikan';
import { ANIME_TYPES } from './constants/anime-types';
import { MainSidebarComponent } from "./components/main-sidebar/main-sidebar.component";
import { AnimeListItemComponent } from './components/anime-list-item/anime-list-item.component';
import { AnimeSearch } from '../common-shared/models/jikan/anime-search';
import { CommonModule } from '@angular/common';
import { TextBuilderService } from '../common-shared/services/text-builder.service';
import { PaginationComponent } from '../common-shared/components/pagination/pagination.component';

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

  route = inject(ActivatedRoute);
  jikan = inject(Jikan);
  textBuilder = inject(TextBuilderService);

  // TODO: Maybe dont use 2 subscriptions?
  constructor() {
    this.route.queryParams.subscribe(params => {
      this.currentPage = params['page'] ? +params['page'] : 1;

      this.route.url.subscribe(url => {
        const category = url[0]?.path || '';
        this.originalRoute = category;

        this.title = this.getTitle(category);
        const type = this.getType(category);
        
        this.fetchAnimeList(type, this.currentPage);
      });
    });
  }

  getTitle(category: string): any {
    return Object.keys(CATEGORY_TITLES).find(key => CATEGORY_TITLES[key] === category);
  }

  getType(category: string): any {
    return Object.keys(ANIME_TYPES).find(key => ANIME_TYPES[key] === category) ?? '';
  }

  fetchAnimeList(type: string, page: number) {
    this.jikan.getListByType(type, page).subscribe({
      next: (list) => {
        this.animeList = list;
      }
    })
  }
}
