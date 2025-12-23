import { Component, OnInit } from '@angular/core';

import { saveAs } from 'file-saver';
import { ngxCsv } from 'ngx-csv';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { CellInput, RowInput, UserOptions } from 'jspdf-autotable';

import { RelatorioService } from 'src/services/relatorio.service';
import { IRelatorio } from 'src/modules/relatorio.interface';

@Component({
  selector: 'app-relatorios-treinamento',
  templateUrl: './relatorios-treinamento.component.html',
  styleUrl: './relatorios-treinamento.component.scss'
})
export class RelatoriosTreinamentoComponent implements OnInit {
  protected relatorio: IRelatorio[] = [];
  protected relatorioFiltrado: IRelatorio[] = [];
  protected relatorioEnviar: any[] = [];

  protected numeroPagina: number = 1;
  protected contador: number = 0;

  protected valorExportar: string = 'XLSX';

  protected cabecalhos: any[] = [
    {
      CampoTitulo: "Código Alternativo"
    },
    {
      CampoTitulo: "Nome"
    },
    {
      CampoTitulo: "Depatamento"
    },
    {
      CampoTitulo: "Cargo"
    },
    {
      CampoTitulo: "Data/Hora"
    }
    ,
    {
      CampoTitulo: "Acertos"
    }
  ];

  protected campoPesquisa: string = '';

  protected menuAtivo: boolean = false;

  constructor(
    private relatorioService: RelatorioService,
  ) {}

  async ngOnInit(): Promise<void> {
    this.relatorio = await this.relatorioService.buscarRelatorio().toPromise() || [];

    this.relatorio.forEach(item => {
      this.relatorioEnviar.push({
        CodigoAlternativo: item.CodigoAlternativo,
        Nome: item.Nome,
        Departamento: item.Departamento,
        Cargo: item.Cargo,
        DataHora: this.formatarDataBrasileira(item.DataHora),
        Acertos: item.Acertos
      });
    });
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
        return cell;1
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

  protected pesquisar(): void {
    this.numeroPagina = 1;

    if (this.campoPesquisa != '') {
      this.relatorioFiltrado = [];

      this.relatorioFiltrado = this.relatorio.filter((relatorio) => {
        return (
          (relatorio.Nome && relatorio.Nome.toLowerCase().includes(this.campoPesquisa.toLowerCase())) ||
          (relatorio.Departamento && relatorio.Departamento.toLowerCase().includes(this.campoPesquisa.toLowerCase())) ||
          (relatorio.DataHora && this.formatarSomenteData(relatorio.DataHora).includes(this.campoPesquisa))
        )
      });

      this.relatorioEnviar = this.relatorioFiltrado;
    } else {
      this.limparPesquisa();
    }
  }

  protected limparPesquisa(): void {
    this.campoPesquisa = "";
    this.relatorioFiltrado = [];
    this.relatorioEnviar = this.relatorio;
  }

  protected aoMudarDadosTabela(event: any): void {
    this.numeroPagina = event;
  }

  protected mudarMenuAtivo(): void {
    this.menuAtivo = !this.menuAtivo;
  }
}
