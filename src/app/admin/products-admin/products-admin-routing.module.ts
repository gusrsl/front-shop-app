import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsAdminPage } from './products-admin.page';

const routes: Routes = [
  {
    path: '',
    component: ProductsAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsAdminPageRoutingModule {}
