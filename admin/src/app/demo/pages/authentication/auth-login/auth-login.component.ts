// project import
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth';

interface Credentials {
  username: string; // Changed from email to match FastAPI's OAuth2PasswordRequestForm
  password: string;
}

@Component({
  selector: 'app-auth-login',
  imports: [RouterModule,FormsModule],
  templateUrl: './auth-login.component.html',
  styleUrl: './auth-login.component.scss'
})
export class AuthLoginComponent {
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
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.errorMessage = "Invalid credentials. Please try again.";
      }
    });
  }

  // public method
  SignInOptions = [
    {
      image: 'assets/images/authentication/google.svg',
      name: 'Google'
    },
    {
      image: 'assets/images/authentication/twitter.svg',
      name: 'Twitter'
    },
    {
      image: 'assets/images/authentication/facebook.svg',
      name: 'Facebook'
    }
  ];
}
