import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PedidosrepPage } from './pedidosrep.page';

describe('PedidosrepPage', () => {
  let component: PedidosrepPage;
  let fixture: ComponentFixture<PedidosrepPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidosrepPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
