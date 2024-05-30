/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Chart, LinearScale, LineController, PointElement, LineElement, CategoryScale, BarController, BarElement } from 'chart.js';

Chart.register(LinearScale);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements AfterViewInit {

  users = [
    {
      avatarUrl: 'https://ionicframework.com/docs/demos/api/avatar/avatar.svg',
      name: 'Usuario 1',
      email: 'usuario1@example.com'
    },
    {
      avatarUrl: 'https://ionicframework.com/docs/demos/api/avatar/avatar.svg',
      name: 'Usuario 2',
      email: 'usuario2@example.com'
    },
    {
      avatarUrl: 'https://ionicframework.com/docs/demos/api/avatar/avatar.svg',
      name: 'Usuario 3',
      email: 'usuario3@example.com'
    },
    // Agrega más usuarios aquí
  ];

  constructor() { }

  ngAfterViewInit() {
    Chart.register(LinearScale, LineController, PointElement, LineElement, CategoryScale, BarController, BarElement);

    // Crea el gráfico de ventas
    let salesChart = new Chart('salesChart', {
      type: 'line',
      data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
        datasets: [{
          label: 'Ventas',
          data: [10, 20, 30, 40, 50],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    // Crea el gráfico de estadísticas de usuarios
    let userStatsChart = new Chart('userStatsChart', {
      type: 'bar',
      data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
        datasets: [{
          label: 'Usuarios',
          data: [50, 60, 70, 80, 90],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

}
