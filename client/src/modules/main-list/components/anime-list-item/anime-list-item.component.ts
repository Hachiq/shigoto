import { Component, ElementRef, inject, Input, OnInit, ViewChild } from '@angular/core';
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

  @ViewChild('poster', { static: true }) poster!: ElementRef;

  popoverVisible = false;
  popoverTop: number = 0;
  popoverLeft: number = 0;

  textBuilder = inject(TextBuilderService);

  constructor() {}

  ngOnInit(): void {
    
  }

  showPopover(){
    this.popoverVisible = true;
    this.setPopoverPositioning();
  }

  hidePopover() {
    this.popoverVisible = false;
  }

  // TODO: Improve positioning
  setPopoverPositioning() {
    const cardRect = this.poster.nativeElement.getBoundingClientRect();
    const cardCenterX = cardRect.left + cardRect.width / 2;
    const cardCenterY = cardRect.top + cardRect.height / 2 + window.scrollY;

    // Set initial popover position
    this.popoverLeft = cardCenterX;
    this.popoverTop = cardCenterY;

    // Adjust for viewport boundaries
    const popoverElement = this.poster.nativeElement.querySelector('.popover');
    const popoverRect = popoverElement?.getBoundingClientRect();

    // Adjust left
    if (this.popoverLeft + popoverRect?.width > window.innerWidth) {
      this.popoverLeft = window.innerWidth - popoverRect.width - 10;
    }

    // Adjust top
    if (this.popoverTop + popoverRect?.height > window.innerHeight) {
      this.popoverTop = cardRect.bottom - popoverRect.height;
    }
  }
}
