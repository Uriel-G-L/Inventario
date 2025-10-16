import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'productos', pathMatch: 'full' },
  { path: 'productos', loadChildren: () => import('./features/products/products.module').then(m => m.ProductsModule) },
  { path: 'usuarios',  loadChildren: () => import('./features/users/users.module').then(m => m.UsersModule) },
  { path: '**', redirectTo: 'productos' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
