import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Product } from 'src/app/interfaces/product.model';
import { ImagenproductoService } from 'src/app/services/imagenproducto.service';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-descproduct',
  templateUrl: './descproduct.page.html',
  styleUrls: ['./descproduct.page.scss'],
})
export class DescproductPage implements OnInit {
  product: Product | undefined;
  destacProducts: any;

  constructor(private router: Router,
    private productosService: ProductosService,
    private imagenproductoService: ImagenproductoService,
    private navCtrl: NavController
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

  goToProductDetails(product: any) {
    this.navCtrl.navigateForward('/descproduct', {
      state: { product: product }
    });
  }

}
