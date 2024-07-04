import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedidosUserPageRoutingModule } from './pedidos-user-routing.module';

import { PedidosUserPage } from './pedidos-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidosUserPageRoutingModule
  ],
  declarations: [PedidosUserPage]
})
export class PedidosUserPageModule {}
