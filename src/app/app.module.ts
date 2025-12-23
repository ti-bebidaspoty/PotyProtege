import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { RodapeComponent } from "./components/rodape/rodape.component";
import { AdministradorComponent } from './pages/administrador/administrador.component';
import { QuestionarioComponent } from './pages/questionario/questionario.component';
import { LgpdComponent } from './pages/lgpd/lgpd.component';
import { EmailFalsoComponent } from './pages/email-falso/email-falso.component';
import { RelatoriosTreinamentoComponent } from './pages/relatorios-treinamento/relatorios-treinamento.component';
import { PhishingComponent } from './pages/phishing/phishing.component';
import { NovoPhishingComponent } from './pages/novo-phishing/novo-phishing.component';
import { CabecalhoTreinamentoComponent } from './components/cabecalho-treinamento/cabecalho-treinamento.component';
import { EmailsComponent } from './pages/emails/emails.component';
import { FormularioEmailComponent } from './pages/formulario-email/formulario-email.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RodapeComponent,
    AdministradorComponent,
    QuestionarioComponent,
    LgpdComponent,
    EmailFalsoComponent,
    RelatoriosTreinamentoComponent,
    PhishingComponent,
    NovoPhishingComponent,
    CabecalhoTreinamentoComponent,
    EmailsComponent,
    FormularioEmailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    NgSelectModule,
    NgxPaginationModule
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
