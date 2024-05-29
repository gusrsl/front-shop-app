import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage-angular';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  API_URL = environment.API_URL;
  private loggedIn = new BehaviorSubject<boolean>(false);
  private _storage: Storage | null = null;

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(private http: HttpClient, private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  userLogin(req: any){
    return this.http.post(`${this.API_URL}auth/login`,req)
      .toPromise()
      .then((response: any) => {
        if (response && response.auth) {
          this._storage?.set('token', response.token);
          this.loggedIn.next(true);
        } else {
          console.log('Error en el inicio de sesión: no se recibió el token');
        }
      })
      .catch((error) => {
        console.log('Error en el inicio de sesión', error);
      });
  }

  registerUser(user: any) {
    return this.http.post(`${this.API_URL}auth/register`, user)
      .toPromise()
      .then((response: any) => {
        if (response && response.auth) {
          this._storage?.set('token', response.token);
          this.loggedIn.next(true);
        } else {
          console.log('Error en el registro: no se recibió el token');
        }
      })
      .catch((error) => {
        console.log('Error en el registro', error);
      });
  }

  async logout() {
    await this._storage?.remove('token');
    this.loggedIn.next(false);
  }

  async getToken() {
    return await this._storage?.get('token');
  }
}
