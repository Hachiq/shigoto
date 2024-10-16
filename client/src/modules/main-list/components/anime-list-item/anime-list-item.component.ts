import { Component, ElementRef, HostListener, inject, Input, ViewChild } from '@angular/core';
import { TextBuilderService } from '../../../common-shared/services/text-builder.service';
import { CommonModule } from '@angular/common';
import { faPlay, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Anime } from '../../../common-shared/models/jikan/anime';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-anime-list-item',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RouterModule],
  templateUrl: './anime-list-item.component.html',
  styleUrl: './anime-list-item.component.scss'
})
export class AnimeListItemComponent {
  iplay = faPlay;
  istar = faStar;

  @Input() item!: Anime;
  @Input() index!: number;
  @Input() bigItem: boolean = false;

  @ViewChild('poster', { static: true }) poster!: ElementRef;
  @ViewChild('popover', { static: true }) popover!: ElementRef;

  popoverVisible = false;
  popoverTop: number = 0;
  popoverLeft: number = 0;

  textBuilder = inject(TextBuilderService);

  @HostListener("wheel", ["$event"])
  onScroll(event: WheelEvent) {
    if (this.popoverVisible) {
      this.setPopoverPositioning();
    }
  }

  showPopover(){
    this.popoverVisible = true;
    this.setPopoverPositioning();
  }

  holdPopover() {
    this.popoverVisible = true;
  }

  hidePopover() {
    this.popoverVisible = false;
  }

  setPopoverPositioning() {
    const cardRect = this.poster.nativeElement.getBoundingClientRect();
    const popoverRect = this.popover.nativeElement.getBoundingClientRect();

    const cardCenterX = cardRect.left + cardRect.width / 2 + window.scrollX;
    const cardCenterY = cardRect.top + cardRect.height / 2 + window.scrollY - popoverRect.height;

    // Set initial popover position
    this.popoverLeft = cardCenterX;
    this.popoverTop = cardCenterY;

    // Adjust for viewport boundaries

    // Adjust left
    if (this.popoverLeft + popoverRect?.width > window.innerWidth) {
      this.popoverLeft-= popoverRect.width;
    }

    // Adjust top
    if (this.popoverTop < window.scrollY) {
      this.popoverTop+= popoverRect.height;
    }
  }
}
