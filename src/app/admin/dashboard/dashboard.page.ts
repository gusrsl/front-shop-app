import { AfterViewInit, Component } from '@angular/core';
import { Chart, LinearScale, LineController, PointElement, LineElement, CategoryScale, BarController, BarElement, TimeScale } from 'chart.js';
import { CartService } from 'src/app/services/paymentdata.service';
import 'chartjs-adapter-date-fns';

Chart.register(LinearScale, TimeScale, LineController, PointElement, LineElement, CategoryScale, BarController, BarElement);

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

  paymentIntents: any[] = [];
  charges: any[] = [];

  constructor(private cartService: CartService) { }

  async ngAfterViewInit() {
    await this.loadPaymentIntents();
    await this.loadCharges();
  }

  async loadPaymentIntents() {
     await this.cartService.getAllPaymentIntents().subscribe(data => {
      console.log(data)
      this.paymentIntents = [(data as any).data];
      console.log(this.paymentIntents);
      this.createSalesChart();
    });
  }

  async loadCharges() {
    await this.cartService.getAllCharges().subscribe(data => {
      console.log(data)
      this.charges = [(data as any).data];
      console.log(this.charges);
      this.createUserStatsChart();
    });
  }



  createSalesChart() {
    if (this.paymentIntents.length === 0) {
      console.error('No payment intents data available.');
      return;
    }

    const salesData = this.paymentIntents[0].map((intent: { created: number; amount: number; }) => ({
      x: new Date(intent.created * 1000),
      y: intent.amount / 100 // Convertir a dólares si es necesario
    }));

    console.log('Sales data:', salesData)

    new Chart('salesChart', {
      type: 'line',
      data: {
        datasets: [{
          label: 'Ventas',
          data: salesData,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'month'
            }
          },
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  createUserStatsChart() {
    if (this.charges.length === 0) {
      console.error('No charges data available.');
      return;
    }

    const userStatsData = this.charges[0].map((charge: { created: number; amount: number; }) => ({
      x: new Date(charge.created * 1000),
      y: charge.amount / 100 // Convertir a dólares si es necesario
    }));

    console.log('User stats data:', userStatsData)

    new Chart('userStatsChart', {
      type: 'bar',
      data: {
        datasets: [{
          label: 'Cargos',
          data: userStatsData,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'day'
            }
          },
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
