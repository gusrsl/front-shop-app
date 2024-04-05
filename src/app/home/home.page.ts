/* eslint-disable no-trailing-spaces */
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Swiper } from 'swiper';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, AfterViewInit {

  isLoggedIn: boolean | undefined;

  images = ['assets/slider1.png'];
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

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.isLoggedIn.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
    });
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
  });
}
}