import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PedidosUserPage } from './pedidos-user.page';

describe('PedidosUserPage', () => {
  let component: PedidosUserPage;
  let fixture: ComponentFixture<PedidosUserPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidosUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
