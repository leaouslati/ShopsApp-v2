import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../core/services/product';
import { environment } from '../../../environments/environment';
import { EcommerceProductCard } from './ecommerce-product-card/ecommerce-product-card';
import { IProduct } from '../../core/interfaces/IProduct';
import { NavBar } from '../../shared/nav-bar/nav-bar';
import { TranslatePipe } from '@ngx-translate/core';
@Component({
  selector: 'app-ecommerce',
  imports: [RouterLink, EcommerceProductCard, NavBar, TranslatePipe],
  templateUrl: './ecommerce.html',
  styleUrl: './ecommerce.css',
})
export class Ecommerce implements OnInit {

  productService = inject(Product);
  environment = environment;

  cart = signal<{ product: IProduct; quantity: number }[]>([]);
  totalQty=computed(()=>this.cart().reduce((sum,i)=>sum+i.quantity,0));
  totalPrice  = computed(()=>this.cart().reduce((sum,i)=>sum+i.quantity*i.product.price,0));
  
  ngOnInit() {
    this.productService.getAllProducts();
  }

  handleOrderChange(change: { product: IProduct; quantity: number; checked: boolean; }) {
    const existing = this.cart().find(entry => entry.product.id === change.product.id);
    if (!change.checked) {
      this.cart.update(c => c.filter(o=>o.product.id!==change.product.id));
    }
    else if(existing){
      if(change.quantity===0){
        this.cart.update(c => c.filter(o=>o.product.id!==change.product.id));
      } else {
        this.cart.update(c=>c.map(o=>(o.product.id===change.product.id)?{product:change.product,quantity:change.quantity}:o));
      }
    }
    else{
      this.cart.update(c=>[...c,{product:change.product,quantity:change.quantity}]);
    }
  }
}
