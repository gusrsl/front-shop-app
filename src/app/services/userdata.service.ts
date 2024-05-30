import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private userData: any;

  constructor(private storage: Storage) { }

  setUserData(data: any) {
    this.userData = data;
  }

  async getUserData() {
    if (this.userData) {
      return this.userData;
    }

    // Intenta obtener la data del usuario del localStorage
    const localStorageData = localStorage.getItem('usuario');
    if (localStorageData) {
      this.userData = JSON.parse(localStorageData);
      return this.userData;
    }

    // Intenta obtener la data del usuario del Storage de Ionic
    const ionicStorageData = await this.storage.get('usuario');
    if (ionicStorageData) {
      this.userData = JSON.parse(ionicStorageData);
      return this.userData;
    }

    // Si no se encontró la data del usuario, devuelve null
    return null;
  }

  clearUserData() {
    this.userData = null;
  }
}
