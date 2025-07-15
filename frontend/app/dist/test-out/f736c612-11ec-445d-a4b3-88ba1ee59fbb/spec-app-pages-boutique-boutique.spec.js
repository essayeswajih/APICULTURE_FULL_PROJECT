import {
  FormsModule,
  init_forms
} from "./chunk-IHK2QVW6.js";
import {
  ActivatedRoute,
  init_router
} from "./chunk-NMIZS3UU.js";
import {
  gsapWithCSS,
  init_gsap
} from "./chunk-5TSOWYW2.js";
import "./chunk-GTSZX46A.js";
import "./chunk-SWYOOYFC.js";
import {
  CommonModule,
  init_common,
  isPlatformBrowser
} from "./chunk-QA5PPOO6.js";
import "./chunk-VYDYS35M.js";
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
  __esm
} from "./chunk-TTULUY32.js";

// angular:jit:template:src/app/pages/boutique/boutique.html
var boutique_default;
var init_boutique = __esm({
  "angular:jit:template:src/app/pages/boutique/boutique.html"() {
    boutique_default = `<main class="min-h-screen">
  <!-- Hero Section -->
  <section class="hero py-6 text-center bg-light-amber position-relative" style="background-image: url('/assets/images/pexels-pixabay-301378.jpg'); background-size: cover; background-position:bottom;">
    <div class="container">
      <div class="hero-overlay"></div>
      <h1 class="display-4 text-amber mb-3 boutique-section">Notre Boutique Apicole</h1>
      <p class="lead text-success boutique-section">D\xE9couvrez notre s\xE9lection de mat\xE9riel apicole et produits de la ruche.</p>
    </div>
  </section>

  <!-- Filters -->
  <section class="container py-4">
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
      <div class="d-flex flex-wrap gap-2 mb-3 mb-md-0">
        @for (category of categories; track category) {
          <button
            class="btn"
            [ngClass]="{
              'btn-warning text-light': selectedCategory === category,
              'btn-outline-warning': selectedCategory !== category
            }"
            (click)="selectCategory(category)"
          >
            {{ category }}
          </button>
        }
      </div>
      <select
        class="form-select w-auto border border-amber text-amber bg-light-amber"
        [(ngModel)]="sortBy"
        (change)="sortProducts()"
      >
        <option value="popularite" selected >Trier par popularit\xE9</option>
        <option value="prix-asc">Prix : croissant</option>
        <option value="prix-desc">Prix : d\xE9croissant</option>
      </select>
    </div>

    <!-- Product Grid -->
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
      @for (product of sortedProducts; track product.id) {
        <div class="col">
          <div class="card h-100 product-card">
            <img [src]="product.image" class="card-img-top" alt="{{ product.name }}">
            <div class="card-body">
              <h5 class="card-title text-success">{{ product.name }}</h5>
              <p class="card-text text-dark">{{ product.description }}</p>
              <p class="card-text fw-bold text-amber">{{ product.price }} \u20AC</p>
              <button class="btn btn-warning w-100 text-light hover-dark-green">Ajouter au panier</button>
            </div>
          </div>
        </div>
      }
    </div>
  </section>
</main>`;
  }
});

// angular:jit:style:src/app/pages/boutique/boutique.scss
var boutique_default2;
var init_boutique2 = __esm({
  "angular:jit:style:src/app/pages/boutique/boutique.scss"() {
    boutique_default2 = '/* src/app/pages/boutique/boutique.scss */\nmain {\n  background-color: #fff8e1;\n  font-family: "Roboto", sans-serif;\n}\n.hero {\n  height: 280px;\n  display: flex;\n  align-items: center;\n  position: relative;\n  background-color: rgba(245, 241, 224, 0.4941176471);\n  padding-top: 8rem;\n  padding-bottom: 8rem;\n}\n.hero-overlay {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: rgba(0, 0, 0, 0.5);\n  z-index: 1;\n}\n.hero h1,\n.hero p {\n  position: relative;\n  z-index: 2;\n  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);\n}\n.card {\n  border: none;\n  transition: transform 0.3s ease;\n}\n.card-img-top {\n  height: 200px;\n  object-fit: cover;\n}\n.text-success {\n  color: #15803d !important;\n}\n.text-success:hover {\n  color: #1ec962 !important;\n}\n.text-amber {\n  color: #d97706 !important;\n}\n.btn-outline-warning {\n  border-color: #d97706;\n  color: #d97706;\n}\n.btn-outline-warning:hover {\n  background-color: #d97706;\n  color: #fff8e1;\n}\n.btn-warning {\n  background-color: #d97706;\n  border-color: #d97706;\n}\n.btn-warning:hover,\n.hover-dark-green:hover {\n  background-color: #14532d;\n  border-color: #14532d;\n}\n.bg-light-amber {\n  background-color: #fff8e1;\n}\n.text-dark {\n  color: #333 !important;\n}\n.card:hover {\n  transform: scale(1.05);\n  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);\n}\n.btn:hover {\n  transform: scale(1.1);\n  transition: transform 0.2s ease;\n}\n/*# sourceMappingURL=boutique.css.map */\n';
  }
});

