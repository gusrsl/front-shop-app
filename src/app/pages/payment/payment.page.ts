import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/paymentdata.service';
import { loadStripe } from '@stripe/stripe-js';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';  // Import the autoTable plugin
import { ToastController } from '@ionic/angular';
import { environment } from '../../../environments/environment';
import { EmailService } from 'src/app/services/email.service'; // Importa el servicio de correo
import { firstValueFrom } from 'rxjs';
import { PedidoService } from 'src/app/services/pedidos.service';
import { Router } from '@angular/router';

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
  iva: number = 0;
  stripe: any;
  cardElement: any;
  paymmentintent: any;
  emailsSent: boolean = false; // Flag para controlar el envío de correos

  constructor(
    private cartService: CartService,
    private http: HttpClient,
    private toastController: ToastController,
    private router: Router,
    private emailService: EmailService, // Inyecta el servicio de correo,
    private pedidoService: PedidoService // Inyecta el servicio de pedidos

  ) {}

  async ngOnInit() {
    this.cartService.currentData.subscribe((data: null | CartData) => {
      if (data) {
        this.cart = data.cart;
        this.subtotal = data.subtotal;
        this.discount = data.discount;
        this.shippingCharge = data.shippingCharge;
        this.total = data.total;
        this.calculateIVA();
      }
    });

    this.stripe = await loadStripe('pk_test_51NmNUMBl7yWw4itgGvqJOQjZgKJSBc3CUhnS7LtwK7t3LSFtvHLD7OzjKAQRjNBosUEV5PdQVNFXcgUZbv6C8XxC00187ZcHXD');
    const elements = this.stripe.elements();
    this.cardElement = elements.create('card');
    this.cardElement.mount('#card-element');
  }

  calculateIVA() {
    this.iva = this.subtotal * 0.12;
    this.total += this.iva;
  }

  async processCardPayment() {
    await this.showToast('Procesando pago...', 'primary');
    const { error, paymentMethod } = await this.stripe.createPaymentMethod({
      type: 'card',
      card: this.cardElement,
    });

    if (error) {
      console.error('Error creating payment method:', error);
      this.showToast('Error creando el método de pago', 'danger');
    } else {
      const { clientSecret } = await this.http
        .post(`${environment.API_URL}payments/create-payment-intent`, { amount: this.total })
        .toPromise() as { clientSecret: string };
      const { error: confirmError, paymentIntent } = await this.stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

      if (confirmError) {
        console.error('Error confirming card payment:', confirmError);
        this.showToast('Error confirmando el pago', 'danger');
      } else if (paymentIntent.status === 'succeeded') {
        console.log('Payment succeeded with payment intent:', paymentIntent);
        this.paymmentintent = paymentIntent;
        this.showToast('Pago realizado con éxito', 'success');
        await this.generateInvoice(paymentIntent);
        await this.createPedido(); // Crear el pedido una vez que el pago se ha completado
        await this.sendOrderEmails(); // Enviar correos una vez que el pago se ha completado
        await this.clearCart(); // Limpiar el carrito una vez que el pago se ha completado
        await this.router.navigate(['/pedidos-user']); // Navega a la pantalla de pedidos

      }
    }
  }

  clearCart() {
    this.cart = []; // Vacía el arreglo del carrito
    localStorage.removeItem('cart'); // Remueve el carrito de local storage
    console.log('Carrito vaciado');
  }

  async createPedido() {
    console.log('Creando pedido...')
    // Paso 1: Recuperar los datos del Local Storage
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    const cart = JSON.parse(localStorage.getItem('cart') || 'null');
    const stripeResponseRaw = localStorage.getItem('stripeResponse');
    let stripeResponse: any = this.paymmentintent;

    // Paso 2: Preparar los detalles del pedido
    const pedido = {
      user_id: usuario.id, // Reemplaza con el ID real del usuario
      estado: 'pendiente',
      subtotal: this.subtotal,
      total: this.total,
      idestado: true,
      producto_ids: cart.flatMap((item: { product: { uu_id: any; }; quantity: number }) =>
        Array.from({ length: item.quantity }, () => item.product.uu_id))
    };
    console.log('Detalles del pedido:', pedido);

    // Paso 3: Enviar la petición para crear el pedido
    try {
      console.log('Usuario:', usuario);
      console.log('Carrito:', cart);
      console.log('Respuesta de Stripe:', stripeResponse);

      const response = await firstValueFrom(this.pedidoService.createPedido(pedido));
      console.log('Pedido creado con éxito:', response);
    } catch (error) {
      console.error('Error al crear pedido:', error);
    }
  }


  async generateInvoice(paymentIntent: any): Promise<void> {
    await this.showToast('Generando factura...', 'primary');

    interface Invoice {
      numeroFactura: string;
      fecha: Date;
      items: any[];
      subtotal: number;
      descuento: number;
      cargoEnvio: number;
      iva: number;
      total: number;
    }

    const invoice: Invoice = {
      numeroFactura: paymentIntent.id,
      fecha: new Date(paymentIntent.created * 1000),
      items: this.cart.map(item => ({
        descripcion: item.product.descripcion,
        cantidad: item.quantity,
        precio: parseFloat(item.product.precio).toFixed(2),
      })),
      subtotal: parseFloat(this.subtotal.toFixed(2)),
      descuento: parseFloat(this.discount.toFixed(2)),
      cargoEnvio: parseFloat(this.shippingCharge.toFixed(2)),
      iva: parseFloat(this.iva.toFixed(2)),
      total: parseFloat(this.total.toFixed(2)),
    };

    const doc = new jsPDF();

    const logo = new Image();
    logo.src = '../../../assets/logodarmacio.png';
    doc.addImage(logo, 'PNG', 10, 10, 50, 20);

    doc.setFontSize(16);
    doc.text('Nota de Venta', 105, 15, { align: 'center' });
    doc.setFontSize(10);
    doc.text('Darmacio', 105, 30, { align: 'center' });
    doc.text('123 Calle Principal, Ciudad, Ecuador', 105, 40, { align: 'center' });
    doc.text('Teléfono: +1234567890 | Correo electrónico: info@darmacio.com', 105, 50, { align: 'center' });

    doc.setFontSize(8);
    doc.text(`Número de Factura: ${invoice.numeroFactura}`, 10, 70);
    doc.text(`Fecha: ${invoice.fecha.toDateString()}`, 10, 75);

    const tableHeaders = [['Descripción', 'Cantidad', 'Precio']];
    const tableData = invoice.items.map(item => [item.descripcion, item.cantidad.toString(), `$${item.precio}`]);

    (doc as any).autoTable({
      head: tableHeaders,
      body: tableData,
      startY: 85,
      theme: 'grid',
      headStyles: { fillColor: [22, 160, 133] },
      styles: { fontSize: 8, cellPadding: 2 },
    });

    const finalY = (doc as any).lastAutoTable.finalY + 10;

    doc.text(`Subtotal: $${invoice.subtotal}`, 10, finalY);
    doc.text(`Descuento: $${invoice.descuento}`, 10, finalY + 6);
    doc.text(`Cargo de Envío: $${invoice.cargoEnvio}`, 10, finalY + 12);
    doc.text(`IVA (12%): $${invoice.iva}`, 10, finalY + 18);
    doc.text(`Total: $${invoice.total}`, 10, finalY + 24);

    const footerY = doc.internal.pageSize.height - 10;
    doc.text('¡Gracias por su compra!', 105, footerY, { align: 'center' });

    doc.save(`Factura-${invoice.numeroFactura}.pdf`);

    await this.showToast('Factura generada con éxito', 'success');
  }

  async sendOrderEmails() {
    if (this.emailsSent) {
      console.log('Los correos ya han sido enviados.');
      return;
    }

    console.log('Enviando correos...')
    // Paso 1: Recuperar los datos del Local Storage
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    const cart = JSON.parse(localStorage.getItem('cart') || 'null');
    const stripeResponseRaw = localStorage.getItem('stripeResponse');
    let stripeResponse: any = this.paymmentintent;

    console.log('Usuario:', usuario);
    console.log('Carrito:', cart);
    console.log('Respuesta de Stripe:', stripeResponse);

    // Paso 2: Preparar los detalles del pedido
    const customerEmail = usuario.correo;
    const orderDetails = {
      orderId: stripeResponse.id,
      cart: cart,
      price: stripeResponse.amount / 100,
      customerName: `${usuario.nombre} ${usuario.apellido}`,
      address: `${usuario.direccion}, ${usuario.ciudad}, ${usuario.pais}`
    };
    console.log('Detalles del pedido:', orderDetails);
    console.log('Correo del cliente:', customerEmail);

    // Paso 3: Enviar el correo electrónico
    try {
      const response = await firstValueFrom(this.emailService.sendOrderEmails(customerEmail, orderDetails));
      console.log('Correos enviados con éxito:', response);
      this.emailsSent = true; // Marca los correos como enviados
    } catch (error) {
      console.error('Error al enviar correos:', error);
    }
  }

  private async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color,
    });
    toast.present();
  }
}
