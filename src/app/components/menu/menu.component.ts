import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { UserDataService } from 'src/app/services/userdata.service';
import { Storage } from '@ionic/storage-angular';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  themeToggle: any;
  userData: any;
  intervalId: any;

  constructor(private menu: MenuController, private router: Router, private userDataService: UserDataService,     private storage: Storage,
  ) {
    console.log('Constructor llamado');
  }

  async ngOnInit() {
    console.log('ngOnInit llamado');
    // Inicializa el tema oscuro como falso (tema claro)
    this.initializeDarkTheme(false);

    // Obtiene la data del usuario
    //await this.updateUserData();

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

    // Ahora puedes usar userData
  }

  navigateTo(path: string) {
    console.log('navigateTo llamado con ruta:', path);
    this.menu.close();
    this.router.navigateByUrl(path);
  }

  initializeDarkTheme(isDark: boolean) {
    console.log('initializeDarkTheme llamado con isDark:', isDark);
    this.themeToggle = isDark;
    this.toggleDarkTheme(isDark);
  }

  toggleChange(ev: { detail: { checked: boolean | undefined; }; }) {
    console.log('toggleChange llamado con evento:', ev);
    this.toggleDarkTheme(ev.detail.checked);
  }

  toggleDarkTheme(shouldAdd: boolean | undefined) {
    console.log('toggleDarkTheme llamado con shouldAdd:', shouldAdd);
    document.body.classList.toggle('dark', shouldAdd);
  }

  async logout() {
    // Espera a que Storage se inicialice
    await this.storage.create();

    // Elimina el token del almacenamiento local
    localStorage.removeItem('token');
    // Elimina el token del storage de Ionic
    this.storage.remove('token');

    // Elimina los datos del usuario del almacenamiento local
    localStorage.removeItem('usuario');
    // Elimina los datos del usuario del storage de Ionic
    this.storage.remove('usuario');

    // Limpia los datos del usuario del servicio
    this.userDataService.clearUserData();

    // Redirige al usuario a la página de inicio de sesión
    this.router.navigate(['/login']);
  }

}
