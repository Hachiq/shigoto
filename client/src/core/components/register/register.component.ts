import { Component } from '@angular/core';
import { BaseModalWindowComponent, ModalDialogService } from '../../../modules/common-shared/services/modal-dialog.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent extends BaseModalWindowComponent {

  username = new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]);
  email = new FormControl('', [Validators.required, Validators.email, Validators.maxLength(254)]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  confirmPassword = new FormControl('', [Validators.required, Validators.minLength(6)]);

  constructor(
    protected override readonly bsModalRef: BsModalRef,
    private readonly modalService: ModalDialogService
  ) {
    super(bsModalRef)
  }

  close() {
    this.closeDialog();
  }

  register() {
    console.log('registered')
  }

  goToLogin() {
    this.close();
    this.modalService.showModal(
      LoginComponent,
      { class: 'modal-dialog modal-dialog-centered modal-dialog-l' },
      {},
      {}
    );
  }
}
