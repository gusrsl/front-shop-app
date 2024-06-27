import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/interfaces/product.model';
import { Storage } from '@ionic/storage-angular';
import { Platform } from '@ionic/angular';
import { ProductService } from 'src/app/services/cartproduct.service';
import { CartService } from 'src/app/services/paymentdata.service';

interface CartItem {
  product: Product;
  quantity: number;
}

@Component({
  selector: 'app-cartshop',
  templateUrl: './cartshop.page.html',
  styleUrls: ['./cartshop.page.scss'],
})
export class CartshopPage implements OnInit, OnDestroy {
  product: Product | undefined;
  private storage: Storage | null = null;
  cart: CartItem[] = [];

  discount = 0; 
  shippingCharge = 0;

  constructor(
    private router: Router, 
    private storageIonic: Storage, 
    private platform: Platform,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnDestroy() {
    console.log('YourComponent destroyed');
    const navigation = this.router.getCurrentNavigation();
    if (navigation) {
      navigation.extras.state = undefined;
    }
  }

  async ngOnInit() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cart = JSON.parse(storedCart);
    }
    console.log('Initial cart:', this.cart);
    await this.addProductToCart();
  }

  async addProductToCart() {
    this.productService.currentProduct.subscribe(product => this.product = product ?? undefined);

    if (!this.product) {
      console.log('No product to add to cart');
      return;
    }

    console.log('Product:', this.product);

    const existingItem = this.cart.find(item => item.product.uu_id === this.product?.uu_id);
    if (existingItem) {
      console.log('Product is already in the cart');
      return;
    }

    let cartItem: CartItem = { product: this.product!, quantity: 1 }; 
    this.cart.push(cartItem);
    console.log('Cart after adding product:', this.cart);

    localStorage.setItem('cart', JSON.stringify(this.cart));
    console.log('Cart saved to local storage');
  }

  async removeFromCart(product: Product) {
    let index = this.cart.findIndex(item => item.product.uu_id === product.uu_id);
    if (index !== -1) {
      this.cart.splice(index, 1);
    }
    console.log('Cart after removing product:', this.cart);

    localStorage.setItem('cart', JSON.stringify(this.cart));
    console.log('Cart saved to local storage');
  }

  incrementQuantity(item: CartItem) {
    item.quantity++;
    this.updateLocalStorage();
  }

  decrementQuantity(item: CartItem) {
    if (item.quantity > 1) {
      item.quantity--;
      this.updateLocalStorage();
    }
  }

  updateLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  get subtotal() {
    return this.cart.reduce((total, item) => total + (item.product.precio * item.quantity), 0);
  }

  get total() {
    return this.subtotal - this.discount + this.shippingCharge;
  }

  proceedToPayment() {
    const cartData = {
      cart: this.cart,
      subtotal: this.subtotal,
      discount: this.discount,
      shippingCharge: this.shippingCharge,
      total: this.total
    };
    this.cartService.updateCartData(cartData);
    this.router.navigate(['payment']);
  }
}
