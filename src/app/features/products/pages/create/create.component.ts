import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Product } from 'src/app/shared/models/product';

@Component({
  selector: 'app-create-product',
  template: `
    <div class="flex-between"><h2>Nuevo producto</h2></div>
    <app-product-form (save)="onSave($event)"></app-product-form>
  `
})
export class CreateComponent {
  constructor(private api: ProductsService, private router: Router) {}
  onSave(p: Product) { this.api.create(p).subscribe(() => this.router.navigate(['/productos'])); }
}
