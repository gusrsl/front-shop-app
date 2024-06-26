/* eslint-disable no-trailing-spaces */
import { Component, OnInit, AfterViewInit, TemplateRef } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Swiper } from 'swiper';
import { NgIfContext } from '@angular/common';
import { UserDataService } from '../services/userdata.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, AfterViewInit {
  subscriberEmail: any = '';

  featuredProducts: any[] = [
    {
      name: 'Nike Air Max',
      image: 'https://via.placeholder.com/300?text=Nike+Air+Max',
      description: 'Las Nike Air Max ofrecen una comodidad superior y un estilo icónico.'
    },
    {
      name: 'Adidas Ultraboost',
      image: 'https://via.placeholder.com/300?text=Adidas+Ultraboost',
      description: 'Las Adidas Ultraboost proporcionan una amortiguación excepcional y una respuesta rápida.'
    },
    {
      name: 'Puma RS-X',
      image: 'https://via.placeholder.com/300?text=Puma+RS-X',
      description: 'Las Puma RS-X combinan un diseño retro con tecnología moderna para un rendimiento máximo.'
    },
    {
      name: 'Reebok Classic',
      image: 'https://via.placeholder.com/300?text=Reebok+Classic',
      description: 'Las Reebok Classic son un símbolo de estilo atemporal y comodidad diaria.'
    }
  ];
  specialOffers: any[] = [
    {
      name: 'Nike Zoom',
      image: 'https://via.placeholder.com/300?text=Nike+Zoom',
      description: 'Descuento del 20% en todas las Nike Zoom durante esta semana.'
    },
    {
      name: 'Adidas NMD',
      image: 'https://via.placeholder.com/300?text=Adidas+NMD',
      description: 'Compra las Adidas NMD con un 15% de descuento, solo por tiempo limitado.'
    },
    {
      name: 'Puma Suede',
      image: 'https://via.placeholder.com/300?text=Puma+Suede',
      description: 'Aprovecha un 25% de descuento en las clásicas Puma Suede.'
    },
    {
      name: 'Reebok Nano',
      image: 'https://via.placeholder.com/300?text=Reebok+Nano',
      description: 'Oferta especial: 30% de descuento en las Reebok Nano.'
    }
  ];
  customerTestimonials: any[] = [
    {
      name: 'Juan Pérez',
      title: 'Excelente calidad',
      feedback: 'Compré unos zapatos Nike Air Max y la calidad es impresionante. Muy cómodos y estilizados.'
    },
    {
      name: 'María López',
      title: 'Servicio rápido',
      feedback: 'El envío fue muy rápido y los zapatos llegaron en perfecto estado. Muy satisfecha con mi compra.'
    },
    {
      name: 'Carlos García',
      title: 'Gran variedad',
      feedback: 'Me encanta la variedad de productos que ofrecen. Encontré exactamente lo que buscaba.'
    },
    {
      name: 'Ana Martínez',
      title: 'Altamente recomendado',
      feedback: 'Los productos son de alta calidad y el servicio al cliente es excelente. Recomiendo esta tienda a todos.'
    }
  ];

  subscribeToNewsletter() {
  throw new Error('Method not implemented.');
  }

  isLoggedIn: boolean | undefined;

  newReleases = [
    {
      brand: 'Nike',
      name: 'Air Max 2022',
      image: 'https://f.fcdn.app/imgs/3f89c3/www.globalsports.com.uy/gls/d7a9/original/catalogo/NKDM9538-1363-1/1500-1500/nike-air-max-systm-white.jpg',
      description: 'El último modelo de Air Max, perfecto para correr y caminar.'
    },
    {
      brand: 'Adidas',
      name: 'Ultra Boost 2022',
      image: 'https://assets.adidas.com/images/w_1880,f_auto,q_auto/a0b40ded7f464b9b8b44aef900bbae6a_9366/HP9930_01_standard.jpg',
      description: 'El nuevo Ultra Boost ofrece comodidad y estilo en un solo paquete.'
    },
    {
      brand: 'Puma',
      name: 'Ignite 2022',
      image: 'https://golftime.es/16827-large_default/zapatos-puma-ignite-lady-junior-blanco-2022.jpg',
      description: 'El Ignite 2022 es el zapato perfecto para cualquier actividad deportiva.'
    },
    {
      brand: 'Nike',
      name: 'Air Max 2022',
      image: 'https://f.fcdn.app/imgs/3f89c3/www.globalsports.com.uy/gls/d7a9/original/catalogo/NKDM9538-1363-1/1500-1500/nike-air-max-systm-white.jpg',
      description: 'El último modelo de Air Max, perfecto para correr y caminar.'
    }
  ];

  images = ['assets/slider1.png', 'assets/slider2.jpg'];
  products = [
    {image: 'product1.png', name: 'Product 1', price: 100, inventoryStatus: 'In Stock'},
    {image: 'product2.png', name: 'Product 2', price: 200, inventoryStatus: 'Low Stock'},
    {image: 'product3.png', name: 'Product 3', price: 300, inventoryStatus: 'Out of Stock'}
  ];
  responsiveOptions = [
    {
      breakpoint: '1199px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '991px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '767px',
      numVisible: 1,
      numScroll: 1
    }
  ];
    notLoggedIn: any
  userData: any;

  constructor(private authService: AuthService, private userDataService: UserDataService) { }

  ngOnInit() {
    this.authService.isLoggedIn.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
    });

      // Obtiene la data del usuario
  this.userData = this.userDataService.getUserData();

  // Ahora puedes usar userData
  console.log(this.userData);
  }

getSeverity(status: string): "success" | "warning" | "danger" {
  switch (status) {
    case 'INSTOCK':
      return 'success';
    case 'LOWSTOCK':
      return 'warning';
    case 'OUTOFSTOCK':
      return 'danger';
    default:
      return 'danger'; // valor por defecto
  }
}

ngAfterViewInit() {
    new Swiper('.swiper-container', {
      direction: 'horizontal',
      loop: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      scrollbar: {
        el: '.swiper-scrollbar',
      },
      pagination: {  // Agrega esta opción
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
      },
    });
  }
}
