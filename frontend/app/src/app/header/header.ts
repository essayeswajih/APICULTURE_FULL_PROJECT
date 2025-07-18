import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Api } from '../services/api'; // Import the CategoryService
import type { Category } from '../services/api'; // Import the Category type (adjust path if needed)

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
  isDesktop = true; // Default to true, will be updated in ngOnInit for browser
  categories: Category[] = []; // Initialize categories as an empty array with explicit type

  constructor(
    private categoryService: Api, // Inject the service
    private cdRef: ChangeDetectorRef, // Inject ChangeDetectorRef to trigger change detection
    private router: Router, // Inject Router for navigation
    @Inject(PLATFORM_ID) private platformId: Object // Inject PLATFORM_ID to check environment
  ) {}

  ngOnInit() {
    // Call the API to load categories when the component is initialized
    this.loadCategories();
    // Set isDesktop based on window width only in browser
    if (isPlatformBrowser(this.platformId)) {
      this.isDesktop = window.innerWidth >= 920;
      this.cdRef.detectChanges();
    }
  }

  @HostListener('window:resize')
  onResize() {
    if (isPlatformBrowser(this.platformId)) {
      this.isDesktop = window.innerWidth >= 920; // Update isDesktop on window resize
      this.cdRef.detectChanges();
    }
  }

  loadCategories() {
    // Fetch categories from the backend API
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories; // Set the categories to the fetched data
      this.cdRef.detectChanges();
    });
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    if (!this.isMobileMenuOpen) this.isDropdownOpen = false; // Close dropdown when mobile menu closes
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  goToHome() {
    this.router.navigateByUrl('/');
    this.isMobileMenuOpen = false; // Close mobile menu after navigation
    this.isDropdownOpen = false; // Close dropdown after navigation
    this.cdRef.detectChanges();
  }
}