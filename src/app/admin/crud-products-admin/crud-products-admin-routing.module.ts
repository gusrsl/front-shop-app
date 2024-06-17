import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrudProductsAdminPage } from './crud-products-admin.page';

const routes: Routes = [
  {
    path: '',
    component: CrudProductsAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrudProductsAdminPageRoutingModule {}
