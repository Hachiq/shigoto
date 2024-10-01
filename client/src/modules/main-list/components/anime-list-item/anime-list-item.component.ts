import { Component, inject, Input } from '@angular/core';
import { TextBuilderService } from '../../services/text-builder.service';

@Component({
  selector: 'app-anime-list-item',
  standalone: true,
  imports: [],
  templateUrl: './anime-list-item.component.html',
  styleUrl: './anime-list-item.component.scss'
})
export class AnimeListItemComponent {
  @Input() item: any;

  constructor() {}

  textBuilder = inject(TextBuilderService);
}
