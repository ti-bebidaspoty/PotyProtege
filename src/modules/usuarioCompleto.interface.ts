export interface ITreinamentoCompleto {
  ColaboradorID: number;
  CargoID: number;
  DepartamentoID: number;
  Declaracao: boolean;
  Acertos: number;
}

export interface IColaborador {
  ColaboradorID: number;
  CargoID: number;
  DepartamentoID: number;
  Nome: string;
}
