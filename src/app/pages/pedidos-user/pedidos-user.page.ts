import { Component, OnInit } from '@angular/core';
import { PedidoService } from 'src/app/services/pedidos.service';
import { LoadingController } from '@ionic/angular'; // Importa LoadingController

@Component({
  selector: 'app-pedidos-user',
  templateUrl: './pedidos-user.page.html',
  styleUrls: ['./pedidos-user.page.scss'],
})
export class PedidosUserPage implements OnInit {

  pedidos: any[] = [];
  userId: any | undefined;

  constructor(
    private pedidoService: PedidoService,
    private loadingController: LoadingController // Inyecta LoadingController
  ) {}

  async ngOnInit() {
    const loading = await this.loadingController.create({
      message: 'Cargando...', // Mensaje opcional
    });
    await loading.present(); // Mostrar el indicador de carga

    try {
      const userString = localStorage.getItem('usuario');
      if (userString) {
        const user = JSON.parse(userString);
        this.userId = user.id;

        if (this.userId) {
          const data = await this.pedidoService.getPedidoById(this.userId).toPromise(); // Asegúrate de que getPedidoById retorne una Promise
          console.log('Pedidos del usuario:', data);
          this.pedidos = data; // Envuelve data en un array
          } else {
          console.error('User ID is undefined');
        }
      } else {
        console.error('User not found in localStorage');
      }
    } catch (error) {
      console.error('Error al obtener los pedidos', error);
    } finally {
      await loading.dismiss(); // Ocultar el indicador de carga
    }
  }
}
