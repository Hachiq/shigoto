import { Component, Renderer2, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../core/components/header/header.component';
import { SidebarComponent } from "../core/components/sidebar/sidebar.component";
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  @ViewChild(HeaderComponent) header!: HeaderComponent;
  @ViewChild(SidebarComponent) sidebar!: SidebarComponent;

  title = 'Shigoto';
  showBackdrop = false;

  constructor(
    private readonly authService: AuthService,
    private readonly renderer: Renderer2
  ) {
    authService.refreshToken().subscribe({
      next: (jwt) => {
        authService.setToken(jwt);
      },
      error: (errorResponse) => {
        let error;
        try {
          error = JSON.parse(errorResponse.error);
        } catch {
          return;
        }
        if (error.status === 401) {
          console.log('Cannot refresh token because user is not authorized');
        }
      }
    });
  }

  // TODO: Move all sidebar logic into header

  toggleSidebar() {
    this.changeBackdropState();
    this.sidebar.toggleSidebar();
  }

  changeBackdropState() {
    this.showBackdrop = !this.showBackdrop;
    this.toggleBodyScroll();
  }

  toggleBodyScroll() {
    if (this.showBackdrop) {
      this.renderer.addClass(document.body, 'no-scroll');
    } else {
      this.renderer.removeClass(document.body, 'no-scroll');
    }
  }
}
