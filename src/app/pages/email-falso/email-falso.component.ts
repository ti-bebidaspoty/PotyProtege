import { IEmailFalso } from './../../../modules/emailFalso.interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmailFalsoService } from 'src/services/emailFalso.service';

@Component({
  selector: 'app-email-falso',
  templateUrl: './email-falso.component.html',
  styleUrl: './email-falso.component.scss'
})
export class EmailFalsoComponent implements OnInit {
  protected usuarioUrl = this.activatedRoute.snapshot.url[1].path;
  protected campanhaUrl = this.activatedRoute.snapshot.url[2].path;

  constructor(
    private emailFalsoService: EmailFalsoService,
    private activatedRoute: ActivatedRoute
  ) {}

  async ngOnInit(): Promise<void> {
    const getFormattedDate = (): string => {
      const now = new Date();

      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      const milliseconds = String(now.getMilliseconds()).padStart(3, '0');

      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
    };

    const cadastroPhishing: IEmailFalso = {
      Email: this.usuarioUrl,
      Campanha: this.campanhaUrl,
      DataHora: getFormattedDate()
    }

    await this.emailFalsoService.cadastrarPhishing(cadastroPhishing).subscribe(() => {}, error => {
      alert(error);
    });
  }
}
