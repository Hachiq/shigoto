import { Component } from '@angular/core';
import { VIDEO } from '../../../common-shared/constants/video';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent {
  VIDEO = VIDEO;
}
