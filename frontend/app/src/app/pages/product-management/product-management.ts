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
  sortColumn: keyof Product | 'category_name' = 'id';
  sortDirection: 'asc' | 'desc' = 'desc';
  newProduct: Product = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    stock_quantity: 0,
    category_id: 0,
    discounted_price: 0,  // New field for discounted price
    vip_price: null,
    image_url: 'https://api.apiculturegalai.tn/uploads/',           // New field for image URL
    image2_url: '',          // New field for secondary image URL
    image3_url: '',          // New field for tertiary image URL
    image4_url: '',          // New field for quaternary image URL
    promo: false,            // New field for promotional status
    buzzent: '',             // New field for buzz or marketing text
    rating: 5,               // New field for average rating
    num_ratings: 10,           // New field for number of ratings
    shipping_cost: 9.0        // New field for shipping cost
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
      vip_price: null,
      image_url: 'https://api.apiculturegalai.tn/uploads/',
      promo: false,
      buzzent: '',
      image2_url: '',
      image3_url: '',
      image4_url: '',
      rating: 5,
      num_ratings: 10,
      shipping_cost: 9.0
    };
    this.editMode = false;
    this.editProductId = null;
  }

  trackById(index: number, product: Product): number {
    return product.id;
  }

  get sortedProducts(): Product[] {
    return [...this.products].sort((a, b) => this.compareProducts(a, b));
  }

  sortByColumn(column: keyof Product | 'category_name'): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
  }

  getSortIcon(column: keyof Product | 'category_name'): string {
    if (this.sortColumn !== column) {
      return '↕';
    }
    return this.sortDirection === 'asc' ? '↑' : '↓';
  }

  getCategoryName(categoryId: number): string {
    return this.categories.find(category => Number(category.id) === Number(categoryId))?.name || String(categoryId);
  }

  private compareProducts(a: Product, b: Product): number {
    const first = this.getSortValue(a, this.sortColumn);
    const second = this.getSortValue(b, this.sortColumn);
    const direction = this.sortDirection === 'asc' ? 1 : -1;

    if (typeof first === 'number' && typeof second === 'number') {
      return (first - second) * direction;
    }

    return String(first).localeCompare(String(second), undefined, {
      numeric: true,
      sensitivity: 'base'
    }) * direction;
  }

  private getSortValue(product: Product, column: keyof Product | 'category_name'): string | number {
    if (column === 'category_name') {
      return this.getCategoryName(product.category_id);
    }

    const value = product[column];
    if (typeof value === 'boolean') {
      return value ? 1 : 0;
    }
    if (typeof value === 'number') {
      return value;
    }
    return value ?? '';
  }

  private loadProducts() {
    this.apiService.getProducts("","","").subscribe(products => {
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
