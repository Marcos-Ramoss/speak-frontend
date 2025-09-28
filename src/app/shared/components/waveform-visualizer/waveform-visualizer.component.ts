import { Component, Input, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-waveform-visualizer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './waveform-visualizer.component.html',
  styleUrls: ['./waveform-visualizer.component.scss']
})
export class WaveformVisualizerComponent implements OnInit, OnDestroy {
  @Input() audioUrl?: string;
  @Input() width = 300;
  @Input() height = 60;
  @Input() barWidth = 2;
  @Input() barGap = 1;
  @Input() color = 'var(--primary-color)';
  @Input() backgroundColor = 'var(--surface-ground)';
  @Input() animated = false;
  
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  
  private audioContext?: AudioContext;
  private audioBuffer?: AudioBuffer;
  private animationFrame?: number;
  private isAnimating = false;

  ngOnInit(): void {
    if (this.audioUrl) {
      this.loadAudio();
    } else if (this.animated) {
      this.startAnimation();
    }
  }

  ngOnDestroy(): void {
    this.cleanup();
  }

  private async loadAudio(): Promise<void> {
    if (!this.audioUrl) return;

    try {
      this.audioContext = new AudioContext();
      const response = await fetch(this.audioUrl);
      const arrayBuffer = await response.arrayBuffer();
      this.audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
      this.drawWaveform();
    } catch (error) {
      console.error('Erro ao carregar áudio para visualização:', error);
      this.drawPlaceholder();
    }
  }

  private drawWaveform(): void {
    if (!this.audioBuffer || !this.canvasRef) return;

    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = this.width;
    canvas.height = this.height;

    // Limpar canvas
    ctx.fillStyle = this.backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Obter dados do canal (mono ou primeiro canal se estéreo)
    const channelData = this.audioBuffer.getChannelData(0);
    const samples = channelData.length;
    const barCount = Math.floor(canvas.width / (this.barWidth + this.barGap));
    const samplesPerBar = Math.floor(samples / barCount);

    ctx.fillStyle = this.color;

    for (let i = 0; i < barCount; i++) {
      const startSample = i * samplesPerBar;
      const endSample = startSample + samplesPerBar;
      
      // Calcular RMS (Root Mean Square) para este segmento
      let sum = 0;
      for (let j = startSample; j < endSample && j < samples; j++) {
        sum += channelData[j] * channelData[j];
      }
      const rms = Math.sqrt(sum / samplesPerBar);
      
      // Converter para altura da barra
      const barHeight = Math.max(1, rms * canvas.height * 2);
      const x = i * (this.barWidth + this.barGap);
      const y = (canvas.height - barHeight) / 2;
      
      ctx.fillRect(x, y, this.barWidth, barHeight);
    }
  }

  private drawPlaceholder(): void {
    if (!this.canvasRef) return;

    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = this.width;
    canvas.height = this.height;

    // Limpar canvas
    ctx.fillStyle = this.backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Desenhar barras de placeholder
    const barCount = Math.floor(canvas.width / (this.barWidth + this.barGap));
    ctx.fillStyle = this.color;
    ctx.globalAlpha = 0.3;

    for (let i = 0; i < barCount; i++) {
      const barHeight = Math.random() * canvas.height * 0.8 + canvas.height * 0.1;
      const x = i * (this.barWidth + this.barGap);
      const y = (canvas.height - barHeight) / 2;
      
      ctx.fillRect(x, y, this.barWidth, barHeight);
    }

    ctx.globalAlpha = 1;
  }

  private startAnimation(): void {
    if (this.isAnimating) return;
    
    this.isAnimating = true;
    this.animateWaveform();
  }

  private animateWaveform(): void {
    if (!this.canvasRef || !this.isAnimating) return;

    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = this.width;
    canvas.height = this.height;

    // Limpar canvas
    ctx.fillStyle = this.backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Desenhar barras animadas
    const barCount = Math.floor(canvas.width / (this.barWidth + this.barGap));
    const time = Date.now() * 0.005;
    
    ctx.fillStyle = this.color;

    for (let i = 0; i < barCount; i++) {
      const barHeight = (Math.sin(time + i * 0.5) * 0.5 + 0.5) * canvas.height * 0.8 + canvas.height * 0.1;
      const x = i * (this.barWidth + this.barGap);
      const y = (canvas.height - barHeight) / 2;
      
      ctx.fillRect(x, y, this.barWidth, barHeight);
    }

    this.animationFrame = requestAnimationFrame(() => this.animateWaveform());
  }

  private cleanup(): void {
    this.isAnimating = false;
    
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
    
    if (this.audioContext) {
      this.audioContext.close();
    }
  }
}
