# Gerador de Prompts

Um site estático interativo que ensina usuários a evoluir de prompts básicos para intermediários e avançados, utilizando React + TypeScript, Tailwind CSS v4 e shadcn/ui.

## 🚀 Características

- **Progressive Disclosure**: Campos extras aparecem suavemente conforme o nível selecionado
- **Responsivo**: Design adaptativo com sidebar que vira drawer no mobile
- **Acessibilidade**: Foco, aria-labels e contraste AA
- **UX Otimizada**: Tooltips com dicas, validação em tempo real e feedback visual
- **Toast Notifications**: Confirmação de ações com shadcn/ui

## 🛠️ Stack Tecnológica

- **Frontend**: Vite + React 18 + TypeScript
- **Styling**: Tailwind CSS v4 (JIT)
- **Componentes**: shadcn/ui
- **Animações**: Framer Motion
- **Icons**: Lucide React
- **Build**: Vite

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── ui/          # Componentes shadcn/ui
│   ├── Header.tsx   # Cabeçalho com título
│   ├── Sidebar.tsx  # Seletor de nível + info
│   ├── LevelForm.tsx # Formulário dinâmico
│   └── ResultCard.tsx # Card com prompt gerado
├── pages/
│   └── Home.tsx     # Página principal (única rota)
├── hooks/
│   ├── usePromptGenerator.ts # Hook principal
│   └── use-toast.ts # Hook para toasts
├── types/
│   └── index.ts     # Definições TypeScript
└── lib/
    └── utils.ts     # Utilitários (cn function)
```

## 🎯 Níveis de Prompt

### Básico
- Papel
- Tarefa  
- Contexto

### Intermediário
- Campos básicos +
- Formato de saída
- Restrições

### Avançado
- Campos intermediários +
- Dicas adicionais
- Estrutura completa com emojis e instruções

## ⚡ Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Lint
npm run lint

# Format
npm run format

# Preview build
npm run preview
```

## 🚀 Instalação e Uso

1. **Clone o repositório**
```bash
git clone <repository-url>
cd gerador-de-prompts
```

2. **Instale as dependências**
```bash
npm install
```

3. **Execute em desenvolvimento**
```bash
npm run dev
```

4. **Build para produção**
```bash
npm run build
```

O site estará disponível em `http://localhost:5173` durante o desenvolvimento.

## 🎨 Design System

### Cores
- **Primary**: Azul (`hsl(221.2 83.2% 53.3%)`)
- **Base**: Tons neutros de cinza
- **Estados**: Verde (sucesso), Vermelho (erro), Amarelo (warning)

### Componentes
- Todas as classes seguem o padrão shadcn/ui
- Border-radius customizado: `rounded-2xl` (1rem)
- Shadows sutis: `shadow-sm`
- Padding consistente: `p-4`, `p-6`

## 🔧 Funcionalidades

### Geração de Prompts
- **Hook `usePromptGenerator`**: Gera templates baseados no nível
- **Validação**: Todos os campos obrigatórios devem estar preenchidos
- **Templates**: Estruturas otimizadas para cada nível de complexidade

### UX Features
- **Animações suaves**: Campos aparecem/desaparecem com Framer Motion
- **Tooltips informativos**: Dicas em cada campo avançado
- **Copy to clipboard**: Botão para copiar prompt gerado
- **Toast feedback**: Confirmação visual de ações

### Responsividade
- **Desktop**: Sidebar fixa à esquerda
- **Mobile**: Sidebar em drawer/modal (TODO: implementar)
- **Breakpoints**: Tailwind responsive (`lg:`, `md:`, `sm:`)

## 🚧 TODOs para Futuras Implementações

- [ ] Drawer responsivo para mobile
- [ ] Analytics de uso (tracking de copy, nível mais usado)
- [ ] Histórico de prompts gerados
- [ ] Export em diferentes formatos
- [ ] Temas dark/light mode
- [ ] Biblioteca de templates pré-feitos
- [ ] Compartilhamento de prompts via URL

## 📦 Deploy

O projeto está configurado para deploy em qualquer CDN:

```bash
npm run build
# Upload da pasta dist/ para seu provedor
```

Compatível com:
- Vercel
- Netlify  
- GitHub Pages
- AWS S3 + CloudFront
- Qualquer hosting estático

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para detalhes.

## 🙏 Agradecimentos

- [shadcn/ui](https://ui.shadcn.com/) pelos componentes
- [Tailwind CSS](https://tailwindcss.com/) pelo sistema de design
- [Lucide](https://lucide.dev/) pelos ícones
- [Framer Motion](https://www.framer.com/motion/) pelas animações
