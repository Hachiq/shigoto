import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { VIDEO } from '../../../common-shared/constants/video';
import { Jikan } from '../../../common-shared/services/jikan';
import { RelationEntry } from '../../../common-shared/models/jikan/relation-entry';
import { mapRelationEntries } from '../../../common-shared/services/mapRelationEntries';
import { CommonModule } from '@angular/common';
import { AnimeRelationCardComponent } from '../../../common-shared/components/anime-relation-card/anime-relation-card.component';
import { PlayerComponent } from '../player/player.component';

@Component({
  selector: 'app-player-container',
  standalone: true,
  imports: [AnimeRelationCardComponent, PlayerComponent],
  templateUrl: './player-container.component.html',
  styleUrl: './player-container.component.scss'
})
export class PlayerContainerComponent implements OnInit {
  @Output() moreThanOneRelationLoaded = new EventEmitter();

  VIDEO = VIDEO;
  relations?: RelationEntry[];

  @Input() animeId!: number;
  @Input() name!: string;
  @Input() url!: string;
  @Input() image!: string;

  private jikan = inject(Jikan);

  ngOnInit(): void {
    const currentAnime: RelationEntry = {
      mal_id: this.animeId,
      type: 'anime',
      name: this.name,
      url: this.url
    };

    this.jikan.getAnimeRelations(this.animeId).subscribe({
      next: (response) => {
        this.relations = mapRelationEntries(response.data, currentAnime);
        if (this.relations.length > 1) {
          this.moreThanOneRelationLoaded.emit();
        }
      }
    });
  }
}