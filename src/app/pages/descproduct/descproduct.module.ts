import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DescproductPageRoutingModule } from './descproduct-routing.module';

import { DescproductPage } from './descproduct.page';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DescproductPageRoutingModule,

  ],
  declarations: [DescproductPage],
  schemas: [NO_ERRORS_SCHEMA]

})
export class DescproductPageModule {}
