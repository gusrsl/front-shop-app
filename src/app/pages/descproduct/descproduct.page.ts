/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Product } from 'src/app/interfaces/product.model';
import { ProductService } from 'src/app/services/cartproduct.service';
import { ImagenproductoService } from 'src/app/services/imagenproducto.service';
import { ProductosService } from 'src/app/services/productos.service';
import { Swiper } from 'swiper';


@Component({
  selector: 'app-descproduct',
  templateUrl: './descproduct.page.html',
  styleUrls: ['./descproduct.page.scss'],
})
export class DescproductPage implements OnInit, AfterViewInit {
  product: Product | undefined;
  destacProducts: any;
images: any;

  constructor(private router: Router,
    private productosService: ProductosService,
    private imagenproductoService: ImagenproductoService,
    private navCtrl: NavController,
    private productService: ProductService
  ) { }

  async ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation) {
      const state = navigation.extras.state as {product: Product};
      this.product = state.product;
      console.log(this.product);
    } else {
      // Manejar el caso cuando navigation es null
    }

    const destacProducts = await this.productosService.getDestacProducts().toPromise();
    this.destacProducts = destacProducts;
    for (const product of this.destacProducts) {
      const image = await this.imagenproductoService.getProductImageById(product.uu_id).toPromise();
      product.image = `https://gustavo-rodriguez.tech/imagenes_local/${image.ruta_img}`;
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

  goToProductDetails(product: any) {
    this.navCtrl.navigateForward('/descproduct', {
      state: { product: product }
    });
  }

  goToCartshop(product: any) {
    console.log('Product:', product);
    this.productService.changeProduct(product);
    this.router.navigate(['/cartshop']);
  }


}
