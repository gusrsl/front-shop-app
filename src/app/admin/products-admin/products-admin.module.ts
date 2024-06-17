import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductsAdminPageRoutingModule } from './products-admin-routing.module';

import { ProductsAdminPage } from './products-admin.page';
import { AgGridModule, ICellRendererAngularComp } from 'ag-grid-angular';
import { ButtonEditRendererComponent } from '../../components/render/button-edit.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductsAdminPageRoutingModule,
    AgGridModule,
    CommonModule,
  ],
  declarations: [ProductsAdminPage]
})
export class ProductsAdminPageModule {}
