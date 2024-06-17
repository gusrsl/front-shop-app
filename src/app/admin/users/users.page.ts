import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  users: any[] = [];

  columnDefs = [
  { field: 'nombreusuario', headerName: 'Nombre de Usuario' },
  { field: 'correo', headerName: 'Correo' },
  { field: 'nombre', headerName: 'Nombre' },
  { field: 'apellido', headerName: 'Apellido' },
  { field: 'direccion', headerName: 'Dirección' },
  { field: 'ciudad', headerName: 'Ciudad' },
  { field: 'pais', headerName: 'País' },
  { field: 'codigopostal', headerName: 'Código Postal' },
  { field: 'telefono', headerName: 'Teléfono' },
  { field: 'fechacreacion', headerName: 'Fecha de Creación' },
  { field: 'fechaactualizacion', headerName: 'Fecha de Actualización' },
  { field: 'estaactivo', headerName: 'Está Activo' },
  { field: 'type', headerName: 'Tipo' },
];

  constructor(private authService: AuthService, private alertController: AlertController) { }

  ngOnInit() {
    this.getAllUsers();
  }


  async presentAlert(error: any) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: error.error.message || 'An error occurred. Please try again.',
      buttons: ['OK']
    });

    await alert.present();
  }

  getAllUsers() {
    this.authService.getAllUsers().subscribe(
      (response) => {
        this.users = response.users; // change this line
        console.log('users alls',this.users)
      },
      (error) => {
        console.error(error);
        this.presentAlert(error);
      }
    );
  }

  createUser(user: any) {
    this.authService.createUser(user).subscribe(
      (response) => {
        this.users.push(response);
      },
      (error) => {
        console.error(error);
        this.presentAlert(error);
      }
    );
  }

  updateUser(user: any) {
    this.authService.updateUser(user).subscribe(
      (response) => {
        const index = this.users.findIndex(u => u.nombreUsuario === user.nombreUsuario);
        if (index !== -1) {
          this.users[index] = response;
        }
      },
      (error) => {
        console.error(error);
        this.presentAlert(error);
      }
    );
  }

  deleteUser(nombreUsuario: string) {
    this.authService.deleteUser(nombreUsuario).subscribe(
      (response) => {
        this.users = this.users.filter(u => u.nombreUsuario !== nombreUsuario);
      },
      (error) => {
        console.error(error);
        this.presentAlert(error);
      }
    );
  }
}
