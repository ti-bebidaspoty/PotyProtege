import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IEmailsView } from 'src/modules/emails.interface';
import { EmailsService } from 'src/services/emails.service';

@Component({
  selector: 'app-emails',
  templateUrl: './emails.component.html',
  styleUrl: './emails.component.scss'
})
export class EmailsComponent implements OnInit {
  protected relatorio: IEmailsView[] = [];
  protected relatorioFiltrado: IEmailsView[] = [];
  protected relatorioEnviar: any[] = [];

  protected numeroPagina: number = 1;
  protected contador: number = 0;

  protected campoPesquisa: string = '';

  protected menuAtivo: boolean = false;

  constructor(
    private emailsService: EmailsService,
    private router: Router,
  ) {}

  async ngOnInit(): Promise<void> {
    this.relatorio = await this.emailsService.buscarEmails().toPromise() || [];

    this.relatorio.forEach(item => {
      this.relatorioEnviar.push({
        Email: item.Email,
        Nome: item.Nome,
        Departamento: item.Departamento,
      })
    });
  }

  protected mudarMenuAtivo(): void {
    this.menuAtivo = !this.menuAtivo;
  }

  protected aoMudarDadosTabela(event: any): void {
    this.numeroPagina = event;
  }

  protected pesquisar(): void {
    this.numeroPagina = 1;

    if (this.campoPesquisa != '') {
      this.relatorioFiltrado = [];

      this.relatorioFiltrado = this.relatorio.filter((relatorio) => {
        return (
          (relatorio.Nome && relatorio.Nome.toLowerCase().includes(this.campoPesquisa.toLowerCase())) ||
          (relatorio.Departamento && relatorio.Departamento.toLocaleLowerCase().includes(this.campoPesquisa.toLocaleLowerCase()))
        )
      });

      this.relatorioEnviar = this.relatorioFiltrado;
    } else {
      this.limparPesquisa();
    }
  }

  protected limparPesquisa(): void {
    this.numeroPagina = 1;
    this.campoPesquisa = "";
    this.relatorioFiltrado = [];
    this.relatorioEnviar = this.relatorio;
  }
}
