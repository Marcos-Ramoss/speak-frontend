import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AudioRepository } from '../repositories';
import { ArquivoAudioDto, TransformacaoVozRequest, TransformacaoVozResponse, TranscricaoRequest, TranscricaoResponse, TipoFiltroVoz } from '../models';

export interface AudioRecordingState {
  isRecording: boolean;
  duration: number;
  audioData?: string;
  transcription?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private recordingStateSubject = new BehaviorSubject<AudioRecordingState>({
    isRecording: false,
    duration: 0
  });
  public recordingState$ = this.recordingStateSubject.asObservable();

  private mediaRecorder?: MediaRecorder;
  private audioChunks: Blob[] = [];
  private recordingTimer?: number;

  constructor(private audioRepository: AudioRepository) {}

  async iniciarGravacao(): Promise<void> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(stream);
      this.audioChunks = [];

      this.mediaRecorder.ondataavailable = (event) => {
        this.audioChunks.push(event.data);
      };

      this.mediaRecorder.onstop = () => {
        this.processarAudioGravado();
      };

      this.mediaRecorder.start();
      this.iniciarTimer();
      
      this.atualizarEstado({ isRecording: true, duration: 0 });
    } catch (error) {
      throw new Error('Não foi possível acessar o microfone. Verifique as permissões.');
    }
  }

  pararGravacao(): void {
    if (this.mediaRecorder && this.mediaRecorder.state === 'recording') {
      this.mediaRecorder.stop();
      this.pararTimer();
      this.atualizarEstado({ isRecording: false });
    }
  }

  cancelarGravacao(): void {
    this.pararGravacao();
    this.audioChunks = [];
    this.atualizarEstado({ 
      isRecording: false, 
      duration: 0, 
      audioData: undefined, 
      transcription: undefined 
    });
  }

  uploadArquivo(usuarioId: number, arquivo: File): Observable<ArquivoAudioDto> {
    return this.audioRepository.uploadArquivo(usuarioId, arquivo);
  }

  uploadAudioBase64(audioDataUri: string, usuarioId: number, nomeArquivo?: string): Observable<ArquivoAudioDto> {
    return this.audioRepository.uploadAudioBase64(audioDataUri, usuarioId, nomeArquivo);
  }

  buscarArquivoPorId(id: number): Observable<ArquivoAudioDto> {
    return this.audioRepository.buscarArquivoPorId(id);
  }

  listarArquivosPorUsuario(usuarioId: number): Observable<ArquivoAudioDto[]> {
    return this.audioRepository.listarArquivosPorUsuario(usuarioId);
  }

  removerArquivo(id: number): Observable<void> {
    return this.audioRepository.removerArquivo(id);
  }

  transformarVoz(audioDataUri: string, tipoFiltro: TipoFiltroVoz, transcricao?: string): Observable<TransformacaoVozResponse> {
    const request: TransformacaoVozRequest = {
      audioDataUri,
      tipoFiltro,
      transcricao
    };
    return this.audioRepository.transformarVoz(request);
  }

  transcreverAudio(audioDataUri: string): Observable<TranscricaoResponse> {
    const request: TranscricaoRequest = { audioDataUri };
    return this.audioRepository.transcreverAudio(request);
  }

  processarAudioCompleto(audioDataUri: string, tipoFiltro: TipoFiltroVoz = TipoFiltroVoz.NATURAL): Observable<TransformacaoVozResponse> {
    return this.transcreverAudio(audioDataUri).pipe(
      switchMap(transcricaoResponse => {
        if (!transcricaoResponse.sucesso) {
          throw new Error(transcricaoResponse.mensagem);
        }
        return this.transformarVoz(audioDataUri, tipoFiltro, transcricaoResponse.transcricao);
      })
    );
  }

  validarArquivoAudio(arquivo: File): string[] {
    const erros: string[] = [];
    const tiposPermitidos = ['audio/wav', 'audio/mp3', 'audio/mpeg', 'audio/webm', 'audio/ogg'];
    const tamanhoMaximo = 10 * 1024 * 1024; // 10MB

    if (!tiposPermitidos.includes(arquivo.type)) {
      erros.push('Tipo de arquivo não suportado. Use WAV, MP3, WebM ou OGG.');
    }

    if (arquivo.size > tamanhoMaximo) {
      erros.push('Arquivo muito grande. Tamanho máximo: 10MB.');
    }

    return erros;
  }

  private processarAudioGravado(): void {
    const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
    const reader = new FileReader();
    
    reader.onloadend = () => {
      const audioData = reader.result as string;
      this.atualizarEstado({ audioData });
    };
    
    reader.readAsDataURL(audioBlob);
  }

  private iniciarTimer(): void {
    this.recordingTimer = window.setInterval(() => {
      const estadoAtual = this.recordingStateSubject.value;
      this.atualizarEstado({ duration: estadoAtual.duration + 100 });
    }, 100);
  }

  private pararTimer(): void {
    if (this.recordingTimer) {
      clearInterval(this.recordingTimer);
      this.recordingTimer = undefined;
    }
  }

  private atualizarEstado(novoEstado: Partial<AudioRecordingState>): void {
    const estadoAtual = this.recordingStateSubject.value;
    this.recordingStateSubject.next({ ...estadoAtual, ...novoEstado });
  }
}
