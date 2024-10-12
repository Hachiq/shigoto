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

  login() {
    const data = {
      email: this.loginForm.controls.email.value,
      password: this.loginForm.controls.password.value
    };
  
    this.authService.login(data).subscribe({
      next: (response) => {
        if (!response.success) {
          this.loginForm.setErrors({ invalid: true });
          return;
        }
        this.authService.fetchUser().subscribe();
        this.close();
      }
    });
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
