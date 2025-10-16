export type UserRole = 'SUPERADMIN' | 'OPERADOR';

export interface User {
  id?: string;
  nombre: string;
  correo: string;
  rol: UserRole;
  password?: string;
}
