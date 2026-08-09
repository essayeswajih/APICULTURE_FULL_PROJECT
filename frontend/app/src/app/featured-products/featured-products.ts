import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, Inject, Input, PLATFORM_ID, ViewChild } from '@angular/core';
import { Api, Product, PromoTimeLeft } from '../services/api';
import { CartItem } from '../pages/boutique/boutique';
import { ToastrService } from 'ngx-toastr';
import { Cart } from '../services/cart';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-featured-products',
  imports: [CommonModule, RouterLink],
  templateUrl: './featured-products.html',
  styleUrl: './featured-products.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FeaturedProducts implements AfterViewInit {
  @ViewChild('featuredSwiper') featuredSwiper?: ElementRef<HTMLElement>;
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
  @Input() promoTimeLeft: PromoTimeLeft | null = null;
  swiperConfig = {
    loop: true,
    speed: 4500,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
      reverseDirection: true,
    },
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
  ngAfterViewInit(): void {
    const el = this.featuredSwiper?.nativeElement as any;
    if (!el) return;
    Object.assign(el, {
      loop: this.swiperConfig.loop,
      speed: this.swiperConfig.speed,
      autoplay: this.swiperConfig.autoplay,
      slidesPerView: this.swiperConfig.slidesPerView,
      spaceBetween: this.swiperConfig.spaceBetween,
      breakpoints: this.swiperConfig.breakpoints,
      navigation: {
        nextEl: '.products-carousel-next-featured',
        prevEl: '.products-carousel-prev-featured',
      },
    });
    el.initialize?.();
  }
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

  hasActivePromoCountdown(product: Product): boolean {
    return Boolean(product.promo && this.promoTimeLeft && !this.promoTimeLeft.expired);
  }

  /*products = [
    {
      name: "Greek Style Plain Yogurt",
      img: "/assets/images/product-thumb-10.png",
      price: 18,
      oldPrice: 24,
      rating: 4.5
    },
    {
      name: "Pure Squeezed No Pulp Orange Juice",
      img: "/assets/images/product-thumb-11.png",
      price: 18,
      oldPrice: 24,
      rating: 4.5
    },
    {
      name: "Fresh Oranges",
      img: "/assets/images/product-thumb-12.png",
      price: 18,
      oldPrice: 24,
      rating: 4.5
    },
    {
      name: "Gourmet Dark Chocolate Bars",
      img: "/assets/images/product-thumb-13.png",
      price: 18,
      oldPrice: 24,
      rating: 4.5
    }
  ];*/
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
