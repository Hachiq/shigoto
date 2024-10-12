import { Component, effect, HostListener, OnInit, Renderer2, ViewChild, ViewContainerRef } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars, faUser, faHistory, faHeart, faBell, faCog, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { ModalDialogService } from '../../../modules/common-shared/services/modal-dialog.service';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../../services/auth.service';
import { User } from '../../../modules/common-shared/models/user';
import { SidebarComponent } from "../sidebar/sidebar.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, FontAwesomeModule, CommonModule, SidebarComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  user: User | null | undefined;

  dropdownVisible = false;

  @ViewChild(SidebarComponent) sidebar!: SidebarComponent;
  
  bars = faBars;
  iuser = faUser;
  ihistory = faHistory;
  iheart = faHeart;
  ibell = faBell;
  icog = faCog;
  iarrowRight = faArrowRight;

  constructor(
    private authService: AuthService,
    public viewContainer: ViewContainerRef,
    private modalService: ModalDialogService,
    private router: Router,
    private renderer: Renderer2
  ) {
    this.modalService.modalRef = this.viewContainer;
    effect(() => {
      this.user = this.authService.user();
    });
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.authService.clearUser();
        this.router.navigate(['']);
      }
    });
  }

  toggleDropdown($event: MouseEvent) {
    $event.stopPropagation();
    this.dropdownVisible = !this.dropdownVisible;
  }

  @HostListener('document:click', ['$event'])
  handleClickOutsideDropdown(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (this.dropdownVisible && !target.closest('.dropdown-menu')) {
      this.dropdownVisible = false;
    }
  }

  toggleSidebar() {
    this.sidebar.toggleSidebar();
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
