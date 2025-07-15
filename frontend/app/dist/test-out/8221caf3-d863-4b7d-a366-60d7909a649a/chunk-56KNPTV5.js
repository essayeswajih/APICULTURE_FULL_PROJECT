import {
  RouterModule,
  init_router
} from "./chunk-NMIZS3UU.js";
import {
  CommonModule,
  init_common
} from "./chunk-QA5PPOO6.js";
import {
  Component,
  __decorate,
  init_core,
  init_tslib_es6
} from "./chunk-MFMRIB3Q.js";
import {
  __esm
} from "./chunk-TTULUY32.js";

// angular:jit:template:src/app/header/header.html
var header_default;
var init_header = __esm({
  "angular:jit:template:src/app/header/header.html"() {
    header_default = `<header class="bg-light shadow-sm sticky-top">
  <div class="container py-3">
    <nav class="navbar navbar-expand-lg navbar-light">
      <!-- Logo -->
      <div class="navbar-brand d-flex align-items-center">
        <img src="/assets/logo1.png" alt="Apiculture Galai Logo" class="me-2" style="height: 40px;">
        <span class="fs-4 fw-bold text-warning">Apiculture Galai</span>
      </div>

      <!-- Toggler for Mobile -->
      <button class="navbar-toggler" type="button" (click)="toggleMobileMenu()" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Navigation Menu -->
      <div class="collapse navbar-collapse" id="navbarNav" [ngClass]="{'show': isMobileMenuOpen}">
        <ul class="navbar-nav ms-auto align-items-center">
          <li class="nav-item">
            <a class="nav-link text-success" routerLink="/" routerLinkActive="active-route" [routerLinkActiveOptions]="{exact: true}">Accueil</a>
          </li>
          <li class="nav-item dropdown">
            <button class="nav-link text-success dropdown-toggle" (click)="toggleDropdown()" id="boutiqueDropdown" aria-expanded="false">
              Boutique
            </button>
            <ul class="dropdown-menu" [ngClass]="{'show': isDropdownOpen}" aria-labelledby="boutiqueDropdown">
              <li><a class="dropdown-item text-success" routerLink="/boutique/ruches" routerLinkActive="active-route">Ruches</a></li>
              <li><a class="dropdown-item text-success" routerLink="/boutique/vetements" routerLinkActive="active-route">V\xEAtements</a></li>
              <li><a class="dropdown-item text-success" routerLink="/boutique/miellerie" routerLinkActive="active-route">Miellerie</a></li>
            </ul>
          </li>
          <li class="nav-item">
            <a class="nav-link text-success" routerLink="/a-propos" routerLinkActive="active-route">\xC0 Propos</a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-success" routerLink="/contact" routerLinkActive="active-route">Contact</a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-success" routerLink="/panier" routerLinkActive="active-route" title="Panier">
              <span class="basket-icon">
                <svg class="panier" xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" fill="none">
                <path d="M20 10L18.5145 17.4276C18.3312 18.3439 18.2396 18.8021 18.0004 19.1448C17.7894 19.447 17.499 19.685 17.1613 19.8326C16.7783 20 16.3111 20 15.3766 20H8.62337C7.6889 20 7.22166 20 6.83869 19.8326C6.50097 19.685 6.2106 19.447 5.99964 19.1448C5.76041 18.8021 5.66878 18.3439 5.48551 17.4276L4 10M20 10H18M20 10H21M4 10H3M4 10H6M6 10H18M6 10L9 4M18 10L15 4M9 13V16M12 13V16M15 13V16" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</header>`;
  }
});

// angular:jit:style:src/app/header/header.scss
var header_default2;
var init_header2 = __esm({
  "angular:jit:style:src/app/header/header.scss"() {
    header_default2 = '/* src/app/header/header.scss */\nheader {\n  background-color: #fff8e1;\n  font-family: "Roboto", sans-serif;\n}\n.navbar-brand span {\n  color: #d97706;\n}\n.nav-link,\n.dropdown-item {\n  color: #b66407 !important;\n  transition: color 0.3s ease;\n}\n.nav-link:hover,\n.dropdown-item:hover {\n  color: #d38c07 !important;\n  background-color: #fef3c7;\n}\n.dropdown-menu {\n  background-color: #fff8e1;\n  border: 1px solid #d97706;\n}\n.dropdown-menu.show {\n  display: block;\n}\n.active-route {\n  color: #b16106 !important;\n  font-weight: bold;\n  background-color: rgba(233, 206, 97, 0.8823529412);\n}\n.basket-icon {\n  color: red;\n  font-size: 1.5rem;\n  line-height: 1;\n}\n.panier {\n  height: 30px;\n  width: 30px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background-color: #fef3c7;\n  border-radius: 50%;\n  border: 2px solid #d97706;\n  transition: background-color 0.3s ease, border-color 0.3s;\n}\n/*# sourceMappingURL=header.css.map */\n';
  }
});

// src/app/header/header.ts
var Header;
var init_header3 = __esm({
  "src/app/header/header.ts"() {
    "use strict";
    init_tslib_es6();
    init_header();
    init_header2();
    init_common();
    init_core();
    init_router();
    Header = class Header2 {
      isMobileMenuOpen = false;
      isDropdownOpen = false;
      toggleMobileMenu() {
        this.isMobileMenuOpen = !this.isMobileMenuOpen;
        if (!this.isMobileMenuOpen)
          this.isDropdownOpen = false;
      }
      toggleDropdown() {
        this.isDropdownOpen = !this.isDropdownOpen;
      }
    };
    Header = __decorate([
      Component({
        selector: "app-header",
        imports: [CommonModule, RouterModule],
        template: header_default,
        styles: [header_default2]
      })
    ], Header);
  }
});

export {
  Header,
  init_header3 as init_header
};
//# sourceMappingURL=chunk-56KNPTV5.js.map
