import { Component, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  faCheckCircle,
  faCircleXmark,
} from '@fortawesome/free-regular-svg-icons';

import { EyeBtnService, ToastService } from '@core/services';
import { CustomValidators } from '@core/utils';
import { AuthService } from '@features/public/services';

@Component({
  selector: 'register-form',
  templateUrl: './register-form.component.html',
})
export class RegisterFormComponent {
  private eyeBtnService = inject(EyeBtnService);
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  private toastService = inject(ToastService);

  public showPassword = this.eyeBtnService.showEye;

  public registerForm: FormGroup = this.fb.group(
    {
      first_name: ['', [Validators.required, Validators.minLength(2)]],
      last_name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(50),
          Validators.pattern(
            /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/
          ),
        ],
      ],
      confirm_password: ['', [Validators.required]],
    },
    {
      validators: [
        CustomValidators.MatchValidator('password', 'confirm_password'),
      ],
    }
  );

  onRegister(): void {
    if (this.registerForm.valid) {
      this.authService
        .register(this.registerForm.value)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: ({ message }) => {
            this.toastService.show({
              color: 'success',
              message,
              icon: faCheckCircle,
              duration: 4000,
            });
            this.router.navigateByUrl('/');
          },
          error: (message) => {
            console.log(message);
            this.toastService.show({
              color: 'error',
              message,
              icon: faCircleXmark,
              duration: 4000,
            });
          },
        });
    }
  }
}
