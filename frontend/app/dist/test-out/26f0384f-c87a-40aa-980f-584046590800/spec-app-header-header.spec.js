import {
  Header,
  init_header
} from "./chunk-56KNPTV5.js";
import "./chunk-NMIZS3UU.js";
import "./chunk-GTSZX46A.js";
import "./chunk-SWYOOYFC.js";
import "./chunk-QA5PPOO6.js";
import "./chunk-L4GPXURK.js";
import {
  TestBed,
  init_testing
} from "./chunk-MFMRIB3Q.js";
import {
  __async,
  __commonJS
} from "./chunk-TTULUY32.js";

// src/app/header/header.spec.ts
var require_header_spec = __commonJS({
  "src/app/header/header.spec.ts"(exports) {
    init_testing();
    init_header();
    describe("Header", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [Header]
        }).compileComponents();
        fixture = TestBed.createComponent(Header);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_header_spec();
//# sourceMappingURL=spec-app-header-header.spec.js.map
