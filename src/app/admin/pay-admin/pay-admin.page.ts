import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/paymentdata.service';

@Component({
  selector: 'app-pay-admin',
  templateUrl: './pay-admin.page.html',
  styleUrls: ['./pay-admin.page.scss'],
})
export class PayAdminPage implements OnInit {
  paymentIntents: any;
  customers: any;
  charges: any;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartService.getAllPaymentIntents().subscribe(data => {
      this.paymentIntents = data;
      console.log('paymentIntents', this.paymentIntents.data);
    });

    this.cartService.getAllCharges().subscribe(data => {
      this.charges = data;
      console.log('charges', this.charges.data)
    });
  }
}
