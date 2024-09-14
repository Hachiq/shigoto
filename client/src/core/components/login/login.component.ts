import { Component, ElementRef } from '@angular/core';
import { BaseModalWindowComponent, ModalDialogService } from '../../../modules/common-shared/services/modal-dialog.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterComponent } from '../register/register.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent extends BaseModalWindowComponent {

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor(
    protected override elementRef: ElementRef,
    private readonly modalService: ModalDialogService,
    private readonly authService: AuthService
  ) {
    super(elementRef);
  }

  login() {
    this.authService.login(
      {
        username: this.loginForm.controls.username.value,
        password: this.loginForm.controls.password.value
      }
    ).subscribe({
      next: (response) => {
        console.log('login response: ', response)
      },
      error: (e) => {
        console.error('error: ', e)
      }
    })
  }

  goToRegister() {
    this.close();
    this.modalService
      .open(RegisterComponent, { size: 'm' })
      .subscribe((action) => {
        console.log('modalAction', action);
      }
    );
  }
}
