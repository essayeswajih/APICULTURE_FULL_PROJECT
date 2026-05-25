import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { gsap } from 'gsap';
import { Api, CartPricingItem, CartPricingResponse, Order, OrderStatus } from '../../services/api';
import { ToastrService } from 'ngx-toastr';
import { Cart } from '../../services/cart';

interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
  shipping_cost?: number; // Optional field for shipping cost
}

@Component({
  selector: 'app-panier',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './panier.html',
  styleUrl: './panier.scss'
})
export class Panier implements OnInit {
  cartItems: CartItem[] = [];
  vipCodeInput = '';
  appliedVipCode: string | null = null;
  vipPricing: CartPricingResponse | null = null;
  vipLoading = false;
  vipMessage = '';
  vipStatus: 'idle' | 'success' | 'error' | 'info' = 'idle';

  paymentMethod: string = 'cod'; // Default to 'online'
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
    this.refreshCartPricing();

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
      this.refreshCartPricing();
      this.cdr.detectChanges(); // Explicitly trigger change detection
    }
  }

  removeItem(itemId: number): void {
    this.cartItems = this.cartItems.filter(item => item.id !== itemId);
    this.saveCartToLocalStorage(); // Save updated cart to localStorage
    this.refreshCartPricing();
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
    if (this.vipPricing) {
      return this.vipPricing.subtotal;
    }
    const subtotal = this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return subtotal;
  }

  getTax(): number {
    const tax = this.getSubtotal() * 0.19;
    return tax;
  }

  getTotalWithTax(): number {
    const total = this.getSubtotal() + this.getTax() + 8;
    return total;
  }
  getTotalWithoutTax(): number {
    if (this.vipPricing) {
      return this.vipPricing.total;
    }
    //TVA non incluse
    const total = this.getSubtotal() + (this.getSubtotal() < 250 ? this.getShippingCost() : 0);
    return total;
  }

  getShippingCost(): number {
    if (this.vipPricing) {
      return this.vipPricing.shipping;
    }
    return this.cartItems.reduce(
      (max, { shipping_cost }) => Math.max(max, shipping_cost ?? 9.0),
      0
    );
  }

  applyVipCode(): void {
    const code = this.vipCodeInput.trim();
    if (!code) {
      this.vipStatus = 'error';
      this.vipMessage = 'Veuillez saisir un code VIP.';
      return;
    }

    this.vipLoading = true;
    this.api.validateVipCart({
      vip_code: code,
      items: this.cartItems.map(item => ({ product_id: item.id, quantity: item.quantity }))
    }).subscribe({
      next: (pricing) => {
        this.vipLoading = false;
        if (!pricing.valid_vip) {
          this.appliedVipCode = null;
          this.vipPricing = pricing;
          this.vipStatus = 'error';
          this.vipMessage = 'Code VIP invalide ou inactif.';
          this.cdr.detectChanges();
          return;
        }

        this.appliedVipCode = pricing.vip_code || code;
        this.vipCodeInput = this.appliedVipCode;
        this.vipPricing = pricing;
        this.vipStatus = pricing.has_vip_savings ? 'success' : 'info';
        this.vipMessage = pricing.has_vip_savings
          ? 'Code VIP appliqué avec succès.'
          : 'Code VIP valide, mais aucun article du panier ne possède un meilleur prix VIP.';
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.vipLoading = false;
        this.vipStatus = 'error';
        this.vipMessage = err?.message || 'Impossible de verifier ce code VIP pour le moment.';
        this.cdr.detectChanges();
      }
    });
  }

  removeVipCode(): void {
    this.appliedVipCode = null;
    this.vipCodeInput = '';
    this.vipStatus = 'idle';
    this.vipMessage = '';
    this.refreshCartPricing();
  }

  getPricedItem(item: CartItem): CartPricingItem | undefined {
    return this.vipPricing?.items.find(pricedItem => pricedItem.product_id === item.id);
  }

  getItemUnitPrice(item: CartItem): number {
    return this.getPricedItem(item)?.final_price ?? item.price;
  }

  getItemPublicPrice(item: CartItem): number {
    return this.getPricedItem(item)?.public_price ?? item.price;
  }

  hasVipPriceApplied(item: CartItem): boolean {
    return Boolean(this.getPricedItem(item)?.vip_applied);
  }

  private refreshCartPricing(): void {
    if (!this.cartItems.length) {
      this.vipPricing = null;
      this.appliedVipCode = null;
      this.vipMessage = '';
      this.vipStatus = 'idle';
      return;
    }

    this.api.validateVipCart({
      vip_code: this.appliedVipCode,
      items: this.cartItems.map(item => ({ product_id: item.id, quantity: item.quantity }))
    }).subscribe({
      next: (pricing) => {
        this.vipPricing = pricing;
        if (this.appliedVipCode && !pricing.valid_vip) {
          this.appliedVipCode = null;
          this.vipStatus = 'error';
          this.vipMessage = 'Votre code VIP n’est plus valide.';
        }
        this.cdr.detectChanges();
      },
      error: () => {
        if (this.appliedVipCode) {
          this.vipStatus = 'error';
          this.vipMessage = 'Impossible de recalculer les prix VIP.';
        }
        this.cdr.detectChanges();
      }
    });
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
    const orderData: Order = {
      total_amount: this.getTotalWithoutTax(),
      status: OrderStatus.PENDING,
      items: this.cartItems.map(item => ({
        product_id: item.id,
        quantity: item.quantity,
        price: this.getItemUnitPrice(item),
        name: item.name ,
        shipping_cost: item.shipping_cost || 9.0
      })),
      id: 0,
      username: this.checkoutForm.value.fullName,
      email: this.checkoutForm.value.email,
      telephone: this.checkoutForm.value.phone.toString(),
      location: this.checkoutForm.value.deliveryLocation,
      payment_method: this.paymentMethod,
      created_at: new Date().toISOString(),
      code: '',
      vip_code: this.appliedVipCode
    };

    this.api.createOrder(orderData).subscribe({
      next: (order) => {
        this.router.navigate(['/order-confirmation', order.id]);
        // Clear cart after order finalization
        this.toastService.success('Order placed successfully!', 'Success', {
          timeOut: 2000,
          positionClass: 'toast-bottom-right',
          progressBar: true,
          closeButton: true,
        });
        this.cartItems = [];
        this.saveCartToLocalStorage();
        this.cartService.setzero(); 
      },
      error: (err) => {
        this.toastService.error('Failed to place order. Please try again.', 'Error', {
          timeOut: 2000,
          positionClass: 'toast-bottom-right',
          progressBar: true,
          closeButton: true,
        });
      }
    });
    this.closeModal();

  }
}
}
