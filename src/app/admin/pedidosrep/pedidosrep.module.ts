import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedidosrepPageRoutingModule } from './pedidosrep-routing.module';

import { PedidosrepPage } from './pedidosrep.page';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidosrepPageRoutingModule,
    AgGridModule
  ],
  declarations: [PedidosrepPage]
})
export class PedidosrepPageModule {}
