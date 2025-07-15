import {
  ActivatedRoute,
  RouterModule,
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
  init_common
} from "./chunk-QA5PPOO6.js";
import "./chunk-L4GPXURK.js";
import {
  Component,
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

// angular:jit:template:src/app/pages/home/home.html
var home_default;
var init_home = __esm({
  "angular:jit:template:src/app/pages/home/home.html"() {
    home_default = `
<main class="bg-light">
  <div id="beeBox">
    <img id="bee" src="/assets/images/bee.png" alt="" srcset="">
  </div>
    <div id="beeBox1">
    <img id="bee1" src="/assets/images/bee-ezgif.com-rotate.png" alt="" srcset="">
  </div>
  <!-- Hero Section -->
  <section class="hero py-5">
    <div class="container">
      <div id="heroCarousel" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="/assets/images/ruches.jpg" class="d-block w-100" alt="Ruches de qualit\xE9">
            <div class="carousel-caption d-none d-md-block">
              <h2 class="text-warning fw-bold">Ruches</h2>
              <p class="text-success">Mat\xE9riel apicole de qualit\xE9 pour tous les apiculteurs.</p>
              <a routerLink="/boutique" class="btn btn-outline-warning">Visiter la Boutique</a>
            </div>
          </div>
          <div class="carousel-item">
            <img src="/assets/images/apicultre1.jpg" class="d-block w-100" alt="V\xEAtements de protection">
            <div class="carousel-caption d-none d-md-block">
              <h2 class="text-warning fw-bold">V\xEAtements</h2>
              <p class="text-success">Confort et s\xE9curit\xE9 pour votre passion.</p>
              <a routerLink="/boutique/vetements" class="btn btn-outline-warning">D\xE9couvrir</a>
            </div>
          </div>
          <div class="carousel-item">
            <img src="/assets/images/Outils_de_Miellerie.jpg" class="d-block w-100" alt="Outils de miellerie">
            <div class="carousel-caption d-none d-md-block">
              <h2 class="text-warning fw-bold">Outils de Miellerie</h2>
              <p class="text-success">Tout pour une r\xE9colte r\xE9ussie.</p>
              <a routerLink="/boutique/miellerie" class="btn btn-outline-warning">Voir Plus</a>
            </div>
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  </section>

  <!-- Featured Products -->
<section class="featured-products py-5">
  <div class="container">
    <h2 class="text-warning fw-bold text-center mb-4">Nos Produits Phares</h2>
    <div id="featuredProductCarousel" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <div class="row justify-content-center">
            <div class="col-12 col-md-3 mb-3">
              <div class="card h-100">
                <img style="width: auto; height: auto" src="/assets/products/ruche-a-tenons-dadant-10-cadres-plus.jpg" class="card-img-top" alt="ruche a tenons dadant 10 cadres plus">
                <div class="card-body">
                  <h5 class="card-title text-success">Ruche Standard</h5>
                  <p class="card-text">Ruche en bois durable, id\xE9ale pour d\xE9butants.</p>
                  <a routerLink="/boutique/ruches" class="btn btn-outline-warning">Acheter</a>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-3 mb-3 d-none d-md-block">
              <div class="card h-100">
                <img style="width: auto; height: auto" src="/assets/products/combinaison-blanche-avec-chapeau-et-voile.jpg" class="card-img-top" alt="Combinaison blanche avec chapeau et voile">
                <div class="card-body">
                  <h5 class="card-title text-success">Combinaison Apicole</h5>
                  <p class="card-text">Protection compl\xE8te pour apiculteurs.</p>
                  <a routerLink="/boutique/vetements" class="btn btn-outline-warning">Acheter</a>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-3 mb-3 d-none d-md-block">
              <div class="card h-100">
                <img style="width: auto; height: auto" src="/assets/products/xkit-miellerie-extracteur-beetools.jpg.pagespeed.ic.HZeahRP6SC.webp" class="card-img-top" alt="Extracteur de Miel">
                <div class="card-body">
                  <h5 class="card-title text-success">Extracteur de Miel</h5>
                  <p class="card-text">Outil essentiel pour une r\xE9colte facile.</p>
                  <a routerLink="/boutique/miellerie" class="btn btn-outline-warning">Acheter</a>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-3 mb-3 d-none d-md-block">
              <div class="card h-100">
                <img style="width: auto; height: auto" src="/assets/products/xpack-outils-pour-pose-de-cire-dadant.jpg.pagespeed.ic.Ce2B0S8iJE.webp" class="card-img-top" alt="Outils pour pose de cire">
                <div class="card-body">
                  <h5 class="card-title text-success">Outils pour pose de cire</h5>
                  <p class="card-text">Outils essentiel pour la construction des rayons de miel</p>
                  <a routerLink="/boutique/miellerie" class="btn btn-outline-warning">Acheter</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="carousel-item">
          <div class="row justify-content-center">
            <div class="col-12 col-md-3 mb-3">
              <div class="card h-100">
                <img style="width: auto; height: auto" src="/assets/products/xpack-outils-pour-pose-de-cire-dadant.jpg.pagespeed.ic.Ce2B0S8iJE.webp" class="card-img-top" alt="Outils pour pose de cire">
                <div class="card-body">
                  <h5 class="card-title text-success">Outils pour pose de cire</h5>
                  <p class="card-text">Outils essentiel pour la construction des rayons de miel</p>
                  <a routerLink="/boutique/miellerie" class="btn btn-outline-warning">Acheter</a>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-3 mb-3 d-none d-md-block">
              <div class="card h-100">
                <img style="width: auto; height: auto" src="/assets/products/ruche-a-tenons-dadant-10-cadres-plus.jpg" class="card-img-top" alt="ruche a tenons dadant 10 cadres plus">
                <div class="card-body">
                  <h5 class="card-title text-success">Ruche Standard</h5>
                  <p class="card-text">Ruche en bois durable, id\xE9ale pour d\xE9butants.</p>
                  <a routerLink="/boutique/ruches" class="btn btn-outline-warning">Acheter</a>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-3 mb-3 d-none d-md-block">
              <div class="card h-100">
                <img style="width: auto; height: auto" src="/assets/products/combinaison-blanche-avec-chapeau-et-voile.jpg" class="card-img-top" alt="Combinaison blanche avec chapeau et voile">
                <div class="card-body">
                  <h5 class="card-title text-success">Combinaison Apicole</h5>
                  <p class="card-text">Protection compl\xE8te pour apiculteurs.</p>
                  <a routerLink="/boutique/vetements" class="btn btn-outline-warning">Acheter</a>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-3 mb-3 d-none d-md-block">
              <div class="card h-100">
                <img style="width: auto; height: auto" src="/assets/products/xkit-miellerie-extracteur-beetools.jpg.pagespeed.ic.HZeahRP6SC.webp" class="card-img-top" alt="Extracteur de Miel">
                <div class="card-body">
                  <h5 class="card-title text-success">Extracteur de Miel</h5>
                  <p class="card-text">Outil essentiel pour une r\xE9colte facile.</p>
                  <a routerLink="/boutique/miellerie" class="btn btn-outline-warning">Acheter</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="carousel-item">
          <div class="row justify-content-center">
            <div class="col-12 col-md-3 mb-3">
              <div class="card h-100">
                <img style="width: auto; height: auto" src="/assets/products/xkit-miellerie-extracteur-beetools.jpg.pagespeed.ic.HZeahRP6SC.webp" class="card-img-top" alt="Extracteur de Miel">
                <div class="card-body">
                  <h5 class="card-title text-success">Extracteur de Miel</h5>
                  <p class="card-text">Outil essentiel pour une r\xE9colte facile.</p>
                  <a routerLink="/boutique/miellerie" class="btn btn-outline-warning">Acheter</a>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-3 mb-3 d-none d-md-block">
              <div class="card h-100">
                <img style="width: auto; height: auto" src="/assets/products/xpack-outils-pour-pose-de-cire-dadant.jpg.pagespeed.ic.Ce2B0S8iJE.webp" class="card-img-top" alt="Outils pour pose de cire">
                <div class="card-body">
                  <h5 class="card-title text-success">Outils pour pose de cire</h5>
                  <p class="card-text">Outils essentiel pour la construction des rayons de miel</p>
                  <a routerLink="/boutique/miellerie" class="btn btn-outline-warning">Acheter</a>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-3 mb-3 d-none d-md-block">
              <div class="card h-100">
                <img style="width: auto; height: auto" src="/assets/products/ruche-a-tenons-dadant-10-cadres-plus.jpg" class="card-img-top" alt="ruche a tenons dadant 10 cadres plus">
                <div class="card-body">
                  <h5 class="card-title text-success">Ruche Standard</h5>
                  <p class="card-text">Ruche en bois durable, id\xE9ale pour d\xE9butants.</p>
                  <a routerLink="/boutique/ruches" class="btn btn-outline-warning">Acheter</a>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-3 mb-3 d-none d-md-block">
              <div class="card h-100">
                <img style="width: auto; height: auto" src="/assets/products/combinaison-blanche-avec-chapeau-et-voile.jpg" class="card-img-top" alt="Combinaison blanche avec chapeau et voile">
                <div class="card-body">
                  <h5 class="card-title text-success">Combinaison Apicole</h5>
                  <p class="card-text">Protection compl\xE8te pour apiculteurs.</p>
                  <a routerLink="/boutique/vetements" class="btn btn-outline-warning">Acheter</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#featuredProductCarousel" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#featuredProductCarousel" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
    <div class="text-center mt-4">
      <a routerLink="/boutique" class="btn btn-warning text-white">Voir Tous les Produits</a>
    </div>
  </div>
</section>

  <!-- About Section -->
  <section class="about py-5 bg-white">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-md-6">
          <img src="/assets/images/beekeeping-clipart-beekeeper.png" class="img-fluid rounded" alt="Apiculture Durable">
        </div>
        <div class="col-md-6" style="background-color: #fff8e1; backdrop-filter: blur(15px); padding: 20px; border-radius: 10px;">
          <h2 class="text-warning fw-bold mb-3">\xC0 Propos de Nous</h2>
          <p class="text-success">Apiculture Galai est d\xE9di\xE9 \xE0 fournir du mat\xE9riel apicole de haute qualit\xE9 pour les apiculteurs d\xE9butants, amateurs et professionnels. Depuis notre cr\xE9ation, nous nous engageons pour une apiculture durable, respectueuse de l\u2019environnement et des abeilles.</p>
          <a routerLink="/a-propos" class="btn btn-outline-warning">En Savoir Plus</a>
        </div>
      </div>
    </div>
  </section>

  <!-- Blog Preview -->
  <section class="blog py-5" style="background-image: url('/assets/images/pngtree-vintage-inspired-abstract-texture-background-with-wooden-material-image_13869453.png'); ">
    <div class="container">
      <h2 class="text-warning fw-bold text-center mb-4">Nos Conseils Apicoles</h2>
      <div class="row">
        <div class="col-md-4 mb-4">
          <div class="card h-100">
            <img src="/assets/images/src756538dac3af8b889dc1740bb79c23c4_para1de415a1c80557d3d831911055dfe3d_dat1461867883.jpeg" class="card-img-top" alt="Conseils D\xE9butants">
            <div class="card-body">
              <h5 class="card-title text-success">D\xE9buter en Apiculture</h5>
              <p class="card-text">Conseils pratiques pour lancer votre premi\xE8re ruche.</p>
              <a href="/blog/debuter-apiculture" class="btn btn-outline-warning">Lire l'Article</a>
            </div>
          </div>
        </div>
        <div class="col-md-4 mb-4">
          <div class="card h-100">
            <img src="/assets/images/Apiculture.gif" class="card-img-top" alt="Entretien Ruches">
            <div class="card-body">
              <h5 class="card-title text-success">Entretien des Ruches</h5>
              <p class="card-text">Comment maintenir vos ruches en bonne sant\xE9.</p>
              <a href="/blog/entretien-ruches" class="btn btn-outline-warning">Lire l'Article</a>
            </div>
          </div>
        </div>
        <div class="col-md-4 mb-4">
          <div class="card h-100">
            <img src="/assets/images/22.jpg" class="card-img-top" alt="Bienfaits Miel">
            <div class="card-body">
              <h5 class="card-title text-success">Bienfaits du Miel</h5>
              <p class="card-text">D\xE9couvrez les vertus des produits de la ruche.</p>
              <a href="/blog/bienfaits-miel" class="btn btn-outline-warning">Lire l'Article</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Newsletter Signup -->
  <section class="newsletter py-5 bg-white">
    <div class="container text-center">
      <h2 class="text-warning fw-bold mb-3">Inscrivez-vous \xE0 Notre Newsletter</h2>
      <p class="text-success mb-4">Recevez nos derni\xE8res promotions, nouveaux produits et conseils apicoles.</p>
      <div class="input-group w-50 mx-auto">
        <input type="email" class="form-control" placeholder="Votre e-mail" aria-label="Email">
        <button class="btn btn-warning text-white" type="button">S'inscrire</button>
      </div>
    </div>
  </section>
</main>
`;
  }
});

// angular:jit:style:src/app/pages/home/home.scss
var home_default2;
var init_home2 = __esm({
  "angular:jit:style:src/app/pages/home/home.scss"() {
    home_default2 = '/* src/app/pages/home/home.scss */\nmain {\n  background-color: #fff8e1;\n  font-family: "Roboto", sans-serif;\n}\n.hero {\n  background-color: rgba(255, 247, 216, 0.4941176471);\n}\n.carousel img {\n  max-height: 500px;\n  object-fit: cover;\n}\n.carousel-caption h2 {\n  color: #d97706;\n  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);\n}\n.carousel-caption {\n  background: rgba(255, 248, 225, 0.8);\n  padding: 20px;\n  border-radius: 10px;\n  -webkit-backdrop-filter: blur(5px);\n  backdrop-filter: blur(5px);\n}\n.carousel-caption p {\n  color: #15803d;\n}\n.btn-outline-warning {\n  border-color: #d97706;\n  color: #d97706;\n}\n.btn-outline-warning:hover {\n  background-color: #d97706;\n  color: #fff8e1;\n}\n.btn-warning {\n  background-color: #d97706;\n  border-color: #d97706;\n}\n.btn-warning:hover {\n  background-color: #14532d;\n  border-color: #14532d;\n}\n.products h2,\n.about h2,\n.blog h2,\n.newsletter h2 {\n  color: #d97706;\n}\n.card-title {\n  color: #15803d;\n}\n.card-text {\n  color: #333;\n}\n.card-img-top {\n  height: 200px;\n  object-fit: cover;\n}\n.text-success {\n  color: #15803d !important;\n}\n.text-success:hover {\n  color: #14532d !important;\n}\n@media (max-width: 767px) {\n  .carousel-caption {\n    display: block !important;\n    background: rgba(255, 248, 225, 0.8);\n    padding: 10px;\n    border-radius: 5px;\n  }\n  .newsletter .input-group {\n    width: 100% !important;\n  }\n}\n#beeBox {\n  position: absolute;\n  width: 95vw;\n  height: 100vh;\n  overflow: hidden;\n  z-index: 0;\n  top: 100px;\n  left: 0;\n}\n#bee {\n  width: 125px;\n  box-sizing: border-box;\n  will-change: transform;\n  position: absolute;\n}\n#beeBox1 {\n  position: absolute;\n  width: 95vw;\n  height: 100vh;\n  overflow: hidden;\n  z-index: 0;\n  top: 100px;\n  right: 0;\n}\n#bee1 {\n  width: 125px;\n  box-sizing: border-box;\n  will-change: transform;\n  position: absolute;\n  right: 0;\n  top: 30vh;\n}\n.carousel-item {\n  padding: 0 15px;\n}\n@media (min-width: 768px) {\n  .carousel-item .row {\n    justify-content: center;\n  }\n  .carousel-item .col-md-4 {\n    flex: 0 0 33.333333%;\n    max-width: 33.333333%;\n  }\n}\n.carousel-control-next-icon,\n.carousel-control-prev-icon {\n  background-color: rgba(161, 159, 157, 0.3098039216);\n  border-radius: 50%;\n  margin: 10px;\n  padding: 10px !important;\n}\n/*# sourceMappingURL=home.css.map */\n';
  }
});

// src/app/pages/home/home.ts
var ScrollTrigger, Home;
var init_home3 = __esm({
  "src/app/pages/home/home.ts"() {
    "use strict";
    init_tslib_es6();
    init_home();
    init_home2();
    init_common();
    init_core();
    init_router();
    init_gsap();
    if (typeof window !== "undefined") {
      import("./chunk-BAAOHENC.js").then((module) => {
        ScrollTrigger = module.ScrollTrigger;
        gsapWithCSS.registerPlugin(ScrollTrigger);
      });
    }
    Home = class Home2 {
      activatedRoute;
      constructor(activatedRoute) {
        this.activatedRoute = activatedRoute;
      }
      ngAfterViewInit() {
        if (typeof window !== "undefined") {
          gsapWithCSS.registerPlugin(ScrollTrigger);
          this.moveBee();
          this.moveBee1();
        }
      }
      // Function to move the bee randomly across the screen
      moveBee() {
        const moveBeeRandomly = () => {
          gsapWithCSS.to("#bee", {
            x: "random(200, 100vw)",
            // Move bee randomly across the viewport width
            y: "random(5, 300vh)",
            // Move bee randomly across the viewport height
            duration: 4 + Math.random() * 4,
            // Random duration for variety
            ease: "sine.inOut",
            // Smooth transition
            onComplete: moveBeeRandomly
            // Continue the random movement after completion
          });
        };
        moveBeeRandomly();
        gsapWithCSS.to("#bee", {
          scrollTrigger: {
            trigger: "#beeBox",
            start: "top 10%",
            end: "bottom 90%",
            scrub: true,
            markers: false,
            // Remove markers in production
            onUpdate: (self) => {
              const speed = self.progress * 100;
              gsapWithCSS.to("#bee", {
                duration: speed
                // Scroll speed will affect duration
              });
            }
          }
        });
      }
      moveBee1() {
        const moveBeeRandomly = () => {
          gsapWithCSS.to("#bee1", {
            x: "random(80vh, -200)",
            // Move bee randomly across the viewport width
            y: "random(30vh, 300vh)",
            // Move bee randomly across the viewport height
            duration: 4 + Math.random() * 4,
            // Random duration for variety
            ease: "sine.inOut",
            // Smooth transition
            onComplete: moveBeeRandomly
            // Continue the random movement after completion
          });
        };
        moveBeeRandomly();
        gsapWithCSS.to("#bee1", {
          scrollTrigger: {
            trigger: "#beeBox1",
            start: "top 10%",
            end: "bottom 90%",
            scrub: true,
            markers: false,
            // Remove markers in production
            onUpdate: (self) => {
              const speed = self.progress * 100;
              gsapWithCSS.to("#bee1", {
                duration: speed
                // Scroll speed will affect duration
              });
            }
          }
        });
      }
      static ctorParameters = () => [
        { type: ActivatedRoute }
      ];
    };
    Home = __decorate([
      Component({
        selector: "app-home",
        imports: [CommonModule, RouterModule],
        template: home_default,
        styles: [home_default2]
      })
    ], Home);
  }
});

// src/app/pages/home/home.spec.ts
var require_home_spec = __commonJS({
  "src/app/pages/home/home.spec.ts"(exports) {
    init_testing();
    init_home3();
    describe("Home", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [Home]
        }).compileComponents();
        fixture = TestBed.createComponent(Home);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_home_spec();
//# sourceMappingURL=spec-app-pages-home-home.spec.js.map
