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
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.isLoggedIn.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
    });
  }

  ngAfterViewInit() {
    const swiper = new Swiper('.swiper-container', {
      // Default parameters
      slidesPerView: 1,
      spaceBetween: 10,

      // Responsive breakpoints
      breakpoints: {
        // when window width is >= 320px
        320: {
          slidesPerView: 1,
          spaceBetween: 20
        },
        // when window width is >= 480px
        480: {
          slidesPerView: 2,
          spaceBetween: 30
        },
        // when window width is >= 640px
        640: {
          slidesPerView: 3,
          spaceBetween: 40
        }
      }
    });
  }
}