import {
  RouterLink,
  init_router
} from "./chunk-NMIZS3UU.js";
import {
  Meta,
  Title,
  init_platform_browser
} from "./chunk-GTSZX46A.js";
import "./chunk-SWYOOYFC.js";
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
  __esm
} from "./chunk-TTULUY32.js";

// angular:jit:template:src/app/pages/panier/panier.html
var panier_default;
var init_panier = __esm({
  "angular:jit:template:src/app/pages/panier/panier.html"() {
    panier_default = `<main class="min-h-screen">
  <!-- Hero Section with Background Image -->
  <section class="hero py-6 text-center bg-light-amber position-relative" style="background-image: url('/assets/images/pexels-pixabay-301378.jpg'); background-size: cover; background-position:bottom;">
    <div class="container-md">
      <div class="hero-overlay"></div>
      <h1 class="display-3 text-amber mb-4 panier-section">Votre Panier</h1>
      <p class="lead text-success mb-0 panier-section">Consultez vos produits apicoles s\xE9lectionn\xE9s et passez \xE0 la caisse avec Apiculture Galai.</p>
    </div>
  </section>

  <!-- Cart Table and Summary Section -->
  <section class="container-md py-6">
    <div class="row g-5">
      <!-- Cart Table -->
      <div class="col-12 col-lg-8 panier-section">
        <div class="card shadow-sm rounded">
          <div class="card-body">
            <h2 class="h3 text-success mb-4">Articles dans le Panier</h2>
            @if (cartItems.length === 0) {
              <p class="text-dark">Votre panier est vide. <a routerLink="/boutique" class="text-success">Continuez vos achats</a>.</p>
            } @else {
              <div class="table-responsive">
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Produit</th>
                      <th scope="col">Nom</th>
                      <th scope="col">Quantit\xE9</th>
                      <th scope="col">Prix</th>
                      <th scope="col">Total</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    @for (item of cartItems; track item.id) {
                      <tr>
                        <td>
                          <img [src]="item.image" class="panier-img rounded" style="width: auto; height: 80px; object-fit: cover;" [alt]="'Produit ' + item.name + ' d\\'Apiculture Galai'">
                        </td>
                        <td class="align-middle">{{ item.name }}</td>
                        <td class="align-middle">
                          <input
                            type="number"
                            class="form-control w-25 d-inline-block"
                            [(ngModel)]="item.quantity"
                            (ngModelChange)="updateQuantity(item, $event)"
                            min="1"
                            [attr.aria-label]="'Quantit\xE9 de ' + item.name"
                          >
                        </td>
                        <td class="align-middle">{{ item.price | currency:'EUR' }}</td>
                        <td class="align-middle">{{ (item.price * item.quantity) | currency:'EUR' }}</td>
                        <td class="align-middle">
                          <button
                            class="btn btn-outline-danger btn-sm"
                            (click)="removeItem(item.id)"
                            [attr.aria-label]="'Supprimer ' + item.name + ' du panier'"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                            </svg>
                          </button>
                        </td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            }
          </div>
        </div>
      </div>

      <!-- Cart Summary -->
      <div class="col-12 col-lg-4 panier-section">
        <div class="card shadow-sm rounded">
          <div class="card-body">
            <h2 class="h3 text-success mb-4">R\xE9sum\xE9 du Panier</h2>
            <ul class="text-dark list-unstyled">
              <li class="mb-2"><strong>Sous-total :</strong> {{ getSubtotal() | currency:'EUR' }}</li>
              <li class="mb-2"><strong>Taxe (19%) :</strong> {{ getTax() | currency:'EUR' }}</li>
              <li class="mb-3"><strong>Total :</strong> {{ getTotal() | currency:'EUR' }}</li>
            </ul>
            <a routerLink="/checkout" class="btn btn-warning text-light hover-dark-green w-100 mb-3" aria-label="Passer \xE0 la caisse avec Apiculture Galai">Passer \xE0 la Caisse</a>
            <a routerLink="/boutique" class="btn btn-outline-success w-100" aria-label="Continuer les achats chez Apiculture Galai">Continuer les Achats</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</main>`;
  }
});

