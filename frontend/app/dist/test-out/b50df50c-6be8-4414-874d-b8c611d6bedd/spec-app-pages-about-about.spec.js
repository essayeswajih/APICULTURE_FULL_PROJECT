import {
  Meta,
  Title,
  init_platform_browser
} from "./chunk-GTSZX46A.js";
import "./chunk-SWYOOYFC.js";
import {
  gsapWithCSS,
  init_gsap
} from "./chunk-5TSOWYW2.js";
import {
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

// angular:jit:template:src/app/pages/about/about.html
var about_default;
var init_about = __esm({
  "angular:jit:template:src/app/pages/about/about.html"() {
    about_default = `<main class="min-h-screen">
  <!-- Hero Section with Background Image -->
  <section class="hero py-6 text-center bg-light-amber position-relative" style="background-image: url('/assets/images/pexels-pixabay-301378.jpg'); background-size: cover; background-position:bottom;">
    <div class="container-md">
      <div class="hero-overlay"></div>
      <h1 class="display-3 text-amber mb-4 about-section">\xC0 Propos de Nous</h1>
      <p class="lead text-success mb-0 about-section">Passionn\xE9s par l\u2019apiculture, nous offrons des produits et du mat\xE9riel de qualit\xE9 pour soutenir les apiculteurs et pr\xE9server les abeilles.</p>
    </div>
  </section>

  <!-- Mission and Values Section -->
  <section class="container-md py-6">
    <div class="row g-5">
      <div class="col-12 col-lg-6 about-section">
        <div class="card shadow-sm rounded">
          <img src="/assets/images/apiculteurs-travaillent-ramasser-le-miel.avif" class="card-img-top about-img rounded-top" alt="Apiculteur d'Apiculture Galai travaillant avec une ruche">
          <div class="card-body">
            <h2 class="h3 text-success mb-3">Notre Mission</h2>
            <p class="text-dark">
              Chez Apiculture Galai, nous nous engageons \xE0 promouvoir une apiculture durable. Nous fournissons des \xE9quipements fiables et des produits de la ruche authentiques, tout en sensibilisant \xE0 l\u2019importance des abeilles pour notre \xE9cosyst\xE8me.
            </p>
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-6 about-section">
        <div class="card shadow-sm rounded">
          <img src="/assets/images/266.webp" class="card-img-top about-img rounded-top" alt="Pots de miel artisanal d'Apiculture Galai">
          <div class="card-body">
            <h2 class="h3 text-success mb-3">Nos Valeurs</h2>
            <ul class="text-dark">
              <li><strong>Qualit\xE9</strong> : Produits rigoureusement s\xE9lectionn\xE9s pour leur durabilit\xE9 et efficacit\xE9.</li>
              <li><strong>Durabilit\xE9</strong> : Pratiques \xE9coresponsables pour prot\xE9ger l\u2019environnement.</li>
              <li><strong>Communaut\xE9</strong> : Collaboration avec les apiculteurs locaux pour partager savoir et passion.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- History Section -->
  <section class="container-md py-6">
    <div class="row g-5 align-items-center">
      <div class="col-12 col-lg-6 about-section">
        <div class="card shadow-sm rounded">
          <div class="card-body">
            <h2 class="h3 text-success mb-3">Notre Histoire</h2>
            <p class="text-dark">
              Fond\xE9e par une famille d\u2019apiculteurs passionn\xE9s, Apiculture Galai est n\xE9e d\u2019un amour pour les abeilles et d\u2019un d\xE9sir de partager des produits de qualit\xE9. Depuis nos d\xE9buts, nous travaillons avec des artisans et des apiculteurs pour offrir le meilleur du monde apicole.
            </p>
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-6 about-section">
        <img src="/assets/images/Comment-se-pratique-lapiculture-.jpg" class="img-fluid rounded shadow-sm about-img" alt="Champ de fleurs pollinis\xE9 par les abeilles d'Apiculture Galai">
      </div>
    </div>
  </section>

  <!-- Call to Action -->
  <section class="py-6 text-center bg-gradient-amber">
    <div class="container-md about-section">
      <h2 class="h3 text-amber mb-4">Explorez Notre Boutique</h2>
      <p class="text-dark mb-4">D\xE9couvrez notre s\xE9lection de mat\xE9riel apicole et produits de la ruche, con\xE7us pour tous les passionn\xE9s d\u2019apiculture.</p>
      <a routerLink="/boutique" class="btn btn-warning text-light hover-dark-green btn-lg" aria-label="Visiter la boutique apicole d'Apiculture Galai">Visiter la Boutique</a>
    </div>
  </section>
</main>`;
  }
});

// angular:jit:style:src/app/pages/about/about.scss
var about_default2;
var init_about2 = __esm({
  "angular:jit:style:src/app/pages/about/about.scss"() {
    about_default2 = '/* src/app/pages/about/about.scss */\nmain {\n  background-color: #fff8e1;\n  font-family: "Roboto", sans-serif;\n}\n.hero {\n  height: 280px;\n  display: flex;\n  align-items: center;\n  position: relative;\n  background-color: rgba(245, 241, 224, 0.4941176471);\n  padding-top: 8rem;\n  padding-bottom: 8rem;\n}\n.hero-overlay {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: rgba(0, 0, 0, 0.5);\n  z-index: 1;\n}\n.hero h1,\n.hero p {\n  position: relative;\n  z-index: 2;\n  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);\n}\n.card {\n  border: none;\n  transition: transform 0.3s ease;\n}\n.card:hover {\n  transform: translateY(-5px);\n}\n.card-img-top {\n  height: 250px;\n  object-fit: cover;\n  border-top-left-radius: 0.5rem;\n  border-top-right-radius: 0.5rem;\n}\n.img-fluid {\n  max-height: 300px;\n  object-fit: cover;\n}\n.text-success {\n  color: #15803d !important;\n}\n.text-success:hover {\n  color: #1ec962 !important;\n}\n.text-amber {\n  color: #d97706 !important;\n}\n.btn-warning {\n  background-color: #d97706;\n  border-color: #d97706;\n  padding: 0.75rem 1.5rem;\n}\n.btn-warning:hover,\n.hover-dark-green:hover {\n  background-color: #14532d;\n  border-color: #14532d;\n}\n.bg-light-amber {\n  background-color: #fff8e1;\n}\n.bg-gradient-amber {\n  background:\n    linear-gradient(\n      180deg,\n      #fff8e1 0%,\n      #f5e0b5 100%);\n}\n.text-dark {\n  color: #333 !important;\n}\n.container-md {\n  max-width: 960px;\n}\n.py-6 {\n  padding-top: 4rem;\n  padding-bottom: 4rem;\n}\n/*# sourceMappingURL=about.css.map */\n';
  }
});

// src/app/pages/about/about.ts
var About;
var init_about3 = __esm({
  "src/app/pages/about/about.ts"() {
    "use strict";
    init_tslib_es6();
    init_about();
    init_about2();
    init_core();
    init_core();
    init_platform_browser();
    init_gsap();
    init_common();
    About = class About2 {
      platformId;
      meta;
      title;
      constructor(platformId, meta, title) {
        this.platformId = platformId;
        this.meta = meta;
        this.title = title;
      }
      ngOnInit() {
        this.title.setTitle("\xC0 Propos - Boutique Apicole");
        this.meta.updateTag({
          name: "description",
          content: "D\xE9couvrez l\u2019histoire, la mission et les valeurs de notre boutique apicole, d\xE9di\xE9e \xE0 l\u2019apiculture durable et \xE0 la qualit\xE9 des produits."
        });
        if (isPlatformBrowser(this.platformId)) {
          gsapWithCSS.from(".about-section", {
            opacity: 0,
            y: 50,
            duration: 1,
            stagger: 0.3,
            ease: "power3.out",
            delay: 0.2
          });
          gsapWithCSS.from(".about-img", {
            opacity: 0,
            scale: 0.9,
            duration: 1.2,
            stagger: 0.3,
            ease: "power3.out",
            delay: 0.4
          });
        }
      }
      static ctorParameters = () => [
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID] }] },
        { type: Meta },
        { type: Title }
      ];
    };
    About = __decorate([
      Component({
        selector: "app-about",
        imports: [],
        template: about_default,
        styles: [about_default2]
      })
    ], About);
  }
});

// src/app/pages/about/about.spec.ts
var require_about_spec = __commonJS({
  "src/app/pages/about/about.spec.ts"(exports) {
    init_testing();
    init_about3();
    describe("About", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [About]
        }).compileComponents();
        fixture = TestBed.createComponent(About);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_about_spec();
//# sourceMappingURL=spec-app-pages-about-about.spec.js.map
