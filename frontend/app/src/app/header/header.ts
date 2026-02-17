import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef, HostListener, Inject, PLATFORM_ID, signal, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Api } from '../services/api'; // Import the CategoryService
import type { Category, Product } from '../services/api'; // Import the Category type
import { CartItem } from '../pages/boutique/boutique';
import { Cart } from '../services/cart';
import { FormsModule } from '@angular/forms';
import { TopBarCarousel } from "../components/top-bar-carousel/top-bar-carousel"; 

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule, FormsModule, TopBarCarousel],
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
  standalone: true
})
export class Header implements OnInit {

  isMobileMenuOpen = false;
  isDropdownOpen = false;
  isDesktop = true;
  categories: Category[] = [];
  itemssum = 0; // Signal to track the number of items in the cart
  cartItems: CartItem[] = [];
  selectedCategory: string = '';  // Default category value
  searchQuery: string = '';
  products: Product[] = []; // To hold filtered products based on search and category

  constructor(
    private categoryService: Api,
    private cdRef: ChangeDetectorRef,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private cartService: Cart // Inject the Cart service
  ) {}

  ngOnInit() {
    // Load cart items and categories on component initialization
    this.cartService.cartItemCount$.subscribe(count => {
      this.itemssum = count;  // Update count when cart changes
      this.cdRef.detectChanges();  // Trigger change detection
    });

    this.cdRef.detectChanges();
    this.loadCategories();

    // Set isDesktop based on window width only in browser
    if (isPlatformBrowser(this.platformId)) {
      this.isDesktop = window.innerWidth >= 920;
      this.cdRef.detectChanges();
      
      // Listen for changes in localStorage in other tabs/windows
      
    }
  }

  @HostListener('window:resize')
  onResize() {
    if (isPlatformBrowser(this.platformId)) {
      this.isDesktop = window.innerWidth >= 920;
      this.cdRef.detectChanges();
    }
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
      this.cdRef.detectChanges();
    });
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    if (!this.isMobileMenuOpen) this.isDropdownOpen = false;
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  goToHome() {
    this.router.navigateByUrl('/');
    this.isMobileMenuOpen = false;
    this.isDropdownOpen = false;
    this.cdRef.detectChanges();
  }
   onSearchChange() {
    this.loadProducts();
    this.cdRef.detectChanges();
  }
  // Optional: Search method for submit button
  search() {
    this.loadProducts();
    this.cdRef.detectChanges();
  }
  loadProducts() {
    // You can adjust sorting logic here if needed, for example 'sortBy' can be dynamically passed
    const sortBy = 'popularite'; // Example of sorting, you can replace this as needed
    this.categoryService.getProducts(this.selectedCategory, sortBy, this.searchQuery)
      .subscribe((products: Product[]) => {
        this.products = products; // Update the products list
        this.cdRef.detectChanges();
      });
  }
  clearSearch() {
  this.searchQuery = '';
  this.selectedCategory = '';
  this.products = [];
  this.cdRef.detectChanges();
  }
  goToProduct(slug: string) {
    this.router.navigateByUrl(`/product/${slug}`);
    this.isMobileMenuOpen = false;
    this.isDropdownOpen = false;
    this.searchQuery = '';
    this.products = [];
    this.cdRef.detectChanges();
  }
}
