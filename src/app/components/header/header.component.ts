/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigateToCartShop() {
    // Aquí puedes realizar cualquier lógica adicional que necesites
    // antes de navegar a la página de la tienda de carritos.

    this.router.navigate(['/cartshop']);
  }

}