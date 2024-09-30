import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CATEGORY_TITLES } from './constants/category-titles';
import { Jikan } from './services/jikan';
import { ANIME_TYPES } from './constants/anime-types';
import { MainSidebarComponent } from "./components/main-sidebar/main-sidebar.component";
import { AnimeListItemComponent } from './components/anime-list-item/anime-list-item.component';

@Component({
  selector: 'app-main-list',
  standalone: true,
  imports: [MainSidebarComponent, AnimeListItemComponent],
  templateUrl: './main-list.component.html',
  styleUrl: './main-list.component.scss'
})
export class MainListComponent implements OnInit {
  title!: string;
  animeList: any;

  constructor(private route: ActivatedRoute, private jikan: Jikan) {}

  ngOnInit(): void {
    this.route.url.subscribe(url => {
      const category = url[0].path;
      this.title = this.getTitle(category);
      const type = this.getType(category);
      this.fetchAnimeList(type, 1);
    });
  }

  getTitle(category: string): any {
    return Object.keys(CATEGORY_TITLES).find(key => CATEGORY_TITLES[key] === category);
  }

  getType(category: string): any {
    return Object.keys(ANIME_TYPES).find(key => ANIME_TYPES[key] === category) ?? '';
  }

  fetchAnimeList(type: string, page: number) {
    this.jikan.getListByCategory(type, page).subscribe({
      next: (list) => {
        this.animeList = list;
      }
    })
  }
}
