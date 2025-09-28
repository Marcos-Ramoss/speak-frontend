import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { UsuarioRepository } from '../repositories';
import { UsuarioDto } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private usuarioAtualSubject = new BehaviorSubject<UsuarioDto | null>(null);
  public usuarioAtual$ = this.usuarioAtualSubject.asObservable();

  constructor(private usuarioRepository: UsuarioRepository) {}

  criarUsuario(usuario: UsuarioDto): Observable<UsuarioDto> {
    return this.usuarioRepository.criarUsuario(usuario).pipe(
      tap(usuarioCriado => {
        this.usuarioAtualSubject.next(usuarioCriado);
      })
    );
  }

  buscarPorId(id: number): Observable<UsuarioDto> {
    return this.usuarioRepository.buscarPorId(id);
  }

  buscarPorNomeUsuario(nomeUsuario: string): Observable<UsuarioDto> {
    return this.usuarioRepository.buscarPorNomeUsuario(nomeUsuario);
  }

  listarUsuariosAtivos(): Observable<UsuarioDto[]> {
    return this.usuarioRepository.listarUsuariosAtivos();
  }

  atualizarUsuario(id: number, usuario: UsuarioDto): Observable<UsuarioDto> {
    return this.usuarioRepository.atualizarUsuario(id, usuario).pipe(
      tap(usuarioAtualizado => {
        const usuarioAtual = this.usuarioAtualSubject.value;
        if (usuarioAtual && usuarioAtual.id === id) {
          this.usuarioAtualSubject.next(usuarioAtualizado);
        }
      })
    );
  }

  desativarUsuario(id: number): Observable<void> {
    return this.usuarioRepository.desativarUsuario(id).pipe(
      tap(() => {
        const usuarioAtual = this.usuarioAtualSubject.value;
        if (usuarioAtual && usuarioAtual.id === id) {
          this.usuarioAtualSubject.next(null);
        }
      })
    );
  }

  definirUsuarioAtual(usuario: UsuarioDto): void {
    this.usuarioAtualSubject.next(usuario);
  }

  obterUsuarioAtual(): UsuarioDto | null {
    return this.usuarioAtualSubject.value;
  }

  validarDadosUsuario(usuario: UsuarioDto): string[] {
    const erros: string[] = [];

    if (!usuario.nome || usuario.nome.trim().length === 0) {
      erros.push('Nome é obrigatório');
    }

    if (!usuario.nomeUsuario || usuario.nomeUsuario.trim().length === 0) {
      erros.push('Nome de usuário é obrigatório');
    }

    if (!usuario.email || usuario.email.trim().length === 0) {
      erros.push('Email é obrigatório');
    } else if (!this.validarEmail(usuario.email)) {
      erros.push('Email deve ter um formato válido');
    }

    if (usuario.nomeUsuario && usuario.nomeUsuario.length < 3) {
      erros.push('Nome de usuário deve ter pelo menos 3 caracteres');
    }

    return erros;
  }

  private validarEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
