import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {
  submitting = false;

  form = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    correo: ['', [Validators.required, Validators.email]],
    rol: ['OPERADOR', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]], // 👈 mínimo 6
  });

  constructor(private fb: FormBuilder, private api: UsersService, private router: Router) {}

  submit(){
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }

    this.submitting = true;
    this.api.create(this.form.value as any).subscribe({
      next: () => this.router.navigate(['/usuarios']),
      error: (e) => { console.error('POST /api/users falló', e); this.submitting = false; },
      complete: () => this.submitting = false
    });
  }
}
