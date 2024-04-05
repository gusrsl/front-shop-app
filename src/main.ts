import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { SplashScreen } from '@capacitor/splash-screen';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { enableProdMode } from '@angular/core';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

// Mostrar la pantalla de inicio
SplashScreen.show({
  autoHide: false // No ocultar automáticamente
});

// Ocultar la pantalla de inicio después de 2 segundos
setTimeout(() => {
  SplashScreen.hide();
}, 2000);
