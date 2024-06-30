import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private apiUrl = environment.API_URL + 'email/send-order-emails'; // Asegúrate de que la URL base esté correctamente definida en tu environment
  private emailsSent: boolean = false; // Flag para controlar el envío de correos

  constructor(private http: HttpClient) {}

  sendOrderEmails(customerEmail: string, orderDetails: any): Observable<any> {

    if (this.emailsSent) {
      console.log('Emails already sent, aborting.'); // Log si los correos ya fueron enviados
      return throwError('Correos ya enviados'); // Evita repetir la petición si los correos ya se enviaron
    }

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = {
      customerEmail: customerEmail,
      orderDetails: orderDetails
    };

    return this.http.post<any>(this.apiUrl, body, { headers: headers }).pipe(
      tap(() => {
        console.log('Emails sent successfully.'); // Log al completar la petición
        this.emailsSent = true; // Marca los correos como enviados al completar la petición
      }),
      catchError((error) => {
        console.error('Error sending emails:', error); // Log en caso de error
        this.emailsSent = false; // Resetea el flag en caso de error
        return throwError(error);
      })
    );
  }

  resetEmailsSentFlag() {
    console.log('EmailsSent flag reset.'); // Log al resetear el flag
    this.emailsSent = false; // Permite resetear el flag externamente si es necesario
  }
}