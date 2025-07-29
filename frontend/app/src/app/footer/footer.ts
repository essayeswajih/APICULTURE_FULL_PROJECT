import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, OnInit, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Api, Category } from '../services/api'; // Your service to fetch categories
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, RouterModule,FormsModule],
  templateUrl: './footer.html',
  styleUrls: ['./footer.scss']
})
export class Footer implements OnInit {
  isDropdownOpen = false;
    email: string = '';
  // Define categories for the footer dropdown
  categories: Category[] = [];

  constructor(
    private apiService: Api,  // Inject the API service to get categories
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdRef: ChangeDetectorRef, // Inject ChangeDetectorRef for manual change detection
    private toastService: ToastrService,
  ) {}

  ngOnInit() {
    this.loadCategories();
  }

  // Method to load categories dynamically
  loadCategories() {
    this.apiService.getCategories().subscribe((categories) => {
      this.categories = categories;
      console.log('Footer categories loaded:', this.categories);

      // If we're in the browser environment, apply change detection
      if (isPlatformBrowser(this.platformId)) {
        this.cdRef.detectChanges(); // Trigger change detection manually
      }
    });
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  subscribe(): void {
    this.cdRef.detectChanges();
    if (this.email) {
      this.apiService.subscribeToNewsletter(this.email).subscribe({
        next: () => {
          this.toastService.success('Inscription réussie à la newsletter', 'Succès', {
            timeOut: 2000,
            positionClass: 'toast-bottom-right',
            progressBar: true,
            closeButton: true,
          });
          this.email = ''; // Clear the email input after successful subscription
        },
        error: (err) => {
          console.error('Erreur lors de l\'inscription à la newsletter:', err);
          this.toastService.error('Erreur lors de l\'inscription à la newsletter', 'Erreur', {
            timeOut: 2000,
            positionClass: 'toast-bottom-right',
            progressBar: true,
            closeButton: true,
          });
        }
      });
    } else {
      this.toastService.error('Veuillez entrer une adresse e-mail valide', 'Erreur', {
        timeOut: 2000,
        positionClass: 'toast-bottom-right',
        progressBar: true,
        closeButton: true,
      });
    }
  }
}
