import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef, HostListener, Inject, PLATFORM_ID, signal, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Api } from '../services/api'; // Import the CategoryService
import type { Category } from '../services/api'; // Import the Category type
import { CartItem } from '../pages/boutique/boutique';
import { Cart } from '../services/cart';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
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
}
