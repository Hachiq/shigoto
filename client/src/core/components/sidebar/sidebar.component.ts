import { Component, Renderer2 } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  comment = faComment;
  angleLeft = faAngleLeft;

  isSidebarOpen = false;

  constructor(private renderer: Renderer2) {}

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    this.toggleNoScroll()
  }

  toggleNoScroll() {
    if (this.isSidebarOpen) {
      this.renderer.addClass(document.body, 'no-scroll');
    } else {
      this.renderer.removeClass(document.body, 'no-scroll');
    }
  }

  close() {
    this.isSidebarOpen = false;
    this.toggleNoScroll()
  }
}
