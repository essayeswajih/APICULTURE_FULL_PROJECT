import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environments';
import { AuthService } from './auth'; // Import AuthService

export interface Category {
  id: number;
  name: string;
  description?: string;
}

export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  stock_quantity: number;
  category_id: number;
  discounted_price?: number;  // Optional discounted price
  image_url?: string;         // Optional image URL for the product
  image2_url?: string; // Optional second image URL
  image3_url?: string; // Optional third image URL
  image4_url?: string; // Optional fourth image URL
  promo?: boolean;            // Indicates if the product is on promotion
  buzzent?: string;           // Optional field for buzz or marketing text
}


export enum OrderStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
}

export interface Order {
  id: number;
  total_amount: number;
  status: OrderStatus;
  created_at: string;
  items: { product_id: number; quantity: number; price: number,name:string }[];
  username: string;
  email: string;
  telephone: string;
  location: string;
  payment_method: string;
  code: string; // Unique code for the order
}

@Injectable({
  providedIn: 'root',
})
export class Api {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) {} // Inject AuthService

  // Helper to get headers with JWT token
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    if (!token) {
      throw new Error('No authentication token found');
    }
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  // Helper to handle API errors
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Backend returned an unsuccessful response code
      errorMessage = `Error ${error.status}: ${error.error?.detail || error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }

  // Categories API
  getCategories(): Observable<Category[]> {
    return this.http
      .get<Category[]>(`${this.apiUrl}/categories`)
      .pipe(catchError(this.handleError));
  }


  
  addCategory(category: Category): Observable<Category> {
    return this.http
      .post<Category>(`${this.apiUrl}/categories`, category, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  updateCategory(id: number, category: Category): Observable<Category> {
    return this.http
      .put<Category>(`${this.apiUrl}/categories/${id}`, category, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  deleteCategory(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/categories/${id}`, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

    // Products API
  getProducts(categoryQuery: string, sortBy: string): Observable<Product[]> {
    let params = new HttpParams();

    if (categoryQuery) {
      params = params.set('category', categoryQuery); // Send category as query param
    }

    if (sortBy) {
      params = params.set('sortBy', sortBy); // Send sortBy as query param
    }

    return this.http
      .get<Product[]>(`${this.apiUrl}/products`, { params }) // Passing params to the GET request
      .pipe(catchError(this.handleError));  // Handle errors
  }

  getProductById(id: number): Observable<Product> {
    return this.http
      .get<Product>(`${this.apiUrl}/products/${id}`)
      .pipe(catchError(this.handleError));
  }

  addProduct(product: Product): Observable<Product> {
    return this.http
      .post<Product>(`${this.apiUrl}/products`, product, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http
      .put<Product>(`${this.apiUrl}/products/${id}`, product, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  deleteProduct(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/products/${id}`, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Orders API
  getOrders(): Observable<Order[]> {
    return this.http
      .get<Order[]>(`${this.apiUrl}/orders`,{ headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  updateOrderStatus(id: number, status: OrderStatus): Observable<Order> {
    return this.http
      .put<Order>(`${this.apiUrl}/orders/orderStatus/${id}`, { status }, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }
  updateOrde(id: number, order: Order): Observable<Order> {
    return this.http
      .put<Order>(`${this.apiUrl}/orders/${id}`, { order }, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  createOrder(order: Order): Observable<Order> {
    return this.http
      .post<Order>(`${this.apiUrl}/orders`, order, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  deleteOrder(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/orders/${id}`, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }
  getUser(): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/auth/users/me`, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }
  getOrderByCode(code:string): Observable<any> {
    return this.http
      .get<Order>(`${this.apiUrl}/orders/orderCode/${code}`, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }
}