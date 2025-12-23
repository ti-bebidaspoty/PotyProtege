import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, Event, NavigationEnd } from '@angular/router';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-lgpd',
  templateUrl: './lgpd.component.html',
  styleUrl: './lgpd.component.scss'
})
export class LgpdComponent implements OnInit {
  protected carregandoAtivo: boolean = true;

  protected formularioTreinamento!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private viewportScroller: ViewportScroller,
  ) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.viewportScroller.scrollToPosition([0, 0]);
      }
    });
  }

  async ngOnInit(): Promise<void> {
    this.formularioTreinamento = this.formBuilder.group({
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
      Topico12: [false, Validators.requiredTrue],
      Topico13: [false, Validators.requiredTrue],
      Topico14: [false, Validators.requiredTrue],
      Topico15: [false, Validators.requiredTrue],
      Video1: [false, Validators.requiredTrue],
      Video2: [false, Validators.requiredTrue],
      Video3: [false, Validators.requiredTrue],
    });
  }

  protected mudarTopico(topico: string): void {
    this.formularioTreinamento.get(topico)?.setValue(!this.formularioTreinamento.get(topico)?.value);
  }

  protected enviarFormulario() {
    if (this.formularioTreinamento.valid) {
      this.router.navigate(['/Questionario']);
    } else {
      alert("Preencha todos os campos para poder responder o questionário!");
    }
  }
}
