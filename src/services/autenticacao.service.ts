import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { tap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {
  private readonly api = `${environment.apiUrl}`;

  constructor(
    private http: HttpClient
  ) { }

  public realizarAutenticacao(Usuario: string, Senha: string) {
    return this.http.post(`${this.api}Autenticacao`, { Usuario, Senha }, { observe: "response" }).pipe(tap(res => {}));
  }
}
