import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CartshopPageRoutingModule } from './cartshop-routing.module';

import { CartshopPage } from './cartshop.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CartshopPageRoutingModule
  ],
  declarations: [CartshopPage]
})
export class CartshopPageModule {}
