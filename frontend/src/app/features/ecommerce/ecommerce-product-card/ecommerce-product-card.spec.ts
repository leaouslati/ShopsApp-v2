import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcommerceProductCard } from './ecommerce-product-card';

describe('EcommerceProductCard', () => {
  let component: EcommerceProductCard;
  let fixture: ComponentFixture<EcommerceProductCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EcommerceProductCard],
    }).compileComponents();

    fixture = TestBed.createComponent(EcommerceProductCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
