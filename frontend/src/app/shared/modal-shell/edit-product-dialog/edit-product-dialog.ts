import { Component, inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Product } from '../../../core/services/product';

@Component({
  selector: 'app-edit-product-dialog',
  imports: [ReactiveFormsModule, MatDialogContent, MatDialogTitle, TranslatePipe],
  templateUrl: './edit-product-dialog.html',
  styleUrl: './edit-product-dialog.css',
})
export class EditProductDialog {
  dialogRef = inject(MatDialogRef<EditProductDialog>);
  productService = inject(Product);
  product = inject(MAT_DIALOG_DATA);
  translate = inject(TranslateService);

  selectedImage = signal<File | null>(null);
  previewUrl = signal<string | null>(null);
  editProductError = signal<string>('');
  isLoading = signal<boolean>(false);

  editProductForm = new FormGroup({
    title: new FormControl(this.product.title, [Validators.required]),
    description: new FormControl(this.product.description, [Validators.required]),
    price: new FormControl<number | null>(this.product.price, [Validators.required, Validators.min(0.01)]),
  });

  onZoomImage() {
    window.open(this.previewUrl() ?? this.product.image_path, '_blank');
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImage.set(input.files[0]);
      this.previewUrl.set(URL.createObjectURL(input.files[0]));
    }
  }

  onSubmit() {
    if (this.editProductForm.invalid) return;

    this.isLoading.set(true);
    const { title, description, price } = this.editProductForm.value;

    this.productService.updateProduct(
      this.product.id,
      title!,
      description!,
      price!,
      this.selectedImage()
    ).subscribe({
      next: () => {
        this.dialogRef.close();
      },
      error: () => {
        this.isLoading.set(false);
        this.editProductError.set(this.translate.instant('EDIT_PRODUCT.FAILED'));
      },
    });
  }
}
