import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageService } from 'primeng/api';
import { AudioPostCardComponent } from '../../shared/components';
import { PostService, UsuarioService } from '../../core/services';
import { PostAudioDto, PaginationParams } from '../../core/models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    ProgressSpinnerModule,
    AudioPostCardComponent
  ],
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit, OnDestroy {
  posts: PostAudioDto[] = [];
  isLoading = false;
  isLoadingMore = false;
  hasMorePosts = true;
  currentPage = 0;
  pageSize = 10;
  currentUserId?: number;

  private subscription = new Subscription();

  constructor(
    private postService: PostService,
    private usuarioService: UsuarioService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.setupSubscriptions();
    this.loadFeed();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadFeed(refresh = false): void {
    if (refresh) {
      this.currentPage = 0;
      this.hasMorePosts = true;
    }

    this.isLoading = refresh || this.currentPage === 0;
    
    const params: PaginationParams = {
      pagina: this.currentPage,
      tamanho: this.pageSize
    };

    this.subscription.add(
      this.postService.carregarFeed(params).subscribe({
        next: (page) => {
          if (refresh || this.currentPage === 0) {
            this.posts = page.content;
          } else {
            this.posts = [...this.posts, ...page.content];
          }
          
          this.hasMorePosts = !page.last;
          this.isLoading = false;
          this.isLoadingMore = false;
        },
        error: (error) => {
          console.error('Erro ao carregar feed:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Não foi possível carregar o feed. Tente novamente.'
          });
          this.isLoading = false;
          this.isLoadingMore = false;
        }
      })
    );
  }

  loadMorePosts(): void {
    if (this.isLoadingMore || !this.hasMorePosts) return;
    
    this.isLoadingMore = true;
    this.currentPage++;
    this.loadFeed();
  }

  refreshFeed(): void {
    this.loadFeed(true);
  }

  onLikeToggled(postId: number): void {
    if (!this.currentUserId) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Ação não permitida',
        detail: 'Você precisa estar logado para curtir posts.'
      });
      return;
    }

    this.subscription.add(
      this.postService.alternarCurtida(postId, this.currentUserId).subscribe({
        next: (postAtualizado) => {
          // O post já é atualizado automaticamente pelo service
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: postAtualizado.quantidadeCurtidas > 0 ? 'Post curtido!' : 'Curtida removida!',
            life: 2000
          });
        },
        error: (error) => {
          console.error('Erro ao curtir post:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Não foi possível curtir o post. Tente novamente.'
          });
        }
      })
    );
  }

  onCommentClicked(postId: number): void {
    // TODO: Implementar modal de comentários
    console.log('Abrir comentários do post:', postId);
    this.messageService.add({
      severity: 'info',
      summary: 'Em desenvolvimento',
      detail: 'Funcionalidade de comentários será implementada em breve.'
    });
  }

  onShareClicked(postId: number): void {
    // TODO: Implementar compartilhamento
    console.log('Compartilhar post:', postId);
    this.messageService.add({
      severity: 'info',
      summary: 'Em desenvolvimento',
      detail: 'Funcionalidade de compartilhamento será implementada em breve.'
    });
  }

  onEditClicked(postId: number): void {
    // TODO: Implementar edição de post
    console.log('Editar post:', postId);
    this.messageService.add({
      severity: 'info',
      summary: 'Em desenvolvimento',
      detail: 'Funcionalidade de edição será implementada em breve.'
    });
  }

  onDeleteClicked(postId: number): void {
    // TODO: Implementar confirmação e exclusão
    console.log('Excluir post:', postId);
    this.messageService.add({
      severity: 'info',
      summary: 'Em desenvolvimento',
      detail: 'Funcionalidade de exclusão será implementada em breve.'
    });
  }

  trackByPostId(index: number, post: PostAudioDto): number {
    return post.id || index;
  }

  private setupSubscriptions(): void {
    // Observar posts do feed
    this.subscription.add(
      this.postService.feedPosts$.subscribe(posts => {
        this.posts = posts;
      })
    );

    // Observar loading state
    this.subscription.add(
      this.postService.loading$.subscribe(loading => {
        if (!this.isLoadingMore) {
          this.isLoading = loading;
        }
      })
    );

    // Observar usuário atual
    this.subscription.add(
      this.usuarioService.usuarioAtual$.subscribe(usuario => {
        this.currentUserId = usuario?.id;
      })
    );
  }
}
