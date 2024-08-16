import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { RodapeComponent } from "./components/rodape/rodape.component";
import { AdministradorComponent } from './pages/administrador/administrador.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RodapeComponent,
    AdministradorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    NgSelectModule
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
