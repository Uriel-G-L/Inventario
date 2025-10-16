import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private base = '/api/users';
  constructor(private http: HttpClient) {}
  list(): Observable<User[]> { return this.http.get<User[]>(this.base); }
  get(id: string): Observable<User> { return this.http.get<User>(`${this.base}/${id}`); }
  create(body: User): Observable<User> { return this.http.post<User>(this.base, body); }
  update(id: string, body: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.base}/${id}`, body);
  }
  remove(id: string) { return this.http.delete<void>(`${this.base}/${id}`); }
}
