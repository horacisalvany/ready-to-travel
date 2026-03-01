import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email = '';
  password = '';
  isRegisterMode = false;
  isLoading = false;
  hidePassword = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  async onSubmit() {
    if (!this.email || !this.password) {
      this.showError('Please fill in all fields');
      return;
    }

    this.isLoading = true;

    try {
      if (this.isRegisterMode) {
        await this.authService.register(this.email, this.password);
        this.showSuccess('Account created successfully!');
      } else {
        await this.authService.login(this.email, this.password);
      }
      this.router.navigate(['/']);
    } catch (error: any) {
      this.showError(this.getErrorMessage(error.code));
    } finally {
      this.isLoading = false;
    }
  }

  async onGoogleLogin() {
    this.isLoading = true;

    try {
      await this.authService.loginWithGoogle();
      this.router.navigate(['/']);
    } catch (error: any) {
      this.showError(this.getErrorMessage(error.code));
    } finally {
      this.isLoading = false;
    }
  }

  toggleMode() {
    this.isRegisterMode = !this.isRegisterMode;
  }

  private showError(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      panelClass: ['error-snackbar'],
    });
  }

  private showSuccess(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }

  private getErrorMessage(code: string): string {
    switch (code) {
      case 'auth/user-not-found':
        return 'No account found with this email';
      case 'auth/wrong-password':
        return 'Incorrect password';
      case 'auth/email-already-in-use':
        return 'Email is already registered';
      case 'auth/weak-password':
        return 'Password should be at least 6 characters';
      case 'auth/invalid-email':
        return 'Invalid email address';
      case 'auth/popup-closed-by-user':
        return 'Google sign-in was cancelled';
      default:
        return 'An error occurred. Please try again.';
    }
  }
}
