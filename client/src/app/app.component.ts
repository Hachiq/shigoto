import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../core/components/header/header.component';
import { SidebarComponent } from "./sidebar/sidebar.component";

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

  toggleSidebar() {
    this.changeBackdropState();
    this.sidebar.toggleSidebar();
  }

  changeBackdropState() {
    this.showBackdrop = !this.showBackdrop;
  }
}
