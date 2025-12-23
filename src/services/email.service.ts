import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

import { IEmail } from 'src/modules/email.interface';

@Injectable({
  providedIn: 'root'
})
export class EmailService{
  private readonly api = `${environment.apiUrl}Emails`;

  constructor(
    private http: HttpClient
  ) { }

  public buscarEmails(): Observable<IEmail[]>{
    return this.http.get<IEmail[]>(this.api);
  }
}
