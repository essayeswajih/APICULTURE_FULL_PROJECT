import {
  HttpClient,
  init_http
} from "./chunk-L4GPXURK.js";
import {
  Injectable,
  __decorate,
  catchError,
  init_core,
  init_esm,
  init_operators,
  init_tslib_es6,
  throwError
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
    init_esm();
    init_operators();
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
      // Helper to handle API errors
      handleError(error) {
        let errorMessage = "An unknown error occurred!";
        if (error.error instanceof ErrorEvent) {
          errorMessage = `Error: ${error.error.message}`;
        } else {
          errorMessage = `Error ${error.status}: ${error.message}`;
        }
        return throwError(() => new Error(errorMessage));
      }
      // Categories API
      getCategories() {
        return this.http.get(`${this.apiUrl}/categories`).pipe(catchError(this.handleError));
      }
      addCategory(category) {
        return this.http.post(`${this.apiUrl}/categories`, category).pipe(catchError(this.handleError));
      }
      updateCategory(id, category) {
        return this.http.put(`${this.apiUrl}/categories/${id}`, category).pipe(catchError(this.handleError));
      }
      deleteCategory(id) {
        return this.http.delete(`${this.apiUrl}/categories/${id}`).pipe(catchError(this.handleError));
      }
      // Products API
      getProducts() {
        return this.http.get(`${this.apiUrl}/products`).pipe(catchError(this.handleError));
      }
      addProduct(product) {
        return this.http.post(`${this.apiUrl}/products`, product).pipe(catchError(this.handleError));
      }
      updateProduct(id, product) {
        return this.http.put(`${this.apiUrl}/products/${id}`, product).pipe(catchError(this.handleError));
      }
      deleteProduct(id) {
        return this.http.delete(`${this.apiUrl}/products/${id}`).pipe(catchError(this.handleError));
      }
      // Orders API
      getOrders() {
        return this.http.get(`${this.apiUrl}/orders`).pipe(catchError(this.handleError));
      }
      updateOrderStatus(id, status) {
        return this.http.put(`${this.apiUrl}/orders/${id}`, { status }).pipe(catchError(this.handleError));
      }
      createOrder(order) {
        return this.http.post(`${this.apiUrl}/orders`, order).pipe(catchError(this.handleError));
      }
      deleteOrder(id) {
        return this.http.delete(`${this.apiUrl}/orders/${id}`).pipe(catchError(this.handleError));
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
//# sourceMappingURL=chunk-IF6HEKAW.js.map
