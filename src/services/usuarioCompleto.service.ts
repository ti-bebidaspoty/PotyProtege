import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

import { IColaborador, ITreinamentoCompleto } from 'src/modules/usuarioCompleto.interface';

@Injectable({
  providedIn: 'root'
})
export class TreinamentoCompletoService {
  private readonly api = `${environment.apiUrl}`;

  constructor(
    private http: HttpClient
  ) { }

  public gravarTreinamento(treinamentoCompleto: ITreinamentoCompleto): Observable<any> {
    return this.http.post<any>(`${this.api}TreinamentoSeguranca`, treinamentoCompleto);
  }

  public buscarColaboradores(): Observable<IColaborador[]> {
    return this.http.get<IColaborador[]>(`${this.api}Colaboradores`);
  }

}
