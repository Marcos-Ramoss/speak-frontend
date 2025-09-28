import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { UsuarioService } from '../../core/services';
import { UsuarioDto } from '../../core/models';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule,
    ButtonModule,
    AvatarModule,
    MenuModule
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  usuarioAtual: UsuarioDto | null = null;
  userMenuItems: MenuItem[] = [];

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.usuarioService.usuarioAtual$.subscribe(usuario => {
      this.usuarioAtual = usuario;
      this.setupUserMenu();
    });

    // Simular usuário logado para desenvolvimento
    if (!this.usuarioAtual) {
      this.simulateLoggedUser();
    }
  }

  get userInitials(): string {
    if (!this.usuarioAtual?.nome) return 'U';
    return this.usuarioAtual.nome.charAt(0).toUpperCase();
  }

  get userAvatarUrl(): string | undefined {
    return this.usuarioAtual?.urlAvatar;
  }

  private setupUserMenu(): void {
    this.userMenuItems = [
      {
        label: 'Meu Perfil',
        icon: 'pi pi-user',
        command: () => this.navigateToProfile()
      },
      {
        label: 'Configurações',
        icon: 'pi pi-cog',
        command: () => this.navigateToSettings()
      },
      {
        separator: true
      },
      {
        label: 'Sair',
        icon: 'pi pi-sign-out',
        command: () => this.logout()
      }
    ];
  }

  private navigateToProfile(): void {
    // TODO: Implementar navegação para perfil
    console.log('Navegar para perfil');
  }

  private navigateToSettings(): void {
    // TODO: Implementar navegação para configurações
    console.log('Navegar para configurações');
  }

  private logout(): void {
    // TODO: Implementar logout
    console.log('Fazer logout');
  }

  private simulateLoggedUser(): void {
    // Simular usuário para desenvolvimento
    const usuarioSimulado: UsuarioDto = {
      id: 1,
      nome: 'João Silva',
      nomeUsuario: 'joaosilva',
      email: 'joao@example.com',
      urlAvatar: '',
      dicaAvatar: 'Usuário de teste',
      ativo: true,
      criadoEm: new Date().toISOString(),
      atualizadoEm: new Date().toISOString()
    };
    
    this.usuarioService.definirUsuarioAtual(usuarioSimulado);
  }
}
