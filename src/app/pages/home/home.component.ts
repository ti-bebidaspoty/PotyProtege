import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, firstValueFrom, of, tap } from 'rxjs';

import { ITreinamentoCompleto, IColaborador } from 'src/modules/usuarioCompleto.interface';
import { TreinamentoCompletoService } from 'src/services/usuarioCompleto.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  protected carregandoAtivo: boolean = true;

  protected formularioTreinamento!: FormGroup;

  protected colaboradores: IColaborador[] = [];

  constructor(
    private treinamentoCompletoService: TreinamentoCompletoService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.formularioTreinamento = this.formBuilder.group({
      Colaborador: ['', Validators.required],
      Declaracao: [false, Validators.requiredTrue],
      Topico1: [false, Validators.requiredTrue],
      Topico2: [false, Validators.requiredTrue],
      Topico3: [false, Validators.requiredTrue],
      Topico4: [false, Validators.requiredTrue],
      Topico5: [false, Validators.requiredTrue],
      Topico6: [false, Validators.requiredTrue],
      Topico7: [false, Validators.requiredTrue],
      Topico8: [false, Validators.requiredTrue],
      Topico9: [false, Validators.requiredTrue],
      Topico10: [false, Validators.requiredTrue],
      Topico11: [false, Validators.requiredTrue],
      Topico12: [false, Validators.requiredTrue]
    });

    this.colaboradores = await this.treinamentoCompletoService.buscarColaboradores().toPromise() || [];
  }

  protected enviarFormulario(): void {
    if (this.formularioTreinamento.valid) {
      const colaborador: any = this.colaboradores.find(item => item.ColaboradorID == this.formularioTreinamento.get('Colaborador')?.value);

      const treinamentoEnviar: ITreinamentoCompleto = {
        ColaboradorID: colaborador.ColaboradorID,
        DepartamentoID: colaborador.DepartamentoID,
        CargoID: colaborador.CargoID,
        Declaracao: true
      }

      const serviceCall = this.treinamentoCompletoService.gravarTreinamento(treinamentoEnviar);

      serviceCall.pipe(
        tap(() => {
          this.carregandoAtivo = false;
          alert('Parabéns! Você concluiu com sucesso o treinamento de segurança.');
          document.location.reload();
        }),
        catchError((error: any) => {
          this.carregandoAtivo = false;
          console.error('Erro ao enviar painel:', error);
          alert('Ocorreu um erro ao processar a finalização do treinamento.');
          return of([]);
        })
      ).subscribe();
    } else {
      alert("Preencha todos os campos para enviar o formulário e completar o treinamento de segurança!");
    }
  }

  protected mudarTopico(topico: string): void {
    this.formularioTreinamento.get(topico)?.setValue(!this.formularioTreinamento.get(topico)?.value);
  }
}
