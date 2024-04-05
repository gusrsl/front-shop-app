import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagenproductoService {
  private apiUrl = 'http://localhost:3000/imagen'; // Asegúrate de reemplazar esto con la URL de tu API

  constructor(private http: HttpClient) { }

  getAllProductImages(): Observable<any> {
    return this.http.get(`${this.apiUrl}/`);
  }

  getProductImageById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createProductImage(productImage: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/`, productImage);
  }
}
