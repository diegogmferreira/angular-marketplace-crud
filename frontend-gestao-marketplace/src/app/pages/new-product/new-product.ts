import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { take } from 'rxjs';
import { ProductsService } from '../../services/products';

@Component({
  selector: 'app-new-product',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './new-product.html',
  styleUrl: './new-product.css'
})
export class NewProduct {
  successMessage = '';
  productImageBase64 = '';
  productForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    price: new FormControl(0, [Validators.required]),
    description: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
  })

  private readonly _productService = inject(ProductsService);

  saveProduct() {
    if (this.productForm.invalid && !this.productImageBase64) return;

    const newProduct:INewProductRequest = {
      title: this.productForm.value.title ?? '',
      description: this.productForm.value.description ?? '',
      price: this.productForm.value.price ?? 0,
      category: this.productForm.value.category ?? '',
      imageBase64: this.productImageBase64
    } 

    this._productService.saveProduct(newProduct).pipe(take(1)).subscribe({
      next: (res) => {
        this.successMessage = res.message;
      }
    });
  }

  onSelectFile(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      this.convertFileToBase64(file);
    }
  }

  convertFileToBase64(file: File) {
    const reader = new FileReader();

    reader.onload = (e) => {
      const base64 = (e.target as FileReader).result as string;

      this.productImageBase64 = base64;
    }

    reader.onerror = (_) => {
      this.productImageBase64 = '';
    }

    reader.readAsDataURL(file);
  }
}
