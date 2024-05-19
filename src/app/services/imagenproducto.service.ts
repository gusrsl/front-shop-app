import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImagenproductoService {
  API_URL = environment.API_URL;
  private apiUrl = `${this.API_URL}/imagen`; // Asegúrate de reemplazar esto con la URL de tu API

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
