import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  themeToggle: any;

  constructor(private menu: MenuController, private router: Router) {
    console.log('Constructor llamado');
  }

  ngOnInit() {
    console.log('ngOnInit llamado');
    // Inicializa el tema oscuro como falso (tema claro)
    this.initializeDarkTheme(false);
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

}
