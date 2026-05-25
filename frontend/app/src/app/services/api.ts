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
  image_url?: string;
  link?: string;
  subcategories?: SubCategory[];
}
export interface SubCategory {
  id: number;
  name: string;
  description?: string;
  image_url?: string;
  link?: string;
  category_id: number;
}


export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  stock_quantity: number;
  category_id: number;
  discounted_price?: number;  // Optional discounted price
  vip_price?: number | null;   // Optional VIP-only price
  image_url?: string;         // Optional image URL for the product
  image2_url?: string; // Optional second image URL
  image3_url?: string; // Optional third image URL
  image4_url?: string; // Optional fourth image URL
  promo?: boolean;            // Indicates if the product is on promotion
  buzzent?: string;           // Optional field for buzz or marketing text
  rating?: number;            // Average rating of the product
  num_ratings?: number;       // Number of ratings for the product
  slug?: string;              // Optional slug for the product
  shipping_cost?: number;     // Optional field for shipping cost
  subcategory_id?: number | null;    // Optional field for subcategory ID
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
  items: { product_id: number; quantity: number; price: number; public_price?: number | null; vip_applied?: boolean; name:string; shipping_cost: number }[];
  username: string;
  email: string;
  telephone: string;
  location: string;
  payment_method: string;
  code: string; // Unique code for the order
  vip_code?: string | null;
}

export interface CartPricingRequest {
  vip_code?: string | null;
  items: { product_id: number; quantity: number }[];
}

export interface CartPricingItem {
  product_id: number;
  name: string;
  quantity: number;
  regular_price: number;
  public_price: number;
  vip_price?: number | null;
  final_price: number;
  vip_applied: boolean;
  shipping_cost: number;
  line_total: number;
}

export interface CartPricingResponse {
  valid_vip: boolean;
  vip_code?: string | null;
  message: string;
  has_vip_savings: boolean;
  subtotal: number;
  shipping: number;
  total: number;
  items: CartPricingItem[];
}

export interface Story {
  id: number;
  platform: string;
  url: string;
  thumbnail: string;
  title: string;
  periority: number;
  created_at: string;
  updated_at: string;
}

export interface PublicStats {
  product_count: number;
  happy_customers: number;
  store_locations: number;
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

    // Use optional chaining to safely access message
    if (error.error?.message) {
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
  getProducts(categoryQuery: string, sortBy: string, searchQuery: string): Observable<Product[]> {
    let params = new HttpParams();

    if (categoryQuery) {
      params = params.set('category', categoryQuery); // Send category as query param
    }

    if (sortBy) {
      params = params.set('sortBy', sortBy); // Send sortBy as query param
    }

    if (searchQuery) {
      params = params.set('search', searchQuery); // Send search query as param
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
  getProductBySlug(slug: string): Observable<Product> {
    return this.http
      .get<Product>(`${this.apiUrl}/products/slug/${slug}`)
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
      .post<Order>(`${this.apiUrl}/orders`, order)
      .pipe(catchError(this.handleError));
  }

  validateVipCart(payload: CartPricingRequest): Observable<CartPricingResponse> {
    return this.http
      .post<CartPricingResponse>(`${this.apiUrl}/vip-cards/validate-cart`, payload)
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
      .get<Order>(`${this.apiUrl}/orders/orderCode/${code}`)
      .pipe(catchError(this.handleError));
  }
  subscribeToNewsletter(email: string): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/subscribe_to_newsletter`, { email })
      .pipe(catchError(this.handleError));
  }
  subscribeToRedections(name:string,email: string): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/subscribe_to_redactions`, { name,email })
      .pipe(catchError(this.handleError));
  }
  sendContactMessage(name: string, email: string, sujet: string, message: string): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/support-contact`, { name, email, sujet, message })
      .pipe(catchError(this.handleError));
  }
  uploadImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post(`${this.apiUrl}/upload`, formData, {
      headers: this.getAuthHeaders(), // Your token headers
      reportProgress: true,
      observe: 'events', // Needed to track progress
    }).pipe(
      catchError(this.handleError)
    );
  }
  getAllImages(): Observable<{ images: string[] }> {
    return this.http
      .get<{ images: string[] }>(`${this.apiUrl}/images`, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }


  // Stories API
  getStories(): Observable<Story[]> {
    return this.http
      .get<Story[]>(`${this.apiUrl}/stories`)
      .pipe(catchError(this.handleError));
  }

  getStoryById(id: number): Observable<Story> {
    return this.http
      .get<Story>(`${this.apiUrl}/stories/${id}`)
      .pipe(catchError(this.handleError));
  }

  addStory(story: Story): Observable<Story> {
    return this.http
      .post<Story>(`${this.apiUrl}/stories`, story, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  updateStory(id: number, story: Story): Observable<Story> {
    return this.http
      .put<Story>(`${this.apiUrl}/stories/${id}`, story, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  deleteStory(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/stories/${id}`, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }
    getSubcategories(): Observable<SubCategory[]> {
    return this.http
      .get<SubCategory[]>(`${this.apiUrl}/subcategories`)
      .pipe(catchError(this.handleError));
  }
    getPublicStats(): Observable<PublicStats> {
    return this.http
      .get<PublicStats>(`${this.apiUrl}/public-stats`)
      .pipe(catchError(this.handleError));
  }

}
