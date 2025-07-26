import { ChangeDetectorRef, Component, Inject, OnInit, OnDestroy, PLATFORM_ID, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { gsap } from 'gsap';
import { isPlatformBrowser } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { Api, Category, Product } from '../../services/api';
import { ToastrService } from 'ngx-toastr';
import { Cart } from '../../services/cart';

export interface CartItem {
  id: number;
  name: string;
  image: string | null;
  price: number;
  quantity: number;
}

@Component({
  selector: 'app-boutique',
  templateUrl: './boutique.html',
  styleUrls: ['./boutique.scss'],
  imports: [CommonModule, FormsModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Boutique implements OnInit, OnDestroy {
  products: Product[] = [];
  categories: Category[] = [];
  selectedCategory: Category = { id: 0, name: 'Tous' };
  sortBy: string = 'popularite';
  isLoading: boolean = false;
  error: string | null = null;
  
  private destroy$ = new Subject<void>();

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private route: ActivatedRoute,
    private router: Router,
    private apiService: Api,
    private cdRef: ChangeDetectorRef,
    private toastService: ToastrService, // Assuming you have a ToastService for notifications
    private cartService: Cart // Inject the Cart service
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.route.queryParams.pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: params => {
        this.isLoading = true;
        this.error = null;
        const categoryFromUrl = params['category']?.toLowerCase() || 'Tous';
        this.sortBy = params['sortBy'] || 'popularite';
        if (this.categories.length) {
          this.selectedCategory = this.categories.find(cat => 
            cat.name.toLowerCase() === categoryFromUrl) || { id: 0, name: 'Tous' };
          this.loadProducts();
        }
        this.cdRef.markForCheck();
      },
      error: err => {
        this.error = 'Failed to load parameters';
        this.isLoading = false;
        this.cdRef.markForCheck();
      }
    });
    if (isPlatformBrowser(this.platformId)) {
      gsap.from('.contact-section', {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.3,
        ease: 'power3.out',
        delay: 0.2
      });
      gsap.from('.contact-img', {
        opacity: 0,
        scale: 0.9,
        duration: 1.2,
        stagger: 0.3,
        ease: 'power3.out',
        delay: 0.4
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadCategories(): void {
    this.isLoading = true;
    this.apiService.getCategories().pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (categories) => {
        const tousCategory: Category = { id: 0, name: 'Tous' };
        this.categories = [tousCategory, ...categories.filter(cat => cat.name !== 'Tous')];
        const categoryFromUrl = this.route.snapshot.queryParams['category']?.toLowerCase() || 'Tous';
        this.selectedCategory = this.categories.find(cat => 
          cat.name.toLowerCase() === categoryFromUrl) || { id: 0, name: 'Tous' };
        this.isLoading = false;
        this.loadProducts();
        this.cdRef.markForCheck();
      },
      error: (error) => {
        this.error = 'Failed to load categories';
        this.isLoading = false;
        console.error('Error loading categories:', error);
        this.cdRef.markForCheck();
      }
    });
  }

  private loadProducts(): void {
    this.isLoading = true;
    this.apiService.getProducts(this.selectedCategory.name, this.sortBy).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (products) => {
        this.products = products;
        this.isLoading = false;
        if (isPlatformBrowser(this.platformId)) {
          // this.animateProducts();
        }
        this.cdRef.markForCheck();
      },
      error: (error) => {
        this.error = 'Failed to load products';
        this.isLoading = false;
        console.error('Error loading products:', error);
        this.cdRef.markForCheck();
      }
    });
  }

  changeSortBy(sortBy: string): void {
    console.log("clicked")
    console.log(sortBy)
      this.sortBy = sortBy;
      this.updateRoute();
      this.loadProducts();
  }

  selectCategory(category: Category): void {
    if (this.selectedCategory.id !== category.id) {
      this.selectedCategory = category;
      this.updateRoute();
      this.loadProducts();
    }
  }

  private updateRoute(): void {
    console.log(this.sortBy)
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { 
        category: this.selectedCategory.name !== 'Tous' ? this.selectedCategory.name : null,
        sortBy: this.sortBy !== 'popularite' ? this.sortBy : null 
      },
      queryParamsHandling: 'merge'
    });
  }

  private animateProducts(): void {
    if (isPlatformBrowser(this.platformId)) {
      gsap.from('.product-card', {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out'
      });
    }
  }

  trackByCategoryId(index: number, category: Category): number {
    return category.id;
  }

  trackByProductId(index: number, product: Product): number {
    return product.id;
  }

  addToCart(product: Product): void {
    if (!isPlatformBrowser(this.platformId)) return;

    try {
      const storedCart = localStorage.getItem('cartItems');
      const cartItems: CartItem[] = storedCart ? JSON.parse(storedCart) : [];
      
      const existingItem = cartItems.find(item => item.id === product.id);
      if (existingItem) {
        existingItem.quantity = Math.min(existingItem.quantity + 1, 99);
      } else {
        cartItems.push({
          id: product.id,
          name: product.name,
          image: product.image_url ?? null,
          price: product.price,
          quantity: 1
        });
        this.cartService.add();
      }
         this.toastService.success('Product added to cart', 'Success', {
            timeOut: 2000,
            positionClass: 'toast-bottom-right',
            progressBar: true,
            closeButton: true,
          });
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      this.cdRef.markForCheck();
    } catch (error) {
      console.error('Error updating cart:', error);
      this.error = 'Failed to add item to cart';
      this.cdRef.markForCheck();
    }
  }

  goToProduct(id: number): void {
    this.router.navigate(['/product', id]);
  }

  goTo(category?: string, sortBy?: string): void {
    console.log('Navigating to boutique with category:', category, 'and sortBy:', sortBy);
    
    if (category) {
      this.selectedCategory = this.categories.find(cat => cat.name.toLowerCase() === category.toLowerCase()) || { id: 0, name: 'Tous' };
    }
    
    if (sortBy) {
      this.sortBy = sortBy;
    }
    
    this.updateRoute();
    this.loadProducts();
  }
}