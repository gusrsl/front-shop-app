import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrudProductsAdminPageRoutingModule } from './crud-products-admin-routing.module';

import { CrudProductsAdminPage } from './crud-products-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrudProductsAdminPageRoutingModule
  ],
  declarations: [CrudProductsAdminPage]
})
export class CrudProductsAdminPageModule {}
