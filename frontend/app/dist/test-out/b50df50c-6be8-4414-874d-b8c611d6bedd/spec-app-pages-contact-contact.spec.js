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

// angular:jit:template:src/app/pages/contact/contact.html
var contact_default;
var init_contact = __esm({
  "angular:jit:template:src/app/pages/contact/contact.html"() {
    contact_default = `<main class="min-h-screen">
  <!-- Hero Section with Background Image -->
  <section class="hero py-6 text-center bg-light-amber position-relative"  style="background-image: url('/assets/images/pexels-pixabay-301378.jpg'); background-size: cover; background-position:bottom;">
    <div class="container-md">
      <div class="hero-overlay"></div>
      <h1 class="display-3 text-amber mb-4 contact-section">Nous Contacter</h1>
      <p class="lead text-success mb-0 contact-section">Vous avez une question ou besoin de conseils sur l\u2019apiculture ? Contactez l\u2019\xE9quipe d\u2019Apiculture Galai !</p>
    </div>
  </section>

  <!-- Contact Form and Info Section -->
  <section class="container-md py-6">
    <div class="row g-5">
      <!-- Contact Form -->
      <div class="col-12 col-lg-6 contact-section">
        <div class="card shadow-sm rounded">
          <div class="card-body">
            <h2 class="h3 text-success mb-4">Envoyez-nous un Message</h2>
            <form #contactForm="ngForm" (ngSubmit)="onSubmit(contactForm)" novalidate>
              <div class="mb-3">
                <label for="name" class="form-label text-dark">Nom</label>
                <input
                  type="text"
                  id="name"
                  class="form-control"
                  [(ngModel)]="contactFormModel.name"
                  name="name"
                  required
                  aria-required="true"
                  placeholder="Votre nom"
                  #name="ngModel"
                >
                <div *ngIf="name.touched && name.invalid" class="text-danger mt-1">Le nom est requis.</div>
              </div>
              <div class="mb-3">
                <label for="email" class="form-label text-dark">Email</label>
                <input
                  type="email"
                  id="email"
                  class="form-control"
                  [(ngModel)]="contactFormModel.email"
                  name="email"
                  required
                  email
                  aria-required="true"
                  placeholder="votre.email@exemple.com"
                  #email="ngModel"
                >
                <div *ngIf="email.touched && email.invalid" class="text-danger mt-1">
                  <div *ngIf="email.errors?.['required']">L\u2019email est requis.</div>
                  <div *ngIf="email.errors?.['email']">Veuillez entrer un email valide.</div>
                </div>
              </div>
              <div class="mb-3">
                <label for="subject" class="form-label text-dark">Sujet</label>
                <input
                  type="text"
                  id="subject"
                  class="form-control"
                  [(ngModel)]="contactFormModel.subject"
                  name="subject"
                  required
                  aria-required="true"
                  placeholder="Objet de votre message"
                  #subject="ngModel"
                >
                <div *ngIf="subject.touched && subject.invalid" class="text-danger mt-1">Le sujet est requis.</div>
              </div>
              <div class="mb-3">
                <label for="message" class="form-label text-dark">Message</label>
                <textarea
                  id="message"
                  class="form-control"
                  [(ngModel)]="contactFormModel.message"
                  name="message"
                  required
                  aria-required="true"
                  rows="5"
                  placeholder="Votre message"
                  #message="ngModel"
                ></textarea>
                <div *ngIf="message.touched && message.invalid" class="text-danger mt-1">Le message est requis.</div>
              </div>
              <button type="submit" class="btn btn-warning text-light hover-dark-green w-100" [disabled]="contactForm.invalid" aria-label="Envoyer le message \xE0 Apiculture Galai">Envoyer</button>
            </form>
          </div>
        </div>
      </div>

      <!-- Contact Information -->
      <div class="col-12 col-lg-6 contact-section">
        <div class="card shadow-sm rounded">
          <img src="/assets/images/Copyright-Jerome-Sevrette_RB_0098237web.jpg" class="card-img-top contact-img rounded-top" alt="Apiculteur d'Apiculture Galai en action">
          <div class="card-body">
            <h2 class="h3 text-success mb-4">Nos Coordonn\xE9es</h2>
            <ul class="text-dark list-unstyled">
              <li class="mb-2"><strong>Email :</strong> <a href="mailto:contact&#64;apiculturegalai.fr" class="text-success">contact&#64;apiculturegalai.fr</a></li>
              <li class="mb-2"><strong>T\xE9l\xE9phone :</strong> +216 27 553 981</li>
              <li class="mb-2"><strong>Adresse :</strong> Rue de El Yassamine, 75001 Monatsir, Tunisie</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Call to Action -->
  <section class="py-6 text-center bg-gradient-amber">
    <div class="container-md contact-section">
      <h2 class="h3 text-amber mb-4">D\xE9couvrez Nos Produits</h2>
      <p class="text-dark mb-4">Explorez notre gamme de mat\xE9riel apicole et produits de la ruche pour tous les passionn\xE9s d\u2019apiculture.</p>
      <a routerLink="/boutique" class="btn btn-warning text-light hover-dark-green btn-lg" aria-label="Visiter la boutique apicole d'Apiculture Galai">Visiter la Boutique</a>
    </div>
  </section>
</main>
`;
  }
});

