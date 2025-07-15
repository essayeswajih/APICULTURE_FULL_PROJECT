import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

interface Credentials {
  username: string; // Changed from email to match FastAPI's OAuth2PasswordRequestForm
  password: string;
}


@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  credentials: Credentials = {
    username: '',
    password: ''
  };
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.errorMessage = null;
    this.authService.login(this.credentials).subscribe({
      next: () => {
        // On successful login, navigate to a protected route (e.g., dashboard)
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.errorMessage = "Invalid credentials. Please try again.";
      }
    });
  }
}