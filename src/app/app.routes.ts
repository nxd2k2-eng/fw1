import { Routes } from '@angular/router';
import { AdminLayout } from './layouts/admin-layout/admin-layout';
import { ClientLayout } from './layouts/client-layout/client-layout';

export const routes: Routes = [
  {
    path: '',
    component: ClientLayout,
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/client/home/home').then((m) => m.Home),
      },
      {
        path: 'contact',
        loadComponent: () => import('./pages/client/contact/contact').then((m) => m.Contact),
      },
      {
        path: 'products',
        loadComponent: () => import('./pages/client/products/products').then((m) => m.Products),
      },
      {
        path: 'products/:id',
        loadComponent: () =>
          import('./pages/client/product-detail/product-detail').then((m) => m.ProductDetail),
      },
      {
        path: 'order-create',
        loadComponent: () =>
          import('./pages/client/order-create/order-create').then((m) => m.OrderCreate),
      },
      {
        path: 'about',
        loadComponent: () => import('./pages/client/about/about').then((m) => m.About),
      },
    ],
  },
  {
    path: 'admin',
    component: AdminLayout,
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/admin/dashboard/dashboard').then((m) => m.Dashboard),
      },
      {
        path: 'category',
        loadComponent: () => import('./pages/admin/category/category').then((m) => m.Category),
      },
    ],
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
