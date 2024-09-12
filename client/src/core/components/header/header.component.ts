import { Component, EventEmitter, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { ModalDialogService } from '../../../modules/common-shared/services/modal-dialog.service';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../login/login.component';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, FontAwesomeModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Output() toggleSidebarEvent = new EventEmitter<void>();
  
  bars = faBars;

  constructor(private modalService: ModalDialogService) {}

  toggleSidebar() {
    this.toggleSidebarEvent.emit();
  }

  openLoginModal() {
    this.modalService.showModal(
      LoginComponent,
      { class: 'modal-dialog modal-dialog-centered modal-dialog-l' },
      {},
      {
        onClose: async () => {
          console.log('Closed');
          return true;
        },
        onSaveData: async () => true,
      }
    );
  }
}
