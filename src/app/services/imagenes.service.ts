import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImagenesService {
  private cartData = new BehaviorSubject(null);
  currentData = this.cartData.asObservable();
  private API_URL = environment.API_URL + 'imagenes'; // Asegúrate de que la URL base esté correctamente definida en tu environment

  constructor(private http: HttpClient) { }

  // Método para subir una imagen
  uploadImage(imageFile: File, productId: number): Observable<any> {
    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('productId', productId.toString());

    return this.http.post(`${this.API_URL}/upload`, formData).pipe(
      catchError(this.handleError)
    );
  }

  // Método para eliminar una imagen
  deleteImage(imageId: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/delete/${imageId}`).pipe(
      catchError(this.handleError)
    );
  }

  // Manejador de errores
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }

    // Método para obtener la ubicación de una imagen por su ID
  getImageById(imageId: number): Observable<any> {
    return this.http.get(`${this.API_URL}/image/${imageId}`).pipe(
      catchError(this.handleError)
    );
  }

  // Método para obtener las imágenes asociadas a un producto por el ID del producto
  getProductImages(productId: any): Observable<any> {
    return this.http.get(`${this.API_URL}/product-images/${productId}`).pipe(
      catchError(this.handleError)
    );
  }
}
