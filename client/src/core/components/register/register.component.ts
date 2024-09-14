import { Component, ElementRef } from '@angular/core';
import { BaseModalWindowComponent, ModalDialogService } from '../../../modules/common-shared/services/modal-dialog.service';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../../services/auth.service';

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
    protected override elementRef: ElementRef,
    private readonly modalService: ModalDialogService,
    private authService: AuthService
  ) {
    super(elementRef);
  }

  register() {
    this.authService.register(
      {
        username: this.username.value,
        email: this.email.value,
        password: this.password.value
      }
    ).subscribe({
      next: () => {
        console.log('success')
      },
      error: (e) => {
        console.error('error: ', e)
      }
    })
  }

  goToLogin() {
    this.close();
    this.modalService
      .open(LoginComponent, { size: 'm' })
      .subscribe((action) => {
        console.log('modalAction', action);
      }
    );
  }
}
