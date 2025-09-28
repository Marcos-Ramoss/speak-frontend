import { Component, EventEmitter, Output, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';
import { TooltipModule } from 'primeng/tooltip';
import { MessageService } from 'primeng/api';
import { AudioService, AudioRecordingState } from '../../../core/services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-audio-recorder',
  standalone: true,
  imports: [CommonModule, ButtonModule, ProgressBarModule, TooltipModule],
  templateUrl: './audio-recorder.component.html',
  styleUrls: ['./audio-recorder.component.scss']
})
export class AudioRecorderComponent implements OnDestroy {
  @Output() recordingComplete = new EventEmitter<string>();
  @Output() recordingCancelled = new EventEmitter<void>();
  @ViewChild('waveformCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  
  recordingState: AudioRecordingState = {
    isRecording: false,
    duration: 0
  };

  private subscription = new Subscription();
  private animationFrame?: number;
  private audioContext?: AudioContext;
  private analyser?: AnalyserNode;
  
  readonly MAX_RECORDING_TIME = 15000; // 15 seconds

  constructor(
    private audioService: AudioService,
    private messageService: MessageService
  ) {
    this.subscription.add(
      this.audioService.recordingState$.subscribe(state => {
        this.recordingState = state;
        
        if (state.audioData && !state.isRecording) {
          this.recordingComplete.emit(state.audioData);
        }
        
        if (state.duration >= this.MAX_RECORDING_TIME && state.isRecording) {
          this.stopRecording();
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
    if (this.audioContext) {
      this.audioContext.close();
    }
  }

  get formattedTime(): string {
    return (this.recordingState.duration / 1000).toFixed(1);
  }

  get progressValue(): number {
    return (this.recordingState.duration / this.MAX_RECORDING_TIME) * 100;
  }

  async toggleRecording(): Promise<void> {
    if (this.recordingState.isRecording) {
      this.stopRecording();
    } else {
      await this.startRecording();
    }
  }

  private async startRecording(): Promise<void> {
    try {
      await this.audioService.iniciarGravacao();
      this.startWaveformVisualization();
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro de Microfone',
        detail: 'Não foi possível acessar o microfone. Verifique as permissões.'
      });
    }
  }

  private stopRecording(): void {
    this.audioService.pararGravacao();
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
  }

  cancelRecording(): void {
    this.audioService.cancelarGravacao();
    this.recordingCancelled.emit();
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
  }

  private async startWaveformVisualization(): Promise<void> {
    if (!this.canvasRef) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.audioContext = new AudioContext();
      const source = this.audioContext.createMediaStreamSource(stream);
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 256;
      source.connect(this.analyser);

      this.drawWaveform();
    } catch (error) {
      console.error('Erro ao inicializar visualização:', error);
    }
  }

  private drawWaveform(): void {
    if (!this.analyser || !this.canvasRef || !this.recordingState.isRecording) return;

    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bufferLength = this.analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      if (!this.recordingState.isRecording) return;

      this.animationFrame = requestAnimationFrame(draw);
      
      this.analyser!.getByteTimeDomainData(dataArray);
      
      ctx.fillStyle = 'var(--surface-ground)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'var(--primary-color)';
      ctx.beginPath();
      
      const sliceWidth = canvas.width * 1.0 / bufferLength;
      let x = 0;
      
      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = v * canvas.height / 2;
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
        
        x += sliceWidth;
      }
      
      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();
    };
    
    draw();
  }
}
