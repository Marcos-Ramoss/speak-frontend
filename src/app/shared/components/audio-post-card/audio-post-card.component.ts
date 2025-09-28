import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';
import { TooltipModule } from 'primeng/tooltip';
import { MenuItem } from 'primeng/api';
import { AudioPlayerComponent } from '../audio-player/audio-player.component';
import { WaveformVisualizerComponent } from '../waveform-visualizer/waveform-visualizer.component';
import { PostAudioDto } from '../../../core/models';
import { PostService } from '../../../core/services';

@Component({
  selector: 'app-audio-post-card',
  standalone: true,
  imports: [
    CommonModule, 
    CardModule, 
    ButtonModule, 
    AvatarModule,
    MenuModule,
    TooltipModule,
    AudioPlayerComponent,
    WaveformVisualizerComponent
  ],
  templateUrl: './audio-post-card.component.html',
  styleUrls: ['./audio-post-card.component.scss']
})
export class AudioPostCardComponent {
  @Input() post!: PostAudioDto;
  @Input() currentUserId?: number;
  @Input() showActions = true;
  @Input() showMenu = true;
  
  @Output() likeToggled = new EventEmitter<number>();
  @Output() commentClicked = new EventEmitter<number>();
  @Output() shareClicked = new EventEmitter<number>();
  @Output() editClicked = new EventEmitter<number>();
  @Output() deleteClicked = new EventEmitter<number>();

  isLiked = false;
  menuItems: MenuItem[] = [];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.setupMenuItems();
  }

  get formattedTime(): string {
    return this.postService.formatarTempoRelativo(this.post.criadoEm || '');
  }

  get formattedLikes(): string {
    return this.postService.formatarNumero(this.post.quantidadeCurtidas);
  }

  get formattedComments(): string {
    return this.postService.formatarNumero(this.post.quantidadeComentarios);
  }

  get formattedShares(): string {
    return this.postService.formatarNumero(this.post.quantidadeCompartilhamentos);
  }

  get isOwner(): boolean {
    return this.currentUserId === this.post.usuario.id;
  }

  get audioUrl(): string {
    return this.post.arquivoAudio.caminhoArquivo;
  }

  get audioDuration(): number {
    return this.post.arquivoAudio.duracaoSegundos;
  }

  toggleLike(): void {
    if (!this.currentUserId) return;
    
    this.isLiked = !this.isLiked;
    this.likeToggled.emit(this.post.id!);
  }

  openComments(): void {
    this.commentClicked.emit(this.post.id!);
  }

  sharePost(): void {
    this.shareClicked.emit(this.post.id!);
  }

  editPost(): void {
    this.editClicked.emit(this.post.id!);
  }

  deletePost(): void {
    this.deleteClicked.emit(this.post.id!);
  }

  private setupMenuItems(): void {
    this.menuItems = [];

    if (this.isOwner) {
      this.menuItems.push(
        {
          label: 'Editar',
          icon: 'pi pi-pencil',
          command: () => this.editPost()
        },
        {
          label: 'Excluir',
          icon: 'pi pi-trash',
          command: () => this.deletePost()
        }
      );
    } else {
      this.menuItems.push(
        {
          label: 'Reportar',
          icon: 'pi pi-flag',
          command: () => this.reportPost()
        }
      );
    }

    this.menuItems.push(
      {
        label: 'Copiar link',
        icon: 'pi pi-copy',
        command: () => this.copyLink()
      }
    );
  }

  private reportPost(): void {
    // TODO: Implementar funcionalidade de reportar
    console.log('Reportar post:', this.post.id);
  }

  private copyLink(): void {
    const url = `${window.location.origin}/post/${this.post.id}`;
    navigator.clipboard.writeText(url).then(() => {
      // TODO: Mostrar toast de sucesso
      console.log('Link copiado:', url);
    });
  }
}
