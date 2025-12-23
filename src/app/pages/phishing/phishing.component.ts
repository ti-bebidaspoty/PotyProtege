import { Component, OnInit } from '@angular/core';

import { saveAs } from 'file-saver';
import { ngxCsv } from 'ngx-csv';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { CellInput, RowInput, UserOptions } from 'jspdf-autotable';

import { IRelatorioPhishing } from 'src/modules/emailFalso.interface';
import { EmailFalsoService } from 'src/services/emailFalso.service';

@Component({
  selector: 'app-phishing',
  templateUrl: './phishing.component.html',
  styleUrl: './phishing.component.scss'
})
export class PhishingComponent implements OnInit {
  protected relatorio: IRelatorioPhishing[] = [];
  protected relatorioFiltrado: IRelatorioPhishing[] = [];
  protected relatorioEnviar: any[] = [];

  protected numeroPagina: number = 1;
  protected contador: number = 0;

  protected valorExportar: string = 'XLSX';

  protected cabecalhos: any[] = [
    {
      CampoTitulo: "Usuário"
    },
    {
      CampoTitulo: "Data/Hora"
    }
  ];

  protected campoPesquisa: string = '';

  protected menuAtivo: boolean = false;

  campanhasUnicas: string[] = [];
  campanhaExpandida: string | null = null;

  constructor(
    private emailFalsoService: EmailFalsoService
  ) { }

  async ngOnInit(): Promise<void> {
    this.relatorio = await this.emailFalsoService.buscarRelatorioPhishing().toPromise() || [];

    this.relatorio.forEach(item => {
      this.relatorioEnviar.push({
        Email: item.Email,
        DataHora: this.formatarDataBrasileira(item.DataHora),
        Campanha: item.Campanha
      });
    });

    this.campanhasUnicas = [...new Set(this.relatorio.map(item => item.Campanha))];
  }

  protected exportarConteudo(): void {
    if (this.valorExportar == 'XLSX') {
      this.exportarXLSX();
    } else if (this.valorExportar == 'CSV') {
      this.exportarCSV();
    } else if (this.valorExportar == 'PDF') {
      this.exportarPDF();
    }
  }

  private exportarXLSX(): void {
    const dados: any[] = this.relatorioEnviar;

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dados);
    const workbook: XLSX.WorkBook = { Sheets: { 'dados': worksheet }, SheetNames: ['dados'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    const data: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    saveAs(data, 'relatorio.xlsx');
  }

  private exportarCSV(): void {
    const opcoes = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: false,
      title: 'Arquivo de Dados',
      useBom: true,
      headers: Object.keys(this.relatorioEnviar[0])
    };

    new ngxCsv(this.relatorioEnviar, 'ralatorio', opcoes);
  }

  private exportarPDF(): void {
    const doc = new jsPDF('landscape', 'px', 'a4');
    const jsPDFAutoTable = (doc as any).autoTable as (
      options: UserOptions
    ) => jsPDF;

    const head: RowInput[] = [
      this.cabecalhos.map(item => {
        const cell: CellInput = {
          content: item.CampoTitulo,
          styles: { fillColor: [0, 167, 74] }
        };
        return cell; 1
      })
    ];

    const body: any[][] = this.relatorioEnviar.map((item: any) => {
      return Object.values(item);
    });

    const watermarkImg = '/assets/images/logos/logoTotalColoridaOpaca.png';
    const imgWidth = 400;
    const imgHeight = 150;

    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');

    jsPDFAutoTable.call(doc, {
      head: head,
      body: body,
      didDrawPage: () => {
        doc.addImage(watermarkImg, 'PNG', doc.internal.pageSize.getWidth() / 2 - imgWidth / 2, doc.internal.pageSize.getHeight() / 2 - imgHeight / 2, imgWidth, imgHeight);
      }
    });

    doc.save(`relatorio.pdf`);
  }

  protected pesquisar(): void {
    this.numeroPagina = 1;

    if (this.campoPesquisa.trim() !== '') {
      const termo = this.campoPesquisa.toLowerCase();

      // Filtra apenas por nome da campanha
      this.relatorioFiltrado = this.relatorio.filter(item =>
        item.Campanha?.toLowerCase().includes(termo)
      );

      this.relatorioEnviar = this.relatorioFiltrado;

      // Atualiza a lista de campanhas únicas filtradas
      this.campanhasUnicas = [...new Set(this.relatorioFiltrado.map(item => item.Campanha))];
    } else {
      this.limparPesquisa();
    }
  }

  protected limparPesquisa(): void {
    this.campoPesquisa = '';
    this.relatorioFiltrado = [];
    this.relatorioEnviar = this.relatorio;

    // Restaura campanhas únicas com todos os dados
    this.campanhasUnicas = [...new Set(this.relatorio.map(item => item.Campanha))];
  }


  protected formatarDataBrasileira(dataAmericana: string): string {
    const data = new Date(dataAmericana);

    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();

    const horas = String(data.getHours()).padStart(2, '0');
    const minutos = String(data.getMinutes()).padStart(2, '0');

    return `${dia}/${mes}/${ano} - ${horas}:${minutos}`;
  }

  protected formatarSomenteData(dataAmericana: string): string {
    const data = new Date(dataAmericana);

    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();

    return `${dia}/${mes}/${ano}`;
  }

  protected aoMudarDadosTabela(event: any): void {
    this.numeroPagina = event;
  }

  protected mudarMenuAtivo(): void {
    this.menuAtivo = !this.menuAtivo;
  }

  toggleCampanha(campanha: string): void {
    this.campanhaExpandida = this.campanhaExpandida === campanha ? null : campanha;
  }

  getUsuariosPorCampanha(campanha: string): IRelatorioPhishing[] {
    return this.relatorio.filter(item => item.Campanha === campanha);
  }

  public excluirCampanha(campanha: string): void {
    this.emailFalsoService.excluirCampanha(campanha).subscribe(() => {
      alert("Campanha excluída com sucesso!");
      location.reload();
    }, err => {
      console.log(err);
    });
  }
}
