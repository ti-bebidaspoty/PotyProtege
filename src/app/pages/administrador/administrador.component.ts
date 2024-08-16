import { Component, OnInit } from '@angular/core';
import { AutenticacaoService } from 'src/services/autenticacao.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { saveAs } from 'file-saver';
import { ngxCsv } from 'ngx-csv';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { CellInput, RowInput, UserOptions } from 'jspdf-autotable';

import { RelatorioService } from 'src/services/relatorio.service';
import { IRelatorio } from 'src/modules/relatorio.interface';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrl: './administrador.component.scss'
})
export class AdministradorComponent implements OnInit {
  protected formularioLogin!: FormGroup;

  protected autenticado: boolean = false;

  protected senhaVisivel: boolean = false;

  protected relatorio: IRelatorio[] = [];
  protected relatorioEnviar: any[] = [];

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
  ];

  protected campoPesquisa: string = '';

  constructor(
    private autenticacaoService: AutenticacaoService,
    private relatorioService: RelatorioService,
    private formBuilder: FormBuilder,
  ) {}

  async ngOnInit(): Promise<void> {
    this.formularioLogin = this.formBuilder.group({
      Usuario: ['', Validators.required],
      Senha: ['', Validators.required]
    });

    this.relatorio = await this.relatorioService.buscarRelatorio().toPromise() || [];

    this.relatorio.forEach(item => {
      this.relatorioEnviar.push({
        CodigoAlternativo: item.CodigoAlternativo,
        Nome: item.Nome,
        Departamento: item.Departamento,
        Cargo: item.Cargo,
        DataHora: this.formatarDataBrasileira(item.DataHora)
      });
    });
  }

  protected realizarLogin(): void {
    if (this.formularioLogin.valid) {
      this.autenticacaoService.realizarAutenticacao(this.formularioLogin.get('Usuario')?.value, this.formularioLogin.get('Senha')?.value).subscribe(() => {
        this.autenticado = true;
      }, error => alert(error.error.Resposta));
    }
  }

  protected alterarVisibilidadeSenha(): void {
    this.senhaVisivel = !this.senhaVisivel;
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
        return cell;
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
    // Cria um objeto Date a partir da string no formato americano
    const data = new Date(dataAmericana);

    // Extrai o dia, mês e ano
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0'); // Os meses em JavaScript são indexados de 0 a 11
    const ano = data.getFullYear();

    // Extrai horas e minutos
    const horas = String(data.getHours()).padStart(2, '0');
    const minutos = String(data.getMinutes()).padStart(2, '0');

    // Retorna no formato DD/MM/YYYY - HH:MM
    return `${dia}/${mes}/${ano} - ${horas}:${minutos}`;
  }
}
