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
import { Api, Category, Product } from '../../services/api';
import { HttpClientModule } from '@angular/common/http';
import { CartItem } from '../boutique/boutique';
import { ToastrService } from 'ngx-toastr';
import { Cart } from '../../services/cart';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { FeaturedProducts } from '../../featured-products/featured-products';
import { PopularProducts } from '../../popular-products/popular-products';
import { LatestProducts } from '../../latest-products/latest-products';
import { CategoryCarousel } from '../../category-carousel/category-carousel';

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
],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class Home implements OnInit, AfterViewInit, OnDestroy {
  products: Product[] = [];
  featuredProducts: Product[] = [];
  popularProducts: Product[] = [];
  latestProducts: Product[] = [];
  productChunks: Product[][] = [];
  categories: Category[] = [];
  isDesktop = false;
  isLoading = true;
  email = '';
  subForm: FormGroup;


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
    this.apiService.getProducts('', '', '').subscribe({
      next: (products) => {
        this.products = products;

        const isMobile = isPlatformBrowser(this.platformId) && window.innerWidth <= 767;
        const chunkSize = isMobile ? 1 : 4;
        this.productChunks = this.chunkArray(products, chunkSize);

        const chunk = Math.ceil(products.length / 3);

        this.popularProducts = products.slice(0, chunk);
        this.latestProducts = products.slice(chunk, chunk * 2);
        this.featuredProducts = products.slice(chunk * 2, products.length);

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

  private chunkArray(array: Product[], size: number): Product[][] {
    const chunks: Product[][] = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
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
        price: product.price,
        quantity: 1,
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

    const payload = this.subForm.value;

    this.apiService.subscribeToRedections(payload.subName,payload.email).subscribe({
      next: () => {
        this.toastService.success('Inscription réussie !', 'Succès');
        this.email = '';
      },
      error: () => {
        this.toastService.error('Erreur lors de l\'inscription', 'Erreur');
      },
    });

    this.subForm.reset();
  }
}