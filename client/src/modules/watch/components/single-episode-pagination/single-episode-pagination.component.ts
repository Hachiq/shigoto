import { Component, ElementRef, inject, Input, Renderer2 } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { DefaultPopoverService } from '../../../common-shared/services/default-popover.service';

@Component({
  selector: 'app-single-episode-pagination',
  standalone: true,
  imports: [RouterModule, FontAwesomeModule],
  templateUrl: './single-episode-pagination.component.html',
  styleUrl: './single-episode-pagination.component.scss'
})
export class SingleEpisodePaginationComponent {
  iplay = faPlay;

  @Input() route!: string;
  @Input() title!: string;

  public popoverService = inject(DefaultPopoverService);
  
  constructor() {
    this.popoverService.renderer = inject(Renderer2);
    this.popoverService.el = inject(ElementRef);
  }
}
