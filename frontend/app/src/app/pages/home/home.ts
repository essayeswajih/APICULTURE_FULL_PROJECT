import { CommonModule, isPlatformBrowser, NgOptimizedImage } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Api, Category, LayoutImage, Product } from '../../services/api';
import { HttpClientModule } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { CartItem } from '../boutique/boutique';
import { ToastrService } from 'ngx-toastr';
import { Cart } from '../../services/cart';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FeaturedProducts } from '../../featured-products/featured-products';
import { PopularProducts } from '../../popular-products/popular-products';
import { LatestProducts } from '../../latest-products/latest-products';
import { CategoryCarousel } from '../../category-carousel/category-carousel';
import { VideoStories } from '../../components/video-stories/video-stories';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    FeaturedProducts,
    PopularProducts,
    LatestProducts,
    CategoryCarousel,
    ReactiveFormsModule,
    VideoStories
],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class Home implements OnInit, AfterViewInit, OnDestroy {
  products: Product[] = [];
  featuredProducts: Product[] = [];
  popularProducts: Product[] = [];
  latestProducts: Product[] = [];
  categories: Category[] = [];
  isDesktop = false;
  isLoading = true;
  email = '';
  subForm: FormGroup;
  // mohamed: dynamic homepage counters (products, customers, locations).
  publicStats = {
    productCount: 0,
    happyCustomers: 0,
    storeLocations: 0,
  };
  layoutImages: Record<string, string> = {
    home_hero_background: '/assets/images/3d-rendering-hexagonal-texture-background_23-2150796428.avif',
    home_promo_banner_large: '/assets/images/imgbanner1.png',
    home_promo_banner_top: '/assets/images/imgbanner2.png',
    home_promo_banner_bottom: '/assets/images/imgbanner3.png',
    home_newsletter_background: '/assets/images/banner-newsletter.jpg',
    home_app_image: '/assets/images/banner-onlineapp.png',
  };


  // Preloader control
  private preloaderTimeout?: any;
  private productsLoaded = false;
  private categoriesLoaded = false;

  constructor(
    private apiService: Api,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdRef: ChangeDetectorRef,
    private toastService: ToastrService,
    private cartService: Cart,
    private fb: FormBuilder
  ) {
     this.subForm = this.fb.group({
      subName: ['', Validators.required],
      subEmail: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.startPreloader();
    this.checkIfDesktop();
    this.loadProducts();
    this.loadCategories();
    this.loadPublicStats();
    this.loadLayoutImages();
  }

  ngAfterViewInit(): void {
    this.checkIfDesktop();
  }

  ngOnDestroy(): void {
    if (this.preloaderTimeout) {
      clearTimeout(this.preloaderTimeout);
    }
  }

  // Preloader Logic – 100% Reliable
  private startPreloader(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    document.body.classList.add('preloader-active');

    // Max 3 seconds fallback
    this.preloaderTimeout = setTimeout(() => {
      this.hidePreloader();
    }, 3000);
  }

  private hidePreloader(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const preloader = document.querySelector('.preloader-wrapper');
    const body = document.body;

    if (preloader) preloader.classList.add('loaded');
    if (body.classList.contains('preloader-active')) {
      body.classList.remove('preloader-active');
    }

    if (this.preloaderTimeout) {
      clearTimeout(this.preloaderTimeout);
      this.preloaderTimeout = undefined;
    }

    this.isLoading = false;
    this.cdRef.detectChanges();
  }

  private checkAllDataLoaded(): void {
    if (this.productsLoaded && this.categoriesLoaded) {
      this.hidePreloader();
    }
  }

  private checkIfDesktop(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isDesktop = window.innerWidth >= 920;
    }
  }

  private loadProducts(): void {
    forkJoin({
      featuredProducts: this.apiService.getFeaturedProducts(),
      popularProducts: this.apiService.getPopularProducts(),
      latestProducts: this.apiService.getLatestProducts(),
    }).subscribe({
      next: ({ featuredProducts, popularProducts, latestProducts }) => {
        this.featuredProducts = featuredProducts;
        this.popularProducts = popularProducts;
        this.latestProducts = latestProducts;
        this.products = latestProducts;
        this.productsLoaded = true;
        this.checkAllDataLoaded();
        this.cdRef.detectChanges();
      },
      error: (err) => {
        console.error('Failed to load products:', err);
        this.productsLoaded = true;
        this.checkAllDataLoaded(); // Don't block forever
      },
    });
  }

  private loadCategories(): void {
    this.apiService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
        this.categoriesLoaded = true;
        this.checkAllDataLoaded();
        this.cdRef.detectChanges();
      },
      error: (err) => {
        console.error('Failed to load categories:', err);
        this.categoriesLoaded = true;
        this.checkAllDataLoaded(); // Always unblock
      },
    });
  }

  // mohamed: fetch homepage counters from backend.
  private loadPublicStats(): void {
    this.apiService.getPublicStats().subscribe({
      next: (stats) => {
        this.publicStats = {
          productCount: stats.product_count,
          happyCustomers: stats.happy_customers,
          storeLocations: stats.store_locations,
        };
        this.cdRef.detectChanges();
      },
      error: (err) => {
        console.error('Failed to load public stats:', err);
      },
    });
  }

  private loadLayoutImages(): void {
    this.apiService.getLayoutImages().subscribe({
      next: (images: LayoutImage[]) => {
        this.layoutImages = images.reduce(
          (acc, image) => ({ ...acc, [image.key]: image.image_url }),
          { ...this.layoutImages }
        );
        this.cdRef.detectChanges();
      },
      error: (err) => {
        console.error('Failed to load layout images:', err);
      },
    });
  }

  layoutImage(key: string): string {
    return this.layoutImages[key] || '';
  }

  // mohamed: keep the stats display readable (e.g., 14000 -> 14k+).
  formatCount(value: number): string {
    if (value >= 1000) {
      return `${Math.floor(value / 1000)}k+`;
    }
    return `${value}+`;
  }

  addToCart(product: Product): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const storedCart = localStorage.getItem('cartItems');
    let cartItems: CartItem[] = storedCart ? JSON.parse(storedCart) : [];

    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.push({
        id: product.id,
        name: product.name,
        image: product.image_url ?? null,
        price: (product.discounted_price && product.discounted_price > 0 )? product.discounted_price : product.price,
        quantity: 1,
        shipping_cost: product.shipping_cost || 9 // Add shipping cost if available
      });
      this.cartService.add();
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    this.toastService.success('Produit ajouté au panier', 'Succès', {
      timeOut: 2000,
      positionClass: 'toast-bottom-right',
      progressBar: true,
      closeButton: true,
    });
  }

  goToProduct(id: number): void {
    this.router.navigate(['/product', id]);
  }
  goToProductBySlug(slug: string): void {
    this.router.navigate(['/product', slug]);
  }

  subscribe(): void {
    if (!this.email || !this.email.includes('@')) {
      this.toastService.error('Veuillez entrer une adresse e-mail valide', 'Erreur');
      return;
    }

    this.apiService.subscribeToNewsletter(this.email).subscribe({
      next: () => {
        this.toastService.success('Inscription réussie !', 'Succès');
        this.email = '';
      },
      error: () => {
        this.toastService.error('Erreur lors de l\'inscription', 'Erreur');
      },
    });
  }
sub(): void {

  if (this.subForm.invalid) {
    this.subForm.markAllAsTouched();
    return;
  }

  const { subName, subEmail } = this.subForm.value;

  this.apiService.subscribeToRedections(subName, subEmail).subscribe({
    next: () => {
      this.toastService.success('Inscription réussie !', 'Succès');
      this.subForm.reset(); // ✅ reset only on success
    },
    error: () => {
      this.toastService.error(
        'Erreur lors de l\'inscription',
        'Erreur'
      );
    },
  });
}

}
