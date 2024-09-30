import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CATEGORY_TITLES } from './constants/category-titles';
import { AnimeListService } from './services/anime-list.service';

@Component({
  selector: 'app-main-list',
  standalone: true,
  imports: [],
  templateUrl: './main-list.component.html',
  styleUrl: './main-list.component.scss'
})
export class MainListComponent implements OnInit {
  title!: string;
  animeList: any;

  constructor(private route: ActivatedRoute, private animeListService: AnimeListService) {}

  ngOnInit(): void {
    this.route.url.subscribe(url => {
      const category = url[0].path;
      this.title = this.getTitle(category);
      this.fetchAnimeList(category);
    });
  }

  getTitle(category: string): any {
    return Object.keys(CATEGORY_TITLES).find(key => CATEGORY_TITLES[key] === category);
  }

  fetchAnimeList(category: string) {
    this.animeListService.getListByCategory(category, 1).subscribe({
      next: (list) => {
        this.animeList = list;
      }
    })
  }
}
