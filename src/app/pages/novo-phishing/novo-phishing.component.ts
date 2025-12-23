import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

import { IDepartamento } from 'src/modules/departamento.interface';
import { IEmail } from 'src/modules/email.interface';
import { IEmailPhishing } from 'src/modules/emailFalso.interface';
import { IEmailsView } from 'src/modules/emails.interface';
import { DepartamentoService } from 'src/services/departamento.service';
import { EmailService } from 'src/services/email.service';
import { EmailFalsoService } from 'src/services/emailFalso.service';
import { EmailsService } from 'src/services/emails.service';

@Component({
  selector: 'app-novo-phishing',
  templateUrl: './novo-phishing.component.html',
  styleUrl: './novo-phishing.component.scss'
})
export class NovoPhishingComponent implements OnInit {
  protected carregandoAtivo: boolean = false;

  protected menuAtivo: boolean = false;

  protected formularioPhishing!: FormGroup;

  protected emailsAdicionados: any = [];

  protected emails: IEmailsView[] = [];

  protected departamentos: IDepartamento[] = [];
  protected departamentosAdicionados: IDepartamento[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private emailFalsoService: EmailFalsoService,
    private emailsService: EmailsService,
    private departamentoService: DepartamentoService,
  ) { }

  async ngOnInit(): Promise<void> {
    this.formularioPhishing = this.formBuilder.group({
      EmailOrigem: ['', Validators.required],
      SenhalOrigem: ['', Validators.required],
      NomeOrigem: ['', Validators.required],
      Host: ['', Validators.required],
      Porta: 0,
      AssuntoEmail: ['', Validators.required],
      HTML: ['', Validators.required],
      Departamento: '',
      Campanha: ['', Validators.required]
    });

    //this.emails = await this.emailService.buscarEmails().toPromise() || [];
    this.departamentos = await this.departamentoService.BuscarDepartamentos().toPromise() || [];

    this.emails = await this.emailsService.buscarEmails().toPromise() || [];
  }

  protected adicionarEmail(): void {
    if (this.formularioPhishing.get('Email')?.value != '') {
      this.emailsAdicionados.push(this.formularioPhishing.get('Email')?.value);
      this.formularioPhishing.get('Email')?.setValue('');
    }
  }

  protected removerEmail(email: string): void {
    const index = this.emailsAdicionados.findIndex((e: string) => e === email);

    if (index !== -1) {
      this.emailsAdicionados.splice(index, 1);
    }
  }

  protected async mudarMenuAtivo(): Promise<void> {
    this.menuAtivo = !this.menuAtivo;
  }

  protected adicionarDepartamento(): void {
    /*if (this.departamentosAdicionados.length > 0 && this.departamentosAdicionados.some(departamento => departamento == this.formularioPhishing.get('Departamento')?.value)){
      alert("Departamento já adicionado");
      return;
    }*/

    if (this.departamentosAdicionados.length > 0 && this.departamentosAdicionados.some(departamento => departamento.DepartamentoID == this.formularioPhishing.get('Departamento')?.value)) {
      alert("Departamento já adicionado!");
      return;
    }

    this.departamentos.forEach(item => {
      if (item.DepartamentoID == this.formularioPhishing.get('Departamento')?.value) this.departamentosAdicionados.push(item);
    });

    this.formularioPhishing.get('Departamento')?.setValue('');
  }

  protected removerDepartamento(departamentoEscolhido: number): void {
    this.departamentosAdicionados = this.departamentosAdicionados.filter((departamento) => departamento.DepartamentoID != departamentoEscolhido);
  }

  protected enviarPhishing(): void {
    this.carregandoAtivo = true;

    if (this.formularioPhishing.valid) {
      this.emails.forEach(emailObj => {
        const pertenceAoDepartamento = this.departamentosAdicionados.some(dep => dep.DepartamentoID === emailObj.DepartamentoID);

        if (pertenceAoDepartamento && !this.emailsAdicionados.includes(emailObj.Email)) {
          this.emailsAdicionados.push(emailObj.Email);
        }
      });

      const teste: IEmailPhishing = {
        EmailOrigem: this.formularioPhishing.get('EmailOrigem')?.value,
        SenhaOrigem: this.formularioPhishing.get('SenhalOrigem')?.value,
        NomeOrigem: this.formularioPhishing.get('NomeOrigem')?.value,
        Host: this.formularioPhishing.get('Host')?.value,
        PortaHost: this.formularioPhishing.get('Porta')?.value,
        Assunto: this.formularioPhishing.get('AssuntoEmail')?.value,
        ConteudoHTML: this.formularioPhishing.get('HTML')?.value,
        Emails: this.emailsAdicionados,
        Campanha: this.formularioPhishing.get('Campanha')?.value
      }

      this.emailFalsoService.enviarEmailPhishing(teste).subscribe(() => {
        console.log("Top");
        this.carregandoAtivo = false;
      }, error => {
        console.log(error);
        this.carregandoAtivo = false;
      });

      console.log(teste)
    } else {
      this.carregandoAtivo = false;
    }

    this.router.navigate(['/Phishing'])
  }
}
