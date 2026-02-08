import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, CUSTOM_ELEMENTS_SCHEMA, Inject, Input, PLATFORM_ID } from '@angular/core';

import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Api, Product } from '../../services/api';
import { ToastrService } from 'ngx-toastr';
import { Cart } from '../../services/cart';
import { CartItem } from '../../pages/boutique/boutique';

@Component({
  selector: 'app-similar-products',
  imports: [CommonModule, RouterLink],
  templateUrl: './similar-products.html',
  styleUrl: './similar-products.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SimilarProducts {

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
    slidesPerView: 4,
    spaceBetween: 20,
    navigation: {
      nextEl: '.products-carousel-next',
      prevEl: '.products-carousel-prev',
    },
    breakpoints: {
      320: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      992: { slidesPerView: 3 },
      1200: { slidesPerView: 4 },
    }
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
  goToProductBySlug(slug: string): void {
    this.RouterS.navigate(['/product', slug]);
    this.cdRef.markForCheck();
    this.cdRef.detectChanges();
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

}