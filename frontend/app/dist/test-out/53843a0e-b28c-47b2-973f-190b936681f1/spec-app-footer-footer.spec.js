import {
  Footer,
  init_footer
} from "./chunk-FLSOPPO6.js";
import "./chunk-NMIZS3UU.js";
import "./chunk-GTSZX46A.js";
import "./chunk-SWYOOYFC.js";
import "./chunk-QA5PPOO6.js";
import "./chunk-VYDYS35M.js";
import {
  TestBed,
  init_testing
} from "./chunk-MFMRIB3Q.js";
import {
  __async,
  __commonJS
} from "./chunk-TTULUY32.js";

// src/app/footer/footer.spec.ts
var require_footer_spec = __commonJS({
  "src/app/footer/footer.spec.ts"(exports) {
    init_testing();
    init_footer();
    describe("Footer", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [Footer]
        }).compileComponents();
        fixture = TestBed.createComponent(Footer);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_footer_spec();
//# sourceMappingURL=spec-app-footer-footer.spec.js.map
