import { Component, ElementRef } from '@angular/core';
import { BaseModalWindowComponent, ModalDialogService } from '../../../modules/common-shared/services/modal-dialog.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterComponent } from '../register/register.component';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { VALIDATORS } from '../../../modules/common-shared/constants/validators';
import { INPUT_ERRORS } from '../../../modules/common-shared/constants/input-errors';
import { INPUTS } from '../../../modules/common-shared/constants/inputs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent extends BaseModalWindowComponent {
  VALIDATORS = VALIDATORS;
  INPUT_ERRORS = INPUT_ERRORS;
  INPUTS = INPUTS;

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(
    protected override elementRef: ElementRef,
    private readonly modalService: ModalDialogService,
    private readonly authService: AuthService
  ) {
    super(elementRef);
  }

  // TODO: Rethink this
  login() {
    this.authService.login(
      {
        email: this.loginForm.controls.email.value,
        password: this.loginForm.controls.password.value
      }
    ).subscribe({
      next: (response) => {
        try {
          // Response is a valid JSON when credentials are invalid
          if (this.invalidCredentials(JSON.parse(response))) {
            return;
          }
        } catch (e) {
          // Response is a JWT string when credentials are valid
          this.authService.setToken(response);
        }
      },
      error: (httpError) => {
        console.error(httpError);
      }
    })
  }

  invalidCredentials(response: any) {
    if (response.errorType === "InvalidCredentials") {
      this.loginForm.setErrors({ invalid: true })
      return true;
    }
    return false;
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
