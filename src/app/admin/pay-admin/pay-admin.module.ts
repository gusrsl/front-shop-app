import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PayAdminPageRoutingModule } from './pay-admin-routing.module';

import { PayAdminPage } from './pay-admin.page';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PayAdminPageRoutingModule,
    AgGridModule
  ],
  declarations: [PayAdminPage]
})
export class PayAdminPageModule {}
