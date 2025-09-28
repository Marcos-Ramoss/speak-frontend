# 🎙️ VozSocial Frontend

Uma rede social inovadora focada em conteúdo de áudio, desenvolvida com Angular e PrimeNG.

![Angular](https://img.shields.io/badge/Angular-17+-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![PrimeNG](https://img.shields.io/badge/PrimeNG-17+-007ACC?style=for-the-badge&logo=primeng&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=for-the-badge&logo=sass&logoColor=white)

## 📋 Sobre o Projeto

O **VozSocial** é uma plataforma de rede social revolucionária que permite aos usuários compartilhar conteúdo exclusivamente através de áudio. Com recursos avançados de processamento de voz e IA, oferece uma experiência única de comunicação social.

### ✨ Principais Funcionalidades

- 🎤 **Gravação de Áudio**: Grave áudios de até 15 segundos com visualização em tempo real
- 🔊 **Player Avançado**: Player completo com controles de volume e progresso
- 🤖 **Filtros de Voz**: Transforme sua voz com filtros naturais ou robóticos
- 📝 **Transcrição Automática**: IA converte automaticamente áudio em texto
- 📱 **Design Responsivo**: Interface otimizada para desktop e mobile
- ❤️ **Interações Sociais**: Sistema de curtidas, comentários e compartilhamentos
- 🌊 **Visualização de Ondas**: Visualizador de forma de onda em tempo real

## 🏗️ Arquitetura

O projeto segue os princípios **SOLID** e **Clean Architecture**:

```
src/app/
├── core/                    # Camada de domínio
│   ├── models/             # Interfaces e tipos
│   ├── interfaces/         # Contratos dos repositories
│   ├── repositories/       # Comunicação com API
│   └── services/           # Lógica de negócio
├── shared/                 # Componentes reutilizáveis
│   └── components/
│       ├── audio-recorder/ # Gravador de áudio
│       ├── audio-player/   # Player de áudio
│       ├── audio-post-card/# Card de post
│       └── recorder-dialog/# Modal de gravação
├── features/               # Funcionalidades específicas
│   └── feed/              # Feed principal
└── layout/                # Componentes de layout
    └── header/            # Cabeçalho da aplicação
```

## 🚀 Começando

### Pré-requisitos

- **Node.js** 18.0.0 ou superior
- **npm** 9.0.0 ou superior
- **Angular CLI** 17.0.0 ou superior

### Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seu-usuario/vozsocial-frontend.git
   cd vozsocial-frontend
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure o ambiente**
   ```bash
   # Copie o arquivo de ambiente
   cp src/environments/environment.example.ts src/environments/environment.ts
   
   # Edite as configurações da API
   nano src/environments/environment.ts
   ```

4. **Execute o projeto**
   ```bash
   npm start
   ```

5. **Acesse a aplicação**
   ```
   http://localhost:4200
   ```

## ⚙️ Configuração

### Variáveis de Ambiente

Configure o arquivo `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api', // URL do backend
  maxRecordingTime: 15000,             // Tempo máximo de gravação (ms)
  maxFileSize: 10485760,               // Tamanho máximo de arquivo (bytes)
  supportedAudioTypes: [               // Tipos de áudio suportados
    'audio/wav',
    'audio/mp3',
    'audio/webm',
    'audio/ogg'
  ]
};
```

### Backend

Certifique-se de que o backend VozSocial esteja rodando em:
```
http://localhost:8080
```

## 🛠️ Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm start` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera build de produção |
| `npm run build:prod` | Build otimizado para produção |
| `npm run test` | Executa testes unitários |
| `npm run test:coverage` | Testes com relatório de cobertura |
| `npm run e2e` | Executa testes end-to-end |
| `npm run lint` | Verifica qualidade do código |
| `npm run format` | Formata código com Prettier |

## 🎨 Design System

### Paleta de Cores

```scss
// Light Mode
--primary: #9B8BC7;      // Roxo principal
--background: #E8E8F5;   // Fundo claro
--foreground: #2D2B3F;   // Texto escuro
--card: #FFFFFF;         // Cards brancos
--accent: #D4C5A0;       // Cor de destaque

// Dark Mode
--primary: #9B8BC7;      // Roxo principal
--background: #1A1625;   // Fundo escuro
--foreground: #FAFAFA;   // Texto claro
--card: #1F1B2E;         // Cards escuros
```

### Tipografia

- **Corpo**: Inter (sans-serif)
- **Títulos**: Space Grotesk (sans-serif)
- **Código**: Monaco, Consolas (monospace)

## 📱 Responsividade

O projeto é **mobile-first** com breakpoints:

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🧪 Testes

### Testes Unitários
```bash
npm run test
```

### Testes E2E
```bash
npm run e2e
```

### Cobertura de Código
```bash
npm run test:coverage
```

## 📦 Build e Deploy

### Build de Produção
```bash
npm run build:prod
```

### Deploy
```bash
# Exemplo com Vercel
vercel --prod

# Exemplo com Netlify
netlify deploy --prod --dir=dist
```

## 🔧 Tecnologias Utilizadas

### Core
- **Angular 17+** - Framework principal
- **TypeScript 5.2+** - Linguagem de programação
- **RxJS 7.8+** - Programação reativa

### UI/UX
- **PrimeNG 17+** - Biblioteca de componentes
- **PrimeIcons** - Ícones
- **SCSS** - Pré-processador CSS
- **TailwindCSS** - Utilitários CSS

### Áudio
- **Web Audio API** - Processamento de áudio
- **MediaRecorder API** - Gravação de áudio
- **Canvas API** - Visualização de ondas

### Desenvolvimento
- **Angular CLI** - Ferramentas de desenvolvimento
- **ESLint** - Linting
- **Prettier** - Formatação de código
- **Karma + Jasmine** - Testes unitários

