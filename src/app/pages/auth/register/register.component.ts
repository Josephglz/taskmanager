import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { APIResponse, AuthService } from '../../../services/auth.service';
import { User } from '../../../models/User';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  _registerForm: FormGroup = {} as FormGroup;
  loading: boolean = false;
  errorMessage: string | null = null;

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _authService: AuthService,
  ) {
    this._registerForm = this._formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, this._authService.emailValidator()]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  getUserFromForm(): Partial<User> {
    return {
      username: this._registerForm.get('username')?.value,
      email: this._registerForm.get('email')?.value,
      password: this._registerForm.get('password')?.value,
    };
  }

  hasError(controlName: string, error: string): boolean | undefined {
    const control = this._registerForm.get(controlName);
    return control?.hasError(error) && (control?.dirty || control?.touched);
  }

  getErrorMessage(controlName: string): string {
    const control = this._registerForm.get(controlName);
    if (control?.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if (control?.hasError('email')) {
      return 'El correo electrónico introducido es inválido';
    }
    if (control?.hasError('minlength')) {
      return `La contraseña debe tener al menos ${control.errors?.['minlength'].requiredLength} caracteres`;
    }
    return '';
  }

  async onSubmit() {
    if (this._registerForm.invalid) {
      this._registerForm.markAllAsTouched();
      this.errorMessage = 'Por favor, rellena el formulario correctamente';
      return;
    }

    const user = this._registerForm.value;
    this.loading = true;
    this.errorMessage = null;

    this._authService.register(user).subscribe({
      next: (response: APIResponse) => {
        const { token } = response;
        if(!token || token.length === 0) return;
        this._authService.saveToken(token);
        this._router.navigate(['/']);
      },
      error: (error) => {
        this.errorMessage = error.error.message;
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    })

  }

}
