import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, CUSTOM_ELEMENTS_SCHEMA, Inject, Input, PLATFORM_ID } from '@angular/core';
import { Api, Product } from '../services/api';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cart } from '../services/cart';
import { CartItem } from '../pages/boutique/boutique';

@Component({
  selector: 'app-popular-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './popular-products.html',
  styleUrls: ['./popular-products.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PopularProducts {
    constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: Api,
    private RouterS: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdRef: ChangeDetectorRef,
    private toastService: ToastrService,
    private cartService: Cart
  ) {}
  @Input() products: Product[] = [];
  swiperConfig = {
    breakpoints: {
      320: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      992: { slidesPerView: 3 },
      1200: { slidesPerView: 4 },
    },
  };
  addToCart(product: Product): void {
    if (isPlatformBrowser(this.platformId)) {
      const storedCart = localStorage.getItem('cartItems');
      let cartItems: CartItem[] = storedCart ? JSON.parse(storedCart) : [];

      const existingItem = cartItems.find(item => item.id === product.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        const cartItem: CartItem = {
          id: product.id,
          name: product.name,
          image: product.image_url ?? null,
          price: (product.discounted_price && product.discounted_price > 0 )? product.discounted_price : product.price,
          quantity: 1,
          shipping_cost: product.shipping_cost || 9 // Add shipping cost if available
        };
        cartItems.push(cartItem);
        this.cartService.add();
      }

      this.toastService.success('Produit ajouté au panier', 'Succès', {
        timeOut: 2000,
        positionClass: 'toast-bottom-right',
        progressBar: true,
        closeButton: true,
      });

      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      this.cdRef.detectChanges();
    }
  }
    goToProduct(id: number): void {
    this.RouterS.navigate(['/product', id]);
  }
  goToProductBySlug(slug: string): void {
    this.RouterS.navigate(['/product', slug]);
  }
  getStars(n: any) {
    const value = Number(n);

    if (!Number.isFinite(value) || value <= 0) {
      return [];
    }

    // Optional: limit stars between 0 and 5
    const stars = Math.min(Math.floor(value), 5);

    return Array(stars).fill(0);
  }

  /*products = [
    { name: 'Sandwich Bread', img: '/assets/images/product-thumb-15.png', price: 18, oldPrice: 24 },
    { name: 'Honeycrisp Apples', img: '/assets/images/product-thumb-16.png', price: 18, oldPrice: 24 },
    { name: 'Whole Wheat Sandwich Bread', img: '/assets/images/product-thumb-17.png', price: 18, oldPrice: 24 },
    { name: 'Honeycrisp Apples', img: '/assets/images/product-thumb-18.png', price: 18, oldPrice: 24 },
    { name: 'Sunstar Fresh Melon Juice', img: '/assets/images/product-thumb-19.png', price: 18, oldPrice: 24 },
    { name: 'Greek Style Plain Yogurt', img: '/assets/images/product-thumb-10.png', price: 18, oldPrice: 24 },
    { name: 'Pure Squeezed No Pulp Orange Juice', img: '/assets/images/product-thumb-11.png', price: 18, oldPrice: 24 },
    { name: 'Fresh Oranges', img: '/assets/images/product-thumb-12.png', price: 18, oldPrice: 24 },
    { name: 'Gourmet Dark Chocolate Bars', img: '/assets/images/product-thumb-13.png', price: 18, oldPrice: 24 },
  ];*/
}
