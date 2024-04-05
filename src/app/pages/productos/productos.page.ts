import { Component, OnInit } from '@angular/core';
import { ImagenproductoService } from 'src/app/services/imagenproducto.service';
import { ProductosService } from 'src/app/services/productos.service';
import { LoadingController, MenuController, ModalController, NavController } from '@ionic/angular';
import { Product } from '../../interfaces/product.model';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {
  searchTerm = '';
  products: Product[] = [];
  destacProducts: Product[] = [];
  filteredProducts: Product[] = [];
  isSearching: boolean | undefined;
  isFiltered: boolean | undefined;

  filter = {
    marca: '',
    color_1: '',
    color_2: '',
    precio: null,
    dias_entrega: null
  };

  constructor(
    private productosService: ProductosService,
    private imagenproductoService: ImagenproductoService,
    private loadingController: LoadingController,
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private menuController: MenuController
  ) {}

  async ngOnInit() {
    const loading = await this.loadingController.create({
      spinner: 'circles',
      duration: 5000,
      message: 'Por favor espera...',
      cssClass: 'my-custom-class'
    });
    await loading.present();

    const products = await this.productosService.getAllProducts().toPromise();
    this.products = products;
    for (const product of this.products) {
      console.log(product);
      const image = await this.imagenproductoService.getProductImageById(product.uu_id).toPromise();
      product.image = `https://gustavo-rodriguez.tech/imagenes_local/${image.ruta_img}`;
    }

    const destacProducts = await this.productosService.getDestacProducts().toPromise();
    this.destacProducts = destacProducts;
    for (const product of this.destacProducts) {
      const image = await this.imagenproductoService.getProductImageById(product.uu_id).toPromise();
      product.image = `https://gustavo-rodriguez.tech/imagenes_local/${image.ruta_img}`;
    }

    this.filteredProducts = this.products;

    await loading.dismiss(); // Oculta el indicador de carga
  }

  search() {
    this.isSearching = this.searchTerm !== '';
    this.filteredProducts = this.products.filter(product => product.descripcion.includes(this.searchTerm));
  }

  applyFilter() {
    this.filteredProducts = this.products.filter(product => {
      return (!this.filter.marca || product.marca === this.filter.marca) &&
             (!this.filter.color_1 || product.color_1 === this.filter.color_1) &&
             (!this.filter.color_2 || product.color_2 === this.filter.color_2) &&
             (!this.filter.precio || product.precio <= this.filter.precio) &&
             (!this.filter.dias_entrega || product.dias_entrega <= this.filter.dias_entrega);
    });
  }

  toggleFilter() {
    this.menuController.enable(true, 'filter-menu');
    this.menuController.toggle('filter-menu');
  }

  goToProductDetails(product: any) {
    this.navCtrl.navigateForward('/descproduct', {
      state: { product: product }
    });
  }
}
