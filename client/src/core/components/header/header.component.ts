import { Component, EventEmitter, HostListener, OnInit, Output, ViewContainerRef } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars, faUser, faHistory, faHeart, faBell, faCog, faArrowRight } from '@fortawesome/free-solid-svg-icons';
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
  isAuthenticated: boolean | undefined;
  user?: User;

  @Output() toggleSidebarEvent = new EventEmitter<void>();
  
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
    private router: Router
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
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate([''])
      }
    });
  }

  toggleDropdown($event: MouseEvent) {
    $event.stopPropagation();
    const dropdownMenu = document.querySelector('.dropdown-menu') as HTMLElement;
  
    if (dropdownMenu?.classList.contains('show')) {
      dropdownMenu.classList.remove('show');
    } else {
      dropdownMenu?.classList.add('show');
    }
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const dropdownMenu = document.querySelector('.dropdown-menu') as HTMLElement;

    if (dropdownMenu && !dropdownMenu.contains(target)) {
      dropdownMenu.classList.remove('show');
    }
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
