import { Component, effect, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser, faHistory, faHeart, faBell, faCog, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../common-shared/models/user';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterModule, FontAwesomeModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  iuser = faUser;
  ihistory = faHistory;
  iheart = faHeart;
  ibell = faBell;
  icog = faCog;
  iarrowRight = faArrowRight;

  user: User | null | undefined;

  constructor(private authService: AuthService) {
    effect(() => {
      this.user = this.authService.user();
    });
  }
}
