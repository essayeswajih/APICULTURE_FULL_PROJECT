import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environments';

interface Credentials {
  username: string;
  password: string;
}

interface TokenResponse {
  access_token: string;
  token_type: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl+'/auth'; // Base URL from environment (e.g., http://localhost:8000)
  private tokenKey = 'access_token';

  constructor(private http: HttpClient) {}

  // Login method to authenticate user and get JWT token
  login(credentials: Credentials): Observable<TokenResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new URLSearchParams();
    body.set('username', credentials.username);
    body.set('password', credentials.password);

    return this.http.post<TokenResponse>(`${this.apiUrl}/token`, body.toString(), { headers }).pipe(
      tap(response => {
        // Store the token in localStorage
        if (response.access_token) {
          localStorage.setItem(this.tokenKey, response.access_token);
        }
      }),
      catchError(this.handleError)
    );
  }

  // Get current user from the protected endpoint
  getCurrentUser(): Observable<any> {
    const token = this.getToken();
    if (!token) {
      return throwError(() => new Error('No token found'));
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get(`${this.apiUrl}/users/me`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Get stored token
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // Logout method to clear token
  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  // Error handling
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred';
    if (error.status === 401) {
      errorMessage = 'Invalid credentials';
    } else if (error.error instanceof ErrorEvent) {
      errorMessage = `Client error: ${error.error.message}`;
    } else {
      errorMessage = `Server error: ${error.status} - ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
  
}