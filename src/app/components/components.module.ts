/* eslint-disable eol-last */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

// Importa tus componentes aquí
import { MenuComponent } from './menu/menu.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    // Declara tus componentes aquí
    MenuComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,

  ],
  exports: [
    // Exporta tus componentes aquí
    MenuComponent,
    HeaderComponent,
  ]
})
export class ComponentsModule { }
