import {
  Api,
  init_api
} from "./chunk-MN5TOSZP.js";
import {
  FormsModule,
  init_forms
} from "./chunk-IHK2QVW6.js";
import {
  gsapWithCSS,
  init_gsap
} from "./chunk-5TSOWYW2.js";
import {
  CommonModule,
  init_common,
  isPlatformBrowser
} from "./chunk-QA5PPOO6.js";
import "./chunk-L4GPXURK.js";
import {
  Component,
  Inject,
  PLATFORM_ID,
  TestBed,
  __decorate,
  init_core,
  init_testing,
  init_tslib_es6
} from "./chunk-MFMRIB3Q.js";
import {
  __async,
  __commonJS,
  __esm,
  __spreadValues
} from "./chunk-TTULUY32.js";

// angular:jit:template:src/app/pages/product-management/product-management.html
var product_management_default;
var init_product_management = __esm({
  "angular:jit:template:src/app/pages/product-management/product-management.html"() {
    product_management_default = `<div class="container py-5">
  <h2>Product Management</h2>
  <div class="card mb-3">
    <div class="card-body">
      <h5 class="card-title">Add New Product</h5>
      <form (ngSubmit)="addProduct()">
        <div class="mb-3">
          <label for="name" class="form-label">Name</label>
          <input type="text" class="form-control" id="name" name="name" [(ngModel)]="newProduct.name" required>
        </div>
        <div class="mb-3">
          <label for="description" class="form-label">Description</label>
          <textarea class="form-control" id="description" name="description" [(ngModel)]="newProduct.description"></textarea>
        </div>
        <div class="mb-3">
          <label for="price" class="form-label">Price</label>
          <input type="number" class="form-control" id="price" name="price" [(ngModel)]="newProduct.price" required>
        </div>
        <div class="mb-3">
          <label for="stock_quantity" class="form-label">Stock Quantity</label>
          <input type="number" class="form-control" id="stock_quantity" name="stock_quantity" [(ngModel)]="newProduct.stock_quantity" required>
        </div>
        <div class="mb-3">
          <label for="category_id" class="form-label">Category</label>
          <select class="form-control" id="category_id" name="category_id" [(ngModel)]="newProduct.category_id" required>
            @for (category of categories; track category.id) {
              <option [value]="category.id">{{ category.name }}</option>
            }
          </select>
        </div>
        <div class="mb-3">
          <label for="discounted_price" class="form-label">Discounted Price (Optional)</label>
          <input type="number" class="form-control" id="discounted_price" name="discounted_price" [(ngModel)]="newProduct.discounted_price">
        </div>
        <button type="submit" class="btn btn-warning">{{ editMode ? 'Update' : 'Add' }} Product</button>
        <button type="button" class="btn btn-secondary ms-2" *ngIf="editMode" (click)="resetForm()">Cancel</button>
      </form>
    </div>
  </div>
  <h3>Existing Products</h3>
  <div class="row">
    @for (product of products; track product.id) {
      <div class="col-md-4">
        <div class="card mb-3">
          <img src="https://via.placeholder.com/200?text=Product" class="card-img-top" alt="Product">
          <div class="card-body">
            <h5 class="card-title">{{ product.name }}</h5>
            <p class="card-text">{{ product.description || 'No description' }}</p>
            <p class="card-text">Price: \${{ product.price | number:'1.2-2' }}</p>
            <p class="card-text">Stock: {{ product.stock_quantity }}</p>
            <p class="card-text">Category ID: {{ product.category_id }}</p>
            <p class="card-text">Discounted: \${{ product.discounted_price || 'N/A' }}</p>
            <button class="btn btn-outline-warning me-2" (click)="editProduct(product)">Edit</button>
            <button class="btn btn-danger" (click)="deleteProduct(product.id)">Delete</button>
          </div>
        </div>
      </div>
    }
  </div>
</div>`;
  }
});

