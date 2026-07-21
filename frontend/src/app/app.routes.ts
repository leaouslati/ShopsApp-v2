import { Routes } from '@angular/router';
import { Home } from './features/home/home/home';
import { Ecommerce } from './features/ecommerce/ecommerce';
import { ProductDetail } from './features/product-detail/product-detail';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'ecommerce', component: Ecommerce },
 { path: 'products/:id', component: ProductDetail },
 
];