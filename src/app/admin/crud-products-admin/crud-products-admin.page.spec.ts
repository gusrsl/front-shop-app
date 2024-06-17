import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrudProductsAdminPage } from './crud-products-admin.page';

describe('CrudProductsAdminPage', () => {
  let component: CrudProductsAdminPage;
  let fixture: ComponentFixture<CrudProductsAdminPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudProductsAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
