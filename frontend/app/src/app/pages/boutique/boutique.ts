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
  image: string | null; // Image can be null if not available
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
  sortBy: string = 'popularite';
  sortedProducts: Product[] = [];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private route: ActivatedRoute,
    private RouterS: Router,
    private apiService: Api, // Inject the service
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();

    // Handle category from URL if available
    this.route.paramMap.subscribe(params => {
      const categoryFromUrl = params.get('category');
      if (categoryFromUrl) {
        // Normalize the category name to match exactly
        const matchedCategory = this.categories.find(
          cat => cat.name.toLowerCase() === categoryFromUrl.toLowerCase()
        );
        this.selectedCategory = matchedCategory || { id: 0, name: 'Tous' };
      }

      // Filter and sort products on page load
      this.filterAndSortProducts();
      this.animateProducts();
      this.animateHeroSection();
      this.animateCategoryButtons();
    });
  }

  // Fetch categories from the API
  loadCategories() {
    const tousCategory: Category = { id: 0, name: 'Tous' };
    this.apiService.getCategories().subscribe((categories) => {
      if (!categories.some(cat => cat.name === 'Tous')) {
        categories.unshift(tousCategory); // Add at the beginning
      }
      this.categories = categories;
      this.cdRef.detectChanges(); // Trigger change detection manually after loading categories
    });
  }

  // Fetch products from the API
  loadProducts() {
    this.apiService.getProducts(this.selectedCategory.name, this.sortBy).subscribe((products) => {
      this.products = products;
      this.filterAndSortProducts();  // Apply filtering and sorting after loading products
      this.cdRef.detectChanges(); // Trigger change detection after loading products
    });
  }
  // Handle category selection
  selectCategory(categoryName: string): void {
    this.selectedCategory = this.categories.find(cat => cat.name === categoryName) || { id: 0, name: 'Tous' };
    this.filterAndSortProducts();
    this.animateProducts();
    this.animateCategoryButtons();
  }

  // Handle sorting products
  sortProducts(): void {
    this.filterAndSortProducts();
    this.animateProducts();
  }

  // Filter and sort products based on selected category and sorting option
  private filterAndSortProducts(): void {
    let filteredProducts = this.selectedCategory.name === 'Tous'
      ? [...this.products] // Include all products
      : this.products.filter(product => product.category_id === this.selectedCategory.id);

    // Sort the products based on the selected sorting option
    this.sortedProducts = filteredProducts.sort((a, b) => {
      if (this.sortBy === 'prix-asc') return a.price - b.price;
      if (this.sortBy === 'prix-desc') return b.price - a.price;
      return 0; // Default sorting (e.g., by popularity)
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
      // Retrieve existing cart items from localStorage
      const storedCart = localStorage.getItem('cartItems');
      let cartItems: CartItem[] = storedCart ? JSON.parse(storedCart) : [];

      // Check if the product is already in the cart
      const existingItem = cartItems.find(item => item.id === product.id);
      if (existingItem) {
        // Increment quantity if item exists
        existingItem.quantity += 1;
      } else {
        // Add new item to cart
        const cartItem: CartItem = {
          id: product.id,
          name: product.name,
          image: product.image_url ?? null,
          price: product.price,
          quantity: 1
        };
        cartItems.push(cartItem);
      }

      // Save updated cart to localStorage
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      this.cdRef.detectChanges();
    }
  }
  goToProduct(id:number): void {
    // Navigate to the product details page
    this.RouterS.navigate(['/product', id]);
  }
}
