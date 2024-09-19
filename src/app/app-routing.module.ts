import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AdministradorComponent } from './pages/administrador/administrador.component';
import { QuestionarioComponent } from './pages/questionario/questionario.component';

const routes: Routes = [
  { path: '', redirectTo: '/Home', pathMatch: 'full' },
  { path: 'Home', component: HomeComponent },
  { path: 'Questionario', component: QuestionarioComponent },
  {  path: 'questionario', redirectTo: '/Questionario', pathMatch: 'full' },
  { path: 'Administrador', component: AdministradorComponent },
  { path: 'administrador', redirectTo: '/Administrador', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
