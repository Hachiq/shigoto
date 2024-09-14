import { Component, ElementRef } from '@angular/core';
import { BaseModalWindowComponent, ModalDialogService } from '../../../modules/common-shared/services/modal-dialog.service';
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
    protected override elementRef: ElementRef,
    private readonly modalService: ModalDialogService
  ) {
    super(elementRef);
  }

  login() {
    this.elementRef.nativeElement.remove();
    this.closeEvent.emit();
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
