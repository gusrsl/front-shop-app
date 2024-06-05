export interface Product {
  uu_id: string;
  codigo_alfa: string;
  descripcion: string;
  precio: number;
  graba_iva: boolean;
  marca: string;
  color_1: string;
  color_2: string;
  valido: boolean;
  dias_entrega: number;
  id_envio: number;
  id_cat_niv3: number;
  fecha_creacion: string;
  producto_destacado: boolean;
  idestado: number;
  image: string;
  images: string[]; // Cambiado de 'image' a 'images'
}
