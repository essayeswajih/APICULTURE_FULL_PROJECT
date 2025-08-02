import { categories, productIds } from "./app.routes.server";
import { About } from "./pages/about/about";
import { Boutique } from "./pages/boutique/boutique";
import { CategoryManagement } from "./pages/category-management/category-management";
import { Contact } from "./pages/contact/contact";
import { Home } from "./pages/home/home";
import { Routes } from '@angular/router';
import { ProductManagement } from "./pages/product-management/product-management";
import { OrderManagement } from "./pages/order-management/order-management";
import { Dashboard } from "./pages/dashboard/dashboard";
import { authGuard } from "./authGuard/auth-guard";
import { SingleProduct } from "./pages/single-product/single-product";

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'boutique', component: Boutique },

  { path: 'a-propos', component: About },
  { path: 'contact', component: Contact },
  {
    path: 'panier',
    loadComponent: () => import('./pages/panier/panier').then(m => m.Panier)
  },
  { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.Dashboard), canActivate: [authGuard] },
  { path: 'categories', component: CategoryManagement, canActivate: [authGuard] },
  { path: 'products', component: ProductManagement, canActivate: [authGuard] },
  { path: 'orders', component: OrderManagement, canActivate: [authGuard] },
  { path: 'product/:id', component: SingleProduct,
    data: {
      prerender: {
        // Dynamically generate prerender params based on categories
        getPrerenderParams: () => productIds.map(productId => ({ productId }))
      }
    } 
  },
  {path: 'debuter-en-apiculture', loadComponent: () => import('./pages/blogs/debuteren-apiculture/debuteren-apiculture').then(m => m.DebuterenApiculture)},
  {path: 'entretien-des-ruches', loadComponent: () => import('./pages/blogs/entretiendes-ruches/entretiendes-ruches').then(m => m.EntretiendesRuches)},
  {path: 'bienfaits-miel', loadComponent: () => import('./pages/blogs/bienfaitsdu-miel/bienfaitsdu-miel').then(m => m.BienfaitsduMiel)},
  { path: 'images', loadComponent: () => import('./pages/images/images').then(m => m.Images),canActivate: [authGuard] },
  { path: 'client-order-view', loadComponent: () => import('./pages/client-order-view/client-order-view').then(m => m.ClientOrderView) },
  { path: 'login', loadComponent: () => import('./auth/login/login').then(m => m.Login) },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
