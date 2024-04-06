import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SplashScreen } from '@capacitor/splash-screen';
import { register } from 'swiper/element/bundle';
register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  showMenu = false;

  constructor(private router: Router) {}

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
}
