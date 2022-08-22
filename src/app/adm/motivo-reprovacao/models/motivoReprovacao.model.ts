export interface MotivoReprovacao {
  Id: number;
  Descricao: string;
  Situacao: number;
  IdTipoSolicitacao: number;
}

export interface ListaMotivoReprovacao {
  Id: number;
  motivoDescricao: string;
  motivoSituacao: string;
  motivoTipoSolicitacao: string;
}
