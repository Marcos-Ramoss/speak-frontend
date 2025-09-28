import { Observable } from 'rxjs';
import { UsuarioDto } from '../models';

export interface IUsuarioRepository {
  criarUsuario(usuario: UsuarioDto): Observable<UsuarioDto>;
  buscarPorId(id: number): Observable<UsuarioDto>;
  buscarPorNomeUsuario(nomeUsuario: string): Observable<UsuarioDto>;
  listarUsuariosAtivos(): Observable<UsuarioDto[]>;
  atualizarUsuario(id: number, usuario: UsuarioDto): Observable<UsuarioDto>;
  desativarUsuario(id: number): Observable<void>;
}
