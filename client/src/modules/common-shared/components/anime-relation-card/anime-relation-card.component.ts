import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouteHelperService } from '../../services/route-helper.service';

@Component({
  selector: 'app-anime-relation-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './anime-relation-card.component.html',
  styleUrl: './anime-relation-card.component.scss'
})
export class AnimeRelationCardComponent {
  @Input() animeId!: number;
  @Input() title!: string;
  @Input() image!: string;

  @Input() current!: boolean;

  public routeHelper = inject(RouteHelperService);

  //// TODO: Find a way to bypass Jikan's rate limiting (3 per second, 60 per minute)
  // pictures: any;
  // private jikan = inject(Jikan);
  // ngOnInit(): void {
  //   this.jikan.getAnimePictures(this.animeId).subscribe({
  //     next: (response) => {
  //       this.pictures = response;
  //     }
  //   });
  // }
}
