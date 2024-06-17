import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PayAdminPage } from './pay-admin.page';

describe('PayAdminPage', () => {
  let component: PayAdminPage;
  let fixture: ComponentFixture<PayAdminPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PayAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
