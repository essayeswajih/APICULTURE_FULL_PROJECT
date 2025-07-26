import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef, HostListener, Inject, PLATFORM_ID, signal, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Api } from '../services/api'; // Import the CategoryService
import type { Category } from '../services/api'; // Import the Category type
import { CartItem } from '../pages/boutique/boutique';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
  standalone: true
})
export class Header implements OnInit, OnDestroy {
  isMobileMenuOpen = false;
  isDropdownOpen = false;
  isDesktop = true;
  categories: Category[] = [];
  itemssum = signal(0); // Signal to track the number of items in the cart
  cartItems: CartItem[] = [];

  constructor(
    private categoryService: Api,
    private cdRef: ChangeDetectorRef,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    // Load cart items and categories on component initialization
    this.cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    this.itemssum.set(this.cartItems.length);
    alert(`Cart items loaded: ${this.cartItems.length}`);
    alert(`Cart items loaded: ${this.itemssum()}`); 
    console.log('Cart items loaded:', this.cartItems.length);
    this.cdRef.detectChanges();
    this.loadCategories();

    // Set isDesktop based on window width only in browser
    if (isPlatformBrowser(this.platformId)) {
      this.isDesktop = window.innerWidth >= 920;
      this.cdRef.detectChanges();
      
      // Listen for changes in localStorage in other tabs/windows
      window.addEventListener('storage', this.onStorageChange.bind(this));
    }
  }

  ngOnDestroy() {
    // Cleanup the event listener when the component is destroyed
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('storage', this.onStorageChange.bind(this));
    }
  }

  onStorageChange(event: StorageEvent) {
    // Check if 'cartItems' has been modified in localStorage
    if (event.key === 'cartItems') {
      // Reload the cart items from localStorage and update the itemssum signal
      this.cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
      this.itemssum.set(this.cartItems.length);
      this.cdRef.detectChanges(); // Trigger change detection to update the view
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
}
