// reemplaza el archivo si aún no lo tienes así
import { Component } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Observable } from 'rxjs';
import { Product } from 'src/app/shared/models/product';

@Component({
  selector: 'app-products-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  products$: Observable<Product[]> = this.api.list();
  constructor(private api: ProductsService) {}

  refresh(){ this.products$ = this.api.list(); }

  remove(p: Product){
    if(!p.id) return;
    if(confirm(`¿Eliminar producto ${p.nombre} (${p.sku})?`)){
      this.api.remove(p.id).subscribe(() => this.refresh());
    }
  }
}
