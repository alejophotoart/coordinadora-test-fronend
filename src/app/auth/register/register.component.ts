import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { passwordMatchValidator } from '../validators/password-match.validator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatIconModule
  ],
})

export class RegisterComponent {

  private _snackBar = inject(MatSnackBar);
  private fb = inject(FormBuilder)

  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required]
  }, {
    validators: passwordMatchValidator
  });

  loading = false;
  errors: string[] = [];

  constructor(private auth: AuthService, private router: Router) { }

  onSubmit() {
    this.loading = true;
    
    if (this.form.valid && this.form.value.password === this.form.value.confirmPassword) {
      const { name, email, password } = this.form.value;
      this.auth.register({ name, email, password }).subscribe({
        next: (res) => {

          this._snackBar.open(res.msg, '', {
            duration: 3000
          });

          const { token } = res
          localStorage.setItem('token', token)

          this.router.navigateByUrl('/dashboard')
          this.loading = false;

        },
        error: (err) => {

          const { errors } = err.error
          // this.errors = errors

          errors.forEach((err: any) => {
            this._snackBar.open(err.msg, 'Cerrar');
          });

          console.error('Error de registro', this.errors)
          this.loading = false;
        }
      });
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);  // Usamos router.navigate() para redirigir
  }
}
