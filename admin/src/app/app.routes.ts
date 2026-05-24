import { Routes } from '@angular/router';
import { AdminLayout } from './theme/layouts/admin-layout/admin-layout.component';
import { GuestLayoutComponent } from './theme/layouts/guest-layout/guest-layout.component';
import { authGuard } from './authGuard/auth-guard';

export const routes: Routes = [
  {
    path: '',
    component: AdminLayout,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard/default', pathMatch: 'full' },

      {
        path: 'dashboard/default',
        loadComponent: () =>
          import('./demo/dashboard/default/default.component').then(c => c.DefaultComponent)
      },
      {
        path: 'sample-page',
        loadComponent: () =>
          import('./demo/others/sample-page/sample-page.component').then(c => c.SamplePageComponent)
      },
      {
        path: 'order-management',
        loadComponent: () =>
          import('./demo/others/order-management/order-management').then(c => c.OrderManagement)
      },
      {
        path: 'product-management',
        loadComponent: () =>
          import('./demo/others/product-management/product-management').then(c => c.ProductManagement)
      },
      {
        path: 'customer-management',
        loadComponent: () =>
          import('./demo/others/customer-management/customer-management').then(c => c.CustomerManagement)
      },
      {
        path: 'user-management',
        loadComponent: () =>
          import('./demo/others/sample-page/sample-page.component').then(c => c.SamplePageComponent)
      },
      {
        path: 'sub-categorie-management',
        loadComponent: () =>
          import('./demo/others/sub-category-management/sub-category-management').then(c => c.SubCategoryManagement)
      },
      {
        path: 'categorie-management',
        loadComponent: () =>
          import('./demo/others/category-management/category-management').then(c => c.CategoryManagement)
      },
      {
        path: 'image-management',
        loadComponent: () =>
          import('./demo/others/images/images').then(c => c.Images)
      },
      {
        path: 'storie-management',
        loadComponent: () =>
          import('./demo/others/story-management/story-management').then(c => c.StoryManagement)
      },
      {
        path: 'xlsx-analysis',
        loadComponent: () =>
          import('./demo/others/csv/csv').then(c => c.CSV)
      }
    ]
  },
  {
    path: '',
    component: GuestLayoutComponent,
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./demo/pages/authentication/auth-login/auth-login.component').then(c => c.AuthLoginComponent)
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./demo/pages/authentication/auth-register/auth-register.component').then(c => c.AuthRegisterComponent)
      }
    ]
  }
];
