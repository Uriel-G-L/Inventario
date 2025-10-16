import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ListComponent } from './pages/list/list.component';
import { CreateComponent } from './pages/create/create.component';
import { EditComponent } from './pages/edit/edit.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListComponent,
    CreateComponent,
    EditComponent,
    ProductFormComponent
  ],
 imports: [
  CommonModule,
  ProductsRoutingModule,
  ReactiveFormsModule,
  FormsModule
],
})
export class ProductsModule { }
