import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser, faHistory, faHeart, faBell, faCog, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../common-shared/models/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterModule, FontAwesomeModule, CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {
  iuser = faUser;
  ihistory = faHistory;
  iheart = faHeart;
  ibell = faBell;
  icog = faCog;
  iarrowRight = faArrowRight;

  isAuthenticated: boolean | undefined;
  user?: User;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe(async auth => {
      this.isAuthenticated = auth;
      this.user = await this.authService.getCurrentUser();
    });
  }

}
