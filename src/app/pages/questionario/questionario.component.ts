import { Component, OnInit } from '@angular/core';
import { IQuestao, Questoes } from 'src/modules/questionario.interface';
import { TreinamentoCompletoService } from 'src/services/usuarioCompleto.service';

import { catchError, of, tap } from 'rxjs';
import { IColaborador } from 'src/modules/usuarioCompleto.interface';
import { ITreinamentoCompleto } from 'src/modules/usuarioCompleto.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-questionario',
  templateUrl: './questionario.component.html',
  styleUrl: './questionario.component.scss'
})
export class QuestionarioComponent implements OnInit {
  protected questoes: IQuestao[] = Questoes;
  userAnswers: { [key: number]: string } = {};
  score: number = 0;
  submited: boolean = false;

  protected colaboradores: IColaborador[] = [];
  protected colaboradorSelecionado: string = '';

  constructor(
    private treinamentoCompletoService: TreinamentoCompletoService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.colaboradores = await this.treinamentoCompletoService.buscarColaboradores().toPromise() || [];
  }

  checkAnswers(): void {
    this.score = 0;
    this.questoes.forEach((question) => {
      if (this.userAnswers[Number(question.ID)] === question.Resposta) {
        this.score++;
      }
    });
  }

  onAnswerSelect(questaoID: string, selectedOption: string): void {
    this.userAnswers[Number(questaoID)] = selectedOption;
    const questao = this.questoes.find(q => q.ID === questaoID);
    if (questao) {
      questao.isAnswered = true;
    }
  }

  checkIfAllAnswered(): boolean {
    return this.questoes.every(questao => questao.isAnswered);
  }

  onSubmit(): void {
    this.submited = true;

    if (this.checkIfAllAnswered() && this.colaboradorSelecionado != '') {
      this.calculateScore();

      const colaborador: any = this.colaboradores.find(item => item.ColaboradorID == Number(this.colaboradorSelecionado));

      const treinamentoEnviar: ITreinamentoCompleto = {
        ColaboradorID: colaborador.ColaboradorID,
        CargoID: colaborador.CargoID,
        DepartamentoID: colaborador.DepartamentoID,
        Declaracao: true,
        Acertos: this.score
      }

      const serviceCall = this.treinamentoCompletoService.gravarTreinamento(treinamentoEnviar);

      serviceCall.pipe(
        tap(() => {
          alert(`Você acertou ${this.score} de 10 questões!`);
          alert("Parabéns, você concluiu com sucesso o treinamento de cibersegurança da Poty Protege!");
          this.router.navigate(['/Home']);
        }),
        catchError((error: any) => {
          console.error('Erro ao enviar painel:', error.error.Resposta);
          if (error.error.Resposta == 'Você já realizou o treinamento de segurança!') alert(error.error.Resposta);
          else alert('Ocorreu um erro ao processar a finalização do treinamento.');
          this.router.navigate(['/Home']);
          return of([]);
        })
      ).subscribe();
    } else {
      alert('Preencha todos os campos para enviar o formulário.');
    }
  }

  calculateScore(): void {
    this.score = 0;
    this.questoes.forEach(questao => {
      if (this.userAnswers[Number(questao.ID)] === questao.Resposta) this.score++;
    });
  }
}
