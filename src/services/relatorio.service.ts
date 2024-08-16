import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

import { IRelatorio } from 'src/modules/relatorio.interface';

@Injectable({
  providedIn: 'root'
})
export class RelatorioService {
  private readonly api = `${environment.apiUrl}RelatoriosTreinamento`;

  constructor(
    private http: HttpClient
  ) { }

  public buscarRelatorio(): Observable<IRelatorio[]> {
    return this.http.get<IRelatorio[]>(this.api);
  }

  public buscarRelatorioColaborador(colaboradorID: string): Observable<IRelatorio[]> {
    return this.http.get<IRelatorio[]>(`${this.api}/${colaboradorID}`);
  }
}
