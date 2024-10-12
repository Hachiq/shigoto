import { Component, ElementRef } from '@angular/core';
import { BaseModalWindowComponent, ModalDialogService } from '../../../modules/common-shared/services/modal-dialog.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { INPUT_ERRORS } from '../../../modules/common-shared/constants/input-errors';
import { VALIDATORS } from '../../../modules/common-shared/constants/validators';
import { INPUTS } from '../../../modules/common-shared/constants/inputs';
import { passwordMatchValidator } from '../../../modules/common-shared/validators/password-match.validator';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent extends BaseModalWindowComponent {
  INPUTS = INPUTS;
  VALIDATORS = VALIDATORS;
  INPUT_ERRORS = INPUT_ERRORS;

  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password : new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('')
  },
  {
    validators: passwordMatchValidator()
  });

  constructor(
    protected override elementRef: ElementRef,
    private readonly modalService: ModalDialogService,
    private authService: AuthService
  ) {
    super(elementRef);
  }

  register() {
    const data = {
      username: this.registerForm.controls.username.value,
      email: this.registerForm.controls.email.value,
      password: this.registerForm.controls.password.value,
    }

    this.authService.register(data).subscribe({
      next: (response) => {
        if (!response.success) {
          this.registerForm.get(INPUTS.Email)?.setErrors({ conflict: true });
          return;
        }
        this.authService.login(response.payload).subscribe();
        this.close();
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
