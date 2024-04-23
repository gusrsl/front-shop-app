import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CartshopPage } from './cartshop.page';

const routes: Routes = [
  {
    path: '',
    component: CartshopPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartshopPageRoutingModule {}
