import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { NuevoMensajeComponent } from './componentes/nuevo-mensaje/nuevo-mensaje.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { AuthGuard } from './guardas/auth.guard';

const routes: Routes = [
  {path:'', component: LoginComponent , pathMatch: 'full'},
  {path:'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path:'nuevoMemorando', component: NuevoMensajeComponent, canActivate: [AuthGuard]},
  {path:'nuevoUsuario', component: RegistroComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
