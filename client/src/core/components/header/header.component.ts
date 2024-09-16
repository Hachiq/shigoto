import { Component, EventEmitter, OnInit, Output, ViewContainerRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { ModalDialogService } from '../../../modules/common-shared/services/modal-dialog.service';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../../services/auth.service';
import { User } from '../../../modules/common-shared/models/user';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, FontAwesomeModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  isAuthenticated = false;
  user?: User;
  
  @Output() toggleSidebarEvent = new EventEmitter<void>();
  
  bars = faBars;

  constructor(
    private authService: AuthService,
    public viewContainer: ViewContainerRef,
    private modalService: ModalDialogService
  ) {
    this.modalService.modalRef = this.viewContainer;
  }

  // TODO: Get rid of isAuthenticated$ (probably)
  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe(async auth => {
      this.isAuthenticated = auth;
      this.user = await this.authService.getCurrentUser();
    });
  }

  logout() {
    this.authService.logout().subscribe();
  }

  toggleSidebar() {
    this.toggleSidebarEvent.emit();
  }

  openLoginModal() {
    this.modalService
      .open(LoginComponent, { size: 'm' })
      .subscribe((action) => {
        console.log('modalAction', action);
      }
    );
  }
}
