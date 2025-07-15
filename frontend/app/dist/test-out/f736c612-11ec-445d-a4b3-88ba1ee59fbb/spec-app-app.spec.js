import {
  Footer,
  init_footer
} from "./chunk-FLSOPPO6.js";
import {
  Header,
  init_header
} from "./chunk-56KNPTV5.js";
import {
  RouterOutlet,
  init_router
} from "./chunk-NMIZS3UU.js";
import "./chunk-GTSZX46A.js";
import "./chunk-SWYOOYFC.js";
import "./chunk-QA5PPOO6.js";
import "./chunk-VYDYS35M.js";
import {
  Component,
  TestBed,
  __decorate,
  init_core,
  init_testing,
  init_tslib_es6,
  provideZonelessChangeDetection
} from "./chunk-MFMRIB3Q.js";
import {
  __async,
  __commonJS,
  __esm
} from "./chunk-TTULUY32.js";

// angular:jit:template:src/app/app.html
var app_default;
var init_app = __esm({
  "angular:jit:template:src/app/app.html"() {
    app_default = "<app-header></app-header>\n\n<router-outlet></router-outlet>\n\n<app-footer></app-footer>\n";
  }
});

// angular:jit:style:src/app/app.scss
var app_default2;
var init_app2 = __esm({
  "angular:jit:style:src/app/app.scss"() {
    app_default2 = '/* src/app/app.scss */\n@font-face {\n  font-family: "Roboto";\n  src: url(/assets/fonts/roboto-v30-latin-400.woff2) format("woff2");\n  font-weight: 400;\n  font-style: normal;\n  font-display: swap;\n}\n@font-face {\n  font-family: "Roboto";\n  src: url(/assets/fonts/roboto-v30-latin-700.woff2) format("woff2");\n  font-weight: 700;\n  font-style: normal;\n  font-display: swap;\n}\n/*# sourceMappingURL=app.css.map */\n';
  }
});

// src/app/app.ts
var App;
var init_app3 = __esm({
  "src/app/app.ts"() {
    "use strict";
    init_tslib_es6();
    init_app();
    init_app2();
    init_core();
    init_router();
    init_header();
    init_footer();
    App = class App2 {
      title = "Apiculture";
    };
    App = __decorate([
      Component({
        selector: "app-root",
        imports: [RouterOutlet, Header, Footer],
        template: app_default,
        styles: [app_default2]
      })
    ], App);
  }
});

// src/app/app.spec.ts
var require_app_spec = __commonJS({
  "src/app/app.spec.ts"(exports) {
    init_core();
    init_testing();
    init_app3();
    describe("App", () => {
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [App],
          providers: [provideZonelessChangeDetection()]
        }).compileComponents();
      }));
      it("should create the app", () => {
        const fixture = TestBed.createComponent(App);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
      });
      it("should render title", () => {
        const fixture = TestBed.createComponent(App);
        fixture.detectChanges();
        const compiled = fixture.nativeElement;
        expect(compiled.querySelector("h1")?.textContent).toContain("Hello, Apiculture");
      });
    });
  }
});
export default require_app_spec();
//# sourceMappingURL=spec-app-app.spec.js.map
