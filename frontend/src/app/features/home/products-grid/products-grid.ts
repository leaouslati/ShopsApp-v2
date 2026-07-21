import { Component, inject, OnInit, signal } from '@angular/core';
import { Auth } from '../../../core/services/auth';
import { Product } from '../../../core/services/product';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { IProduct } from '../../../core/interfaces/IProduct';
import { MatDialog } from '@angular/material/dialog';
import { AddProductDialog } from '../../../shared/modal-shell/add-product-dialog/add-product-dialog';
import { EditProductDialog } from '../../../shared/modal-shell/edit-product-dialog/edit-product-dialog';
import { DeleteModalDialog } from '../../../shared/modal-shell/delete-modal-dialog/delete-modal-dialog';

@Component({
  selector: 'app-products-grid',
  imports: [],
  templateUrl: './products-grid.html',
  styleUrl: './products-grid.css',
})
export class ProductsGrid implements OnInit {
  dialog = inject(MatDialog);
  auth = inject(Auth);
  productService = inject(Product);
  router = inject(Router);
  environment = environment;

  ngOnInit() {
    this.productService.getAllProducts();
  }

  navigateToProduct(product: IProduct) {
    this.router.navigate(['/products', product.id]);
  }

  showAddProductModal() {
    this.dialog.open(AddProductDialog, { backdropClass: 'blurred-backdrop', width: '520px' });
  }

  openEditDialog(product: IProduct) {
    this.dialog.open(EditProductDialog, {
      data: product,
      width: '480px',
      backdropClass: 'blurred-backdrop',
    });
  }

  openDeleteDialog(product: IProduct){
    this.dialog.open(DeleteModalDialog,{
      data:product,
      backdropClass: 'blurred-backdrop',
    })
  }
}

