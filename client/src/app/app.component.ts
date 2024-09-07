import { Component, Renderer2, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../core/components/header/header.component';
import { SidebarComponent } from "../core/components/sidebar/sidebar.component";

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

  title = 'client';
  showBackdrop = false;

  constructor(private readonly renderer: Renderer2){}

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