// angular:jit:style:src/app/pages/product-management/product-management.scss
var product_management_default2;
var init_product_management2 = __esm({
  "angular:jit:style:src/app/pages/product-management/product-management.scss"() {
    product_management_default2 = '/* src/app/pages/product-management/product-management.scss */\nbody {\n  background-color: #fff8e1;\n  font-family: "Roboto", sans-serif;\n}\n.hero {\n  background-color: rgba(255, 247, 216, 0.4941176471);\n}\nh2 {\n  color: #d97706;\n}\n.card-title {\n  color: #15803d;\n}\n.card-text {\n  color: #333;\n}\n.card-img-top {\n  height: 200px;\n  object-fit: cover;\n}\n.text-success {\n  color: #15803d !important;\n}\n.text-success:hover {\n  color: #14532d !important;\n}\n.btn-outline-warning {\n  border-color: #d97706;\n  color: #d97706;\n}\n.btn-outline-warning:hover {\n  background-color: #d97706;\n  color: #fff8e1;\n}\n.btn-warning {\n  background-color: #d97706;\n  border-color: #d97706;\n}\n.btn-warning:hover {\n  background-color: #14532d;\n  border-color: #14532d;\n  color: #fff8e1;\n}\n#beeBox,\n#beeBox1 {\n  position: absolute;\n  width: 95vw;\n  height: 100vh;\n  overflow: hidden;\n  z-index: 0;\n  top: 100px;\n}\n#beeBox {\n  left: 0;\n}\n#beeBox1 {\n  right: 0;\n}\n#bee,\n#bee1 {\n  width: 125px;\n  box-sizing: border-box;\n  will-change: transform;\n  position: absolute;\n}\n#bee1 {\n  right: 0;\n  top: 30vh;\n}\n/*# sourceMappingURL=product-management.css.map */\n';
  }
});

// src/app/pages/product-management/product-management.ts
var ProductManagement;
var init_product_management3 = __esm({
  "src/app/pages/product-management/product-management.ts"() {
    "use strict";
    init_tslib_es6();
    init_product_management();
    init_product_management2();
    init_core();
    init_api();
    init_gsap();
    init_forms();
    init_common();
    ProductManagement = class ProductManagement2 {
      apiService;
      platformId;
      products = [];
      categories = [];
      newProduct = { id: 0, name: "", description: "", price: 0, stock_quantity: 0, category_id: 0 };
      editMode = false;
      editProductId = null;
      constructor(apiService, platformId) {
        this.apiService = apiService;
        this.platformId = platformId;
      }
      ngOnInit() {
        this.loadProducts();
        this.apiService.getCategories().subscribe((categories) => {
          this.categories = categories;
        });
      }
      addProduct() {
        if (this.editMode && this.editProductId) {
          this.apiService.updateProduct(this.editProductId, this.newProduct).subscribe(() => {
            this.resetForm();
            this.loadProducts();
          });
        } else {
          this.apiService.addProduct(this.newProduct).subscribe(() => {
            this.resetForm();
            this.loadProducts();
          });
        }
      }
      editProduct(product) {
        this.newProduct = __spreadValues({}, product);
        this.editMode = true;
        this.editProductId = product.id;
      }
      deleteProduct(id) {
        this.apiService.deleteProduct(id).subscribe(() => this.loadProducts());
      }
      resetForm() {
        this.newProduct = { id: 0, name: "", description: "", price: 0, stock_quantity: 0, category_id: 0 };
        this.editMode = false;
        this.editProductId = null;
      }
      trackById(index, product) {
        return product.id;
      }
      loadProducts() {
        this.apiService.getProducts().subscribe((products) => {
          this.products = products;
          if (isPlatformBrowser(this.platformId)) {
            setTimeout(() => {
              const cards = document.querySelectorAll(".card");
              if (cards.length > 0) {
                gsapWithCSS.from(cards, { opacity: 0, y: 20, duration: 0.5, stagger: 0.2 });
              }
            }, 0);
          }
        });
      }
      static ctorParameters = () => [
        { type: Api },
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID] }] }
      ];
    };
    ProductManagement = __decorate([
      Component({
        selector: "app-product-management",
        imports: [FormsModule, CommonModule],
        template: product_management_default,
        styles: [product_management_default2]
      })
    ], ProductManagement);
  }
});

// src/app/pages/product-management/product-management.spec.ts
var require_product_management_spec = __commonJS({
  "src/app/pages/product-management/product-management.spec.ts"(exports) {
    init_testing();
    init_product_management3();
    describe("ProductManagement", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [ProductManagement]
        }).compileComponents();
        fixture = TestBed.createComponent(ProductManagement);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_product_management_spec();
//# sourceMappingURL=spec-app-pages-product-management-product-management.spec.js.map
