import { Component, OnInit } from '@angular/core';
import { ImagenproductoService } from 'src/app/services/imagenproducto.service';
import { ProductosService } from 'src/app/services/productos.service';
import { LoadingController, MenuController, ModalController, NavController } from '@ionic/angular';
import { Product } from '../../interfaces/product.model';
import { ImagenesService } from 'src/app/services/imagenes.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {
  searchTerm = '';
  products: Product[] = [];
  filteredProducts: Product[] = [];
  isSearching: boolean | undefined;
  isFiltered: boolean | undefined;

  isFilterVisible = false; // Controla la visibilidad del contenido del ion-card


  currentPage = 1;
  pageSize = 10;

  categories: string[] = ['Sports', 'Running', 'Casual', 'Formal'];
  selectedCategory: string = '';
  priceRange: any = { lower: 0, upper: 500 };
  availableOnly: boolean = false;

  filter = {
    marca: '',
    color_1: '',
    color_2: '',
    precio: { lower: 0, upper: 500 },
    dias_entrega: null
  };

  constructor(
    private productosService: ProductosService,
    private imagenproductoService: ImagenproductoService,
    private ImagenService: ImagenesService,
    private loadingController: LoadingController,
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private menuController: MenuController
  ) {}

  async ngOnInit() {
    const loading = await this.loadingController.create({
      spinner: 'circles',
      message: 'Por favor espera...',
      cssClass: 'my-custom-class'
    });
    await loading.present();

    try {
      const products = await this.productosService.getAllProducts().toPromise();
      this.products = products;

      this.filteredProducts = this.products;
    } catch (error) {
      console.error('Error al cargar productos:', error);
    } finally {
      loading.dismiss();
    }

    await this.loadProducts();
  }

  filtersVisible = false; // Controla la visibilidad de los filtros

  toggleFiltersVisibility() {
    this.filtersVisible = !this.filtersVisible;
  }

  // Método para cargar los productos
  async loadProducts() {
    const loading = await this.loadingController.create({
      spinner: 'circles',
      message: 'Por favor espera...',
      cssClass: 'my-custom-class'
    });
    await loading.present();

    try {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = this.currentPage * this.pageSize;

      this.filteredProducts = this.products.slice(start, end);
    } finally {
      loading.dismiss();
    }
  }

  // Método para ir a la página siguiente
  nextPage() {
    this.currentPage++;
    this.filterProducts();
  }

  resetFilters() {
    // Restablece los valores de tus filtros aquí
    this.filter = {
      marca: '',
      color_1: '',
      color_2: '',
      precio: { lower: 0, upper: 500 }, // Asumiendo que este es el rango inicial
      dias_entrega: null,
      // Añade aquí el resto de los filtros que necesites restablecer
    };
    this.availableOnly = false; // Asumiendo que este es el valor inicial para la disponibilidad
    this.filterProducts(); // Llama a la función que aplica los filtros
  }

  // Método para ir a la página anterior
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.filterProducts();
    }
  }

  // Método para buscar productos
  search() {
    this.isSearching = this.searchTerm !== '';
    this.filterProducts();
  }

  // Método para filtrar productos
  filterProducts() {
    this.filteredProducts = this.products.filter(product => {
      return (
        product.descripcion.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
        (this.filter.marca ? product.marca === this.filter.marca : true) &&
        (this.filter.color_1 ? product.color_1 === this.filter.color_1 : true) &&
        (this.filter.color_2 ? product.color_2 === this.filter.color_2 : true) &&
        product.precio >= this.filter.precio.lower &&
        product.precio <= this.filter.precio.upper &&
        (this.filter.dias_entrega ? product.dias_entrega <= this.filter.dias_entrega : true) &&
        (this.availableOnly ? product.stock > 0 : true)
      );
    });

    this.filteredProducts = this.filteredProducts.slice(
      (this.currentPage - 1) * this.pageSize,
      this.currentPage * this.pageSize
    );
  }

  toggleFilter() {
    this.isFilterVisible = !this.isFilterVisible;
  }

  goToProductDetails(product: any) {
    this.navCtrl.navigateForward('/descproduct', {
      state: { product: product }
    });
  }

  // Obtener marcas únicas
  getUniqueBrands(): string[] {
    return [...new Set(this.products.map(product => product.marca))];
  }

  // Obtener colores únicos
  getUniqueColors(color: string): string[] {
    return [...new Set(this.products.map(product => product.color_1))];
  }
}
