import {
  Api,
  init_api
} from "./chunk-JKPUH6UZ.js";
import "./chunk-VYDYS35M.js";
import {
  TestBed,
  init_testing
} from "./chunk-MFMRIB3Q.js";
import "./chunk-TTULUY32.js";

// src/app/services/api.spec.ts
init_testing();
init_api();
describe("Api", () => {
  let service;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Api);
  });
  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
//# sourceMappingURL=spec-app-services-api.spec.js.map
