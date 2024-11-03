import { Component, inject, Input } from '@angular/core';
import { TextBuilderService } from '../../../common-shared/services/text-builder.service';

@Component({
  selector: 'app-episode-details',
  standalone: true,
  imports: [],
  templateUrl: './episode-details.component.html',
  styleUrl: './episode-details.component.scss'
})
export class EpisodeDetailsComponent {
  @Input() poster_url!: string;
  @Input() title!: string;
  @Input() rating!: string;
  @Input() episodes!: number;
  @Input() type!: string;
  @Input() duration!: string;
  @Input() durationInSeconds?: number;
  @Input() synopsis!: string;
  @Input() score!: number;

  shortDescription: boolean = true;

  public textBuilder = inject(TextBuilderService);

  toggleDescription() {
    this.shortDescription = !this.shortDescription;
  }
}
