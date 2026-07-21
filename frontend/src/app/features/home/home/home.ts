import { Component } from '@angular/core';
import { NavBar } from '../../../shared/nav-bar/nav-bar';
import { Slider } from '../slider/slider';
import { StoreMap } from '../store-map/store-map';
import { ProductsGrid } from '../products-grid/products-grid';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  imports: [NavBar, Slider, StoreMap, ProductsGrid, TranslatePipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
