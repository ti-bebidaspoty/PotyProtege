export interface IEmailFalso {
  Email: string;
  Campanha: string;
  DataHora: string;
}

export interface IRelatorioPhishing {
  EmailsPhishingID: string;
  Email: string;
  DataHora: string;
  Campanha: string;
}

export interface IEmailPhishing {
  EmailOrigem: string,
  SenhaOrigem: string,
  NomeOrigem: string,
  Host: string,
  PortaHost: 0,
  Emails: [
    string
  ],
  Assunto: string,
  ConteudoHTML: string,
  Campanha: string
}
