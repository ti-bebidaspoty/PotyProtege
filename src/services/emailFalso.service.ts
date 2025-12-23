import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';

import { IEmailFalso, IEmailPhishing, IRelatorioPhishing } from 'src/modules/emailFalso.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailFalsoService {
  private readonly api = `${environment.apiUrl}EnviarEmail`;

  constructor(
    private http: HttpClient
  ) { }

  public cadastrarPhishing(phishing: IEmailFalso) {
    return this.http.post(`${this.api}/CadastrarPhishing`, phishing);
  }

  public buscarRelatorioPhishing(): Observable<IRelatorioPhishing[]> {
    return this.http.get<IRelatorioPhishing[]>(`${this.api}/RelatoriosPhishing`);
  }

  public enviarEmailPhishing(phishing: IEmailPhishing) {
    return this.http.post(`${this.api}/EnviarPhishing`, phishing);
  }

  public excluirCampanha(campanha: string) {
    return this.http.delete(`${this.api}/${campanha}`);
  }
}
