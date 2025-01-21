import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../../models/User';
import { AuthService, APIResponse } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  _loginForm: FormGroup = {} as FormGroup;
  loading: boolean = false;
  errorMessage: string | null = null;

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _authService: AuthService,
  ){
    this._loginForm = this._formBuilder.group({
      email: ['', [Validators.required, this._authService.emailValidator()]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  getUserFromForm(): Partial<User> {
    return {
      email: this._loginForm.get('email')?.value,
      password: this._loginForm.get('password')?.value,
    };
  }

  hasError(controlName: string, error: string): boolean | undefined {
    const control = this._loginForm.get(controlName);
    return control?.hasError(error) && (control?.dirty || control?.touched);
  }

  getErrorMessage(controlName: string): string {
    const control = this._loginForm.get(controlName);
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
    if (this._loginForm.invalid) {
      this._loginForm.markAllAsTouched();
      this.errorMessage = 'Datos de acceso inválidos, por favor rellene los campos correctamente';
      return
    }

    const { email, password } = this._loginForm.value
    this.loading = true;
    this.errorMessage = null;

    this._authService.login(email, password).subscribe({
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
