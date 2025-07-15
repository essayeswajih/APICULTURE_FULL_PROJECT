import { Component, Inject, OnInit, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { Api, Product, Category } from '../../services/api';
import { gsap } from 'gsap';
import { FormsModule } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-product-management',
  imports: [FormsModule, CommonModule],
  templateUrl: './product-management.html',
  styleUrls: ['./product-management.scss']
})
export class ProductManagement implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  newProduct: Product = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    stock_quantity: 0,
    category_id: 0,
    discounted_price: 0,  // New field for discounted price
    image_url: '',           // New field for image URL
    promo: false,            // New field for promotional status
    buzzent: '',             // New field for buzz or marketing text
  };
  editMode = false;
  editProductId: number | null = null;

  constructor(
    private apiService: Api,
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdRef: ChangeDetectorRef  // Inject ChangeDetectorRef
  ) {}

  async ngOnInit() {
    await this.loadProducts();
    this.apiService.getCategories().subscribe(categories => {
      this.categories = categories;
      this.cdRef.detectChanges();  // Trigger change detection after category load
    });
  }

  addProduct() {
    if (this.editMode && this.editProductId) {
      this.apiService.updateProduct(this.editProductId, this.newProduct).subscribe({
        next: () => {
          this.resetForm();
          this.loadProducts();
        },
        error: (err) => console.error('Update failed:', err)
      });
    } else {
      this.apiService.addProduct(this.newProduct).subscribe({
        next: () => {
          this.resetForm();
          this.loadProducts();
        },
        error: (err) => console.error('Add failed:', err)
      });
    }
  }

  editProduct(product: Product) {
    this.newProduct = { ...product };
    this.editMode = true;
    this.editProductId = product.id;
  }

  deleteProduct(id: number) {
    this.apiService.deleteProduct(id).subscribe(() => {
      this.loadProducts();
    });
  }

  resetForm() {
    this.newProduct = {
      id: 0,
      name: '',
      description: '',
      price: 0,
      stock_quantity: 0,
      category_id: 0,
      discounted_price: 0,
      image_url: '',
      promo: false,
      buzzent: '',
    };
    this.editMode = false;
    this.editProductId = null;
  }

  trackById(index: number, product: Product): number {
    return product.id;
  }

  private loadProducts() {
    this.apiService.getProducts().subscribe(products => {
      this.products = products;
      this.cdRef.detectChanges();  // Trigger change detection after loading products

      if (isPlatformBrowser(this.platformId)) {
        setTimeout(() => {
          const cards = document.querySelectorAll('.card');
          if (cards.length > 0) {
            gsap.from(cards, { opacity: 0, y: 20, duration: 0.5, stagger: 0.2 });
          }
        }, 0);
      }
    });
  }
}
