import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'productos',
    loadChildren: () => import('./pages/productos/productos.module').then( m => m.ProductosPageModule)
  },
  {
    path: 'descproduct',
    loadChildren: () => import('./pages/descproduct/descproduct.module').then( m => m.DescproductPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./auth-component/auth.module').then( m => m.AuthModule)
  },
  {
    path: 'cartshop',
    loadChildren: () => import('./pages/cartshop/cartshop.module').then( m => m.CartshopPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./admin/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./admin/users/users.module').then( m => m.UsersPageModule)
  },
  {
    path: 'payment',
    loadChildren: () => import('./pages/payment/payment.module').then( m => m.PaymentPageModule)
  },  {
    path: 'pay-admin',
    loadChildren: () => import('./admin/pay-admin/pay-admin.module').then( m => m.PayAdminPageModule)
  },
  {
    path: 'products-admin',
    loadChildren: () => import('./admin/products-admin/products-admin.module').then( m => m.ProductsAdminPageModule)
  },
  {
    path: 'crud-products-admin',
    loadChildren: () => import('./admin/crud-products-admin/crud-products-admin.module').then( m => m.CrudProductsAdminPageModule)
  }






];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
