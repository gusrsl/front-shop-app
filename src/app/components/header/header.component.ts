import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from 'src/app/services/userdata.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  userData: any;
  intervalId: any;

    menuItems = [
      {
        title: 'Hombres',
      },
    {
      title: 'Mujeres',
    },
    {
      title: 'Niños',
    },
  ];


  constructor(private router: Router, private userDataService: UserDataService) { }

  async ngOnInit() {

    setInterval(() => {
      try {
        this.updateUserData();
      } catch (error) {
        console.error('Error al actualizar los datos del usuario:', error);
      }
    }, 1000);

  }

  async updateUserData() {
    // Espera a que la Promesa se resuelva y luego obtiene la data del usuario
    this.userData = await this.userDataService.getUserData();
  }

  navigateToCartShop() {
    // Aquí puedes realizar cualquier lógica adicional que necesites
    // antes de navegar a la página de la tienda de carritos.

    this.router.navigate(['/cartshop']);
  }

  ngOnDestroy() {
    // Asegúrate de limpiar el intervalo cuando el componente se destruye
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
