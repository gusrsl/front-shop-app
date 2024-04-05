import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DescproductPage } from './descproduct.page';

const routes: Routes = [
  {
    path: '',
    component: DescproductPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DescproductPageRoutingModule {}
