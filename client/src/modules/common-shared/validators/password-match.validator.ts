import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { INPUTS } from '../constants/inputs';

export function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get(INPUTS.Password);
    const confirmPassword = control.get(INPUTS.ConfirmPassword);

    if (!password || !confirmPassword) {
      return null;
    }

    return password.value === confirmPassword.value ? null : { passwordMismatch: true };
  };
}