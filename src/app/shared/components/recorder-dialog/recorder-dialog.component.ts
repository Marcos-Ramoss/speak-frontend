import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MessageService } from 'primeng/api';
import { AudioRecorderComponent } from '../audio-recorder/audio-recorder.component';
import { AudioPlayerComponent } from '../audio-player/audio-player.component';
import { AudioService, PostService, UsuarioService } from '../../../core/services';
import { TipoFiltroVoz } from '../../../core/models';

@Component({
  selector: 'app-recorder-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DialogModule,
    ButtonModule,
    RadioButtonModule,
    AudioRecorderComponent,
    AudioPlayerComponent
  ],
  templateUrl: './recorder-dialog.component.html',
  styleUrls: ['./recorder-dialog.component.scss']
})
export class RecorderDialogComponent implements OnInit {
  @Input() visible = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() postCreated = new EventEmitter<any>();

  // Form data
  conteudo = '';
  tipoFiltroVoz: TipoFiltroVoz = TipoFiltroVoz.NATURAL;
  
  // Audio states
  audioData?: string;
  processedAudioData?: string;
  transcricao?: string;
  
  // UI states
  step: 'recording' | 'preview' | 'processing' | 'posting' = 'recording';
  isProcessing = false;
  isPosting = false;
  
  // Filter options
  readonly filterOptions = [
    { label: 'Voz Natural', value: TipoFiltroVoz.NATURAL, icon: 'pi-user' },
    { label: 'Voz Robótica', value: TipoFiltroVoz.ROBOTICO, icon: 'pi-cog' }
  ];

  constructor(
    private audioService: AudioService,
    private postService: PostService,
    private usuarioService: UsuarioService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    // Reset form when dialog opens
    if (this.visible) {
      this.resetForm();
    }
  }

  get dialogHeader(): string {
    switch (this.step) {
      case 'recording': return 'Gravar Áudio';
      case 'preview': return 'Visualizar Post';
      case 'processing': return 'Processando Áudio...';
      case 'posting': return 'Publicando Post...';
      default: return 'Criar Post';
    }
  }

  get canPost(): boolean {
    return this.step === 'preview' && !!this.processedAudioData && !this.isPosting;
  }

  get maxContentLength(): number {
    return 280;
  }

  get contentLength(): number {
    return this.conteudo.length;
  }

  onRecordingComplete(audioData: string): void {
    this.audioData = audioData;
    this.step = 'processing';
    this.processAudio();
  }

  onRecordingCancelled(): void {
    this.closeDialog();
  }

  async processAudio(): Promise<void> {
    if (!this.audioData) return;

    this.isProcessing = true;

    try {
      const response = await this.audioService.processarAudioCompleto(
        this.audioData, 
        this.tipoFiltroVoz
      ).toPromise();

      if (response?.sucesso) {
        this.processedAudioData = response.audioTransformadoDataUri;
        this.transcricao = response.transcricao;
        this.step = 'preview';
      } else {
        throw new Error(response?.mensagem || 'Erro ao processar áudio');
      }
    } catch (error) {
      console.error('Erro ao processar áudio:', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Erro no Processamento',
        detail: 'Não foi possível processar o áudio. Tente novamente.'
      });
      this.step = 'recording';
    } finally {
      this.isProcessing = false;
    }
  }

  async createPost(): Promise<void> {
    if (!this.processedAudioData || !this.canPost) return;

    const usuario = this.usuarioService.obterUsuarioAtual();
    if (!usuario?.id) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro de Autenticação',
        detail: 'Usuário não encontrado. Faça login novamente.'
      });
      return;
    }

    this.isPosting = true;
    this.step = 'posting';

    try {
      const novoPost = await this.postService.criarPostComAudioBase64(
        usuario.id,
        this.processedAudioData,
        this.conteudo || undefined,
        this.tipoFiltroVoz,
        `audio_${Date.now()}.webm`
      ).toPromise();

      this.messageService.add({
        severity: 'success',
        summary: 'Post Criado',
        detail: 'Seu post foi publicado com sucesso!'
      });

      this.postCreated.emit(novoPost);
      this.closeDialog();
    } catch (error) {
      console.error('Erro ao criar post:', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Erro na Publicação',
        detail: 'Não foi possível publicar o post. Tente novamente.'
      });
      this.step = 'preview';
    } finally {
      this.isPosting = false;
    }
  }

  reRecord(): void {
    this.audioData = undefined;
    this.processedAudioData = undefined;
    this.transcricao = undefined;
    this.step = 'recording';
  }

  closeDialog(): void {
    this.visible = false;
    this.visibleChange.emit(false);
    this.resetForm();
  }

  private resetForm(): void {
    this.conteudo = '';
    this.tipoFiltroVoz = TipoFiltroVoz.NATURAL;
    this.audioData = undefined;
    this.processedAudioData = undefined;
    this.transcricao = undefined;
    this.step = 'recording';
    this.isProcessing = false;
    this.isPosting = false;
  }
}
