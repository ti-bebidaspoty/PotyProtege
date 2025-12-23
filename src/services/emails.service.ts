import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

import { IEmailsView, IEmailsForm } from 'src/modules/emails.interface';

@Injectable({
  providedIn: 'root'
})
export class EmailsService {
  private readonly api = `${environment.apiUrl}Emails`;

  constructor(
    private http: HttpClient
  ) { }

  public buscarEmails(): Observable<IEmailsView[]> {
    return this.http.get<IEmailsView[]>(this.api);
  }

  public buscarEmail(emailID: string): Observable<IEmailsView> {
    return this.http.get<IEmailsView>(`${this.api}/${emailID}`);
  }

  public criarEmail(email: IEmailsForm): Observable<any> {
    return this.http.post<any>(this.api, email);
  }

  public editarEmail(emailID: string, email: IEmailsForm): Observable<any> {
    return this.http.put<any>(`${this.api}/${emailID}`, email);
  }

  public excluirEmail(emailID: string): Observable<any> {
    return this.http.delete<any>(`${this.api}/${emailID}`);
  }
}
