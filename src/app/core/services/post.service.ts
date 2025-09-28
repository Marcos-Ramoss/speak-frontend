import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { PostRepository } from '../repositories';
import { PostAudioDto, CriarPostRequest, Page, PaginationParams, TipoFiltroVoz } from '../models';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private feedPostsSubject = new BehaviorSubject<PostAudioDto[]>([]);
  public feedPosts$ = this.feedPostsSubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  constructor(private postRepository: PostRepository) {}

  criarPostComAudioBase64(
    usuarioId: number, 
    audioDataUri: string, 
    conteudo?: string, 
    tipoFiltroVoz: TipoFiltroVoz = TipoFiltroVoz.NATURAL,
    nomeArquivo?: string
  ): Observable<PostAudioDto> {
    const request: CriarPostRequest = {
      usuarioId,
      audioDataUri,
      conteudo,
      tipoFiltroVoz,
      nomeArquivo
    };

    this.loadingSubject.next(true);
    
    return this.postRepository.criarPostComAudioBase64(request).pipe(
      tap(novoPost => {
        const postsAtuais = this.feedPostsSubject.value;
        this.feedPostsSubject.next([novoPost, ...postsAtuais]);
        this.loadingSubject.next(false);
      })
    );
  }

  criarPostComArquivo(
    usuarioId: number, 
    arquivo: File, 
    conteudo?: string, 
    tipoFiltroVoz: string = TipoFiltroVoz.NATURAL
  ): Observable<PostAudioDto> {
    this.loadingSubject.next(true);
    
    return this.postRepository.criarPostComArquivo(usuarioId, arquivo, conteudo, tipoFiltroVoz).pipe(
      tap(novoPost => {
        const postsAtuais = this.feedPostsSubject.value;
        this.feedPostsSubject.next([novoPost, ...postsAtuais]);
        this.loadingSubject.next(false);
      })
    );
  }

  buscarPorId(id: number): Observable<PostAudioDto> {
    return this.postRepository.buscarPorId(id);
  }

  carregarFeed(params?: PaginationParams): Observable<Page<PostAudioDto>> {
    this.loadingSubject.next(true);
    
    return this.postRepository.buscarFeed(params).pipe(
      tap(page => {
        if (params?.pagina === 0 || !params?.pagina) {
          // Primeira página - substitui os posts
          this.feedPostsSubject.next(page.content);
        } else {
          // Páginas subsequentes - adiciona aos posts existentes
          const postsAtuais = this.feedPostsSubject.value;
          this.feedPostsSubject.next([...postsAtuais, ...page.content]);
        }
        this.loadingSubject.next(false);
      })
    );
  }

  buscarPostsMaisCurtidos(params?: PaginationParams): Observable<Page<PostAudioDto>> {
    this.loadingSubject.next(true);
    
    return this.postRepository.buscarPostsMaisCurtidos(params).pipe(
      tap(() => this.loadingSubject.next(false))
    );
  }

  buscarPostsDoUsuario(usuarioId: number, params?: PaginationParams): Observable<Page<PostAudioDto>> {
    this.loadingSubject.next(true);
    
    return this.postRepository.buscarPostsDoUsuario(usuarioId, params).pipe(
      tap(() => this.loadingSubject.next(false))
    );
  }

  atualizarPost(id: number, conteudo: string): Observable<PostAudioDto> {
    return this.postRepository.atualizarPost(id, conteudo).pipe(
      tap(postAtualizado => {
        const postsAtuais = this.feedPostsSubject.value;
        const postsAtualizados = postsAtuais.map(post => 
          post.id === id ? postAtualizado : post
        );
        this.feedPostsSubject.next(postsAtualizados);
      })
    );
  }

  removerPost(id: number): Observable<void> {
    return this.postRepository.removerPost(id).pipe(
      tap(() => {
        const postsAtuais = this.feedPostsSubject.value;
        const postsFiltrados = postsAtuais.filter(post => post.id !== id);
        this.feedPostsSubject.next(postsFiltrados);
      })
    );
  }

  alternarCurtida(id: number, usuarioId: number): Observable<PostAudioDto> {
    return this.postRepository.alternarCurtida(id, usuarioId).pipe(
      tap(postAtualizado => {
        const postsAtuais = this.feedPostsSubject.value;
        const postsAtualizados = postsAtuais.map(post => 
          post.id === id ? postAtualizado : post
        );
        this.feedPostsSubject.next(postsAtualizados);
      })
    );
  }

  validarConteudoPost(conteudo?: string): string[] {
    const erros: string[] = [];

    if (conteudo && conteudo.length > 280) {
      erros.push('Conteúdo não pode exceder 280 caracteres');
    }

    return erros;
  }

  formatarTempoRelativo(dataPost: string): string {
    const agora = new Date();
    const dataPostDate = new Date(dataPost);
    const diferencaMs = agora.getTime() - dataPostDate.getTime();
    
    const segundos = Math.floor(diferencaMs / 1000);
    const minutos = Math.floor(segundos / 60);
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);

    if (dias > 0) {
      return `${dias}d`;
    } else if (horas > 0) {
      return `${horas}h`;
    } else if (minutos > 0) {
      return `${minutos}m`;
    } else {
      return `${segundos}s`;
    }
  }

  formatarNumero(numero: number): string {
    if (numero >= 1000000) {
      return `${(numero / 1000000).toFixed(1)}M`;
    } else if (numero >= 1000) {
      return `${(numero / 1000).toFixed(1)}K`;
    }
    return numero.toString();
  }
}
