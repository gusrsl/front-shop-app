import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedidosrepPage } from './pedidosrep.page';

const routes: Routes = [
  {
    path: '',
    component: PedidosrepPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidosrepPageRoutingModule {}
