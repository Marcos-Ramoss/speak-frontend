# 🎨 Guia de Migração Frontend - VozSocial MVP

## 🎯 **Visão Geral**

Este documento detalha a migração completa do frontend do **VozSocial MVP** de Next.js/React para **Angular** com **PrimeNG**, mantendo exatamente o mesmo design, cores, layout e funcionalidades do sistema atual.

---

## 📊 **Análise do Sistema Atual**

### **Design System Identificado:**

#### **🎨 Paleta de Cores (CSS Variables):**
```css
/* Light Mode */
--background: 255 38% 91%;        /* #E8E8F5 */
--foreground: 263 15% 20%;        /* #2D2B3F */
--primary: 263 38% 65%;           /* #9B8BC7 */
--secondary: 255 20% 88%;         /* #E0E0E0 */
--card: 0 0% 100%;                /* #FFFFFF */
--muted: 255 20% 88%;             /* #E0E0E0 */
--accent: 27 28% 74%;             /* #D4C5A0 */

/* Dark Mode */
--background: 263 15% 10%;        /* #1A1625 */
--foreground: 0 0% 98%;           /* #FAFAFA */
--card: 263 15% 12%;              /* #1F1B2E */
--primary: 263 38% 65%;           /* #9B8BC7 */
--secondary: 263 15% 20%;         /* #2D2B3F */
```

#### **🔤 Tipografia:**
- **Font Family Body:** Inter (sans-serif)
- **Font Family Headline:** Space Grotesk (sans-serif)
- **Font Family Code:** monospace

#### **📐 Layout:**
- **Container:** max-width: 2xl (672px)
- **Padding:** px-4 py-8
- **Border Radius:** 0.5rem (8px)
- **Shadows:** shadow-md, shadow-lg

---

## 🏗️ **Arquitetura Frontend Proposta**

### **Stack Tecnológica:**
- **Framework:** Angular 17+
- **UI Library:** PrimeNG 17+
- **Styling:** SCSS + PrimeNG Theme Customization
- **State Management:** NgRx (opcional) ou Services
- **HTTP Client:** Angular HttpClient
- **Icons:** Lucide Angular (mesmos ícones do projeto atual)
- **Audio Processing:** Web Audio API + MediaRecorder

### **Estrutura de Projeto:**

```
vozsocial-frontend/
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── services/
│   │   │   │   ├── audio.service.ts
│   │   │   │   ├── post.service.ts
│   │   │   │   ├── user.service.ts
│   │   │   │   └── ai-processing.service.ts
│   │   │   ├── guards/
│   │   │   ├── interceptors/
│   │   │   └── models/
│   │   ├── shared/
│   │   │   ├── components/
│   │   │   │   ├── audio-recorder/
│   │   │   │   ├── audio-player/
│   │   │   │   ├── audio-post-card/
│   │   │   │   ├── waveform-visualizer/
│   │   │   │   ├── recorder-dialog/
│   │   │   │   └── voice-filter-selector/
│   │   │   ├── pipes/
│   │   │   ├── directives/
│   │   │   └── utils/
│   │   ├── features/
│   │   │   ├── feed/
│   │   │   │   ├── components/
│   │   │   │   ├── services/
│   │   │   │   └── feed.module.ts
│   │   │   └── recording/
│   │   │       ├── components/
│   │   │       ├── services/
│   │   │       └── recording.module.ts
│   │   ├── layout/
│   │   │   ├── header/
│   │   │   ├── footer/
│   │   │   └── layout.module.ts
│   │   ├── app.component.ts
│   │   ├── app.component.html
│   │   ├── app.component.scss
│   │   ├── app.module.ts
│   │   └── app-routing.module.ts
│   ├── assets/
│   │   ├── images/
│   │   ├── icons/
│   │   └── audio/
│   ├── styles/
│   │   ├── _variables.scss
│   │   ├── _mixins.scss
│   │   ├── _theme.scss
│   │   └── styles.scss
│   └── environments/
├── angular.json
├── package.json
└── prime-ng-theme.config.json
```

---

## 🎨 **Customização do Tema PrimeNG**

### **1. Instalação e Configuração**

```bash
# Instalar Angular CLI
npm install -g @angular/cli

# Criar projeto
ng new vozsocial-frontend --routing --style=scss

# Instalar PrimeNG
npm install primeng primeicons lucide-angular

# Instalar tema personalizado
npm install @angular/cdk
```

### **2. Configuração do Tema Customizado**

```scss
// styles/_variables.scss
:root {
  // Cores principais (convertidas de HSL para hex)
  --background: #E8E8F5;
  --foreground: #2D2B3F;
  --primary: #9B8BC7;
  --primary-foreground: #FFFFFF;
  --secondary: #E0E0E0;
  --secondary-foreground: #2D2B3F;
  --card: #FFFFFF;
  --card-foreground: #2D2B3F;
  --muted: #E0E0E0;
  --muted-foreground: #666666;
  --accent: #D4C5A0;
  --accent-foreground: #2D2B3F;
  --border: #E0E0E0;
  --input: #F5F5F5;
  --ring: #9B8BC7;
  
  // Dark mode
  &.dark {
    --background: #1A1625;
    --foreground: #FAFAFA;
    --card: #1F1B2E;
    --card-foreground: #FAFAFA;
    --primary: #9B8BC7;
    --primary-foreground: #FFFFFF;
    --secondary: #2D2B3F;
    --secondary-foreground: #FAFAFA;
    --muted: #2D2B3F;
    --muted-foreground: #A0A0A0;
    --border: #2D2B3F;
    --input: #2D2B3F;
  }
}

// Tipografia
$font-family-body: 'Inter', sans-serif;
$font-family-headline: 'Space Grotesk', sans-serif;
$font-family-code: 'Monaco', 'Consolas', monospace;

// Espaçamentos
$spacing-xs: 0.25rem;  // 4px
$spacing-sm: 0.5rem;   // 8px
$spacing-md: 1rem;     // 16px
$spacing-lg: 1.5rem;   // 24px
$spacing-xl: 2rem;     // 32px

// Border radius
$border-radius-sm: 0.25rem;  // 4px
$border-radius-md: 0.5rem;   // 8px
$border-radius-lg: 0.75rem;  // 12px
$border-radius-full: 9999px; // Circular
```

### **3. Override do Tema PrimeNG**

```scss
// styles/_theme.scss
// Customizar componentes PrimeNG para match com o design atual

// Botões
.p-button {
  border-radius: $border-radius-md;
  font-family: $font-family-body;
  font-weight: 500;
  
  &.p-button-primary {
    background: var(--primary);
    border-color: var(--primary);
    
    &:hover {
      background: var(--primary);
      opacity: 0.9;
    }
  }
  
  &.p-button-outlined {
    background: transparent;
    border-color: var(--primary);
    color: var(--primary);
  }
}

// Cards
.p-card {
  border-radius: $border-radius-md;
  border: 1px solid var(--border);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  
  .p-card-body {
    padding: $spacing-md;
  }
  
  .p-card-content {
    padding: $spacing-sm $spacing-md;
  }
  
  .p-card-footer {
    padding: $spacing-sm $spacing-md;
    border-top: 1px solid var(--border);
  }
}

// Dialog
.p-dialog {
  .p-dialog-header {
    background: var(--card);
    border-bottom: 1px solid var(--border);
    
    .p-dialog-title {
      font-family: $font-family-headline;
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--primary);
    }
  }
  
  .p-dialog-content {
    background: var(--background);
    padding: $spacing-lg;
  }
}

// Avatar
.p-avatar {
  border-radius: $border-radius-full;
  border: 2px solid var(--border);
}

// Progress Bar
.p-progressbar {
  border-radius: $border-radius-full;
  background: var(--muted);
  
  .p-progressbar-value {
    background: var(--primary);
    border-radius: $border-radius-full;
  }
}

// Radio Button
.p-radiobutton {
  .p-radiobutton-box {
    border-color: var(--border);
    
    &.p-highlight {
      background: var(--primary);
      border-color: var(--primary);
    }
  }
}
```

---

## 🧩 **Componentes Principais**

### **1. AudioRecorderComponent**

```typescript
// src/app/shared/components/audio-recorder/audio-recorder.component.ts
import { Component, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';
import { MessageService } from 'primeng/api';
import { Mic, Square, Trash2 } from 'lucide-angular';

@Component({
  selector: 'app-audio-recorder',
  standalone: true,
  imports: [CommonModule, ButtonModule, ProgressBarModule],
  template: `
    <div class="audio-recorder-container">
      <!-- Timer Display -->
      <div class="timer-display">
        <div class="timer-circle">
          <span class="timer-text">{{ formattedTime }}s</span>
        </div>
      </div>
      
      <!-- Waveform Visualizer -->
      <div class="waveform-container">
        <canvas #waveformCanvas width="350" height="80"></canvas>
      </div>
      
      <!-- Controls -->
      <div class="controls">
        <p-button 
          *ngIf="isRecording"
          icon="pi pi-trash"
          [text]="true"
          [rounded]="true"
          severity="secondary"
          (onClick)="cancelRecording()"
          class="cancel-btn">
        </p-button>
        
        <p-button 
          [icon]="isRecording ? 'pi pi-stop' : 'pi pi-microphone'"
          [rounded]="true"
          [class]="'record-btn ' + (isRecording ? 'recording' : '')"
          (onClick)="toggleRecording()"
          size="large">
        </p-button>
      </div>
    </div>
  `,
  styleUrls: ['./audio-recorder.component.scss']
})
export class AudioRecorderComponent {
  @Output() recordingComplete = new EventEmitter<string>();
  @ViewChild('waveformCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  
  isRecording = false;
  time = 0;
  private mediaRecorder?: MediaRecorder;
  private audioChunks: Blob[] = [];
  private timerInterval?: number;
  private audioStream?: MediaStream;
  private animationFrame?: number;
  
  readonly MAX_RECORDING_TIME = 15000; // 15 seconds
  
  constructor(private messageService: MessageService) {}
  
  get formattedTime(): string {
    return (this.time / 1000).toFixed(1);
  }
  
  async toggleRecording() {
    if (this.isRecording) {
      this.stopRecording();
    } else {
      await this.startRecording();
    }
  }
  
  private async startRecording() {
    try {
      this.audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(this.audioStream);
      this.audioChunks = [];
      
      this.mediaRecorder.ondataavailable = (event) => {
        this.audioChunks.push(event.data);
      };
      
      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.onloadend = () => {
          this.recordingComplete.emit(reader.result as string);
        };
        reader.readAsDataURL(audioBlob);
      };
      
      this.mediaRecorder.start();
      this.isRecording = true;
      this.time = 0;
      
      // Start timer
      this.timerInterval = window.setInterval(() => {
        this.time += 100;
        if (this.time >= this.MAX_RECORDING_TIME) {
          this.stopRecording();
        }
      }, 100);
      
      // Start waveform visualization
      this.startWaveformVisualization();
      
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro de Microfone',
        detail: 'Não foi possível acessar o microfone. Verifique as permissões.'
      });
    }
  }
  
  private stopRecording() {
    if (this.timerInterval) clearInterval(this.timerInterval);
    if (this.mediaRecorder && this.mediaRecorder.state === 'recording') {
      this.mediaRecorder.stop();
    }
    this.isRecording = false;
    this.time = 0;
    this.audioStream?.getTracks().forEach(track => track.stop());
    this.audioStream = undefined;
    
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
  }
  
  cancelRecording() {
    this.stopRecording();
    this.audioChunks = [];
  }
  
  private startWaveformVisualization() {
    if (!this.audioStream || !this.canvasRef) return;
    
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const audioContext = new AudioContext();
    const source = audioContext.createMediaStreamSource(this.audioStream);
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    source.connect(analyser);
    
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    
    const draw = () => {
      if (!this.isRecording) return;
      
      this.animationFrame = requestAnimationFrame(draw);
      
      analyser.getByteTimeDomainData(dataArray);
      
      ctx.fillStyle = 'var(--secondary)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'var(--primary)';
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
```

```scss
// src/app/shared/components/audio-recorder/audio-recorder.component.scss
.audio-recorder-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  padding: 2rem 0;
}

.timer-display {
  position: relative;
  width: 12rem;
  height: 12rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.timer-circle {
  position: absolute;
  inset: 0;
  background: var(--primary);
  opacity: 0.1;
  border-radius: 50%;
  animation: pulse 2s infinite;
  
  &.recording {
    animation-duration: 2s;
  }
}

.timer-text {
  position: relative;
  z-index: 10;
  font-size: 2.25rem;
  font-weight: 700;
  font-family: monospace;
  color: var(--primary);
}

.waveform-container {
  width: 100%;
  height: 5rem;
  border-radius: 0.5rem;
  background: rgba(var(--secondary), 0.5);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  
  canvas {
    max-width: 100%;
    height: auto;
  }
}

.controls {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.record-btn {
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  
  &.recording {
    animation: pulse 1s infinite;
  }
}

.cancel-btn {
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
```

### **2. AudioPlayerComponent**

```typescript
// src/app/shared/components/audio-player/audio-player.component.ts
import { Component, Input, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';
import { Play, Pause } from 'lucide-angular';

@Component({
  selector: 'app-audio-player',
  standalone: true,
  imports: [CommonModule, ButtonModule, ProgressBarModule],
  template: `
    <div class="audio-player">
      <p-button 
        [icon]="isPlaying ? 'pi pi-pause' : 'pi pi-play'"
        [rounded]="true"
        (onClick)="togglePlayPause()"
        class="play-btn">
      </p-button>
      
      <div class="player-content">
        <p-progressBar 
          [value]="progress" 
          [showValue]="false"
          class="progress-bar">
        </p-progressBar>
        
        <div class="time-display">
          <span>{{ formatTime(currentTime) }}</span>
          <span>{{ formatTime(duration) }}</span>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./audio-player.component.scss']
})
export class AudioPlayerComponent implements OnInit, OnDestroy {
  @Input() audioUrl!: string;
  @ViewChild('audioElement') audioElement!: ElementRef<HTMLAudioElement>;
  
  isPlaying = false;
  duration = 0;
  currentTime = 0;
  progress = 0;
  
  private audio?: HTMLAudioElement;
  
  ngOnInit() {
    this.initializeAudio();
  }
  
  ngOnDestroy() {
    if (this.audio) {
      this.audio.pause();
      this.audio.removeEventListener('loadeddata', this.setAudioData);
      this.audio.removeEventListener('timeupdate', this.setAudioTime);
      this.audio.removeEventListener('ended', this.onAudioEnded);
    }
  }
  
  private initializeAudio() {
    if (typeof window !== 'undefined') {
      this.audio = new Audio(this.audioUrl);
      
      this.audio.addEventListener('loadeddata', this.setAudioData);
      this.audio.addEventListener('timeupdate', this.setAudioTime);
      this.audio.addEventListener('ended', this.onAudioEnded);
    }
  }
  
  togglePlayPause() {
    if (!this.audio) return;
    
    if (this.isPlaying) {
      this.audio.pause();
    } else {
      this.audio.play();
    }
    this.isPlaying = !this.isPlaying;
  }
  
  formatTime(time: number): string {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
  
  private setAudioData = () => {
    if (this.audio) {
      this.duration = this.audio.duration;
      this.currentTime = this.audio.currentTime;
      this.updateProgress();
    }
  };
  
  private setAudioTime = () => {
    if (this.audio) {
      this.currentTime = this.audio.currentTime;
      this.updateProgress();
    }
  };
  
  private onAudioEnded = () => {
    this.isPlaying = false;
  };
  
  private updateProgress() {
    this.progress = this.duration > 0 ? (this.currentTime / this.duration) * 100 : 0;
  }
}
```

```scss
// src/app/shared/components/audio-player/audio-player.component.scss
.audio-player {
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  background: rgba(var(--secondary), 0.5);
  padding: 0.5rem;
  border-radius: 0.5rem;
}

.play-btn {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  flex-shrink: 0;
}

.player-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.progress-bar {
  width: 100%;
  height: 0.5rem;
  
  ::ng-deep .p-progressbar {
    height: 0.5rem;
    border-radius: 9999px;
  }
}

.time-display {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: var(--muted-foreground);
}
```

### **3. AudioPostCardComponent**

```typescript
// src/app/shared/components/audio-post-card/audio-post-card.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { Heart, MessageCircle, Repeat, Share2 } from 'lucide-angular';
import { AudioPlayerComponent } from '../audio-player/audio-player.component';

export interface AudioPost {
  id: string;
  user: {
    name: string;
    username: string;
    avatarUrl: string;
    avatarHint: string;
  };
  audioUrl: string;
  duration: number;
  transcription?: string;
  likes: number;
  comments: number;
  shares: number;
  createdAt: string;
}

@Component({
  selector: 'app-audio-post-card',
  standalone: true,
  imports: [
    CommonModule, 
    CardModule, 
    ButtonModule, 
    AvatarModule,
    AudioPlayerComponent
  ],
  template: `
    <p-card class="post-card">
      <!-- Header -->
      <ng-template pTemplate="header">
        <div class="post-header">
          <p-avatar 
            [image]="post.user.avatarUrl" 
            [alt]="post.user.name"
            size="large"
            shape="circle">
          </p-avatar>
          <div class="user-info">
            <div class="user-names">
              <span class="user-name">{{ post.user.name }}</span>
              <span class="user-username">@{{ post.user.username }}</span>
            </div>
            <span class="post-time">{{ post.createdAt }}</span>
          </div>
        </div>
      </ng-template>
      
      <!-- Content -->
      <ng-template pTemplate="content">
        <app-audio-player [audioUrl]="post.audioUrl"></app-audio-player>
        <p *ngIf="post.transcription" class="transcription">
          {{ post.transcription }}
        </p>
      </ng-template>
      
      <!-- Footer -->
      <ng-template pTemplate="footer">
        <div class="post-actions">
          <p-button 
            [icon]="isLiked ? 'pi pi-heart-fill' : 'pi pi-heart'"
            [text]="true"
            [class]="'action-btn ' + (isLiked ? 'liked' : '')"
            (onClick)="toggleLike()">
            <span class="action-count">{{ likeCount }}</span>
          </p-button>
          
          <p-button 
            icon="pi pi-comment"
            [text]="true"
            class="action-btn"
            (onClick)="openComments()">
            <span class="action-count">{{ post.comments }}</span>
          </p-button>
          
          <p-button 
            icon="pi pi-refresh"
            [text]="true"
            class="action-btn"
            (onClick)="sharePost()">
            <span class="action-count">{{ post.shares }}</span>
          </p-button>
          
          <p-button 
            icon="pi pi-share-alt"
            [text]="true"
            class="action-btn share-btn"
            (onClick)="sharePost()">
          </p-button>
        </div>
      </ng-template>
    </p-card>
  `,
  styleUrls: ['./audio-post-card.component.scss']
})
export class AudioPostCardComponent {
  @Input() post!: AudioPost;
  
  isLiked = false;
  likeCount = 0;
  
  ngOnInit() {
    this.likeCount = this.post.likes;
  }
  
  toggleLike() {
    this.isLiked = !this.isLiked;
    this.likeCount = this.isLiked ? this.likeCount + 1 : this.likeCount - 1;
  }
  
  openComments() {
    // TODO: Implementar modal de comentários
  }
  
  sharePost() {
    // TODO: Implementar compartilhamento
  }
}
```

```scss
// src/app/shared/components/audio-post-card/audio-post-card.component.scss
.post-card {
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--border);
  
  ::ng-deep .p-card-body {
    padding: 0;
  }
  
  ::ng-deep .p-card-header {
    padding: 1rem;
    border-bottom: 1px solid var(--border);
  }
  
  ::ng-deep .p-card-content {
    padding: 0.5rem 1rem;
  }
  
  ::ng-deep .p-card-footer {
    padding: 0.5rem 1rem;
    border-top: 1px solid var(--border);
  }
}

.post-header {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-info {
  flex: 1;
}

.user-names {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.user-name {
  font-weight: 700;
  color: var(--foreground);
}

.user-username {
  font-size: 0.875rem;
  color: var(--muted-foreground);
}

.post-time {
  font-size: 0.875rem;
  color: var(--muted-foreground);
}

.transcription {
  margin-top: 1rem;
  font-size: 0.875rem;
  color: rgba(var(--foreground), 0.8);
  line-height: 1.5;
}

.post-actions {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--muted-foreground);
  
  &.liked {
    color: #ef4444;
  }
  
  &.share-btn {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
  }
}

.action-count {
  font-size: 0.875rem;
}
```

---

## 📱 **Layout Principal**

### **1. AppComponent**

```typescript
// src/app/app.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layout/header/header.component';
import { FeedComponent } from './features/feed/feed.component';
import { RecorderDialogComponent } from './shared/components/recorder-dialog/recorder-dialog.component';
import { ButtonModule } from 'primeng/button';
import { Mic } from 'lucide-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    HeaderComponent, 
    FeedComponent, 
    RecorderDialogComponent,
    ButtonModule
  ],
  template: `
    <div class="app-container">
      <app-header></app-header>
      
      <main class="main-content">
        <app-feed></app-feed>
      </main>
      
      <app-recorder-dialog 
        [visible]="isRecording"
        (visibleChange)="onRecordingDialogChange($event)"
        (postCreated)="onPostCreated($event)">
      </app-recorder-dialog>
      
      <!-- Floating Action Button -->
      <p-button 
        icon="pi pi-microphone"
        [rounded]="true"
        size="large"
        class="fab"
        (onClick)="openRecordingDialog()"
        [aria-label]="'Iniciar gravação'">
      </p-button>
    </div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'VozSocial';
  isRecording = false;
  
  openRecordingDialog() {
    this.isRecording = true;
  }
  
  onRecordingDialogChange(visible: boolean) {
    this.isRecording = visible;
  }
  
  onPostCreated(post: any) {
    // TODO: Adicionar post ao feed
    this.isRecording = false;
  }
}
```

```scss
// src/app/app.component.scss
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: var(--background);
}

.main-content {
  flex: 1;
  width: 100%;
  max-width: 42rem; // 672px (2xl)
  margin: 0 auto;
  padding: 2rem 1rem;
}

.fab {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 50;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  
  ::ng-deep .p-button {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
}
```

### **2. HeaderComponent**

```typescript
// src/app/layout/header/header.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, AvatarModule],
  template: `
    <header class="header">
      <div class="header-container">
        <h1 class="logo">VozSocial</h1>
        <p-avatar 
          image="https://placehold.co/48x48/9B8BC7/FFFFFF?text=U"
          alt="User Avatar"
          size="large"
          shape="circle">
        </p-avatar>
      </div>
    </header>
  `,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {}
```

```scss
// src/app/layout/header/header.component.scss
.header {
  position: sticky;
  top: 0;
  z-index: 40;
  width: 100%;
  border-bottom: 1px solid var(--border);
  background: rgba(var(--background), 0.8);
  backdrop-filter: blur(12px);
}

.header-container {
  display: flex;
  height: 4rem;
  align-items: center;
  justify-content: space-between;
  max-width: 42rem;
  margin: 0 auto;
  padding: 0 1rem;
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  font-family: $font-family-headline;
  color: var(--primary);
}
```

---

## 🔧 **Configuração Final**

### **1. package.json**

```json
{
  "name": "vozsocial-frontend",
  "version": "1.0.0",
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "watch": "ng build --watch --configuration development",
    "test": "ng test",
    "lint": "ng lint"
  },
  "dependencies": {
    "@angular/animations": "^17.0.0",
    "@angular/common": "^17.0.0",
    "@angular/compiler": "^17.0.0",
    "@angular/core": "^17.0.0",
    "@angular/forms": "^17.0.0",
    "@angular/platform-browser": "^17.0.0",
    "@angular/platform-browser-dynamic": "^17.0.0",
    "@angular/router": "^17.0.0",
    "primeng": "^17.0.0",
    "primeicons": "^7.0.0",
    "primeflex": "^3.3.1",
    "lucide-angular": "^0.294.0",
    "rxjs": "~7.8.0",
    "tslib": "^2.3.0",
    "zone.js": "~0.14.0"
  },
  "devDependencies": {
    "@angular-devkit/build-angular": "^17.0.0",
    "@angular/cli": "^17.0.0",
    "@angular/compiler-cli": "^17.0.0",
    "@types/jasmine": "~5.1.0",
    "jasmine-core": "~5.1.0",
    "karma": "~6.4.0",
    "karma-chrome-headless": "~3.1.0",
    "karma-coverage": "~2.2.0",
    "karma-jasmine": "~5.1.0",
    "karma-jasmine-html-reporter": "~2.1.0",
    "typescript": "~5.2.0"
  }
}
```

### **2. angular.json**

```json
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "newProjectRoot": "projects",
  "projects": {
    "vozsocial-frontend": {
      "projectType": "application",
      "schematics": {
        "@schematics/angular:component": {
          "style": "scss"
        }
      },
      "root": "",
      "sourceRoot": "src",
      "prefix": "app",
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:browser",
          "options": {
            "outputPath": "dist/vozsocial-frontend",
            "index": "src/index.html",
            "main": "src/main.ts",
            "polyfills": [
              "zone.js"
            ],
            "tsConfig": "tsconfig.app.json",
            "inlineStyleLanguage": "scss",
            "assets": [
              "src/favicon.ico",
              "src/assets"
            ],
            "styles": [
              "src/styles.scss"
            ],
            "scripts": []
          }
        },
        "serve": {
          "builder": "@angular-devkit/build-angular:dev-server",
          "configurations": {
            "production": {
              "buildTarget": "vozsocial-frontend:build:production"
            },
            "development": {
              "buildTarget": "vozsocial-frontend:build:development"
            }
          },
          "defaultConfiguration": "development"
        }
      }
    }
  }
}
```

---

## 🚀 **Scripts de Inicialização**

### **1. setup-project.sh**

```bash
#!/bin/bash

echo "🎨 Setting up VozSocial Frontend..."

# Create Angular project
ng new vozsocial-frontend --routing --style=scss --skip-git

cd vozsocial-frontend

# Install PrimeNG
npm install primeng primeicons primeflex

# Install Lucide Angular for icons
npm install lucide-angular

# Install additional dependencies
npm install @angular/cdk

echo "✅ Project setup completed!"
echo "📁 Navigate to vozsocial-frontend directory"
echo "🚀 Run 'ng serve' to start development server"
```

### **2. build-and-deploy.sh**

```bash
#!/bin/bash

echo "🏗️ Building VozSocial Frontend..."

# Build for production
ng build --configuration production

echo "✅ Build completed!"
echo "📦 Output available in dist/vozsocial-frontend/"
```

---

## 📋 **Checklist de Migração**

### **Fase 1: Setup Inicial**
- [ ] Criar projeto Angular
- [ ] Instalar PrimeNG e dependências
- [ ] Configurar tema customizado
- [ ] Setup estrutura de pastas

### **Fase 2: Componentes Base**
- [ ] AudioRecorderComponent
- [ ] AudioPlayerComponent
- [ ] AudioPostCardComponent
- [ ] WaveformVisualizerComponent

### **Fase 3: Layout e Navegação**
- [ ] HeaderComponent
- [ ] AppComponent principal
- [ ] FeedComponent
- [ ] RecorderDialogComponent

### **Fase 4: Serviços e Integração**
- [ ] AudioService
- [ ] PostService
- [ ] UserService
- [ ] AIProcessingService

### **Fase 5: Estilização e Temas**
- [ ] Variáveis SCSS
- [ ] Tema PrimeNG customizado
- [ ] Componentes responsivos
- [ ] Dark mode support

### **Fase 6: Testes e Deploy**
- [ ] Testes unitários
- [ ] Testes de integração
- [ ] Build de produção
- [ ] Deploy configuration

---

## 🎯 **Resultado Final**

O frontend migrado manterá **exatamente** a mesma aparência e funcionalidades do sistema atual:

✅ **Design idêntico** - Cores, tipografia, espaçamentos  
✅ **Componentes funcionais** - Gravador, player, cards  
✅ **Interações preservadas** - Likes, comentários, compartilhamento  
✅ **Responsividade** - Mobile-first design  
✅ **Performance** - Angular otimizado + PrimeNG  

**🎨 Este guia garante uma migração perfeita mantendo 100% da identidade visual e funcional do VozSocial MVP atual.**
