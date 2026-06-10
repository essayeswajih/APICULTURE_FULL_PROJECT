import { ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Api, Product, Category, SubCategory, PromoCountdown } from '../../../services/api';
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
  subcategories: SubCategory[] = [];

  drawerVisible = false;
  editMode = false;
  editProductId: number | null = null;

  searchTerm: string = '';
  promoCountdown: PromoCountdown | null = null;
  promoCountdownForm = {
    title: 'Promo products end soon',
    subtitle: 'Limited-time prices on selected beekeeping products.',
    ends_at: '',
    active: false
  };
  promoCountdownMessage = '';
  promoCountdownError = '';
  isSavingPromoCountdown = false;

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
    vip_price: null,
    image_url: '',
    image2_url: '',
    image3_url: '',
    image4_url: '',
    promo: false,
    buzzent: '',
    rating: 5,
    num_ratings: 0,
    shipping_cost: 9,
    subcategory_id: null
  };

  constructor(
    private apiService: Api,
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadProducts();
    this.loadPromoCountdown();
    this.apiService.getCategories()
      .subscribe(categories => this.categories = categories);
      this.apiService.getSubCategories()
      .subscribe(subcategories => this.subcategories = subcategories);
  }

  loadPromoCountdown() {
    this.apiService.getPromoCountdown().subscribe({
      next: (setting) => {
        this.promoCountdown = setting;
        this.promoCountdownForm = {
          title: setting.title || 'Promo products end soon',
          subtitle: setting.subtitle || 'Limited-time prices on selected beekeeping products.',
          ends_at: this.toDatetimeLocal(setting.ends_at),
          active: setting.active
        };
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Promo countdown load error:', err);
        this.promoCountdownError = err.message || 'Could not load promo countdown settings.';
      }
    });
  }

  savePromoCountdown() {
    if (!this.promoCountdownForm.title.trim()) {
      this.promoCountdownError = 'Please add a campaign title.';
      this.promoCountdownMessage = '';
      return;
    }

    this.isSavingPromoCountdown = true;
    this.promoCountdownMessage = '';
    this.promoCountdownError = '';

    const payload = {
      title: this.promoCountdownForm.title.trim(),
      subtitle: this.promoCountdownForm.subtitle?.trim() || null,
      ends_at: this.fromDatetimeLocal(this.promoCountdownForm.ends_at),
      active: this.promoCountdownForm.active
    };

    this.apiService.updatePromoCountdown(payload).subscribe({
      next: (setting) => {
        this.promoCountdown = setting;
        this.promoCountdownForm.ends_at = this.toDatetimeLocal(setting.ends_at);
        this.isSavingPromoCountdown = false;
        this.promoCountdownMessage = 'Promo countdown updated.';
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Promo countdown save error:', err);
        this.isSavingPromoCountdown = false;
        this.promoCountdownError = err.message || 'Could not save promo countdown settings.';
        this.cdr.detectChanges();
      }
    });
  }

  private toDatetimeLocal(value?: string | null): string {
    if (!value) {
      return '';
    }
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return '';
    }
    const offsetDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return offsetDate.toISOString().slice(0, 16);
  }

  private fromDatetimeLocal(value: string): string | null {
    if (!value) {
      return null;
    }
    return new Date(value).toISOString();
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
  this.pageIndex = 1;

  this.cdr.detectChanges(); // ✅ force DOM update
  //this.animateRows();       // ✅ now DOM is ready
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
        duration: 0.7,
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
      vip_price: null,
      image_url: '',
      image2_url: '',
      image3_url: '',
      image4_url: '',
      promo: false,
      buzzent: '',
      rating: 5,
      num_ratings: 0,
      shipping_cost: 9,
      subcategory_id: null
    };
    this.editMode = false;
    this.editProductId = null;
  }

  get promoProductsCount(): number {
    return this.products.filter(p => p.promo).length;
  }
  handleSave(updated: Product) {
  const productToSave: Product = {
    ...updated,
    vip_price: updated.vip_price && updated.vip_price > 0 ? Number(updated.vip_price) : null,
    subcategory_id: updated.subcategory_id ? Number(updated.subcategory_id) : null
  };

  if (this.editMode && this.editProductId) {
    this.apiService.updateProduct(this.editProductId, productToSave).subscribe({
      next: () => {
        this.loadProducts();
        this.closeDrawer();
      }
    });
  } else {
    this.apiService.addProduct(productToSave).subscribe({
      next: () => {
        this.loadProducts();
        this.closeDrawer();
      }
    });
  }
}
}
