import { Component, inject, Input, OnInit } from '@angular/core';
import { TextBuilderService } from '../../services/text-builder.service';
import { CommonModule } from '@angular/common';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-anime-list-item',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './anime-list-item.component.html',
  styleUrl: './anime-list-item.component.scss'
})
export class AnimeListItemComponent implements OnInit {
  play = faPlay

  @Input() item: any;
  @Input() index!: number;
  @Input() bigItem: boolean = false;

  textBuilder = inject(TextBuilderService);

  constructor() {}

  ngOnInit(): void {
    
  }
}
