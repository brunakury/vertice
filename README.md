# vertice · Simulador Estratégico de Elasticidade de Ocupação & Expansão

Aplicação executiva em **React + Tailwind CSS + Recharts** que reúne landing page, painel de visão executiva, simulador de elasticidade de preço, copiloto estratégico com IA simulada e geração de *Executive Brief*. O design segue o sistema de identidade e produto **vertice 2026** (tokens de cor, tipografia, espaçamento e componentes).

> **Aviso:** todos os dados são fictícios e servem apenas para demonstração. As respostas do copiloto são simuladas no front-end (não há chamada a nenhuma API de IA) e as projeções do simulador usam premissas ilustrativas, não garantias de resultado.

---

## Sumário

- [Funcionalidades](#funcionalidades)
- [Stack](#stack)
- [Como rodar](#como-rodar)
- [Fonte Coolvetica](#fonte-coolvetica)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Sistema de design](#sistema-de-design)
- [Modelo do simulador](#modelo-do-simulador)
- [Movimento e acessibilidade](#movimento-e-acessibilidade)
- [Personalização](#personalização)
- [Limitações conhecidas](#limitações-conhecidas)
- [Licença](#licença)

---

## Funcionalidades

**Landing page**
- Menu flutuante, título em revelação por palavras e "V" facetado em 3D com paralaxe do mouse.
- Faixa de KPIs em rolagem contínua (pausa ao passar o cursor).
- Seção com rolagem ancorada: o número em destaque e o gráfico mudam conforme a leitura avança.
- Bloco do copiloto com resposta digitada em tempo real e lista de princípios expansível.
- Barra de progresso de rolagem.

**Plataforma (acesso pelo botão "Acessar demonstração")**
- **Menu lateral** em trilho: 72 px só com ícones, expande para 224 px ao passar o cursor ou focar. No celular vira uma barra inferior.
- **Visão executiva** com quatro abas (Visão geral, Indicadores, Decisões, Histórico):
  - número principal que acompanha o cursor sobre o gráfico mês a mês;
  - gráfico de 12 meses: realizado e meta (jan–jun) e projeção base × cenário (jul–dez);
  - simulador com nome do cenário, reajuste seletivo de preço (0 a 3%) e unidade de negócio;
  - leitura estratégica, recomendação prioritária e atalho para o copiloto.
- **Planejamento:** linha do tempo (Gantt) das iniciativas do 2S26 com progresso.
- **Cenários:** comparação entre Conservador, Base e cenários salvos; selecionar, salvar e excluir.
- **Riscos:** matriz de probabilidade × impacto sincronizada com a lista de riscos.
- **Copiloto estratégico:** chat com sugestões de perguntas, resposta com métricas, alavancas, decisão sugerida, premissas, evidências e botão "Levar ao Executive Brief".
- **Relatórios:** seleção entre relatórios e abertura do *Executive Brief* já configurado.
- **Executive Brief (modal):** escolha de período e público, seções incluídas, prévia do documento em tempo real e exportação simulada com notificação de sucesso.
- Busca global (navega entre as telas) e painel de notificações.
- **Responsivo:** em tablet e celular o menu lateral vira uma barra inferior, a topbar compacta, os gráficos e tabelas se reorganizam (tabelas viram listas, o Gantt empilha) e o modal do brief ajusta a prévia.

---

## Stack

| Tecnologia | Uso |
| --- | --- |
| React 18 | Interface |
| Vite 5 | Build e servidor de desenvolvimento |
| Tailwind CSS 3 (PostCSS) | Estilos utilitários, compilados no build |
| Recharts 2 | Gráficos (área, linha e anel de progresso) |
| lucide-react | Ícones |
| Poppins (Google Fonts) | Fonte secundária, pesos 200 a 700 |
| Coolvetica | Fonte de exibição (arquivo local) |

---

## Como rodar

### Localmente

Requisitos: Node.js 18 ou superior.

```bash
npm install
npm run dev
```

Scripts disponíveis:

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção em `dist/` |
| `npm run preview` | Pré-visualização do build |

### No StackBlitz

1. Crie um projeto com o template **React (Vite)** em JavaScript.
2. Substitua `index.html`, `package.json` e `vite.config.js` na raiz e adicione `tailwind.config.js` e `postcss.config.js`.
3. Substitua/crie todos os arquivos de `src/`.
4. Crie `public/fonts/` e adicione a Coolvetica (veja abaixo).
5. Apague `src/App.css` e `src/index.css` do template, se existirem.
6. Se necessário, rode `npm install` no terminal.

> O Tailwind é compilado pelo PostCSS (arquivos `tailwind.config.js`, `postcss.config.js` e `src/index.css`), sem depender de CDN. Depois de substituir os arquivos, rode `npm install` para instalar `tailwindcss`, `postcss` e `autoprefixer`.

---

## Fonte Coolvetica

A Coolvetica **não está disponível no Google Fonts** e por isso não acompanha o repositório. Para usá-la:

1. Baixe a fonte e confira a licença para o seu tipo de uso (pessoal ou comercial).
2. Coloque o arquivo em `public/fonts/` com um destes nomes:
   - `coolvetica.otf`
   - `coolvetica.woff2`
   - `coolvetica.ttf`
3. O `@font-face` em `index.html` já referencia esses caminhos.

Sem o arquivo, a interface usa *Helvetica Neue / Arial* como alternativa. A Coolvetica só tem peso regular; o contraste de peso vem da combinação com o Poppins (extralight, light, regular, semibold).

---

## Estrutura do projeto

```
.
├── index.html            # Entrada HTML e fontes do Google
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── public/
│   └── fonts/            # Coloque aqui a Coolvetica
└── src/
    ├── main.jsx          # Ponto de entrada
    ├── index.css         # Tailwind, @font-face, keyframes e estilos globais
    ├── App.jsx           # Shell da plataforma (menu lateral, topbar, rotas por estado)
    ├── data.js           # Tokens, dados, modelo do simulador e respostas do copiloto
    ├── ui.jsx            # Hooks de movimento e componentes base (Btn, Badge, Tabs, Ring...)
    ├── Landing.jsx       # Landing page
    ├── Overview.jsx      # Visão executiva e suas abas
    ├── Pages.jsx         # Planejamento, Cenários, Riscos e Relatórios
    ├── Copilot.jsx       # Copiloto estratégico
    └── BriefModal.jsx    # Modal do Executive Brief
```

A navegação é feita por estado em `App.jsx` (sem React Router). Estados compartilhados entre telas: cenário do simulador, cenários salvos, cenário selecionado e modal do brief.

---

## Sistema de design

### Cores (sólidas, sem gradientes decorativos)

| Token | Valor | Uso |
| --- | --- | --- |
| Background | `#0B0F14` | Fundo da aplicação |
| Surface 01 | `#121821` | Painéis e navegação |
| Surface 02 | `#1A2230` | Controles e seleção |
| Surface 03 | `#232C3B` | Bordas e divisores |
| Primary brand | `#D62828` | Ação primária e marca |
| Accent | `#F4B942` | Série principal e destaque de hipótese |
| Success | `#18A957` | Meta atingida (sempre com texto) |
| Warning | `#FFB020` | Revisão necessária |
| Danger | `#E5484D` | Risco e exclusão |
| Text primary | `#F7F8FA` | Leitura prioritária |
| Text secondary | `#A8B0BF` | Metadados |

### Tipografia

- **Coolvetica:** marca, títulos de destaque e números grandes.
- **Poppins:** interface, textos e rótulos, nos pesos 200, 300, 400, 500 e 600; itálico para ênfase.

### Geometria

- Altura padrão de controles: 48 px.
- Raios: 4 px (selos), 8 px (botões e campos), 16 px (painéis).
- Cor nunca é o único sinal: estados semânticos sempre vêm com rótulo em texto.

---

## Modelo do simulador

Premissas ilustrativas definidas em `src/data.js` (`calc`), com reajuste de preço `p` em %:

```
receita anual = 102,8 × (1 + 0,0376 × p)            // R$ mi
margem EBITDA = 18,4 + 0,467 × p − penalidade       // %
penalidade    = 0,5 × (p − 2,2)  se p > 2,2, senão 0
```

Com `p = 1,5%` o resultado é R$ 108,6 mi de receita anual e 19,1% de margem, valores usados nos materiais de referência. O risco de volume é classificado em baixo (até 1%), moderado (até 2%) ou alto (acima de 2%).

---

## Movimento e acessibilidade

**Movimento:** revelações por rolagem, contadores animados, gráficos que se desenham, sublinhado deslizante nas abas, acordeões, barras que crescem e resposta do copiloto digitada. O CSS respeita `prefers-reduced-motion` e desativa animações e transições para quem preferir.

**Acessibilidade (WCAG 2.1 AA como meta):**
- Foco visível em ouro (2 px) em todos os elementos interativos.
- Marcação semântica: `nav`, `header`, `main`, `aside`, `dialog` com `aria-modal`, abas com `role="tablist"`.
- Gráficos e indicadores com rótulos de texto (`aria-label`) e valores também em texto.
- Modal fecha com `Esc`; notificações usam `role="status"`.

---

## Personalização

- **Dados e textos do copiloto:** edite `ANS` e `pick` em `src/data.js`. A função `pick` escolhe a resposta por palavras-chave.
- **Modelo do simulador:** altere `calc` e `series` em `src/data.js`.
- **Integrar IA real:** substitua a chamada a `pick` em `src/Copilot.jsx` (função `send`) por uma requisição ao seu backend. Não coloque chaves de API no front-end.
- **Relatórios e períodos do brief:** edite `REPORTS` em `src/Pages.jsx` e `PERIODS` em `src/BriefModal.jsx`.

---

## Limitações conhecidas

- Dados fictícios e sem persistência: ao recarregar a página, cenários salvos e seleções são perdidos.
- "Exportar PDF" simula a exportação (mostra carregamento e notificação), mas não gera um arquivo.
- O filtro "Unidade de negócio" afeta apenas a contribuição exibida no simulador, não o gráfico.
- A Coolvetica precisa ser adicionada manualmente.

---

## Licença

Defina a licença do repositório antes de publicar (por exemplo, MIT) e adicione o arquivo `LICENSE`. A fonte Coolvetica e a marca "vertice" têm direitos próprios e não estão incluídas neste repositório.
