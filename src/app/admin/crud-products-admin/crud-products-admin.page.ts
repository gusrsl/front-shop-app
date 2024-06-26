import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ImagenesService } from 'src/app/services/imagenes.service';

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
    imagenes: []
  };
  isEditing: boolean = false;
  uploadedImages: any[] = [];
  selectedImage: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;

  constructor(private modalCtrl: ModalController, private imagenesService: ImagenesService) {}

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

  loadProductImages(productId: string) {
    this.imagenesService.getProductImages(productId).subscribe({
      next: (response) => {
        this.uploadedImages = response.images.map((imageUrl: string) => ({
          url: imageUrl,
          name: imageUrl.split('/').pop() // Extracting the image name from the URL
        }));
      },
      error: (error) => {
        console.error('Error al cargar las imágenes del producto:', error);
      }
    });
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = e => this.selectedImage = reader.result;
      reader.readAsDataURL(file);
    }
  }

  uploadImage(): void {
    if (this.selectedFile) {
      const productId = this.product.uu_id;
      this.imagenesService.uploadImage(this.selectedFile, productId).subscribe({
        next: (response) => {
          this.uploadedImages.push({
            id: response.id,
            url: response.image, // Assuming the response contains the image URL
            name: response.name
          });
          this.removeSelectedImage();
        },
        error: (error) => console.error(error)
      });
    }
  }

  removeImage(image: any): void {
    this.imagenesService.deleteImage(image.id).subscribe({
      next: () => {
        this.uploadedImages = this.uploadedImages.filter(img => img.id !== image.id);
      },
      error: (error) => console.error(error)
    });
  }

  removeSelectedImage(): void {
    this.selectedImage = null;
    this.selectedFile = null;
  }
}
