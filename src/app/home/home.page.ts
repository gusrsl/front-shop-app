/* eslint-disable no-trailing-spaces */
import { Component, OnInit, AfterViewInit, TemplateRef } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Swiper } from 'swiper';
import { NgIfContext } from '@angular/common';
import { UserDataService } from '../services/userdata.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, AfterViewInit {

  isLoggedIn: boolean | undefined;

  newReleases = [
    {
      brand: 'Nike',
      name: 'Air Max 2022',
      image: 'https://f.fcdn.app/imgs/3f89c3/www.globalsports.com.uy/gls/d7a9/original/catalogo/NKDM9538-1363-1/1500-1500/nike-air-max-systm-white.jpg',
      description: 'El último modelo de Air Max, perfecto para correr y caminar.'
    },
    {
      brand: 'Adidas',
      name: 'Ultra Boost 2022',
      image: 'https://assets.adidas.com/images/w_1880,f_auto,q_auto/a0b40ded7f464b9b8b44aef900bbae6a_9366/HP9930_01_standard.jpg',
      description: 'El nuevo Ultra Boost ofrece comodidad y estilo en un solo paquete.'
    },
    {
      brand: 'Puma',
      name: 'Ignite 2022',
      image: 'https://golftime.es/16827-large_default/zapatos-puma-ignite-lady-junior-blanco-2022.jpg',
      description: 'El Ignite 2022 es el zapato perfecto para cualquier actividad deportiva.'
    },
    {
      brand: 'Nike',
      name: 'Air Max 2022',
      image: 'https://f.fcdn.app/imgs/3f89c3/www.globalsports.com.uy/gls/d7a9/original/catalogo/NKDM9538-1363-1/1500-1500/nike-air-max-systm-white.jpg',
      description: 'El último modelo de Air Max, perfecto para correr y caminar.'
    }
  ];

  images = ['assets/slider1.png', 'assets/slider2.jpg'];
  products = [
    {image: 'product1.png', name: 'Product 1', price: 100, inventoryStatus: 'In Stock'},
    {image: 'product2.png', name: 'Product 2', price: 200, inventoryStatus: 'Low Stock'},
    {image: 'product3.png', name: 'Product 3', price: 300, inventoryStatus: 'Out of Stock'}
  ];
  responsiveOptions = [
    {
      breakpoint: '1199px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '991px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '767px',
      numVisible: 1,
      numScroll: 1
    }
  ];
    notLoggedIn: any
  userData: any;

  constructor(private authService: AuthService, private userDataService: UserDataService) { }

  ngOnInit() {
    this.authService.isLoggedIn.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
    });

      // Obtiene la data del usuario
  this.userData = this.userDataService.getUserData();

  // Ahora puedes usar userData
  console.log(this.userData);
  }

getSeverity(status: string): "success" | "warning" | "danger" {
  switch (status) {
    case 'INSTOCK':
      return 'success';
    case 'LOWSTOCK':
      return 'warning';
    case 'OUTOFSTOCK':
      return 'danger';
    default:
      return 'danger'; // valor por defecto
  }
}

ngAfterViewInit() {
    new Swiper('.swiper-container', {
      direction: 'horizontal',
      loop: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      scrollbar: {
        el: '.swiper-scrollbar',
      },
      pagination: {  // Agrega esta opción
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
      },
    });
  }
}
