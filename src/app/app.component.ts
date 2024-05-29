/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { Component } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { SplashScreen } from '@capacitor/splash-screen';
import { MenuController } from '@ionic/angular';
import { register } from 'swiper/element/bundle';
register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  showMenu = true;

  constructor(private router: Router, private menu: MenuController) {}

  async ngOnInit() {
    // Show the splash for an indefinite amount of time:
    await SplashScreen.show({
      autoHide: false,
    });

    this.router.events.subscribe(async (event) => {
      if (event instanceof NavigationEnd) {
        this.showMenu = event.urlAfterRedirects === '/home';

        // Hide the splash (you should do this on app launch)
        await SplashScreen.hide();
      }
    });

  }

  navigateToCartShop() {
    // Aquí puedes realizar cualquier lógica adicional que necesites
    // antes de navegar a la página de la tienda de carritos.

    this.router.navigate(['/cartshop']);
  }

  navigateTo(path: string) {
    console.log('navigateTo llamado con ruta:', path);
    this.menu.close();
    this.router.navigateByUrl(path);
  }
}
