import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PayAdminPage } from './pay-admin.page';

const routes: Routes = [
  {
    path: '',
    component: PayAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PayAdminPageRoutingModule {}
