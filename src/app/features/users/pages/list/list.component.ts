import { Component } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  users$: Observable<User[]> = this.api.list();
  constructor(private api: UsersService) {}

  refresh(){ this.users$ = this.api.list(); }

  remove(u: User){
    if(!u.id) return;
    if(confirm(`¿Eliminar usuario ${u.nombre}?`)){
      this.api.remove(u.id).subscribe(()=> this.refresh());
    }
  }
}
