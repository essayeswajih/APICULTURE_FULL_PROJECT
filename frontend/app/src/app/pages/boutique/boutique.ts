import { ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { gsap } from 'gsap';
import { isPlatformBrowser } from '@angular/common';
import { Api, Category, Product } from '../../services/api';

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
})
export class Boutique implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  selectedCategory: Category = { id: 0, name: 'Tous' };
  sortBy: string = 'popularite'; // Default sorting method
  sortedProducts: Product[] = [];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private route: ActivatedRoute,
    private RouterS: Router,
    private apiService: Api,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    
    // Fetch query params and load products with category and sortBy
    this.route.queryParams.subscribe(params => {
      const categoryFromUrl = params['category'] || 'Tous';
      const sortByFromUrl = params['sortBy'] || 'popularite';

      // Normalize the category name from the URL
      const matchedCategory = this.categories.find(
        cat => cat.name.toLowerCase() === categoryFromUrl.toLowerCase()
      );
      this.selectedCategory = matchedCategory || { id: 0, name: 'Tous' };
      this.sortBy = sortByFromUrl;

      // Fetch products from the API with selected parameters
      this.loadProducts();
    });
  }

  // Fetch categories from the API
  loadCategories() {
    const tousCategory: Category = { id: 0, name: 'Tous' };
    this.apiService.getCategories().subscribe((categories) => {
      if (!categories.some(cat => cat.name === 'Tous')) {
        categories.unshift(tousCategory); // Add 'Tous' at the beginning
      }
      this.categories = categories;
      this.cdRef.detectChanges(); // Trigger change detection manually after loading categories
    });
  }

  // Fetch products from the API based on category and sorting options
  loadProducts() {
    const categoryQuery = this.selectedCategory.name === 'Tous' ? '' : this.selectedCategory.name;
    this.apiService.getProducts(categoryQuery, this.sortBy).subscribe((products) => {
      this.products = products;
      this.cdRef.detectChanges();  // Trigger change detection after loading products
    });
  }

  // Handle category selection
  selectCategory(categoryName: string): void {
    this.selectedCategory = this.categories.find(cat => cat.name === categoryName) || { id: 0, name: 'Tous' };
    
    // Update query params in the URL
    this.updateQueryParams();

    // Fetch filtered and sorted products from the backend
    this.loadProducts();
  }

  // Handle sorting products
  sortProducts(): void {
    // Update query params in the URL
    this.updateQueryParams();

    // Fetch sorted products from the backend
    this.loadProducts();
  }

  // Update query parameters in the URL without reloading the page
  private updateQueryParams(): void {
    this.RouterS.navigate([], {
      queryParams: {
        category: this.selectedCategory.name,
        sortBy: this.sortBy
      },
      queryParamsHandling: 'merge'  // Merges with existing query params
    });
  }

  // Animate hero section
  private animateHeroSection(): void {
    if (isPlatformBrowser(this.platformId)) {
      gsap.from('.boutique-section', {
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

  // Animate products in the grid
  private animateProducts(): void {
    if (isPlatformBrowser(this.platformId)) {
      gsap.from('.product-card', {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
      });
    }
  }

  // Animate category buttons
  private animateCategoryButtons(): void {
    if (isPlatformBrowser(this.platformId)) {
      gsap.from('.btncategory', {
        opacity: 0,
        x: -50,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power3.out',
      });
    }
  }

  // Track categories by their ID for optimization
  trackByCategoryId(index: number, category: Category): number {
    return category.id;
  }

  // Track products by their ID for optimization
  trackByProductId(index: number, product: Product): number {
    return product.id;
  }

  // Add product to cart
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
          price: product.price,
          quantity: 1
        };
        cartItems.push(cartItem);
      }

      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      this.cdRef.detectChanges();
    }
  }

  // Go to product details page
  goToProduct(id: number): void {
    this.RouterS.navigate(['/product', id]);
  }
}
