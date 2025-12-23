import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AdministradorComponent } from './pages/administrador/administrador.component';
import { QuestionarioComponent } from './pages/questionario/questionario.component';
import { LgpdComponent } from './pages/lgpd/lgpd.component';
import { EmailFalsoComponent } from './pages/email-falso/email-falso.component';
import { RelatoriosTreinamentoComponent } from './pages/relatorios-treinamento/relatorios-treinamento.component';
import { PhishingComponent } from './pages/phishing/phishing.component';
import { NovoPhishingComponent } from './pages/novo-phishing/novo-phishing.component';
import { EmailsComponent } from './pages/emails/emails.component';
import { FormularioEmailComponent } from './pages/formulario-email/formulario-email.component';

const routes: Routes = [
  { path: '', redirectTo: '/Home', pathMatch: 'full' },
  { path: 'Home', component: HomeComponent },
  { path: 'Questionario', component: QuestionarioComponent },
  { path: 'questionario', redirectTo: '/Questionario', pathMatch: 'full' },
  { path: 'Administrador', component: AdministradorComponent },
  { path: 'administrador', redirectTo: '/Administrador', pathMatch: 'full' },
  { path: 'RelatoriosTreinamento', component: RelatoriosTreinamentoComponent },
  { path: 'Phishing', component: PhishingComponent },
  { path: 'Phishing/Novo', component: NovoPhishingComponent },
  { path: 'LGPD', component: LgpdComponent },
  { path: 'EmailFalso/:usuario/:campanha', component: EmailFalsoComponent },
  { path: 'Emails', component: EmailsComponent },
  { path: 'Emails/Novo', component: FormularioEmailComponent },
  { path: 'Emails/Visualizar/:EmailID', component: FormularioEmailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
