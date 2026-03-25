import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Api, Product, Category } from '../../../services/api';
import gsap from 'gsap';

/* NG ZORRO */
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { ProductFormComponent } from '../../component/product-form-component/product-form-component';
import { ProductDrawerComponent } from "../../component/product-drawer/product-drawer";

@Component({
  selector: 'app-product-management',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzTableModule,
    NzCardModule,
    NzButtonModule,
    NzDrawerModule,
    NzTagModule,
    NzIconModule,
    NzStatisticModule,
    NzInputModule,
    NzFormModule,
    NzSelectModule,
    NzSwitchModule,
    ProductFormComponent,
    ProductDrawerComponent
],
  templateUrl: './product-management.html',
  styleUrls: ['./product-management.scss']
})
export class ProductManagement implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[] = [];

  categories: Category[] = [];

  drawerVisible = false;
  editMode = false;
  editProductId: number | null = null;

  searchTerm: string = '';

  // Pagination controls
  pageIndex = 1;
  pageSize = 10;
  pageSizeOptions = [5, 10, 15, 20, 50];
  total = 0;

  newProduct: Product = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    stock_quantity: 0,
    category_id: 0,
    discounted_price: 0,
    image_url: '',
    image2_url: '',
    image3_url: '',
    image4_url: '',
    promo: false,
    buzzent: '',
    rating: 5,
    num_ratings: 0,
    shipping_cost: 9
  };

  constructor(
    private apiService: Api,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    this.loadProducts();
    this.apiService.getCategories()
      .subscribe(categories => this.categories = categories);
  }

  loadProducts() {
    this.apiService.getProducts("", "", "")
      .subscribe(products => {
        this.products = products;
        this.applyFilter(); // also sets filteredProducts + total + reset page
      });
  }

  private applyFilter() {
    const term = this.searchTerm.toLowerCase().trim();

    if (!term) {
      this.filteredProducts = [...this.products];
    } else {
      this.filteredProducts = this.products.filter(p =>
        p.name.toLowerCase().includes(term)
      );
    }

    this.total = this.filteredProducts.length;
    this.pageIndex = 1; // reset to first page after filter change
    setTimeout(() => this.animateRows(), 50);
  }

  searchProducts() {
    this.applyFilter();
  }

  // Pagination events
  onPageIndexChange(index: number): void {
    this.pageIndex = index;
    setTimeout(() => this.animateRows(), 80);
  }

  onPageSizeChange(size: number): void {
    this.pageSize = size;
    this.pageIndex = 1;
    setTimeout(() => this.animateRows(), 80);
  }

  animateRows() {
    if (isPlatformBrowser(this.platformId)) {
      gsap.from(".table-row", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.05
      });
    }
  }

  // Drawer controls
  openDrawer() {
    this.drawerVisible = true;
  }

  closeDrawer() {
    this.drawerVisible = false;
    this.resetForm();
  }

  addProduct() {
    if (this.editMode && this.editProductId !== null) {
      this.apiService.updateProduct(this.editProductId, this.newProduct)
        .subscribe({
          next: () => {
            this.loadProducts();
            this.closeDrawer();
          }
        });
    } else {
      this.apiService.addProduct(this.newProduct)
        .subscribe({
          next: () => {
            this.loadProducts();
            this.closeDrawer();
          }
        });
    }
  }

  editProduct(product: Product) {
    this.newProduct = { ...product };
    this.editMode = true;
    this.editProductId = product.id;
    this.drawerVisible = true;
  }

  deleteProduct(id: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.apiService.deleteProduct(id).subscribe({
        next: () => this.loadProducts()
      });
    }
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
      image2_url: '',
      image3_url: '',
      image4_url: '',
      promo: false,
      buzzent: '',
      rating: 5,
      num_ratings: 0,
      shipping_cost: 9
    };
    this.editMode = false;
    this.editProductId = null;
  }

  get promoProductsCount(): number {
    return this.products.filter(p => p.promo).length;
  }
  handleSave(updated: Product) {
  if (this.editMode && this.editProductId) {
    this.apiService.updateProduct(this.editProductId, updated).subscribe({
      next: () => {
        this.loadProducts();
        this.closeDrawer();
      }
    });
  } else {
    this.apiService.addProduct(updated).subscribe({
      next: () => {
        this.loadProducts();
        this.closeDrawer();
      }
    });
  }
}
}