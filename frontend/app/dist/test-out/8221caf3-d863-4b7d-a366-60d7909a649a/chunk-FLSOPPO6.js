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

// angular:jit:template:src/app/footer/footer.html
var footer_default;
var init_footer = __esm({
  "angular:jit:template:src/app/footer/footer.html"() {
    footer_default = `<footer class="bg-light shadow-sm py-4">
  <div class="container">
    <div class="row">
      <!-- Navigation Links -->
      <div class="col-md-3 mb-3">
        <h5 class="text-warning fw-bold">Navigation</h5>
        <ul class="list-unstyled">
          <li><a class="text-success" routerLink="/" routerLinkActive="active-route" [routerLinkActiveOptions]="{exact: true}">Accueil</a></li>
          <li>
            <button class="text-success dropdown-toggle bg-transparent border-0" (click)="toggleDropdown()" id="footerBoutiqueDropdown" aria-expanded="false">
              Boutique
            </button>
            <ul class="dropdown-menu" [ngClass]="{'show': isDropdownOpen}" aria-labelledby="footerBoutiqueDropdown">
              <li><a class="dropdown-item text-success" routerLink="/boutique/ruches" routerLinkActive="active-route">Ruches</a></li>
              <li><a class="dropdown-item text-success" routerLink="/boutique/vetements" routerLinkActive="active-route">V\xEAtements</a></li>
              <li><a class="dropdown-item text-success" routerLink="/boutique/miellerie" routerLinkActive="active-route">Miellerie</a></li>
            </ul>
          </li>
          <li><a class="text-success" routerLink="/a-propos" routerLinkActive="active-route">\xC0 Propos</a></li>
          <li><a class="text-success" routerLink="/contact" routerLinkActive="active-route">Contact</a></li>
          <li>
            <a class="text-success d-flex align-items-center" routerLink="/panier" routerLinkActive="active-route" title="Panier">
                Panier
              <span class="basket-icon me-1">
                <svg class="panier" xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none" style="margin-left: 5px;">
                  <path d="M20 10L18.5145 17.4276C18.3312 18.3439 18.2396 18.8021 18.0004 19.1448C17.7894 19.447 17.499 19.685 17.1613 19.8326C16.7783 20 16.3111 20 15.3766 20H8.62337C7.6889 20 7.22166 20 6.83869 19.8326C6.50097 19.685 6.2106 19.447 5.99964 19.1448C5.76041 18.8021 5.66878 18.3439 5.48551 17.4276L4 10M20 10H18M20 10H21M4 10H3M4 10H6M6 10H18M6 10L9 4M18 10L15 4M9 13V16M12 13V16M15 13V16" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
            </a>
          </li>
        </ul>
      </div>

      <!-- Contact Information -->
      <div class="col-md-3 mb-3">
        <h5 class="text-warning fw-bold">Contact</h5>
        <ul class="list-unstyled">
          <li><a class="text-success" routerLink="/contact">Formulaire de Contact</a></li>
          <li><a class="text-success" href="mailto:contact@apiculturegalai.com">contact&#64;apiculturegalai.com</a></li>
          <li><span class="text-success">+216 27 553 981</span></li>
        </ul>
      </div>

      <!-- Newsletter Signup -->
      <div class="col-md-3 mb-3">
        <h5 class="text-warning fw-bold">Newsletter</h5>
        <p class="text-success">Inscrivez-vous pour recevoir nos promotions et actualit\xE9s.</p>
        <div class="input-group">
          <input type="email" class="form-control" placeholder="Votre e-mail" aria-label="Email">
          <button class="btn btn-outline-warning" type="button">S'inscrire</button>
        </div>
      </div>

      <!-- Social Media and Legal -->
      <div class="col-md-3 mb-3">
        <h5 class="text-warning fw-bold">Suivez-nous</h5>
        <ul class="list-unstyled d-flex">
          <li class="me-3"><a class="text-success" href="https://facebook.com" target="_blank"><i class="fab fa-facebook-f"></i></a></li>
          <li><a class="text-success" href="https://instagram.com" target="_blank"><i class="fab fa-instagram"></i></a></li>
        </ul>
        <h5 class="text-warning fw-bold mt-3">Informations L\xE9gales</h5>
        <ul class="list-unstyled">
          <li><a class="text-success" routerLink="/cgv">Conditions G\xE9n\xE9rales de Vente</a></li>
          <li><a class="text-success" routerLink="/politique-confidentialite">Politique de Confidentialit\xE9</a></li>
        </ul>
      </div>
    </div>

    <!-- Copyright -->
    <div class="text-center mt-4">
      <p class="text-success mb-0">&copy; 2025 Apiculture Galistin. Tous droits r\xE9serv\xE9s.</p>
    </div>
  </div>
</footer>`;
  }
});

// angular:jit:style:src/app/footer/footer.scss
var footer_default2;
var init_footer2 = __esm({
  "angular:jit:style:src/app/footer/footer.scss"() {
    footer_default2 = '/* src/app/footer/footer.scss */\nfooter {\n  background-color: #fff8e1;\n  font-family: "Roboto", sans-serif;\n}\nh5 {\n  color: #d97706;\n}\n.text-success,\na.text-success {\n  color: #15803d !important;\n  transition: color 0.3s ease;\n}\na.text-success:hover {\n  color: #14532d !important;\n}\n.dropdown-toggle {\n  background: none;\n  border: none;\n  color: #15803d !important;\n  font-size: 1rem;\n  padding: 0;\n}\n.dropdown-toggle:hover {\n  color: #14532d !important;\n}\n.dropdown-menu {\n  background-color: #fff8e1;\n  border: 1px solid #d97706;\n}\n.dropdown-menu.show {\n  display: block;\n}\n.dropdown-item {\n  color: #15803d !important;\n}\n.dropdown-item:hover {\n  color: #14532d !important;\n  background-color: #fef3c7;\n}\n.active-route {\n  color: #d97706 !important;\n  font-weight: bold;\n  background-color: transparent;\n}\n.basket-icon {\n  display: inline-flex;\n  align-items: center;\n}\n.panier {\n  height: 20px;\n  width: 20px;\n  background-color: #fef3c7;\n  border-radius: 50%;\n  border: 2px solid #d97706;\n  transition: background-color 0.3s ease, border-color 0.3s;\n}\n.panier path {\n  stroke: #d97706;\n}\n.btn-outline-warning {\n  border-color: #d97706;\n  color: #d97706;\n}\n.btn-outline-warning:hover {\n  background-color: #d97706;\n  color: #fff8e1;\n}\n@media (max-width: 767px) {\n  .dropdown-menu {\n    background-color: #fef3c7;\n    border: none;\n  }\n}\n/*# sourceMappingURL=footer.css.map */\n';
  }
});

// src/app/footer/footer.ts
var Footer;
var init_footer3 = __esm({
  "src/app/footer/footer.ts"() {
    "use strict";
    init_tslib_es6();
    init_footer();
    init_footer2();
    init_common();
    init_core();
    init_router();
    Footer = class Footer2 {
      isDropdownOpen = false;
      toggleDropdown() {
        this.isDropdownOpen = !this.isDropdownOpen;
      }
    };
    Footer = __decorate([
      Component({
        selector: "app-footer",
        imports: [CommonModule, RouterModule],
        template: footer_default,
        styles: [footer_default2]
      })
    ], Footer);
  }
});

export {
  Footer,
  init_footer3 as init_footer
};
//# sourceMappingURL=chunk-FLSOPPO6.js.map