// angular:jit:style:src/app/pages/contact/contact.scss
var contact_default2;
var init_contact2 = __esm({
  "angular:jit:style:src/app/pages/contact/contact.scss"() {
    contact_default2 = '@charset "UTF-8";\n\n/* src/app/pages/contact/contact.scss */\nmain {\n  background-color: #fff8e1;\n  font-family: "Roboto", sans-serif;\n}\n.hero {\n  height: 280px;\n  display: flex;\n  align-items: center;\n  position: relative;\n  background-color: rgba(245, 241, 224, 0.4941176471);\n  padding-top: 8rem;\n  padding-bottom: 8rem;\n}\n.hero-overlay {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: rgba(0, 0, 0, 0.5);\n  z-index: 1;\n}\n.hero h1,\n.hero p {\n  position: relative;\n  z-index: 2;\n  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);\n}\n.card {\n  border: none;\n  transition: transform 0.3s ease;\n}\n.card:hover {\n  transform: translateY(-5px);\n}\n.card-img-top {\n  height: 280px;\n  object-fit: cover;\n  border-top-left-radius: 0.5rem;\n  border-top-right-radius: 0.5rem;\n}\n.form-control {\n  border-color: #d97706;\n  background-color: #fff8e1;\n}\n.form-control:focus {\n  border-color: #14532d;\n  box-shadow: 0 0 0 0.2rem rgba(20, 83, 45, 0.25);\n}\n.text-success {\n  color: #15803d !important;\n}\n.text-success:hover {\n  color: #1ec962 !important;\n}\n.text-amber {\n  color: #d97706 !important;\n}\n.btn-warning {\n  background-color: #d97706;\n  border-color: #d97706;\n  padding: 0.75rem 2rem;\n}\n.btn-warning:hover,\n.hover-dark-green:hover {\n  background-color: #14532d;\n  border-color: #14532d;\n}\n.bg-light-amber {\n  background-color: #fff8e1;\n}\n.bg-gradient-amber {\n  background:\n    linear-gradient(\n      180deg,\n      #fff8e1 0%,\n      #f5e0b5 100%);\n}\n.text-dark {\n  color: #333 !important;\n}\n.container-md {\n  max-width: 960px;\n}\n.py-6 {\n  padding-top: 4.5rem;\n  padding-bottom: 4.5rem;\n}\n/*# sourceMappingURL=contact.css.map */\n';
  }
});

// src/app/pages/contact/contact.ts
var Contact;
var init_contact3 = __esm({
  "src/app/pages/contact/contact.ts"() {
    "use strict";
    init_tslib_es6();
    init_contact();
    init_contact2();
    init_core();
    init_common();
    init_forms();
    init_router();
    init_platform_browser();
    init_gsap();
    init_common();
    Contact = class Contact2 {
      platformId;
      meta;
      title;
      contactFormModel = {
        name: "",
        email: "",
        subject: "",
        message: ""
      };
      constructor(platformId, meta, title) {
        this.platformId = platformId;
        this.meta = meta;
        this.title = title;
      }
      ngOnInit() {
        this.title.setTitle("Contact - Apiculture Galai");
        this.meta.updateTag({
          name: "description",
          content: "Contactez Apiculture Galai pour toute question sur nos produits apicoles ou pour des conseils en apiculture."
        });
        if (isPlatformBrowser(this.platformId)) {
          gsapWithCSS.from(".contact-section", {
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
      onSubmit(contactForm) {
        console.log("Form submitted:", contactForm.value);
        this.contactFormModel = { name: "", email: "", subject: "", message: "" };
      }
      static ctorParameters = () => [
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID] }] },
        { type: Meta },
        { type: Title }
      ];
    };
    Contact = __decorate([
      Component({
        selector: "app-contact",
        imports: [CommonModule, FormsModule, RouterLink],
        template: contact_default,
        styles: [contact_default2]
      })
    ], Contact);
  }
});

// src/app/pages/contact/contact.spec.ts
var require_contact_spec = __commonJS({
  "src/app/pages/contact/contact.spec.ts"(exports) {
    init_testing();
    init_contact3();
    describe("Contact", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [Contact]
        }).compileComponents();
        fixture = TestBed.createComponent(Contact);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_contact_spec();
//# sourceMappingURL=spec-app-pages-contact-contact.spec.js.map
