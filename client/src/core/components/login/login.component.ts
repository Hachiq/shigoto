import { Component } from '@angular/core';
import { BaseModalWindowComponent, ModalDialogService } from '../../../modules/common-shared/services/modal-dialog.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterComponent } from '../register/register.component';

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

  constructor(
    protected override readonly bsModalRef: BsModalRef,
    private readonly modalService: ModalDialogService
  ) {
    super(bsModalRef);
  }

  close() {
    this.closeDialog();
  }

  login() {
    console.log('logged in')
  }

  async goToRegister() {
    this.close();
    // await new Promise(resolve => setTimeout(resolve, 2000));
    this.modalService.showModal(
      RegisterComponent,
      { class: 'modal-dialog modal-dialog-centered modal-dialog-l' },
      { allowLogin: true },
      {
        onClose: async () => {
          console.log('Closed');
          return true;
        },
        onSaveData: async () => true,
      }
    )
  }
}
