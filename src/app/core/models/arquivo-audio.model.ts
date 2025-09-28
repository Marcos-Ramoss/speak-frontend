export interface ArquivoAudio {
  id: number;
  usuarioId: number;
  nomeArquivoOriginal: string;
  caminhoArquivo: string;
  tamanhoArquivo: number;
  duracaoSegundos: number;
  tipoMime: string;
  transcricao?: string;
  criadoEm: Date;
}

export interface ArquivoAudioDto {
  id?: number;
  usuarioId: number;
  nomeArquivoOriginal: string;
  caminhoArquivo: string;
  tamanhoArquivo: number;
  duracaoSegundos: number;
  tipoMime: string;
  transcricao?: string;
  criadoEm?: string;
}
