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
  destacProducts: Product[] = [];
  images: any;
  tallas: number[] = [36, 38, 40, 42, 44];
  selectedTalla: number | undefined;

  selectedColor: string | undefined;
  availableColors: string[] = ['#000000', '#FFFFFF', '#808080']; // Negro, Blanco, Gris, Plateado, Marrón, Dorado
  randomColors: string[] = [];

  constructor(
    private router: Router,
    private productosService: ProductosService,
    private imagenproductoService: ImagenproductoService,
    private navCtrl: NavController,
    private productService: ProductService
  ) { }

  async ngOnInit() {
    this.generateRandomColors();
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      const state = navigation.extras.state as { product: Product };
      this.product = state.product;
      console.log(this.product);
    } else {
      // Manejar el caso cuando navigation es null
    }

    try {
      this.destacProducts = await this.productosService.getDestacProducts().toPromise();
      for (const product of this.destacProducts) {
        try {
          const response = await this.imagenproductoService.getProductImageById(product.uu_id).toPromise();
          product.images = response.status && response.images.length > 0 ? response.images : ['https://placehold.co/400x300/png'];
        } catch (error) {
          console.error(`Error al obtener imágenes para el producto ${product.uu_id}:`, error);
          product.images = ['https://placehold.co/400x300/png'];
        }
      }
    } catch (error) {
      console.error('Error al obtener productos destacados:', error);
    }
  }

  generateRandomColors() {
    this.randomColors = [];
    while (this.randomColors.length < 3) {
      const randomColor = this.availableColors[Math.floor(Math.random() * this.availableColors.length)];
      if (!this.randomColors.includes(randomColor)) {
        this.randomColors.push(randomColor);
      }
    }
  }

  selectColor(color: string) {
    this.selectedColor = color;
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
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
      },
    });
  }

  selectTalla(talla: number) {
    this.selectedTalla = talla;
  }

  goToProductDetails(product: any) {
    this.navCtrl.navigateForward('/descproduct', {
      state: { product: product }
    });
  }

  downloadImage() {
    // Ruta de la imagen en la carpeta assets
    const imageUrl = 'assets/image/plantilladarmacioshop.png';
    // Crear un elemento <a> temporal
    const a = document.createElement('a');
    a.href = imageUrl;
    a.download = 'plantilladarmacioshop.png'; // Nombre sugerido para el archivo descargado
    document.body.appendChild(a); // Añadir el elemento <a> al documento
    a.click(); // Iniciar la descarga
    document.body.removeChild(a); // Eliminar el elemento <a> del documento
  }

  goToCartshop(product: any) {
    console.log('Product:', product);
    this.productService.changeProduct(product);
    this.router.navigate(['/cartshop']);
  }
}
