import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-user-edit',
  template: `
    <h2>Editar usuario</h2>
    <form [formGroup]="form" (ngSubmit)="submit()" class="grid">
      <label>Nombre <input class="input" formControlName="nombre" /></label>
      <label>Correo <input type="email" class="input" formControlName="correo" /></label>
      <label>Rol
        <select class="input" formControlName="rol">
          <option value="OPERADOR">Operador</option>
          <option value="SUPERADMIN">Super Admin</option>
        </select>
      </label>
      <label>Contraseña (opcional) <input type="password" class="input" formControlName="password" /></label>
      <button class="btn" type="submit">Guardar cambios</button>
    </form>
  `
})
export class EditComponent implements OnInit {
  userId!: string;
  form = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    correo: ['', [Validators.required, Validators.email]],
    rol: ['OPERADOR', Validators.required],
    password: ['']
  });
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private api: UsersService, private router: Router) {}
  ngOnInit(){
    this.route.paramMap.pipe(switchMap(p => this.api.get(p.get('id')!))).subscribe(u => {
      this.userId = (u as any).id;
      this.form.patchValue(u);
      this.form.get('password')?.reset(''); // password opcional
    });
  }
  submit(){ if(this.form.valid){ this.api.update(this.userId, this.form.value as any).subscribe(()=> this.router.navigate(['/usuarios'])); } }
}

