import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
})
export class LoginComponent {

  private _snackBar = inject(MatSnackBar);
  private fb = inject(FormBuilder)
  
  loading = false;

  form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  constructor(private authService: AuthService, private router: Router) { }
  
  onSubmit() {
    if (this.form.valid) {

      this.loading = true;

      this.authService.login(this.form.value).subscribe({
        next: (res) => {

          this._snackBar.open('Bienvenido! ', '', {
            duration: 3000
          });

          const { token } = res
          localStorage.setItem('token', token)
          this.router.navigateByUrl('/dashboard')

          this.loading = false;

        },
        error: (err) => {
          this.loading = false;
          console.error('Error de login', err.error)
        }
      });
    }
  }

  navigateToRegister() {
    this.router.navigate(['/register']);  // Usamos router.navigate() para redirigir
  }
}
