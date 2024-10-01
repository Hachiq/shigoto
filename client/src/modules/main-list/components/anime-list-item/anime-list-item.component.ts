import { Component, inject, Input, OnInit } from '@angular/core';
import { TextBuilderService } from '../../services/text-builder.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-anime-list-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './anime-list-item.component.html',
  styleUrl: './anime-list-item.component.scss'
})
export class AnimeListItemComponent implements OnInit {
  @Input() item: any;
  @Input() index!: number;
  @Input() bigItem: boolean = false;

  textBuilder = inject(TextBuilderService);

  constructor() {}

  ngOnInit(): void {
    
  }
}
