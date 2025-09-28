export interface Usuario {
  id: number;
  nomeUsuario: string;
  nome: string;
  email: string;
  urlAvatar: string;
  dicaAvatar: string;
  ativo: boolean;
  criadoEm: Date;
  atualizadoEm: Date;
}

export interface UsuarioDto {
  id?: number;
  nomeUsuario: string;
  nome: string;
  email: string;
  urlAvatar?: string;
  dicaAvatar?: string;
  ativo?: boolean;
  criadoEm?: string;
  atualizadoEm?: string;
}
