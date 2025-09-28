import { Observable } from 'rxjs';
import { ArquivoAudioDto, TransformacaoVozRequest, TransformacaoVozResponse, TranscricaoRequest, TranscricaoResponse } from '../models';

export interface IAudioRepository {
  uploadArquivo(usuarioId: number, arquivo: File): Observable<ArquivoAudioDto>;
  uploadAudioBase64(audioDataUri: string, usuarioId: number, nomeArquivo?: string): Observable<ArquivoAudioDto>;
  buscarArquivoPorId(id: number): Observable<ArquivoAudioDto>;
  listarArquivosPorUsuario(usuarioId: number): Observable<ArquivoAudioDto[]>;
  removerArquivo(id: number): Observable<void>;
  transformarVoz(request: TransformacaoVozRequest): Observable<TransformacaoVozResponse>;
  transcreverAudio(request: TranscricaoRequest): Observable<TranscricaoResponse>;
}
