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

    // Número de la página actual
    currentPage = 1;

    // Número de productos por página
    pageSize = 10;

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

    // Carga los productos de la primera página
    await this.loadProducts();
  }

    // Método para cargar los productos
    async loadProducts() {

      const loading = await this.loadingController.create({
        spinner: 'circles',
        duration: 5000,
        message: 'Por favor espera...',
        cssClass: 'my-custom-class'
      });
      // Aquí debes cargar los productos de la página actual
      // Puedes usar el método slice para obtener los productos de la página actual
      this.filteredProducts = this.products.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
      loading.dismiss(); // Oculta el indicador de carga
    }

    // Método para ir a la página siguiente
    nextPage() {
      this.currentPage++;
      this.loadProducts();
    }

    // Método para ir a la página anterior
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.loadProducts();
      }
    }

  search() {
    this.isSearching = this.searchTerm !== '';
    this.filteredProducts = this.products.filter(product => product.descripcion.includes(this.searchTerm));
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
