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
import {
  HttpClientModule,
  init_http
} from "./chunk-L4GPXURK.js";
import {
  ChangeDetectorRef,
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

// angular:jit:template:src/app/pages/category-management/category-management.html
var category_management_default;
var init_category_management = __esm({
  "angular:jit:template:src/app/pages/category-management/category-management.html"() {
    category_management_default = `<div class="container py-5">
  <h2>Category Management</h2>
  <div class="card mb-3">
    <div class="card-body">
      <h5 class="card-title">Add New Category</h5>
      <form #categoryForm="ngForm" (ngSubmit)="addCategory()">
        <div class="mb-3">
          <label for="name" class="form-label">Name</label>
          <input
            type="text"
            class="form-control"
            id="name"
            [(ngModel)]="newCategory.name"
            name="categoryName"
            required
          >
        </div>
        <div class="mb-3">
          <label for="description" class="form-label">Description</label>
          <textarea
            class="form-control"
            id="description"
            [(ngModel)]="newCategory.description"
            name="categoryDescription"
          ></textarea>
        </div>
        <button type="submit" class="btn btn-warning">Add Category</button>
      </form>
    </div>
  </div>
  <h3>Existing Categories</h3>
  <div class="row">
    @for (category of categories; track category.id) {
      <div class="col-md-4">
        <div class="card mb-3">
          <div class="card-body">
            <h5 class="card-title">{{ category.name }}</h5>
            <p class="card-text">{{ category.description || 'No description' }}</p>
            <button class="btn btn-outline-warning me-2" (click)="editCategory(category)">Edit</button>
            <button class="btn btn-danger" (click)="deleteCategory(category.id)">Delete</button>
          </div>
        </div>
      </div>
    }
  </div>
</div>`;
  }
});

// angular:jit:style:src/app/pages/category-management/category-management.scss
var category_management_default2;
var init_category_management2 = __esm({
  "angular:jit:style:src/app/pages/category-management/category-management.scss"() {
    category_management_default2 = '/* src/app/pages/category-management/category-management.scss */\nbody {\n  background-color: #fff8e1;\n  font-family: "Roboto", sans-serif;\n}\n.hero {\n  background-color: rgba(255, 247, 216, 0.4941176471);\n}\nh2 {\n  color: #d97706;\n}\n.card-title {\n  color: #15803d;\n}\n.card-text {\n  color: #333;\n}\n.card-img-top {\n  height: 200px;\n  object-fit: cover;\n}\n.text-success {\n  color: #15803d !important;\n}\n.text-success:hover {\n  color: #14532d !important;\n}\n.btn-outline-warning {\n  border-color: #d97706;\n  color: #d97706;\n}\n.btn-outline-warning:hover {\n  background-color: #d97706;\n  color: #fff8e1;\n}\n.btn-warning {\n  background-color: #d97706;\n  border-color: #d97706;\n}\n.btn-warning:hover {\n  background-color: #14532d;\n  border-color: #14532d;\n  color: #fff8e1;\n}\n#beeBox,\n#beeBox1 {\n  position: absolute;\n  width: 95vw;\n  height: 100vh;\n  overflow: hidden;\n  z-index: 0;\n  top: 100px;\n}\n#beeBox {\n  left: 0;\n}\n#beeBox1 {\n  right: 0;\n}\n#bee,\n#bee1 {\n  width: 125px;\n  box-sizing: border-box;\n  will-change: transform;\n  position: absolute;\n}\n#bee1 {\n  right: 0;\n  top: 30vh;\n}\n/*# sourceMappingURL=category-management.css.map */\n';
  }
});

// src/app/pages/category-management/category-management.ts
var CategoryManagement;
var init_category_management3 = __esm({
  "src/app/pages/category-management/category-management.ts"() {
    "use strict";
    init_tslib_es6();
    init_category_management();
    init_category_management2();
    init_core();
    init_api();
    init_gsap();
    init_forms();
    init_common();
    init_http();
    CategoryManagement = class CategoryManagement2 {
      apiService;
      platformId;
      cdRef;
      categories = [];
      newCategory = { id: 0, name: "", description: "" };
      editMode = false;
      editCategoryId = null;
      constructor(apiService, platformId, cdRef) {
        this.apiService = apiService;
        this.platformId = platformId;
        this.cdRef = cdRef;
      }
      ngOnInit() {
        this.loadCategories();
      }
      // Add or update a category
      addCategory() {
        if (this.editMode && this.editCategoryId) {
          this.apiService.updateCategory(this.editCategoryId, this.newCategory).subscribe(() => {
            this.resetForm();
            this.loadCategories();
          });
        } else {
          this.apiService.addCategory(this.newCategory).subscribe(() => {
            this.resetForm();
            this.loadCategories();
          });
        }
      }
      // Edit a category
      editCategory(category) {
        this.newCategory = __spreadValues({}, category);
        this.editMode = true;
        this.editCategoryId = category.id;
      }
      // Delete a category
      deleteCategory(id) {
        this.apiService.deleteCategory(id).subscribe(() => this.loadCategories());
      }
      // Reset form after add/update
      resetForm() {
        this.newCategory = { id: 0, name: "", description: "" };
        this.editMode = false;
        this.editCategoryId = null;
      }
      // Load all categories from the API
      loadCategories() {
        this.apiService.getCategories().subscribe((categories) => {
          this.categories = categories;
          if (isPlatformBrowser(this.platformId)) {
            setTimeout(() => {
              this.cdRef.detectChanges();
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
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID] }] },
        { type: ChangeDetectorRef }
      ];
    };
    CategoryManagement = __decorate([
      Component({
        selector: "app-category-management",
        imports: [FormsModule, CommonModule, HttpClientModule],
        template: category_management_default,
        styles: [category_management_default2]
      })
    ], CategoryManagement);
  }
});

// src/app/pages/category-management/category-management.spec.ts
var require_category_management_spec = __commonJS({
  "src/app/pages/category-management/category-management.spec.ts"(exports) {
    init_testing();
    init_category_management3();
    describe("CategoryManagement", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [CategoryManagement]
        }).compileComponents();
        fixture = TestBed.createComponent(CategoryManagement);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_category_management_spec();
//# sourceMappingURL=spec-app-pages-category-management-category-management.spec.js.map
