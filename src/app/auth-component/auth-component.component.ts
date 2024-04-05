/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-auth-component',
  templateUrl: './auth-component.component.html',
  styleUrls: ['./auth-component.component.scss'],
})
export class AuthComponent implements OnInit {
  showPassword = false;
  screen: any = 'signin';


  loginData: FormGroup;
  registerData: FormGroup;

  isLoading: boolean = false;
  constructor(
    private fb:FormBuilder,
    private auth:AuthService,
    private toastController: ToastController,
    private router: Router,
    private storage: Storage
    ) {

      this.loginData = this.fb.group({
        nombreUsuario: ['', [Validators.required, Validators.minLength(3)]],
        contrasena: ['', [Validators.required, Validators.minLength(6)]],
      });

      this.registerData = this.fb.group({
        nombreUsuario: ['', [Validators.required, Validators.minLength(3)]],
        contrasena: ['', [Validators.required, Validators.minLength(6)]],
        correo: ['', [Validators.required, Validators.email]],
        nombre: ['', Validators.required],
        apellido: ['', Validators.required],
        direccion: ['', Validators.required],
        ciudad: ['', Validators.required],
        pais: ['', Validators.required],
        codigoPostal: ['', Validators.required],
        telefono: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]] // Asegúrate de usar un patrón de validación correcto para el número de teléfono
      });
  }

  ngOnInit() {}

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color,
      position: 'top'
    });
    toast.present();
  }

  change(event: any){
    this.screen = event;
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

login() {
  if (this.loginData.valid) {
    this.isLoading = true;
    const nombreUsuarioControl = this.loginData.get('nombreUsuario');
    const contrasenaControl = this.loginData.get('contrasena');

    if (nombreUsuarioControl && contrasenaControl) {
      const loginData = {
        nombreUsuario: nombreUsuarioControl.value,
        contrasena: contrasenaControl.value
      };

      this.auth.userLogin(loginData).then(async (data: any) => {
        console.log(data);
        this.auth.getToken().then(async (token) => {
          console.log('Token JWT:', token); // Aquí puedes ver el token JWT en la consola
          if (token) { // Verifica si el token existe
            this.presentToast('Inicio de sesión exitoso!', 'success');
            // Redirigir al usuario a la página de inicio
            this.router.navigate(['/home']);
          } else {
            // Si el token no existe, muestra un error
            this.presentToast('Error al obtener el token.', 'danger');
          }
        }).catch((error) => {
          console.log(error);
          this.presentToast('Error al obtener el token.', 'danger');
        });
      }).catch((error) => {
        console.log(error);
        this.presentToast('Error en el inicio de sesión.', 'danger');
      });
    } else {
      this.presentToast('Por favor, completa todos los campos.', 'warning');
    }
  }
}

  logout() {
    this.auth.logout().then(() => {
      this.storage.remove('token'); // Borra el token del Ionic Storage
      this.router.navigate(['/login']); // Redirige al usuario a la página de inicio de sesión
    });
  }


register() {
  if (this.registerData.valid) {
    const nombreUsuarioControl = this.registerData.get('nombreUsuario');
    const contrasenaControl = this.registerData.get('contrasena');
    const correoControl = this.registerData.get('correo');
    const nombreControl = this.registerData.get('nombre');
    const apellidoControl = this.registerData.get('apellido');
    const direccionControl = this.registerData.get('direccion');
    const ciudadControl = this.registerData.get('ciudad');
    const paisControl = this.registerData.get('pais');
    const codigoPostalControl = this.registerData.get('codigoPostal');
    const telefonoControl = this.registerData.get('telefono');

    if (nombreUsuarioControl && contrasenaControl && correoControl && nombreControl && apellidoControl && direccionControl && ciudadControl && paisControl && codigoPostalControl && telefonoControl) {
      const registerData = {
        nombreUsuario: nombreUsuarioControl.value,
        contrasena: contrasenaControl.value,
        correo: correoControl.value,
        nombre: nombreControl.value,
        apellido: apellidoControl.value,
        direccion: direccionControl.value,
        ciudad: ciudadControl.value,
        pais: paisControl.value,
        codigoPostal: codigoPostalControl.value,
        telefono: telefonoControl.value
      };

      // Resto del código...
    } else {
      // Manejar el caso cuando alguno de los controles es null
    }
  } else {
    // Resto del código...
  }
}

}
