import {
  HttpClient,
  init_http
} from "./chunk-VYDYS35M.js";
import {
  Injectable,
  __decorate,
  init_core,
  init_tslib_es6
} from "./chunk-MFMRIB3Q.js";
import {
  __esm
} from "./chunk-TTULUY32.js";

// src/environments/environments.ts
var environment;
var init_environments = __esm({
  "src/environments/environments.ts"() {
    "use strict";
    environment = {
      production: false,
      // Set to `true` for production environment
      apiUrl: "http://localhost:8000"
      // Your FastAPI backend URL during development
    };
  }
});

// src/app/services/api.ts
var OrderStatus, Api;
var init_api = __esm({
  "src/app/services/api.ts"() {
    "use strict";
    init_tslib_es6();
    init_core();
    init_http();
    init_environments();
    (function(OrderStatus2) {
      OrderStatus2["PENDING"] = "pending";
      OrderStatus2["PROCESSING"] = "processing";
      OrderStatus2["SHIPPED"] = "shipped";
      OrderStatus2["DELIVERED"] = "delivered";
    })(OrderStatus || (OrderStatus = {}));
    Api = class Api2 {
      http;
      apiUrl = environment.apiUrl;
      // Assuming you have the FastAPI URL here
      constructor(http) {
        this.http = http;
      }
      // Categories API
      getCategories() {
        return this.http.get(`${this.apiUrl}/categories`);
      }
      addCategory(category) {
        return this.http.post(`${this.apiUrl}/categories`, category);
      }
      updateCategory(id, category) {
        return this.http.put(`${this.apiUrl}/categories/${id}`, category);
      }
      deleteCategory(id) {
        return this.http.delete(`${this.apiUrl}/categories/${id}`);
      }
      // Products API
      getProducts() {
        return this.http.get(`${this.apiUrl}/products`);
      }
      addProduct(product) {
        return this.http.post(`${this.apiUrl}/products`, product);
      }
      updateProduct(id, product) {
        return this.http.put(`${this.apiUrl}/products/${id}`, product);
      }
      deleteProduct(id) {
        return this.http.delete(`${this.apiUrl}/products/${id}`);
      }
      // Orders API
      getOrders() {
        return this.http.get(`${this.apiUrl}/orders`);
      }
      updateOrderStatus(id, status) {
        return this.http.put(`${this.apiUrl}/orders/${id}`, { status });
      }
      createOrder(order) {
        return this.http.post(`${this.apiUrl}/orders`, order);
      }
      deleteOrder(id) {
        return this.http.delete(`${this.apiUrl}/orders/${id}`);
      }
      static ctorParameters = () => [
        { type: HttpClient }
      ];
    };
    Api = __decorate([
      Injectable({
        providedIn: "root"
      })
    ], Api);
  }
});

export {
  OrderStatus,
  Api,
  init_api
};
//# sourceMappingURL=chunk-JKPUH6UZ.js.map
