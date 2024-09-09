import { Component } from '@angular/core';
import { BaseModalWindowComponent } from '../../../modules/common-shared/services/modal-dialog.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent extends BaseModalWindowComponent {
  xMark = faXmark;

  constructor(protected override readonly bsModalRef: BsModalRef) {
    super(bsModalRef);
  }

  close() {
    this.closeDialog();
  }
}
