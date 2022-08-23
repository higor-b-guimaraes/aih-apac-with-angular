export interface AnalisarSolicitacaoAlteracaoSenha {
  DataSolicitacao: Date,
  IdUsuario:number,
  NomeUsuario: string,
  IdTipoSolicitante: number,
  IdUnidade: number,
  CodigoIbgeMunicipio: string,
  IdSituacaoSolicitacao: number,
  Descricao: string,
  IdMotivoReprovacao: number,
  DescricaoMotivoReprovacao: string,
  Observacao:string
}
