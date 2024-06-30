import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private apiUrl = environment.API_URL + 'pedidos'; // Asegúrate de que la URL base esté correctamente definida en tu environment
  private apiUrlreport = environment.API_URL + 'pedidosreport'; // Asegúrate de que la URL base esté correctamente definida en tu environment

  constructor(private http: HttpClient) {}

  // Crear un nuevo pedido
  createPedido(pedido: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.apiUrl, pedido, { headers: headers });
  }

  // Obtener un pedido por su ID
  getPedidoById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Obtener todos los pedidos
  getAllPedidos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Actualizar un pedido por su ID
  updatePedido(id: string, updatedFields: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(`${this.apiUrl}/${id}`, updatedFields, { headers: headers });
  }

  // Eliminar un pedido por su ID
  deletePedido(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  // Obtener todos los pedidos
  getPedidosReport(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlreport);
  }
}
