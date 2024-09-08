import { Component } from '@angular/core';
import { BaseModalWindowComponent } from '../../../modules/common-shared/services/modal-dialog.service';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent extends BaseModalWindowComponent {
  constructor(protected override readonly bsModalRef: BsModalRef) {
    super(bsModalRef);
  }

  close() {
    this.closeDialog();
  }
}
