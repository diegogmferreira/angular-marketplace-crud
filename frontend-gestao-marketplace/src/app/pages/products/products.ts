import { Component, inject, type OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { take } from 'rxjs';
import { ProductsService } from '../../services/products';

@Component({
  selector: 'app-products',
  imports: [ReactiveFormsModule],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products implements OnInit {
  products: IProductResponse[] = [];
  filteredProducts: IProductResponse[] = [];
  filterForm = new FormGroup({
    title: new FormControl(''),
    status: new FormControl(''),
    category: new FormControl(''),
  })

  private readonly _productsService = inject(ProductsService);

  ngOnInit() {
    this._productsService.getProducts().pipe(take(1)).subscribe({
      next: (res) => {
        this.products = res.data;
        this.filteredProducts = res.data;
      }
    })
  }

  applyFilter() {
    const title = this.filterForm.value.title?.toLowerCase();
    const status = this.filterForm.value.status?.toLowerCase();
    const category = this.filterForm.value.category?.toLowerCase();

    this.filteredProducts = this.products.filter((product) => 
      (!title || product.title.toLocaleLowerCase().includes(title)) &&
      (!status || product.status.toLocaleLowerCase().includes(status)) &&
      (!category || product.category.toLocaleLowerCase().includes(category))
    );
  }

  clearFilter() {
    this.filterForm.reset();
    this.filterForm.get('status')?.setValue('');
    this.filterForm.get('category')?.setValue('');
    this.applyFilter();
  }
}
