import { Component, inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent } from '@angular/material/dialog';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Product } from '../../../core/services/product';

@Component({
  selector: 'app-delete-product-dialog',
  imports: [MatDialogContent, TranslatePipe],
  templateUrl: './delete-modal-dialog.html',
  styleUrl: './delete-modal-dialog.css',
})
export class DeleteModalDialog {
  dialogRef = inject(MatDialogRef<DeleteModalDialog>);
  productService = inject(Product);
  product = inject(MAT_DIALOG_DATA);
  translate = inject(TranslateService);

  deleteError = signal<string>('');
  isLoading = signal<boolean>(false);

  onDelete() {
    this.isLoading.set(true);

    this.productService.deleteProduct(this.product.id).subscribe({
      next: () => {
        this.dialogRef.close();
      },
      error: () => {
        this.isLoading.set(false);
        this.deleteError.set(this.translate.instant('DELETE_PRODUCT.FAILED'));
      },
    });
  }
}
