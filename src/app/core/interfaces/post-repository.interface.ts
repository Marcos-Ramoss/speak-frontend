import { Observable } from 'rxjs';
import { PostAudioDto, CriarPostRequest, Page, PaginationParams } from '../models';

export interface IPostRepository {
  criarPostComAudioBase64(request: CriarPostRequest): Observable<PostAudioDto>;
  criarPostComArquivo(usuarioId: number, arquivo: File, conteudo?: string, tipoFiltroVoz?: string): Observable<PostAudioDto>;
  buscarPorId(id: number): Observable<PostAudioDto>;
  buscarFeed(params?: PaginationParams): Observable<Page<PostAudioDto>>;
  buscarPostsMaisCurtidos(params?: PaginationParams): Observable<Page<PostAudioDto>>;
  buscarPostsDoUsuario(usuarioId: number, params?: PaginationParams): Observable<Page<PostAudioDto>>;
  atualizarPost(id: number, conteudo: string): Observable<PostAudioDto>;
  removerPost(id: number): Observable<void>;
  alternarCurtida(id: number, usuarioId: number): Observable<PostAudioDto>;
}
