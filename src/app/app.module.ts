import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { HomePageModule } from './home/home.module';
import { AuthComponent } from './auth-component/auth-component.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DescproductPageModule } from './pages/descproduct/descproduct.module';
import { PerfilPageModule } from './pages/perfil/perfil.module';
import { ProductosPageModule } from './pages/productos/productos.module';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage-angular';
import { AuthModule } from './auth-component/auth.module';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),  // añade esta línea
    // Agrega el ComponentsModule aquí
    ComponentsModule,
    HomePageModule,
    ReactiveFormsModule,
    DescproductPageModule, // Asegúrate de que ReactiveFormsModule esté en la lista de imports
    PerfilPageModule,
    ProductosPageModule,
    AuthModule, // Añade AuthModule aquí
    CardModule,
    ButtonModule,
    CarouselModule,
    AgGridModule // Añade AgGridModule aquí
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
