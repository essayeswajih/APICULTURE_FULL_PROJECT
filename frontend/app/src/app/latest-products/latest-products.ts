import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  Inject,
  Input,
  PLATFORM_ID,
  ViewChild
} from '@angular/core';

import {
  Api,
  Product,
  PromoTimeLeft
} from '../services/api';

import {
  ActivatedRoute,
  Router
} from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { Cart } from '../services/cart';
import { CartItem } from '../pages/boutique/boutique';

@Component({
  selector: 'app-latest-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './latest-products.html',
  styleUrls: ['./latest-products.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LatestProducts implements AfterViewInit {

  @ViewChild('latestSwiper')
  latestSwiper?: ElementRef<HTMLElement>;

  @ViewChild('latestPrevBtn')
  latestPrevBtn?: ElementRef<HTMLButtonElement>;

  @ViewChild('latestNextBtn')
  latestNextBtn?: ElementRef<HTMLButtonElement>;

  @Input()
  products: Product[] = [];

  @Input()
  promoTimeLeft: PromoTimeLeft | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: Api,
    private RouterS: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdRef: ChangeDetectorRef,
    private toastService: ToastrService,
    private cartService: Cart
  ) {}

  swiperConfig = {
    loop: true,

    speed: 7000,

    autoplay: {
      delay: 0,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
      reverseDirection: true,
    },

    freeMode: {
      enabled: true,
      momentum: false,
    },

    loopAdditionalSlides: 3,

    breakpoints: {
      320: {
        slidesPerView: 1
      },

      768: {
        slidesPerView: 2
      },

      992: {
        slidesPerView: 3
      },

      1200: {
        slidesPerView: 4
      }
    }
  };

  ngAfterViewInit(): void {

    const swiperEl =
      this.latestSwiper?.nativeElement as any;

    const prevButton =
      this.latestPrevBtn?.nativeElement;

    const nextButton =
      this.latestNextBtn?.nativeElement;

    if (!swiperEl) {
      return;
    }

    if (!prevButton || !nextButton) {
      return;
    }

    Object.assign(swiperEl, {

      loop: this.swiperConfig.loop,

      speed: this.swiperConfig.speed,

      autoplay: this.swiperConfig.autoplay,

      freeMode: this.swiperConfig.freeMode,

      loopAdditionalSlides:
        this.swiperConfig.loopAdditionalSlides,

      breakpoints:
        this.swiperConfig.breakpoints,

      navigation: {
        prevEl: prevButton,
        nextEl: nextButton
      }

    });

    if (swiperEl.initialize) {
      swiperEl.initialize();
    }
  }

  addToCart(product: Product): void {

    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const storedCart =
      localStorage.getItem('cartItems');

    let cartItems: CartItem[] =
      storedCart
        ? JSON.parse(storedCart)
        : [];

    const existingItem =
      cartItems.find(
        item => item.id === product.id
      );

    if (existingItem) {

      existingItem.quantity += 1;

    } else {

      const cartItem: CartItem = {

        id: product.id,

        name: product.name,

        image: product.image_url ?? null,

        price:
          product.discounted_price &&
          product.discounted_price > 0
            ? product.discounted_price
            : product.price,

        quantity: 1,

        shipping_cost:
          product.shipping_cost || 9
      };

      cartItems.push(cartItem);

      this.cartService.add();
    }

    this.toastService.success(
      'Produit ajouté au panier',
      'Succès',
      {
        timeOut: 2000,
        positionClass: 'toast-bottom-right',
        progressBar: true,
        closeButton: true,
      }
    );

    localStorage.setItem(
      'cartItems',
      JSON.stringify(cartItems)
    );

    this.cdRef.detectChanges();
  }

  goToProduct(id: number): void {
    this.RouterS.navigate([
      '/product',
      id
    ]);
  }

  goToProductBySlug(slug: string): void {
    this.RouterS.navigate([
      '/product',
      slug
    ]);
  }

  hasActivePromoCountdown(
    product: Product
  ): boolean {

    return Boolean(
      product.promo &&
      this.promoTimeLeft &&
      !this.promoTimeLeft.expired
    );
  }

  getStars(n: any) {

    const value = Number(n);

    if (
      !Number.isFinite(value) ||
      value <= 0
    ) {
      return [];
    }

    const stars =
      Math.min(
        Math.floor(value),
        5
      );

    return Array(stars).fill(0);
  }
}