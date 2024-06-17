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
      avatarUrl: 'https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png',
      name: 'John Doe',
      email: 'john.doe@example.com'
    },
    {
      avatarUrl: 'https://cdn2.iconfinder.com/data/icons/circle-avatars-1/128/050_girl_avatar_profile_woman_suit_student_officer-512.png',
      name: 'Jane Smith',
      email: 'jane.smith@example.com'
    },
    {
      avatarUrl: 'https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png',
      name: 'Bob Johnson',
      email: 'bob.johnson@example.com'
    },
    // Agrega más usuarios aquí
  ];

  purchases = [
    {
      buyer: 'John Doe',
      product: 'Nike Air Max 270',
      amount: 150,
      date: new Date(),
      paymentMethod: 'Card',
      cost: 150
    },
    {
      buyer: 'Jane Smith',
      product: 'Adidas Ultraboost 21',
      amount: 180,
      date: new Date(),
      paymentMethod: 'Card',
      cost: 200
    },
    {
      buyer: 'Bob Johnson',
      product: 'Under Armour HOVR Phantom 2',
      amount: 130,
      date: new Date(),
      paymentMethod: 'Card',
      cost: 300
    },
    {
      buyer: 'Alice Williams',
      product: 'Puma Future Rider',
      amount: 80,
      date: new Date(),
      paymentMethod: 'Card',
      cost: 160
    },
    {
      buyer: 'Bob Johnson',
      product: 'Nike Air Force 1',
      amount: 90,
      date: new Date(),
      paymentMethod: 'Card',
      cost: 155
    },
    {
      buyer: 'Alice Williams',
      product: 'Adidas Stan Smith',
      amount: 80,
      date: new Date(),
      paymentMethod: 'Card',
      cost: 100
    },
    {
      buyer: 'Charlie Brown',
      product: 'Puma Suede Classic',
      amount: 70,
      date: new Date(),
      paymentMethod: 'Card',
      cost: 102
    },
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
