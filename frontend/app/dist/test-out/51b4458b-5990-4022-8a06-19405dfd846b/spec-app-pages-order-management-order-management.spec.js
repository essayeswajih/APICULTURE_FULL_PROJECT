import {
  Api,
  OrderStatus,
  init_api
} from "./chunk-IF6HEKAW.js";
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

// angular:jit:template:src/app/pages/order-management/order-management.html
var order_management_default;
var init_order_management = __esm({
  "angular:jit:template:src/app/pages/order-management/order-management.html"() {
    order_management_default = `<div class="container py-5">
  <h2>Order Management</h2>
  <div class="row">
    @for (order of orders; track order.id) {
      <div class="col-md-6">
        <div class="card mb-3">
          <div class="card-body">
            <h5 class="card-title">Order #{{ order.id }}</h5>
            <p class="card-text">User ID: {{ order.user_id }}</p>
            <p class="card-text">Total: \${{ order.total_amount | number:'1.2-2' }}</p>
            <p class="card-text">Status: {{ order.status | titlecase }}</p>
            <p class="card-text">Created: {{ order.created_at | date:'short' }}</p>
            <div class="mb-3">
              <label for="status-{{ order.id }}" class="form-label">Update Status</label>
              <select class="form-control" id="status-{{ order.id }}" name="status" [(ngModel)]="order.status" (ngModelChange)="updateOrderStatus(order.id, $event)">
                @for (status of orderStatuses; track status) {
                  <option [value]="status">{{ status | titlecase }}</option>
                }
              </select>
            </div>
            <button class="btn btn-danger" (click)="deleteOrder(order.id)">Delete</button>
          </div>
        </div>
      </div>
    }
  </div>
</div>`;
  }
});

// angular:jit:style:src/app/pages/order-management/order-management.scss
var order_management_default2;
var init_order_management2 = __esm({
  "angular:jit:style:src/app/pages/order-management/order-management.scss"() {
    order_management_default2 = '/* src/app/pages/order-management/order-management.scss */\nbody {\n  background-color: #fff8e1;\n  font-family: "Roboto", sans-serif;\n}\n.hero {\n  background-color: rgba(255, 247, 216, 0.4941176471);\n}\nh2 {\n  color: #d97706;\n}\n.card-title {\n  color: #15803d;\n}\n.card-text {\n  color: #333;\n}\n.card-img-top {\n  height: 200px;\n  object-fit: cover;\n}\n.text-success {\n  color: #15803d !important;\n}\n.text-success:hover {\n  color: #14532d !important;\n}\n.btn-outline-warning {\n  border-color: #d97706;\n  color: #d97706;\n}\n.btn-outline-warning:hover {\n  background-color: #d97706;\n  color: #fff8e1;\n}\n.btn-warning {\n  background-color: #d97706;\n  border-color: #d97706;\n}\n.btn-warning:hover {\n  background-color: #14532d;\n  border-color: #14532d;\n  color: #fff8e1;\n}\n#beeBox,\n#beeBox1 {\n  position: absolute;\n  width: 95vw;\n  height: 100vh;\n  overflow: hidden;\n  z-index: 0;\n  top: 100px;\n}\n#beeBox {\n  left: 0;\n}\n#beeBox1 {\n  right: 0;\n}\n#bee,\n#bee1 {\n  width: 125px;\n  box-sizing: border-box;\n  will-change: transform;\n  position: absolute;\n}\n#bee1 {\n  right: 0;\n  top: 30vh;\n}\n/*# sourceMappingURL=order-management.css.map */\n';
  }
});

// src/app/pages/order-management/order-management.ts
var OrderManagement;
var init_order_management3 = __esm({
  "src/app/pages/order-management/order-management.ts"() {
    "use strict";
    init_tslib_es6();
    init_order_management();
    init_order_management2();
    init_core();
    init_api();
    init_forms();
    init_gsap();
    init_common();
    OrderManagement = class OrderManagement2 {
      apiService;
      platformId;
      orders = [];
      orderStatuses = Object.values(OrderStatus);
      constructor(apiService, platformId) {
        this.apiService = apiService;
        this.platformId = platformId;
      }
      ngOnInit() {
        this.loadOrders();
      }
      updateOrderStatus(id, status) {
        this.apiService.updateOrderStatus(id, status).subscribe(() => {
          this.loadOrders();
        });
      }
      deleteOrder(id) {
        this.apiService.deleteOrder(id).subscribe(() => this.loadOrders());
      }
      loadOrders() {
        this.apiService.getOrders().subscribe((orders) => {
          this.orders = orders;
          if (isPlatformBrowser(this.platformId)) {
            setTimeout(() => {
              const cards = document.querySelectorAll(".card");
              if (cards.length > 0) {
                gsapWithCSS.from(cards, { opacity: 0, y: 20, duration: 0.5, stagger: 0.2 });
              }
            }, 0);
          }
        });
      }
      static ctorParameters = () => [
        { type: Api },
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID] }] }
      ];
    };
    OrderManagement = __decorate([
      Component({
        selector: "app-order-management",
        imports: [FormsModule, CommonModule],
        template: order_management_default,
        styles: [order_management_default2]
      })
    ], OrderManagement);
  }
});

// src/app/pages/order-management/order-management.spec.ts
var require_order_management_spec = __commonJS({
  "src/app/pages/order-management/order-management.spec.ts"(exports) {
    init_testing();
    init_order_management3();
    describe("OrderManagement", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [OrderManagement]
        }).compileComponents();
        fixture = TestBed.createComponent(OrderManagement);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_order_management_spec();
//# sourceMappingURL=spec-app-pages-order-management-order-management.spec.js.map
