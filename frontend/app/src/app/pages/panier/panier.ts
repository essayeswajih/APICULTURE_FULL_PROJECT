import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { gsap } from 'gsap';
import { Api, Order, OrderStatus } from '../../services/api';
import { ToastrService } from 'ngx-toastr';
import { Cart } from '../../services/cart';

interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

@Component({
  selector: 'app-panier',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './panier.html',
  styleUrl: './panier.scss'
})
export class Panier implements OnInit {
  cartItems: CartItem[] = [];

  paymentMethod: string = 'online'; // Default to 'online'
  checkoutForm: FormGroup;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private meta: Meta,
    private title: Title,
    private router: Router,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private api: Api, // Inject Api service
    private toastService: ToastrService, // Inject ToastrService for notifications
    private cartService: Cart // Inject Cart service
  ) {
    // Initialize reactive form
    this.checkoutForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      deliveryLocation: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  ngOnInit(): void {
    // Set SEO meta tags
    this.title.setTitle('Panier - Apiculture Galai');
    this.meta.updateTag({
      name: 'description',
      content: 'Consultez et gérez votre panier chez Apiculture Galai. Découvrez nos produits apicoles de qualité.'
    });

    // Load cart items from localStorage
    if (isPlatformBrowser(this.platformId)) {
      const storedCart = localStorage.getItem('cartItems');
      if (storedCart) {
        this.cartItems = JSON.parse(storedCart);
      } else {
        // Initialize with default items if localStorage is empty
        this.cartItems = [];
        this.saveCartToLocalStorage();
      }
    }

    // GSAP animations
    if (isPlatformBrowser(this.platformId)) {
      gsap.from('.panier-section', {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.3,
        ease: 'power3.out',
        delay: 0.2
      });
      gsap.from('.panier-img', {
        opacity: 0,
        scale: 0.9,
        duration: 1.2,
        stagger: 0.3,
        ease: 'power3.out',
        delay: 0.4
      });
    }
  }

  // Save cart items to localStorage
  private saveCartToLocalStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('cartItems');
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    }
  }

  updateQuantity(item: CartItem, quantity: number): void {
    if (quantity >= 1) {
      // Create a new array to ensure change detection
      this.cartItems = this.cartItems.map(cartItem =>
        cartItem.id === item.id ? { ...cartItem, quantity } : cartItem
      );
      this.saveCartToLocalStorage(); // Save updated cart to localStorage
      this.cdr.detectChanges(); // Explicitly trigger change detection
    }
  }

  removeItem(itemId: number): void {
    this.cartItems = this.cartItems.filter(item => item.id !== itemId);
    this.saveCartToLocalStorage(); // Save updated cart to localStorage
    this.toastService.success('Product removed from cart', 'Success', {
            timeOut: 2000,
            positionClass: 'toast-bottom-right',
            progressBar: true,
            closeButton: true,
  });
    this.cartService.remove();
    this.cdr.detectChanges(); // Explicitly trigger change detection
  }

  getSubtotal(): number {
    const subtotal = this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return subtotal;
  }

  getTax(): number {
    const tax = this.getSubtotal() * 0.19;
    return tax;
  }

  getTotal(): number {
    const total = this.getSubtotal() + this.getTax();
    return total;
  }

  openCheckoutModal(): void {
    if (this.cartItems.length > 0) {
      if (isPlatformBrowser(this.platformId)) {
        const modalElement = document.getElementById('checkoutModal');
        if (modalElement) {
          const bootstrap = (window as any).bootstrap;
          if (bootstrap) {
            const modal = new bootstrap.Modal(modalElement);
            modal.show();
          } else {
            console.error('Bootstrap JS not loaded');
          }
        } else {
          console.error('Modal element not found');
        }
        this.cdr.detectChanges();
      }
    }
  }

  closeModal(): void {
    console.log('Closing checkout modal');
    if (isPlatformBrowser(this.platformId)) {
      const modalElement = document.getElementById('checkoutModal');
      if (modalElement) {
        const bootstrap = (window as any).bootstrap;
        if (bootstrap) {
          const modal = bootstrap.Modal.getInstance(modalElement);
          if (modal) {
            modal.hide();
          }
        }
      }
    }
    this.checkoutForm.reset();
    this.cdr.detectChanges();
  }

  finalizeOrder(): void {
  if (this.checkoutForm.valid) {
    console.log('Finalizing order:', this.checkoutForm.value);
    const orderData: Order = {
      total_amount: this.getTotal(),
      status: OrderStatus.PENDING,
      items: this.cartItems.map(item => ({
        product_id: item.id,
        quantity: item.quantity,
        price: item.price,
        name: item.name 
      })),
      id: 0,
      username: this.checkoutForm.value.fullName,
      email: this.checkoutForm.value.email,
      telephone: this.checkoutForm.value.phone.toString(),
      location: this.checkoutForm.value.deliveryLocation,
      payment_method: this.paymentMethod,
      created_at: new Date().toISOString(),
      code: ''
    };

    this.api.createOrder(orderData).subscribe({
      next: (order) => {
        console.log('Order created successfully:', order);
        this.router.navigate(['/order-confirmation', order.id]);
        // Clear cart after order finalization
        this.cartItems = [];
        this.saveCartToLocalStorage();
        this.cartService.setzero(); 
      },
      error: (err) => {
        console.error('Failed to create order:', err);
        alert('An error occurred while finalizing your order. Please try again later.');
      }
    });
    this.closeModal();

  }
}
}