import { Component, Input, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';
import { SliderModule } from 'primeng/slider';
import { TooltipModule } from 'primeng/tooltip';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-audio-player',
  standalone: true,
  imports: [CommonModule, ButtonModule, ProgressBarModule, SliderModule, TooltipModule, FormsModule],
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss']
})
export class AudioPlayerComponent implements OnInit, OnDestroy {
  @Input() audioUrl!: string;
  @Input() showControls = true;
  @Input() autoPlay = false;
  @ViewChild('audioElement') audioElement!: ElementRef<HTMLAudioElement>;
  
  isPlaying = false;
  isLoading = false;
  duration = 0;
  currentTime = 0;
  progress = 0;
  volume = 50;
  isMuted = false;

  private audio?: HTMLAudioElement;

  ngOnInit(): void {
    this.initializeAudio();
  }

  ngOnDestroy(): void {
    this.cleanup();
  }

  togglePlayPause(): void {
    if (!this.audio || this.isLoading) return;
    
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  play(): void {
    if (!this.audio) return;
    
    this.audio.play().then(() => {
      this.isPlaying = true;
    }).catch(error => {
      console.error('Erro ao reproduzir áudio:', error);
    });
  }

  pause(): void {
    if (!this.audio) return;
    
    this.audio.pause();
    this.isPlaying = false;
  }

  stop(): void {
    if (!this.audio) return;
    
    this.audio.pause();
    this.audio.currentTime = 0;
    this.isPlaying = false;
    this.currentTime = 0;
    this.updateProgress();
  }

  seek(event: any): void {
    if (!this.audio || this.duration === 0) return;
    
    const newTime = (event.value / 100) * this.duration;
    this.audio.currentTime = newTime;
  }

  toggleMute(): void {
    if (!this.audio) return;
    
    this.isMuted = !this.isMuted;
    this.audio.muted = this.isMuted;
  }

  changeVolume(event: any): void {
    if (!this.audio) return;
    
    this.volume = event.value;
    this.audio.volume = this.volume / 100;
  }

  formatTime(time: number): string {
    if (isNaN(time) || time === 0) return '0:00';
    
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  private initializeAudio(): void {
    if (typeof window === 'undefined' || !this.audioUrl) return;

    this.isLoading = true;
    this.audio = new Audio(this.audioUrl);
    this.audio.volume = this.volume / 100;
    
    this.setupEventListeners();
    
    if (this.autoPlay) {
      this.play();
    }
  }

  private setupEventListeners(): void {
    if (!this.audio) return;

    this.audio.addEventListener('loadstart', () => {
      this.isLoading = true;
    });

    this.audio.addEventListener('loadeddata', () => {
      this.duration = this.audio!.duration;
      this.isLoading = false;
    });

    this.audio.addEventListener('timeupdate', () => {
      this.currentTime = this.audio!.currentTime;
      this.updateProgress();
    });

    this.audio.addEventListener('ended', () => {
      this.isPlaying = false;
      this.currentTime = 0;
      this.updateProgress();
    });

    this.audio.addEventListener('error', (error) => {
      console.error('Erro no áudio:', error);
      this.isLoading = false;
    });

    this.audio.addEventListener('waiting', () => {
      this.isLoading = true;
    });

    this.audio.addEventListener('canplay', () => {
      this.isLoading = false;
    });
  }

  private updateProgress(): void {
    this.progress = this.duration > 0 ? (this.currentTime / this.duration) * 100 : 0;
  }

  private cleanup(): void {
    if (this.audio) {
      this.audio.pause();
      this.audio.removeEventListener('loadstart', () => {});
      this.audio.removeEventListener('loadeddata', () => {});
      this.audio.removeEventListener('timeupdate', () => {});
      this.audio.removeEventListener('ended', () => {});
      this.audio.removeEventListener('error', () => {});
      this.audio.removeEventListener('waiting', () => {});
      this.audio.removeEventListener('canplay', () => {});
      this.audio = undefined;
    }
  }
}
