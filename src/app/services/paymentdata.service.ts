import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartData = new BehaviorSubject(null);
  currentData = this.cartData.asObservable();

  constructor() { }

  updateCartData(data: any) {
    this.cartData.next(data);
  }
}
