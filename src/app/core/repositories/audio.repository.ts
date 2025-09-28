import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IAudioRepository } from '../interfaces';
import { ArquivoAudioDto, TransformacaoVozRequest, TransformacaoVozResponse, TranscricaoRequest, TranscricaoResponse } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AudioRepository implements IAudioRepository {
  private readonly baseUrl = `${environment.apiUrl}/audio`;

  constructor(private http: HttpClient) {}

  uploadArquivo(usuarioId: number, arquivo: File): Observable<ArquivoAudioDto> {
    const formData = new FormData();
    formData.append('arquivo', arquivo);
    
    const params = new HttpParams().set('usuarioId', usuarioId.toString());
    return this.http.post<ArquivoAudioDto>(`${this.baseUrl}/upload`, formData, { params });
  }

  uploadAudioBase64(audioDataUri: string, usuarioId: number, nomeArquivo?: string): Observable<ArquivoAudioDto> {
    let params = new HttpParams()
      .set('audioDataUri', audioDataUri)
      .set('usuarioId', usuarioId.toString());
    
    if (nomeArquivo) {
      params = params.set('nomeArquivo', nomeArquivo);
    }

    return this.http.post<ArquivoAudioDto>(`${this.baseUrl}/upload-base64`, null, { params });
  }

  buscarArquivoPorId(id: number): Observable<ArquivoAudioDto> {
    return this.http.get<ArquivoAudioDto>(`${this.baseUrl}/${id}`);
  }

  listarArquivosPorUsuario(usuarioId: number): Observable<ArquivoAudioDto[]> {
    return this.http.get<ArquivoAudioDto[]>(`${this.baseUrl}/usuario/${usuarioId}`);
  }

  removerArquivo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  transformarVoz(request: TransformacaoVozRequest): Observable<TransformacaoVozResponse> {
    return this.http.post<TransformacaoVozResponse>(`${this.baseUrl}/transformar-voz`, request);
  }

  transcreverAudio(request: TranscricaoRequest): Observable<TranscricaoResponse> {
    return this.http.post<TranscricaoResponse>(`${this.baseUrl}/transcrever`, request);
  }
}
