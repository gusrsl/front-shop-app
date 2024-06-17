import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartData = new BehaviorSubject(null);
  currentData = this.cartData.asObservable();
  API_URL = environment.API_URL;

  constructor(private http: HttpClient) { }

  updateCartData(data: any) {
    this.cartData.next(data);
  }

  getPaymentIntent(id: string) {
    return this.http.get(`${this.API_URL}payments/get-payment-intent/${id}`);
  }

  getAllPaymentIntents() {
    return this.http.get(`${this.API_URL}payments/get-all-payment-intents`);
  }

  getAllCustomers() {
    return this.http.get(`${this.API_URL}payments/get-all-customers`);
  }

  getAllCharges() {
    return this.http.get(`${this.API_URL}payments/get-all-charges`);
  }
}
