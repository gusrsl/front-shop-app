import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/paymentdata.service';
import { loadStripe } from '@stripe/stripe-js';
import { jsPDF } from 'jspdf';
import { ToastController } from '@ionic/angular';
import { environment } from '../../../environments/environment';


interface CartData {
  cart: any[];
  subtotal: number;
  discount: number;
  shippingCharge: number;
  total: number;
}

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
  cart: any[] = [];
  subtotal: number = 0;
  discount: number = 0;
  shippingCharge: number = 0;
  total: number = 0;
  cardNumber: any;
  expiryDate: any;
  cvc: any;
  stripe: any;
  cardElement: any;

  constructor(private cartService: CartService, private http: HttpClient, private toastController: ToastController) { }

async ngOnInit() {
  this.cartService.currentData.subscribe((data: null | CartData) => {
    if (data) {
      this.cart = data.cart;
      this.subtotal = data.subtotal;
      this.discount = data.discount;
      this.shippingCharge = data.shippingCharge;
      this.total = data.total;
    }
  });

  this.stripe = await loadStripe('pk_test_51NmNUMBl7yWw4itgGvqJOQjZgKJSBc3CUhnS7LtwK7t3LSFtvHLD7OzjKAQRjNBosUEV5PdQVNFXcgUZbv6C8XxC00187ZcHXD');
  const elements = this.stripe.elements();
  this.cardElement = elements.create('card');
  this.cardElement.mount('#card-element');
}
  async processCardPayment() {
    const { error, paymentMethod } = await this.stripe.createPaymentMethod({
      type: 'card',
      card: this.cardElement,
    });

    if (error) {
      console.error('Error creating payment method:', error);
    } else {
      const { clientSecret } = await this.http.post(`${environment.API_URL}payments/create-payment-intent`, { amount: this.total }).toPromise() as { clientSecret: string };
      const { error: confirmError, paymentIntent } = await this.stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

      if (confirmError) {
        console.error('Error confirming card payment:', confirmError);
      } else if (paymentIntent.status === 'succeeded') {
        console.log('Payment succeeded with payment intent:', paymentIntent);
        this.generateInvoice(paymentIntent);
      }
    }
  }

  async generateInvoice(paymentIntent: any):Promise<void> {
    // Define la interfaz de la factura
    interface Invoice {
      numeroFactura: string;
      fecha: Date;
      items: any[];
      subtotal: number;
      descuento: number;
      cargoEnvio: number;
      total: number;
    }

    // Crea la factura a partir del objeto paymentIntent
    const invoice: Invoice = {
      numeroFactura: paymentIntent.id,
      fecha: new Date(paymentIntent.created * 1000),
      items: this.cart.map(item => ({
        descripcion: item.product.descripcion,
        cantidad: item.quantity,
        precio: item.product.precio,
      })),
      subtotal: this.subtotal,
      descuento: this.discount,
      cargoEnvio: this.shippingCharge,
      total: this.total,
    };

    // Crea un nuevo documento PDF
    const doc = new jsPDF();

    // Agrega el logo de la empresa
    const logo = new Image();
    logo.src = '../../../assets/logodarmacio.png';
    doc.addImage(logo, 'PNG', 10, 10, 50, 20);

    // Encabezado de la factura
    doc.setFontSize(16);
    doc.text('Factura', 105, 15, { align: 'center' });
    doc.setFontSize(10);
    doc.text('Darmacio', 105, 30, { align: 'center' });
    doc.text('123 Calle Principal, Ciudad, Ecuador', 105, 40, { align: 'center' });
    doc.text('Teléfono: +1234567890 | Correo electrónico: info@darmacio.com', 105, 50, { align: 'center' });

    // Información de la factura
    doc.setFontSize(8);
    doc.text(`Número de Factura: ${invoice.numeroFactura}`, 10, 70);
    doc.text(`Fecha: ${invoice.fecha.toDateString()}`, 10, 75);

    // Tabla de elementos
    const tableHeaders = [['Descripción', 'Cantidad', 'Precio']];
    const tableData = invoice.items.map(item => [item.descripcion, item.cantidad.toString(), `$${item.precio}`]);
    let y = 85;
    const startY = y;
    const tableHeight = tableData.length * 6 + 10;
    doc.rect(10, y, 190, tableHeight);
    y += 6;
    doc.setFontSize(8);
    tableHeaders[0].forEach((header, index) => {
      doc.text(header, 15 + index * 60, y, { align: 'left' });
    });
    y += 4;
    tableData.forEach(row => {
      row.forEach((cell, index) => {
        doc.text(cell, 15 + index * 60, y, { align: 'left' });
      });
      y += 6;
    });

    // Resumen de la factura
    const summaryY = y + 5;
    doc.text(`Subtotal: $${invoice.subtotal}`, 10, summaryY);
    doc.text(`Descuento: $${invoice.descuento}`, 10, summaryY + 6);
    doc.text(`Cargo de Envío: $${invoice.cargoEnvio}`, 10, summaryY + 12);
    doc.text(`Total: $${invoice.total}`, 10, summaryY + 18);

    // Pie de página
    const footerY = doc.internal.pageSize.height - 10;
    doc.text('¡Gracias por su compra!', 105, footerY, { align: 'center' });

    // Guardar el documento como un archivo PDF
    doc.save(`Factura-${invoice.numeroFactura}.pdf`);

        // Muestra un toast de confirmación
    const toast = await this.toastController.create({
      message: 'Invoice generated successfully.',
      duration: 2000,
      color: 'success'
    });
    toast.present();
  }


}
