import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Product } from 'src/app/shared/models/product';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-edit-product',
  template: `
    <div class="flex-between"><h2>Editar producto</h2></div>
    <app-product-form *ngIf="product"
                      [initial]="product"
                      [editing]="true"
                      (save)="onSave($event)">
    </app-product-form>
  `
})
export class EditComponent implements OnInit {
  product?: Product;
  constructor(private route: ActivatedRoute, private api: ProductsService, private router: Router) {}
  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap(p => this.api.get(p.get('id')!))
    ).subscribe(prod => this.product = prod);
  }
  onSave(p: Product) { this.api.update(this.product!.id!, p).subscribe(() => this.router.navigate(['/productos'])); }
}
