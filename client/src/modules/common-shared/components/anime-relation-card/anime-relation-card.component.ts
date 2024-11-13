import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouteHelperService } from '../../services/route-helper.service';
import { Jikan } from '../../services/jikan';
import { Observable } from 'rxjs';
import { ImagesData } from '../../models/images-data';

@Component({
  selector: 'app-anime-relation-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './anime-relation-card.component.html',
  styleUrl: './anime-relation-card.component.scss'
})
export class AnimeRelationCardComponent implements OnInit {
  @Input() animeId!: number;
  @Input() title!: string;

  @Input() current!: boolean;

  public routeHelper = inject(RouteHelperService);
  private jikan = inject(Jikan);

  pictures$?: Observable<ImagesData>;

  ngOnInit(): void {
    this.pictures$ = this.jikan.getAnimePictures(this.animeId);
  }
}
