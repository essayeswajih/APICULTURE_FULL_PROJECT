import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';
import { Api } from '../services/api';
import { firstValueFrom } from 'rxjs';  // Import firstValueFrom from RxJS

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const api = inject(Api);
  const router = inject(Router);

  // Check if the user is authenticated
  if (authService.isAuthenticated()) {
    // Validate the token or check the user session using firstValueFrom
    return firstValueFrom(api.getUser()).then(
      () => {
        return true;  // Allow navigation if the token is valid
      },
      () => {
        // If token is invalid or user session is not valid, redirect to login
        router.navigate(['/login']);
        return false;
      }
    );
  } else {
    // If not authenticated, redirect to login page
    router.navigate(['/login']);
    return false;  // Block navigation
  }
};
