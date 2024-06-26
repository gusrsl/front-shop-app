/* eslint-disable eol-last */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

// Importa tus componentes aquí
import { MenuComponent } from './menu/menu.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { ButtonEditRendererComponent } from './render/button-edit.component';
import { ButtonStateRendererComponent } from './render/button-state.component';

@NgModule({
  declarations: [
    MenuComponent,
    HeaderComponent,
    FooterComponent,
    ButtonEditRendererComponent,
    ButtonStateRendererComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,

  ],
  exports: [
    MenuComponent,
    HeaderComponent,
    FooterComponent,
    ButtonEditRendererComponent,
    ButtonStateRendererComponent
  ]
})
export class ComponentsModule { }
