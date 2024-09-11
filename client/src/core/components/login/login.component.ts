import { Component } from '@angular/core';
import { BaseModalWindowComponent } from '../../../modules/common-shared/services/modal-dialog.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent extends BaseModalWindowComponent {

  username = new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);

  constructor(protected override readonly bsModalRef: BsModalRef) {
    super(bsModalRef);
  }

  close() {
    this.closeDialog();
  }

  login() {
    console.log('logged in')
  }
}
