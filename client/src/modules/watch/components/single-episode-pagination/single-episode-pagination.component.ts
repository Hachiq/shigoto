import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

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
}
