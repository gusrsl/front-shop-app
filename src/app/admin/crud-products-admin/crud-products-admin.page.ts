import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ImagenproductoService } from 'src/app/services/imagenproducto.service';

@Component({
  selector: 'app-crud-products-admin',
  templateUrl: './crud-products-admin.page.html',
  styleUrls: ['./crud-products-admin.page.scss'],
})
export class CrudProductsAdminPage implements OnInit {
  @Input() product: any = {
    uu_id: '',
    codigo_alfa: '',
    descripcion: '',
    precio: '',
    graba_iva: false,
    marca: '',
    color_1: '',
    color_2: '',
    valido: false,
    dias_entrega: 0,
    id_envio: 0,
    id_cat_niv3: 0,
    fecha_creacion: '',
    producto_destacado: false,
    idestado: 0,
    imagenes: [] // Asumiendo que este campo almacena las imágenes del producto
  };
  isEditing: boolean = false;
  uploadedImages: Array<{name: string, url: string, file: File | undefined;}> = [];
  selectedImage: any = null; // Estado para la imagen seleccionada para previsualización
productImages: any;

  constructor(private modalCtrl: ModalController, private ImgProductoService: ImagenproductoService ) {}

  ngOnInit() {
    if (this.product && this.product.uu_id) {
      this.isEditing = true;
      if (!Array.isArray(this.product.imagenes)) {
        this.product.imagenes = [];
      }
      this.loadProductImages(this.product.uu_id);
    }
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  }

  saveProduct() {
    console.log('Product data:', this.product);
    this.modalCtrl.dismiss({ product: this.product, isEditing: this.isEditing, uploadedImages: this.uploadedImages }, 'confirm');
  }

  onFileSelected(event: any) {
    const files = event.target.files;
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImage = e.target.result; // Actualiza la previsualización de la imagen
        // Agrega la imagen a uploadedImages para mostrarla en la lista
        this.uploadedImages.push({ name: file.name, url: e.target.result, file: file });
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage(image: { name: string; url: string; file: File | undefined; }) {
    this.uploadedImages = this.uploadedImages.filter(img => img !== image);
  }

  removeSelectedImage() {
    this.selectedImage = null; // Esto eliminará la previsualización de la imagen seleccionada
  }

  uploadImage() {
    // Aquí puedes agregar la lógica para subir la imagen al servidor
    // Por ahora, solo limpiamos la previsualización
    this.selectedImage = null;
  }

  loadProductImages(productId: string) {
      this.ImgProductoService.getProductImageById(productId).subscribe({
          next: (responses) => {
              responses.forEach((response: { ruta_img: string; descripcion: any; }) => {
                  this.uploadedImages.push({
                      url:  '/imageneslocal' + response.ruta_img,
                      name: response.descripcion,
                      file: undefined // Assuming this remains valid for multiple images
                  });
              });
              console.log('Imágenes del producto cargadas:', responses);
              console.log('Estado actual de uploadedImages:', this.uploadedImages);
          },
          error: (error) => {
              console.error('Error al obtener las imágenes del producto:', error);
          }
      });
  }
}
