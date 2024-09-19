import { Component, OnInit } from '@angular/core';
import { IQuestao, Questoes } from 'src/modules/questionario.interface';
import { TreinamentoCompletoService } from 'src/services/usuarioCompleto.service';

import { catchError, firstValueFrom, of, tap } from 'rxjs';
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

  constructor(
    private treinamentoCompletoService: TreinamentoCompletoService,
    private router: Router
  ) {}

  ngOnInit(): void {
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

    if (this.checkIfAllAnswered()) {
      this.calculateScore();

      const treinamentoEnviar: ITreinamentoCompleto = {
        ColaboradorID: Number(sessionStorage.getItem('ColaboradorID'))?? '',
        CargoID: Number(sessionStorage.getItem('CargoID'))?? '',
        DepartamentoID: Number(sessionStorage.getItem('DepartamentoID'))?? '',
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
          console.error('Erro ao enviar painel:', error);
          alert('Ocorreu um erro ao processar a finalização do treinamento.');
          return of([]);
        })
      ).subscribe();
    } else {
      alert('Por favor, responda todas as questões.');
    }
  }

  calculateScore(): void {
    this.score = 0;
    this.questoes.forEach(questao => {
      if (this.userAnswers[Number(questao.ID)] === questao.Resposta) {
        this.score++;
      }
    });
  }
}
