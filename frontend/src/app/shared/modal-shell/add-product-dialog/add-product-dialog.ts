import { Component, inject, signal } from '@angular/core';
import { MatDialogRef, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Product } from '../../../core/services/product';

@Component({
  selector: 'app-add-product-dialog',
  imports: [ReactiveFormsModule, MatDialogContent, MatDialogTitle, TranslatePipe],
  templateUrl: './add-product-dialog.html',
  styleUrl: './add-product-dialog.css',
})
export class AddProductDialog {
  dialogRef = inject(MatDialogRef<AddProductDialog>);
  productService = inject(Product);
  translate = inject(TranslateService);

  selectedImage = signal<File | null>(null);
  imageError = signal<string>('');
  addProductError = signal<string>('');
  isLoading = signal<boolean>(false);

  addProductForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    price: new FormControl<number | null>(null, [Validators.required, Validators.min(0.01)])
  });

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImage.set(input.files[0]);
      this.imageError.set('');
    }
  }

  onSubmit() {
    if (this.addProductForm.invalid || !this.selectedImage()) {
      if (!this.selectedImage()) {
        this.imageError.set(this.translate.instant('ADD_PRODUCT.IMAGE_REQUIRED'));
      }
      return;
    }

    const { title, description, price } = this.addProductForm.value;
    this.isLoading.set(true);
    this.productService.addProduct(title!, description!, price!, this.selectedImage()!).subscribe({
      next: () => {
        this.dialogRef.close();
      },
      error: () => {
        this.isLoading.set(false);
        this.addProductError.set(this.translate.instant('ADD_PRODUCT.FAILED'));
      },
    });
  }
}
