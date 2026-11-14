# Vértice · Plataforma Executiva de Tomada de Decisão & Elasticidade Operacional

[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Recharts](https://img.shields.io/badge/Recharts-2.x-22c55e)](https://recharts.org/)
[![Google Gemini](https://img.shields.io/badge/AI_Engine-Gemini_%2F_Hydrogen-4285F4?logo=google&logoColor=white)](https://ai.google.dev/)

Plataforma de inteligência e simulação estratégica de alta liderança desenvolvida em **React 18, Vite, Tailwind CSS e Recharts**. O sistema combina visualização de dados executiva em modo editorial escuro (*Dark Luxury Dashboard*), simuladores de elasticidade em tempo real e diagnósticos automatizados por Inteligência Artificial (Google Gemini & modelo Hydrogen com fallback heurístico local).

Demonstração online: [vertice-lemon.vercel.app](https://vertice-lemon.vercel.app/)

---

## Sumário

- [Visão Geral](#visão-geral)
- [Aba Indicadores (Logística & E-commerce)](#aba-indicadores-logística--e-commerce)
  - [Base de Dados Consolidada](#base-de-dados-consolidada)
  - [Diagnóstico Executivo por IA](#diagnóstico-executivo-por-ia)
  - [4 KPIs de Decisão](#4-kpis-de-decisão)
  - [Grid Estratégico (3 Perguntas de Negócio)](#grid-estratégico-3-perguntas-de-negócio)
- [Outros Módulos da Plataforma](#outros-módulos-da-plataforma)
- [Design System & Identidade Visual](#design-system--identidade-visual)
- [Stack Tecnológica](#stack-tecnológica)
- [Segurança & Publicação Open Source](#segurança--publicação-open-source)
- [Como Executar o Projeto](#como-executar-o-projeto)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Licença](#licença)

---

## Visão Geral

A plataforma **Vértice** foi desenhada para diretores de operações (COO), diretores financeiros (CFO) e líderes de expansão que precisam diagnosticar gargalos operacionais e simular o impacto de decisões de capital antes da execução.

O projeto reúne:
1. **Landing Page Editorial:** Apresentação da tese de produto com revelação dinâmica e paralaxe.
2. **Visão Executiva (4 Abas):**
   - **Visão Geral:** Desempenho de receita líquida (R$ 48,6 mi), meta de elasticidade e projeção de 12 meses.
   - **Indicadores:** Painel aprofundado de malha logística nacional, quebra de SLA, impacto em nota e retenção, com simulador regional de Centro de Distribuição e IA generativa.
   - **Decisões:** Acordeões de iniciativas estratégicas orientadas pelos gargalos de dados.
   - **Histórico:** Linha temporal de auditoria e governança.
3. **Planejamento & Gantt:** Cronograma das iniciativas de expansão e infraestrutura.
4. **Cenários & Riscos:** Matriz de probabilidade × impacto conectada aos dados operacionais.
5. **Copiloto Estratégico & Executive Brief:** Assistente contextual com prévia e exportação de relatórios executivos em PDF.

---

## Aba Indicadores (Logística & E-commerce)

A aba **Indicadores** (`src/IndicadoresTab.jsx`) atua como cockpit de decisão logística construído sobre o ecossistema de dados de e-commerce brasileiro.

### Base de Dados Consolidada
- **96.478 pedidos** faturados e analisados.
- **R$ 13,22 milhões** em GMV transacionado.
- **27 Unidades Federativas (UFs)** integradas com métricas completas de:
  - Lead time médio de entrega (dias corridos).
  - Taxa de atraso de SLA de entrega.
  - Nota média de avaliação (pedidos no prazo vs. pedidos com atraso).
  - Taxa de recompra/retenção (clientes com entrega no prazo vs. clientes com entrega atrasada).
  - Concentração de receita e pedidos por região.

### Diagnóstico Executivo por IA
O topo do painel conta com um **Diagnóstico Executivo por Recorte** dinâmico:
- **Modelos Suportados:** `hydrogen`, `gemini-2.5-flash`, `gemini-2.0-flash` e `gemini-1.5-flash`.
- **Análise Reativa:** Sempre que o gestor altera o filtro de UF (ou visualiza o consolidado nacional), o componente sintetiza os dados operacionais daquela região em 3 tópicos estritamente acionáveis:
  1. *Principal gargalo de SLA da rota*;
  2. *Impacto na satisfação e recompra do cliente*;
  3. *Ação imediata recomendada de malha ou estoque*.
- **Resiliência e Fallback Local:** Caso nenhuma chave de API esteja configurada ou ocorra instabilidade de rede, o componente aciona instantaneamente um **motor heurístico interno**, gerando o diagnóstico analítico com precisão matemática sem quebrar a interface ou exibir erros.
- **Configuração no Navegador:** Um modal acessível pelo botão de engrenagem (`⚙️`) permite testar ou informar uma chave própria do Google AI Studio diretamente na sessão (`localStorage`), sem tocar em arquivos locais.

### 4 KPIs de Decisão
Indicadores que recalculam instantaneamente ao filtrar por estado ou consolidado:
1. **Volume & GMV Total:** Total de pedidos processados e receita transacionada.
2. **Taxa de Atraso de SLA:** Percentual de entregas que extrapolaram a data estimada (meta de referência: 8,0%).
3. **Queda de Nota por Atraso:** Diferença em pontos na satisfação do consumidor entre compras no prazo vs. atrasadas.
4. **Impacto na Retenção:** Diferencial na taxa de recompra decorrente de fricções logísticas.

### Grid Estratégico (3 Perguntas de Negócio)

```
┌────────────────────────────────────────────────────────────────────────┐
│ Bloco A: Gargalos de Malha por Rota/UF                                 │
│ Gráfico de barras (Recharts) cruzando Lead Time vs. Taxa de Atraso     │
│ dos Top 10 estados com linha de referência de SLA em 8%.               │
├───────────────────────────────────┬────────────────────────────────────┤
│ Bloco B: Elasticidade e Retenção  │ Bloco C: Simulador de CD Regional  │
│ Comparativo lado a lado de Nota   │ Sliders interativos para redução   │
│ Média e Recompra (Prazo vs Atraso)│ de lead time e corte de atraso.    │
│ demonstrando a perda de LTV.      │ Recálculo em tempo real de pedidos,│
│                                   │ nota média, retenção e GMV salvo.  │
└───────────────────────────────────┴────────────────────────────────────┘
```

---

## Outros Módulos da Plataforma

- **Cenários de Elasticidade:** Projeções de receita anual de R$ 102,8 mi a R$ 108,6 mi baseadas em alavancas de preço de 0% a 3% com curva de penalidade de volume.
- **Matriz de Riscos Operacionais:** Mapeamento de 5 riscos críticos (incluindo quebra de SLA no Nordeste e concentração de malha no Sudeste) com quadrantes de probabilidade e severidade.
- **Copiloto Estratégico:** Consulta rápida alimentada com conhecimento operacional sobre gargalos de SLA, expansão de CDs e elasticidade de margem.
- **Executive Brief:** Gerador de memorando executivo formatado para comitês de diretoria e conselho de administração.

---

## Design System & Identidade Visual

O design segue rigorosamente o sistema **Vértice 2026** (Dark Luxury & Editorial UI):

| Token | Hex | Aplicação |
| :--- | :--- | :--- |
| **Fundo Principal** | `#0B0F14` | Profundidade escura de alto contraste |
| **Superfície dos Painéis** | `#121821` | Cards executivos e containers |
| **Controles & Sliders** | `#1A2230` | Subcards, inputs e trilhas de sliders |
| **Bordas & Divisores** | `#232C3B` | Contorno nítido de 1px |
| **Ouro / Destaque** | `#F4B942` | Séries em hipótese, métricas-chave e foco |
| **Marca / Ação** | `#D62828` | Botões primários e destaque de marca |
| **SLA no Prazo** | `#18A957` | Indicadores dentro da meta operacional |
| **Gargalo / Alerta** | `#FFB020` | Riscos moderados e tolerância de malha |
| **Risco Crítico** | `#E5484D` | Rupturas graves de SLA e perda de margem |

- **Tipografia:** `Coolvetica` para números monumentais e títulos da marca; `Poppins` / `Newsreader` para hierarquia editorial de leitura.
- **Controles Interativos:** Sliders de precisão com classe utilitária `.vx` e feedback instantâneo.

---

## Stack Tecnológica

- **Core:** [React 18](https://react.dev/) + [Vite 5](https://vitejs.dev/)
- **Estilização:** [Tailwind CSS 3](https://tailwindcss.com/) + PostCSS + Autoprefixer
- **Visualização de Dados:** [Recharts 2](https://recharts.org/) (BarChart, ResponsiveContainer, ReferenceLine, Tooltip customizado)
- **Iconografia:** [Lucide React](https://lucide.dev/)
- **Inteligência Artificial:** Integração nativa com a API [Google Gemini](https://ai.google.dev/) (endpoints `gemini-2.5-flash`, `gemini-2.0-flash`, `hydrogen`) com fallback heurístico autônomo.

---

## Segurança & Publicação Open Source

O repositório foi auditado e higienizado para publicação pública no GitHub:

1. **Proteção de Segredos no Git:** O arquivo `.gitignore` bloqueia explicitamente todos os formatos de credenciais locais:
   - `.env`, `.env.*`, `.env.local`
   - Certificados e chaves criptográficas (`*.pem`, `*.key`, `*.cert`)
   - Diretórios de build (`dist/`, `.vercel/`, `.turbo/`)
2. **Zero-Config por Padrão:** Nenhuma chave de API proprietária está embutida no código-fonte. O aplicativo funciona imediatamente com diagnósticos inteligentes nativos mesmo sem qualquer chave informada.
3. **Chave Opcional via Interface ou `.env`:** Caso queira usar sua própria cota da API Gemini:
   - Pelo navegador: clique no ícone de engrenagem (`⚙️`) no card de diagnóstico.
   - Pelo ambiente local: copie `.env.example` para `.env` e preencha `VITE_GEMINI_API_KEY`.

---

## Como Executar o Projeto

### Pré-requisitos
- **Node.js:** versão 18 ou superior.
- **npm:** versão 9 ou superior.

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/vertice.git
   cd vertice
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **(Opcional) Configure as variáveis de ambiente:**
   ```bash
   cp .env.example .env
   ```
   *Se não configurar, a aplicação usará o motor heurístico local sem interrupções.*

4. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```
   O projeto estará acessível em `http://localhost:5173`.

5. **Build de produção:**
   ```bash
   npm run build
   npm run preview
   ```

---

## Estrutura de Pastas

```
vertice/
├── .env.example              # Modelo seguro para variáveis de ambiente
├── .gitignore                # Regras de exclusão de arquivos sensíveis e builds
├── index.html                # Ponto de entrada HTML e fontes
├── package.json              # Dependências e scripts
├── tailwind.config.js        # Configuração de temas e tokens Vértice
├── vite.config.js            # Configuração do empacotador Vite
├── public/
│   ├── favicon.svg           # Favicon vetorial da Vértice
│   └── fonts/                # Arquivos da fonte Coolvetica
└── src/
    ├── main.jsx              # Inicialização da aplicação React
    ├── App.jsx               # Gerenciador de navegação e layout da plataforma
    ├── Overview.jsx          # Painel de Visão Executiva (contém a aba Indicadores)
    ├── IndicadoresTab.jsx    # Cockpit de Indicadores Olist (IA + KPIs + 3 Blocos)
    ├── Copilot.jsx           # Copiloto Estratégico com motor de respostas
    ├── Pages.jsx             # Telas de Planejamento, Cenários, Riscos e Relatórios
    ├── Landing.jsx           # Landing page institucional
    ├── BriefModal.jsx        # Modal de geração do Executive Brief
    ├── data.js               # Dados consolidados Olist, tokens e modelo matemático
    ├── ui.jsx                # Componentes atômicos reutilizáveis (Btn, Badge, Ring)
    └── index.css             # Estilos globais e estilização de sliders .vx
```

---

## Licença

Distribuído sob a licença [MIT](LICENSE). Consulte o arquivo de licença para mais informações.
