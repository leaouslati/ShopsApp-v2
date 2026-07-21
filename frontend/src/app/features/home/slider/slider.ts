import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Product } from '../../../core/services/product';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-slider',
  imports: [],
  templateUrl: './slider.html',
  styleUrl: './slider.css',
})
export class Slider implements OnInit {
  productService = inject(Product);
  environment = environment;

  current = signal<number>(0);

  ngOnInit() {
    this.productService.getAllProducts();
  }

  next() {
    const length = this.productService.products().length;
    this.current.update(c => (c + 1) % length);
  }

  previous() {
    const length = this.productService.products().length;
    this.current.update(c => (c - 1 + length) % length);
  }

  leftIndex(): number {
    const length = this.productService.products().length;
    return (this.current() - 1 + length) % length;
  }

  rightIndex(): number {
    const length = this.productService.products().length;
    return (this.current() + 1) % length;
  }
  
  visibleSlides = computed(() => {
    const products = this.productService.products();
    if (!products.length) return [];
    return [
      { product: products[this.leftIndex()], position: 'left' },
      { product: products[this.current()], position: 'active' },
      { product: products[this.rightIndex()], position: 'right' },
    ];
  });

}
