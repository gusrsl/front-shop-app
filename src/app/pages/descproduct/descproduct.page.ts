import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/interfaces/product.model';

@Component({
  selector: 'app-descproduct',
  templateUrl: './descproduct.page.html',
  styleUrls: ['./descproduct.page.scss'],
})
export class DescproductPage implements OnInit {
  product: Product | undefined;

  constructor(private router: Router) { }

ngOnInit() {
  const navigation = this.router.getCurrentNavigation();
  if (navigation) {
    const state = navigation.extras.state as {product: Product};
    this.product = state.product;
    console.log(this.product);
  } else {
    // Manejar el caso cuando navigation es null
  }
}

}
