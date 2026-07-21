import { Component, input, output, signal, OnInit, OnDestroy } from '@angular/core';
import { IProduct } from '../../../core/interfaces/IProduct';
import { environment } from '../../../../environments/environment';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ecommerce-product-card',
  imports: [ReactiveFormsModule],
  templateUrl: './ecommerce-product-card.html',
  styleUrl: './ecommerce-product-card.css',
})
export class EcommerceProductCard implements OnInit, OnDestroy {
  product = input.required<IProduct>();
  environment = environment;

  quantityControl = new FormControl(0, { nonNullable: true });
  checked = signal(false);

  orderChange = output<{ product: IProduct; quantity: number; checked: boolean }>();

  private quantitySubscription?: Subscription;

  ngOnInit() {
    this.quantitySubscription = this.quantityControl.valueChanges.subscribe(() => {
      this.emitChange();
    });
  }

  ngOnDestroy() {
    this.quantitySubscription?.unsubscribe();
  }

  increment() {
    this.quantityControl.setValue(this.quantityControl.value + 1);
  }

  decrement() {
    if (this.quantityControl.value === 0) return;
    this.quantityControl.setValue(this.quantityControl.value - 1);
  }

  toggleChecked() {
    this.checked.update(c => !c);
    if(!this.checked())
    this.quantityControl.setValue(0);
    this.emitChange();
  }

  emitChange() {
    const prod = this.product();
    const qty = this.quantityControl.value;
    const check = this.checked();
    this.orderChange.emit({ product: prod, quantity: qty, checked: check });
  }
}