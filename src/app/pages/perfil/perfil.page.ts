import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  usuario: any;
  editando: boolean = false;

  constructor() { }

  ngOnInit() {
    const userString = localStorage.getItem('usuario');
    if (userString) {
      this.usuario = JSON.parse(userString);
    } else {
      console.error('Usuario no encontrado en el localStorage');
    }
  }

  editarPerfil() {
    this.editando = !this.editando;
  }

  guardarPerfil() {
    // Aquí podrías añadir la lógica para guardar los cambios en el backend
    // y actualizar el localStorage con los nuevos datos
    localStorage.setItem('usuario', JSON.stringify(this.usuario));
    this.editando = false;
  }
}
