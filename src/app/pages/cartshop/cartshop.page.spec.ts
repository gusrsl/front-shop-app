import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartshopPage } from './cartshop.page';

describe('CartshopPage', () => {
  let component: CartshopPage;
  let fixture: ComponentFixture<CartshopPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CartshopPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
