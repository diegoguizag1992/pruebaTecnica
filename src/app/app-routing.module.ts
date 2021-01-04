import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaUsuariosComponent } from './component/lista-usuarios/lista-usuarios.component';
import { UpdateUserComponent } from './component/update-user/update-user.component';

const routes: Routes = [
  {
    path: '',
    component: ListaUsuariosComponent
  },
  {
    path: 'datos',
    component: UpdateUserComponent
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
