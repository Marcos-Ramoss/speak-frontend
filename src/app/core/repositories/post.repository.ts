import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IPostRepository } from '../interfaces';
import { PostAudioDto, CriarPostRequest, Page, PaginationParams } from '../models';

@Injectable({
  providedIn: 'root'
})
export class PostRepository implements IPostRepository {
  private readonly baseUrl = `${environment.apiUrl}/posts`;

  constructor(private http: HttpClient) {}

  criarPostComAudioBase64(request: CriarPostRequest): Observable<PostAudioDto> {
    return this.http.post<PostAudioDto>(`${this.baseUrl}/com-audio-base64`, request);
  }

  criarPostComArquivo(usuarioId: number, arquivo: File, conteudo?: string, tipoFiltroVoz?: string): Observable<PostAudioDto> {
    const formData = new FormData();
    formData.append('arquivo', arquivo);
    
    let params = new HttpParams().set('usuarioId', usuarioId.toString());
    if (conteudo) {
      params = params.set('conteudo', conteudo);
    }
    if (tipoFiltroVoz) {
      params = params.set('tipoFiltroVoz', tipoFiltroVoz);
    }

    return this.http.post<PostAudioDto>(`${this.baseUrl}/com-arquivo`, formData, { params });
  }

  buscarPorId(id: number): Observable<PostAudioDto> {
    return this.http.get<PostAudioDto>(`${this.baseUrl}/${id}`);
  }

  buscarFeed(params?: PaginationParams): Observable<Page<PostAudioDto>> {
    let httpParams = new HttpParams();
    if (params?.pagina !== undefined) {
      httpParams = httpParams.set('pagina', params.pagina.toString());
    }
    if (params?.tamanho !== undefined) {
      httpParams = httpParams.set('tamanho', params.tamanho.toString());
    }

    return this.http.get<Page<PostAudioDto>>(`${this.baseUrl}/feed`, { params: httpParams });
  }

  buscarPostsMaisCurtidos(params?: PaginationParams): Observable<Page<PostAudioDto>> {
    let httpParams = new HttpParams();
    if (params?.pagina !== undefined) {
      httpParams = httpParams.set('pagina', params.pagina.toString());
    }
    if (params?.tamanho !== undefined) {
      httpParams = httpParams.set('tamanho', params.tamanho.toString());
    }

    return this.http.get<Page<PostAudioDto>>(`${this.baseUrl}/mais-curtidos`, { params: httpParams });
  }

  buscarPostsDoUsuario(usuarioId: number, params?: PaginationParams): Observable<Page<PostAudioDto>> {
    let httpParams = new HttpParams();
    if (params?.pagina !== undefined) {
      httpParams = httpParams.set('pagina', params.pagina.toString());
    }
    if (params?.tamanho !== undefined) {
      httpParams = httpParams.set('tamanho', params.tamanho.toString());
    }

    return this.http.get<Page<PostAudioDto>>(`${this.baseUrl}/usuario/${usuarioId}`, { params: httpParams });
  }

  atualizarPost(id: number, conteudo: string): Observable<PostAudioDto> {
    const params = new HttpParams().set('conteudo', conteudo);
    return this.http.put<PostAudioDto>(`${this.baseUrl}/${id}`, null, { params });
  }

  removerPost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  alternarCurtida(id: number, usuarioId: number): Observable<PostAudioDto> {
    const params = new HttpParams().set('usuarioId', usuarioId.toString());
    return this.http.post<PostAudioDto>(`${this.baseUrl}/${id}/curtir`, null, { params });
  }
}
