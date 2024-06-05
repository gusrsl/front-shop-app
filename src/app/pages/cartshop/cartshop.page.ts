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
  cart: CartItem[] = []; // Add this line


  constructor(private router: Router, private storageIonic: Storage, private platform: Platform,private productService: ProductService,
    private cartService: CartService
  ) {
  }

  ngOnDestroy() {
    console.log('YourComponent destroyed');
    // Aquí puedes realizar cualquier limpieza necesaria

    const navigation = this.router.getCurrentNavigation();
    if (navigation) {
      navigation.extras.state = undefined;
    }
  }


  async ngOnInit() {
    // Inicializa el carrito desde el almacenamiento local
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cart = JSON.parse(storedCart);
    }
    console.log('Initial cart:', this.cart);
    await this.addProductToCart();
  }

  async addProductToCart() {
    this.productService.currentProduct.subscribe(product => this.product = product ?? undefined);

    // Valida si existe un producto
    if (!this.product) {
      console.log('No product to add to cart');
      return;
    }

    console.log('Product:', this.product);

    // Verifica si el producto ya está en el carrito
    const existingItem = this.cart.find(item => item.product.uu_id === this.product?.uu_id);
    if (existingItem) {
      console.log('Product is already in the cart');
      return;
    }

    // Agrega el producto al carrito
    let cartItem: CartItem = { product: this.product!, quantity: 1 }; // Add the null assertion operator (!) after this.product
    this.cart.push(cartItem);
    console.log('Cart after adding product:', this.cart);

    // Guarda el carrito en el almacenamiento local
    localStorage.setItem('cart', JSON.stringify(this.cart));
    console.log('Cart saved to local storage');
  }

  async removeFromCart(product: Product) {
    let index = this.cart.findIndex(item => item.product.uu_id === product.uu_id);
    if (index !== -1) {
      this.cart.splice(index, 1);
    }
    console.log('Cart after removing product:', this.cart);

    // Guarda el carrito en el almacenamiento local
    localStorage.setItem('cart', JSON.stringify(this.cart));
    console.log('Cart saved to local storage');
  }


  discount = 0; // Asume que esto es tu descuento
  shippingCharge = 0;

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
