import { TipoFiltroVoz } from './post-audio.model';

export interface TransformacaoVozRequest {
  audioDataUri: string;
  tipoFiltro: TipoFiltroVoz;
  transcricao?: string;
}

export interface TransformacaoVozResponse {
  audioTransformadoDataUri: string;
  transcricao: string;
  sucesso: boolean;
  mensagem: string;
}

export interface TranscricaoRequest {
  audioDataUri: string;
}

export interface TranscricaoResponse {
  transcricao: string;
  sucesso: boolean;
  mensagem: string;
}
