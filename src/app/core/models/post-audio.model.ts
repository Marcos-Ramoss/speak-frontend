import { UsuarioDto } from './usuario.model';
import { ArquivoAudioDto } from './arquivo-audio.model';

export enum TipoFiltroVoz {
  NATURAL = 'NATURAL',
  ROBOTICO = 'ROBOTICO'
}

export interface PostAudio {
  id: number;
  usuario: UsuarioDto;
  arquivoAudio: ArquivoAudioDto;
  conteudo?: string;
  quantidadeCurtidas: number;
  quantidadeComentarios: number;
  quantidadeCompartilhamentos: number;
  processado: boolean;
  tipoFiltroVoz: TipoFiltroVoz;
  criadoEm: Date;
  atualizadoEm: Date;
}

export interface PostAudioDto {
  id?: number;
  usuario: UsuarioDto;
  arquivoAudio: ArquivoAudioDto;
  conteudo?: string;
  quantidadeCurtidas: number;
  quantidadeComentarios: number;
  quantidadeCompartilhamentos: number;
  processado: boolean;
  tipoFiltroVoz: TipoFiltroVoz;
  criadoEm?: string;
  atualizadoEm?: string;
}

export interface CriarPostRequest {
  usuarioId: number;
  conteudo?: string;
  tipoFiltroVoz?: TipoFiltroVoz;
  audioDataUri: string;
  nomeArquivo?: string;
}
