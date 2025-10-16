import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators, AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { timer, switchMap, map, of } from 'rxjs';
import { Product } from 'src/app/shared/models/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  @Input() initial?: Product;
  @Input() editing = false; // si true, SKU queda readonly
  @Output() save = new EventEmitter<Product>();

  form = this.fb.group({
    sku: ['', {
      validators: [Validators.required, Validators.minLength(3)],
      asyncValidators: [this.uniqueSkuValidator()],
      updateOn: 'blur'
    }],
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    descripcion: [''],
    costo: [0, [Validators.required, Validators.min(0)]],
  });

  constructor(private fb: FormBuilder, private products: ProductsService) {}

  ngOnInit(): void {
    if (this.initial) {
      this.form.patchValue(this.initial);
      if (this.editing) this.form.get('sku')?.disable();
    }
  }

  private uniqueSkuValidator(): AsyncValidatorFn {
    return (ctrl: AbstractControl) => {
      const value = (ctrl.value || '').toString().trim();
      if (!value || this.editing) return of(null); // no valida duplicado en edición
      return timer(250).pipe(
        switchMap(() => this.products.existsSku(value)),
        map(exists => exists ? { skuTaken: true } : null)
      );
    };
  }

  submit() {
    if (this.form.valid) {
      const value: Product = { ...(this.initial || {}), ...this.form.getRawValue() as Product };
      this.save.emit(value);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
