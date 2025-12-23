import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { EmailsService } from 'src/services/emails.service';
import { DepartamentoService } from 'src/services/departamento.service';
import { IDepartamento } from 'src/modules/departamento.interface';
import { IEmailsForm } from 'src/modules/emails.interface';

@Component({
  selector: 'app-formulario-email',
  templateUrl: './formulario-email.component.html',
  styleUrl: './formulario-email.component.scss'
})
export class FormularioEmailComponent implements OnInit {
  protected carregandoAtivo: boolean = false;

  protected menuAtivo: boolean = false;

  protected emailAtual!: IEmailsForm;
  protected emailID: string = '';

  protected formularioEmail!: FormGroup;

  protected departamentos: IDepartamento[] = [];

  protected urlAtual = this.activatedRoute.snapshot.url;

  constructor(
    private departamentoService: DepartamentoService,
    private emailsService: EmailsService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {}

  async ngOnInit(): Promise<void> {
    this.carregandoAtivo = true;

    this.formularioEmail = this.formBuilder.group({
      Email: ['', Validators.required],
      Nome: ['', Validators.required],
      Departamento: ["", Validators.required]
    });

    this.departamentos = await this.departamentoService.BuscarDepartamentos().toPromise() || [];

    if (this.urlAtual.length == 3) {
      this.emailID = this.activatedRoute.snapshot.paramMap.get('EmailID') || '';
      this.emailAtual = await this.emailsService.buscarEmail(this.emailID).toPromise() || this.emailAtual;

      this.formularioEmail.patchValue({
        Email: this.emailAtual.Email,
        Nome: this.emailAtual.Nome,
        Departamento: this.emailAtual.DepartamentoID.toString()
      });
    }

    this.carregandoAtivo = false;
  }

  protected enviarFormulario(): void {
    if (this.formularioEmail.valid) {
      this.carregandoAtivo = true;

      const emailEnviar: IEmailsForm ={
        Email: this.formularioEmail.get('Email')?.value,
        Nome: this.formularioEmail.get('Nome')?.value,
        DepartamentoID: this.formularioEmail.get('Departamento')?.value
      }

      const mensagemSucesso = this.urlAtual.length == 3
        ? 'Email editado com sucesso!'
        : 'Email criado com sucesso!';

      const serviceCall = this.urlAtual.length == 3
        ? this.emailsService.editarEmail(this.emailID, emailEnviar)
        : this.emailsService.criarEmail(emailEnviar);

      serviceCall.subscribe(() => {
        alert(mensagemSucesso);
        this.router.navigate(['/Emails']);
      }, (error) => {
        console.log(error)
        alert(`Ocorreu um erro ao ${this.urlAtual.length == 4 ? 'editar' : 'criar'} o email:\n${error}`);
        this.carregandoAtivo = false;
      });
    }
  }

  protected excluirEmail(): void {
    this.carregandoAtivo = true;

    this.emailsService.excluirEmail(this.emailID).subscribe(() => {
      alert("Email excluído com sucesso!");
      this.router.navigate(['/Emails']);
    }, (error) => {
      alert(`Ocorreu um erro ao excluir o email: \n${error}`);
      this.carregandoAtivo = false;
    });
  }

  protected mudarMenuAtivo(): void {
    this.menuAtivo = !this.menuAtivo;
  }
}