// angular:jit:style:src/app/pages/panier/panier.scss
var panier_default2;
var init_panier2 = __esm({
  "angular:jit:style:src/app/pages/panier/panier.scss"() {
    panier_default2 = '/* src/app/pages/panier/panier.scss */\nmain {\n  background-color: #fff8e1;\n  font-family: "Roboto", sans-serif;\n}\n.hero {\n  height: 280px;\n  display: flex;\n  align-items: center;\n  position: relative;\n  background-color: rgba(245, 241, 224, 0.4941176471);\n  padding-top: 8rem;\n  padding-bottom: 8rem;\n}\n.hero-overlay {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: rgba(0, 0, 0, 0.5);\n  z-index: 1;\n}\n.hero h1,\n.hero p {\n  position: relative;\n  z-index: 2;\n  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);\n}\n.card {\n  border: none;\n  transition: transform 0.3s ease;\n}\n.card:hover {\n  transform: translateY(-5px);\n}\n.table {\n  background-color: #fff;\n}\n.table th,\n.table td {\n  vertical-align: middle;\n}\n.form-control {\n  border-color: #d97706;\n  background-color: #fff8e1;\n}\n.form-control:focus {\n  border-color: #14532d;\n  box-shadow: 0 0 0 0.2rem rgba(20, 83, 45, 0.25);\n}\n.text-success {\n  color: #15803d !important;\n}\n.text-success:hover {\n  color: #1ec962 !important;\n}\n.text-amber {\n  color: #d97706 !important;\n}\n.btn-warning {\n  background-color: #d97706;\n  border-color: #d97706;\n  padding: 0.75rem 2rem;\n}\n.btn-warning:hover,\n.hover-dark-green:hover {\n  background-color: #14532d;\n  border-color: #14532d;\n}\n.btn-outline-success {\n  border-color: #15803d;\n  color: #15803d;\n}\n.btn-outline-success:hover {\n  background-color: #14532d;\n  color: #fff;\n}\n.bg-light-amber {\n  background-color: #fff8e1;\n}\n.bg-gradient-amber {\n  background:\n    linear-gradient(\n      180deg,\n      #fff8e1 0%,\n      #f5e0b5 100%);\n}\n.text-dark {\n  color: #333 !important;\n}\n.container-md {\n  max-width: 960px;\n}\n.py-6 {\n  padding-top: 4.5rem;\n  padding-bottom: 4.5rem;\n}\n/*# sourceMappingURL=panier.css.map */\n';
  }
});

// src/app/pages/panier/panier.ts
var Panier;
var init_panier3 = __esm({
  "src/app/pages/panier/panier.ts"() {
    "use strict";
    init_tslib_es6();
    init_panier();
    init_panier2();
    init_common();
    init_core();
    init_forms();
    init_router();
    init_platform_browser();
    init_gsap();
    Panier = class Panier2 {
      platformId;
      meta;
      title;
      cartItems = [
        {
          id: 1,
          name: "Miel de Lavande 500g",
          image: "/assets/products/combinaison-blanche-avec-chapeau-et-voile.jpg",
          price: 12.99,
          quantity: 2
        },
        {
          id: 2,
          name: "Ruche Dadant 10 cadres",
          image: "/assets/products/xkit-miellerie-extracteur-beetools.jpg.pagespeed.ic.HZeahRP6SC.webp",
          price: 89.99,
          quantity: 1
        }
      ];
      constructor(platformId, meta, title) {
        this.platformId = platformId;
        this.meta = meta;
        this.title = title;
      }
      ngOnInit() {
        this.title.setTitle("Panier - Apiculture Galai");
        this.meta.updateTag({
          name: "description",
          content: "Consultez et g\xE9rez votre panier chez Apiculture Galai. D\xE9couvrez nos produits apicoles de qualit\xE9."
        });
        if (isPlatformBrowser(this.platformId)) {
          gsapWithCSS.from(".panier-section", {
            opacity: 0,
            y: 50,
            duration: 1,
            stagger: 0.3,
            ease: "power3.out",
            delay: 0.2
          });
          gsapWithCSS.from(".panier-img", {
            opacity: 0,
            scale: 0.9,
            duration: 1.2,
            stagger: 0.3,
            ease: "power3.out",
            delay: 0.4
          });
        }
      }
      updateQuantity(item, quantity) {
        if (quantity >= 1) {
          item.quantity = quantity;
        }
      }
      removeItem(itemId) {
        this.cartItems = this.cartItems.filter((item) => item.id !== itemId);
      }
      getSubtotal() {
        return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      }
      getTax() {
        return this.getSubtotal() * 0.19;
      }
      getTotal() {
        return this.getSubtotal() + this.getTax();
      }
      static ctorParameters = () => [
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID] }] },
        { type: Meta },
        { type: Title }
      ];
    };
    Panier = __decorate([
      Component({
        selector: "app-panier",
        imports: [CommonModule, FormsModule, RouterLink],
        template: panier_default,
        styles: [panier_default2]
      })
    ], Panier);
  }
});

// src/app/pages/panier/panier.spec.ts
var require_panier_spec = __commonJS({
  "src/app/pages/panier/panier.spec.ts"(exports) {
    init_testing();
    init_panier3();
    describe("Panier", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [Panier]
        }).compileComponents();
        fixture = TestBed.createComponent(Panier);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_panier_spec();
//# sourceMappingURL=spec-app-pages-panier-panier.spec.js.map
