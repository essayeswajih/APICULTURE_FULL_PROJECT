import {
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

// angular:jit:template:src/app/pages/dashboard/dashboard.html
var dashboard_default;
var init_dashboard = __esm({
  "angular:jit:template:src/app/pages/dashboard/dashboard.html"() {
    dashboard_default = '<div class="container-fluid hero py-5">\n  <h2 class="text-center mb-5">Webmaster Dashboard</h2>\n\n  <div class="row justify-content-center">\n    <!-- Manage Categories -->\n    <div class="col-md-4 mb-4">\n      <div class="card shadow-lg">\n        <div class="card-body">\n          <h5 class="card-title">Manage Categories</h5>\n          <p class="card-text">Add, update, or delete product categories.</p>\n          <a routerLink="/categories" class="btn btn-outline-warning">Go to Categories</a>\n        </div>\n      </div>\n    </div>\n\n    <!-- Manage Products -->\n    <div class="col-md-4 mb-4">\n      <div class="card shadow-lg">\n        <div class="card-body">\n          <h5 class="card-title">Manage Products</h5>\n          <p class="card-text">Add, update, or delete products.</p>\n          <a routerLink="/products" class="btn btn-outline-warning">Go to Products</a>\n        </div>\n      </div>\n    </div>\n\n    <!-- Manage Orders -->\n    <div class="col-md-4 mb-4">\n      <div class="card shadow-lg">\n        <div class="card-body">\n          <h5 class="card-title">Manage Orders</h5>\n          <p class="card-text">View and update order statuses.</p>\n          <a routerLink="/orders" class="btn btn-outline-warning">Go to Orders</a>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n';
  }
});

// angular:jit:style:src/app/pages/dashboard/dashboard.scss
var dashboard_default2;
var init_dashboard2 = __esm({
  "angular:jit:style:src/app/pages/dashboard/dashboard.scss"() {
    dashboard_default2 = '/* src/app/pages/dashboard/dashboard.scss */\nbody {\n  background-color: #fff8e1;\n  font-family: "Roboto", sans-serif;\n  margin: 0;\n  padding: 0;\n}\n.hero {\n  background-color: rgba(255, 247, 216, 0.4941176471);\n  padding: 60px 0;\n  position: relative;\n  z-index: 1;\n  min-height: 60vh !important;\n}\nh2 {\n  color: #d97706;\n  font-size: 2.5rem;\n  font-weight: 700;\n  text-transform: uppercase;\n}\n.card-title {\n  color: #15803d;\n  font-size: 1.25rem;\n  font-weight: 600;\n}\n.card-text {\n  color: #333;\n}\n.card-img-top {\n  height: 200px;\n  object-fit: cover;\n}\n.card-body {\n  padding: 2rem;\n}\n.card {\n  border: none;\n  border-radius: 10px;\n  background-color: #ffffff;\n  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);\n  transition: transform 0.3s ease, box-shadow 0.3s ease;\n}\n.card:hover {\n  transform: translateY(-10px);\n  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);\n}\n.text-success {\n  color: #15803d !important;\n}\n.text-success:hover {\n  color: #14532d !important;\n}\n.btn-outline-warning {\n  border-color: #d97706;\n  color: #d97706;\n  transition: all 0.3s ease;\n}\n.btn-outline-warning:hover {\n  background-color: #d97706;\n  color: #fff8e1;\n}\n.btn-warning {\n  background-color: #d97706;\n  border-color: #d97706;\n  transition: all 0.3s ease;\n}\n.btn-warning:hover {\n  background-color: #14532d;\n  border-color: #14532d;\n  color: #fff8e1;\n}\n#beeBox,\n#beeBox1 {\n  position: absolute;\n  width: 100vw;\n  height: 100vh;\n  top: 100px;\n  z-index: 0;\n  pointer-events: none;\n}\n#beeBox {\n  left: 0;\n}\n#beeBox1 {\n  right: 0;\n}\n#bee,\n#bee1 {\n  width: 125px;\n  box-sizing: border-box;\n  will-change: transform;\n  position: absolute;\n  pointer-events: none;\n}\n#bee {\n  top: 20vh;\n  animation: beeAnimation 10s ease-in-out infinite;\n}\n#bee1 {\n  right: 0;\n  top: 30vh;\n  animation: beeAnimation 12s ease-in-out infinite reverse;\n}\n@keyframes beeAnimation {\n  0% {\n    transform: translateX(0) translateY(0);\n  }\n  50% {\n    transform: translateX(80vw) translateY(50vh);\n  }\n  100% {\n    transform: translateX(0) translateY(0);\n  }\n}\n@media (max-width: 767px) {\n  h2 {\n    font-size: 2rem;\n  }\n  .card {\n    margin-bottom: 15px;\n  }\n  .card-body {\n    padding: 1rem;\n  }\n  .hero {\n    padding: 40px 0;\n  }\n}\n/*# sourceMappingURL=dashboard.css.map */\n';
  }
});

// src/app/pages/dashboard/dashboard.ts
var Dashboard;
var init_dashboard3 = __esm({
  "src/app/pages/dashboard/dashboard.ts"() {
    "use strict";
    init_tslib_es6();
    init_dashboard();
    init_dashboard2();
    init_common();
    init_core();
    init_router();
    init_gsap();
    Dashboard = class Dashboard2 {
      platformId;
      constructor(platformId) {
        this.platformId = platformId;
      }
      ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
          setTimeout(() => {
            gsapWithCSS.to("#bee", {
              x: "80vw",
              y: "50vh",
              duration: 10,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut"
            });
            gsapWithCSS.to("#bee1", {
              x: "-80vw",
              y: "20vh",
              duration: 12,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut"
            });
          }, 0);
        }
      }
      static ctorParameters = () => [
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID] }] }
      ];
    };
    Dashboard = __decorate([
      Component({
        selector: "app-dashboard",
        imports: [CommonModule, RouterModule],
        template: dashboard_default,
        styles: [dashboard_default2]
      })
    ], Dashboard);
  }
});

// src/app/pages/dashboard/dashboard.spec.ts
var require_dashboard_spec = __commonJS({
  "src/app/pages/dashboard/dashboard.spec.ts"(exports) {
    init_testing();
    init_dashboard3();
    describe("Dashboard", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [Dashboard]
        }).compileComponents();
        fixture = TestBed.createComponent(Dashboard);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_dashboard_spec();
//# sourceMappingURL=spec-app-pages-dashboard-dashboard.spec.js.map
