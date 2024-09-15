import { Component, EventEmitter, OnInit, Output, ViewContainerRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { ModalDialogService } from '../../../modules/common-shared/services/modal-dialog.service';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, FontAwesomeModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  isAuthenticated = false;
  // user$!: Observable<User>;
  
  @Output() toggleSidebarEvent = new EventEmitter<void>();
  
  bars = faBars;

  constructor(
    private authService: AuthService,
    public viewContainer: ViewContainerRef,
    private modalService: ModalDialogService
  ) {
    this.modalService.modalRef = this.viewContainer;
  }

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe(auth => {
      this.isAuthenticated = auth;
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
