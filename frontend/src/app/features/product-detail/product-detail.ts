import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Product } from '../../core/services/product';
import {environment} from '../../../environments/environment';
import { NavBar } from '../../shared/nav-bar/nav-bar';
import { TranslatePipe } from '@ngx-translate/core';
@Component({
  selector: 'app-product-detail',
  imports: [RouterLink, NavBar, TranslatePipe],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail implements OnInit, OnDestroy {
  productService=inject(Product);
  private route = inject(ActivatedRoute);

  environment=environment;


  ngOnInit(){
    const idParam = this.route.snapshot.paramMap.get('id');
    this.productService.getProductById(Number(idParam));
  }

  ngOnDestroy(){
    this.productService.currentProduct.set(null);
  }
}
