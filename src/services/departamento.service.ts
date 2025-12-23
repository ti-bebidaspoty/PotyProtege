import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

import { IDepartamento } from 'src/modules/departamento.interface';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {
  private readonly api = `${environment.apiUrl}Departamentos`;

  constructor(
    private http: HttpClient
  ) { }

  public BuscarDepartamentos(): Observable<IDepartamento[]> {
    return this.http.get<IDepartamento[]>(this.api);
  }
}