// src/app/pages/boutique/boutique.ts
var Boutique;
var init_boutique3 = __esm({
  "src/app/pages/boutique/boutique.ts"() {
    "use strict";
    init_tslib_es6();
    init_boutique();
    init_boutique2();
    init_core();
    init_common();
    init_forms();
    init_router();
    init_gsap();
    init_common();
    Boutique = class Boutique2 {
      platformId;
      route;
      products = [
        { id: 1, name: "Ruche Dadant 10 cadres", category: "Ruches", price: 120, image: "https://via.placeholder.com/200", description: "Ruche en bois de qualit\xE9 pour apiculteurs professionnels." },
        { id: 2, name: "Combinaison apicole", category: "V\xEAtements", price: 60, image: "https://via.placeholder.com/200", description: "Protection compl\xE8te pour l\u2019apiculture." },
        { id: 3, name: "Extracteur de miel", category: "Miellerie", price: 250, image: "https://via.placeholder.com/200", description: "Extracteur manuel pour 4 cadres." },
        { id: 4, name: "Nourrisseur 2L", category: "Nourrisseurs", price: 15, image: "https://via.placeholder.com/200", description: "Nourrisseur pour abeilles, capacit\xE9 2L." },
        { id: 5, name: "Miel de lavande", category: "Produits de la ruche", price: 10, image: "https://via.placeholder.com/200", description: "Miel bio de lavande, 500g." }
      ];
      categories = ["Tous", "Ruches", "Vetements", "Miellerie", "Nourrisseurs", "Produits de la ruche"];
      selectedCategory = "Tous";
      sortBy = "popularite";
      sortedProducts = [];
      constructor(platformId, route) {
        this.platformId = platformId;
        this.route = route;
      }
      ngOnInit() {
        this.route.paramMap.subscribe((params) => {
          const categoryFromUrl = params.get("category");
          console.log("Category from URL:", categoryFromUrl);
          this.selectedCategory = this.categories.find((cat) => cat.toLowerCase() === (categoryFromUrl?.toLowerCase() || "tous")) || "Tous";
          this.filterAndSortProducts();
          this.animateProducts();
          this.animateHeroSection();
          this.animateCategoryButtons();
        });
      }
      selectCategory(category) {
        this.selectedCategory = category;
        this.filterAndSortProducts();
        this.animateProducts();
        this.animateCategoryButtons();
      }
      sortProducts() {
        this.filterAndSortProducts();
        this.animateProducts();
      }
      filterAndSortProducts() {
        let filteredProducts = this.selectedCategory === "Tous" ? [...this.products] : this.products.filter((product) => product.category === this.selectedCategory);
        this.sortedProducts = filteredProducts.sort((a, b) => {
          if (this.sortBy === "prix-asc")
            return a.price - b.price;
          if (this.sortBy === "prix-desc")
            return b.price - a.price;
          return 0;
        });
      }
      animateHeroSection() {
        if (isPlatformBrowser(this.platformId)) {
          gsapWithCSS.from(".boutique-section", {
            opacity: 0,
            y: 50,
            duration: 1,
            stagger: 0.3,
            ease: "power3.out",
            delay: 0.2
          });
          gsapWithCSS.from(".contact-img", {
            opacity: 0,
            scale: 0.9,
            duration: 1.2,
            stagger: 0.3,
            ease: "power3.out",
            delay: 0.4
          });
        }
      }
      animateProducts() {
        if (isPlatformBrowser(this.platformId)) {
          gsapWithCSS.from(".product-card", {
            opacity: 0,
            y: 50,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out"
          });
        }
      }
      animateCategoryButtons() {
        if (isPlatformBrowser(this.platformId)) {
          gsapWithCSS.from(".btn", {
            opacity: 0,
            x: -50,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out"
          });
        }
      }
      static ctorParameters = () => [
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID] }] },
        { type: ActivatedRoute }
      ];
    };
    Boutique = __decorate([
      Component({
        selector: "app-boutique",
        template: boutique_default,
        imports: [CommonModule, FormsModule],
        styles: [boutique_default2]
      })
    ], Boutique);
  }
});

// src/app/pages/boutique/boutique.spec.ts
var require_boutique_spec = __commonJS({
  "src/app/pages/boutique/boutique.spec.ts"(exports) {
    init_testing();
    init_boutique3();
    describe("Boutique", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [Boutique]
        }).compileComponents();
        fixture = TestBed.createComponent(Boutique);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_boutique_spec();
//# sourceMappingURL=spec-app-pages-boutique-boutique.spec.js.map
