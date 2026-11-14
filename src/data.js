export const C = {
  bg: '#0B0F14', s1: '#121821', s2: '#1A2230', s3: '#232C3B',
  red: '#D62828', gold: '#F4B942', ok: '#18A957', warn: '#FFB020',
  danger: '#E5484D', t1: '#F7F8FA', t2: '#A8B0BF',
};

export const fmt = (n, d = 1) =>
  Number(n).toLocaleString('pt-BR', { minimumFractionDigits: d, maximumFractionDigits: d });
export const signed = (n, d = 1) => `${n >= 0 ? '+' : '−'}${fmt(Math.abs(n), d)}`;

export const MONTHS = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
export const REAL = [7.0, 7.7, 7.5, 8.4, 8.7, 9.3];
export const META = [7.2, 7.8, 8.1, 8.7, 9.0, 9.6];
export const BASE_H2 = [8.6, 8.8, 9.0, 9.1, 9.3, 9.4];

export const UNITS = { 'Todas as unidades': 1, Sudeste: 0.654, Sul: 0.144, Nordeste: 0.113, 'Centro-Oeste': 0.064, Norte: 0.025 };

/* Microdados consolidados da malha logística e e-commerce (Olist Indicadores) */
export const OLIST_REGIOES = [
  { regiao: 'Sudeste', pedidos: 66200, gmv: 8.65, taxaAtraso: 6.1, leadTime: 10.3, share: 65.4, ufs: ['SP', 'RJ', 'MG', 'ES'] },
  { regiao: 'Sul', pedidos: 13814, gmv: 1.90, taxaAtraso: 5.9, leadTime: 13.5, share: 14.4, ufs: ['RS', 'PR', 'SC'] },
  { regiao: 'Nordeste', pedidos: 9044, gmv: 1.50, taxaAtraso: 12.7, leadTime: 19.5, share: 11.3, ufs: ['BA', 'PE', 'CE', 'MA', 'PB', 'PI', 'RN', 'AL', 'SE'] },
  { regiao: 'Centro-Oeste', pedidos: 5624, gmv: 0.85, taxaAtraso: 6.5, leadTime: 14.6, share: 6.4, ufs: ['DF', 'GO', 'MT', 'MS'] },
  { regiao: 'Norte', pedidos: 1796, gmv: 0.33, taxaAtraso: 8.6, leadTime: 22.1, share: 2.5, ufs: ['PA', 'TO', 'RO', 'AM', 'AC', 'AP', 'RR'] }
];

export const OLIST_NATIONAL_TOTALS = {
  totalPedidos: 96478,
  gmvTotal: 13221498.11,
  gmvMi: 13.22,
  taxaAtrasoNacional: 6.8,
  leadTimeMedioDias: 12.1,
  notaNoPrazo: 4.29,
  notaAtrasado: 2.27,
  quedaNotaPts: 2.02,
  recompraNoPrazoPct: 6.21,
  recompraAtrasadoPct: 5.19
};

/* Modelo simples e transparente do simulador (premissas ilustrativas) */
export const calc = (price, unit = 'Todas as unidades') => {
  const share = UNITS[unit] ?? 1;
  const receitaTotal = 102.8 * (1 + 0.0376 * price);
  const penal = price > 2.2 ? 0.5 * (price - 2.2) : 0;
  const margem = 18.4 + 0.467 * price - penal;
  const risco = price <= 1 ? 'Baixo' : price <= 2 ? 'Moderado' : 'Alto';
  const tone = price <= 1 ? 'ok' : price <= 2 ? 'warn' : 'danger';
  return { receita: receitaTotal, unidade: (receitaTotal - 102.8) * share, margem, risco, tone };
};

/* Série de 12 meses: realizado + meta (1S) e projeção base × cenário (2S) */
export const series = (price) => {
  const r = calc(price);
  const f = (54.2 + (r.receita - 102.8)) / 54.2;
  return MONTHS.map((m, i) =>
    i < 6
      ? { m, realizado: REAL[i], meta: META[i], base: i === 5 ? REAL[5] : null, cenario: i === 5 ? REAL[5] : null }
      : { m, base: BASE_H2[i - 6], cenario: +(BASE_H2[i - 6] * f).toFixed(2) },
  );
};

export const ANS = {
  margem: {
    title: 'Há espaço para recuperar a margem sem um reajuste generalizado.',
    text: 'A receita do 1S26 chegou a R$ 48,6 mi (+12,5%). A margem EBITDA, porém, caiu de 19,6% para 18,4%. Recomendo atuar em preço e frete nos contratos com maior pressão, preservando as contas de expansão. [1][2]',
    metrics: [['R$ 8,94 mi', 'EBITDA realizado'], ['R$ 10,08 mi', 'Meta semestral'], ['38%', 'Desvio em 3 contratos']],
    levers: [['Reajuste seletivo', '+R$ 0,72 mi', 'Aplicar 1,5% nas contas com maior defasagem, com exceções para clientes estratégicos. Comercial · Até 15 jul.'], ['Eficiência de frete', '+R$ 0,42 mi', 'Renegociar rotas e consolidar entregas do Sudeste, sem reduzir o nível de serviço. Operações · Até 31 jul.']],
    decision: 'Aprovar as duas frentes, com potencial combinado de R$ 1,14 mi. Na base semestral, EBITDA passaria de R$ 8,94 mi para R$ 10,08 mi. Validar elasticidade e custos antes da execução; os efeitos não são garantidos. [3]',
    risk: 'Risco de execução: perda de volume em contas sensíveis a preço. Monitorar semanalmente conversão, margem por contrato e pontualidade de entrega.',
    prem: ['Elasticidade-preço estimada: −0,8 (ilustrativa)', 'Frete: redução de 4% nas rotas consolidadas', 'Base: orçamento 2026 versão do comitê (jun/26)'],
  },
  volume: {
    title: 'Se o volume cair 2%, o ganho líquido do reajuste fica menor, mas segue positivo.',
    text: 'Com reajuste de 1,5% e queda de 2% no volume das contas afetadas, o efeito do preço (+R$ 0,72 mi) é parcialmente compensado pela perda de volume. Estimativa ilustrativa, sujeita à validação de elasticidade. [1][3]',
    metrics: [['+R$ 0,72 mi', 'Efeito preço'], ['−R$ 0,41 mi', 'Efeito volume (est.)'], ['+R$ 0,31 mi', 'Efeito líquido (est.)']],
    levers: [['Proteger contas estratégicas', 'Mitigação', 'Manter exceções para clientes com alta sensibilidade a preço. Comercial · Até 15 jul.'], ['Frete', '+R$ 0,42 mi', 'O ganho de frete não depende do volume de vendas e preserva a recomposição.']],
    decision: 'Aprovar o reajuste com gatilho de revisão: se a queda de volume superar 2% em 30 dias, reabrir a premissa. Os efeitos não são garantidos. [3]',
    risk: 'Risco de execução: a queda pode se concentrar nos contratos do Sudeste, onde a margem já está pressionada.',
    prem: ['Queda de volume de 2% nas contas reajustadas', 'Margem de contribuição média de 22% (ilustrativa)'],
  },
  contratos: {
    title: 'Três contratos do Sudeste concentram 38% do desvio de margem.',
    text: 'A pressão vem de frete acima do previsto e de mix desfavorável. As renovações ocorrem em julho, o que abre janela para renegociar condições. [1][2]',
    metrics: [['SE-014', '17% do desvio'], ['SE-027', '12% do desvio'], ['SE-031', '9% do desvio']],
    levers: [['Revisar preço', '+R$ 0,72 mi', 'Priorizar os três contratos antes da renovação. Comercial · Até 15 jul.'], ['Revisar frete', '+R$ 0,42 mi', 'Consolidar rotas e renegociar tarifas. Operações · Até 31 jul.']],
    decision: 'Autorizar a diretoria comercial a abrir renegociação nos três contratos e reportar resultado na revisão de 08 jul. [2]',
    risk: 'Risco de execução: clientes estratégicos podem reagir a reajustes sem contrapartida de serviço.',
    prem: ['Identificação dos contratos: nomes ilustrativos', 'Dados do CRM atualizados às 08:40'],
  },
  cenarios: {
    title: 'O cenário “Expansão disciplinada” entrega a melhor margem entre as alternativas.',
    text: 'Entre os três cenários, o de preço +1,5% projeta receita anual de R$ 108,6 mi e margem de 19,1%, contra R$ 102,8 mi e 18,4% da base. [3]',
    metrics: [['R$ 96,4 mi', 'Conservador · 17,2%'], ['R$ 102,8 mi', 'Base · 18,4%'], ['R$ 108,6 mi', 'Expansão · 19,1%']],
    levers: [['Conservador', 'Demanda −6%', 'Útil para testar a resiliência do plano de expansão.'], ['Expansão disciplinada', 'Preço +1,5%', 'Combina reajuste seletivo e disciplina de custos.']],
    decision: 'Adotar “Expansão disciplinada” como referência do comitê e manter o conservador como teste de estresse. Projeções são estimativas. [3]',
    risk: 'Risco de execução: a premissa de elasticidade ainda precisa de validação com dados de renovação.',
    prem: ['Receita anual base: R$ 102,8 mi', 'Reajuste de 1,5% aplicado de forma seletiva'],
  },
  riscos: {
    title: 'O principal risco é a concentração de desvio no Sudeste.',
    text: 'Além da concentração, a perda de volume em contas sensíveis a preço é o segundo ponto de atenção. Ambos são mitigáveis com acompanhamento semanal. [1][2]',
    metrics: [['Alto', 'Concentração SE'], ['Moderado', 'Volume sensível'], ['08 jul', 'Próxima revisão']],
    levers: [['Monitorar', 'Semanal', 'Conversão, margem por contrato e pontualidade de entrega.'], ['Mitigar', 'Até 31 jul', 'Revisar condições antes das renovações.']],
    decision: 'Manter os riscos na pauta do comitê até a revisão de 08 jul. [3]',
    risk: 'Risco de execução: dependência de dados do CRM atualizados diariamente.',
    prem: ['Classificação de risco: matriz interna do Grupo Alvora'],
  },
  sla: {
    title: 'Atrasos no SLA derrubam a nota do cliente em 2,02 pontos e contraem a recompra.',
    text: 'Na malha nacional de 96.478 pedidos e R$ 13,2 mi de GMV, a taxa média de atraso é de 6,8%. Quando o pedido atrasa, a nota do cliente despenca de 4,29 para 2,27 (−47%) e a recompra cai de 6,21% para 5,19%. O gargalo crítico concentra-se no Nordeste (12,7% de atraso e 19,5 dias de lead time).',
    metrics: [['6,8%', 'Taxa atraso nacional'], ['−2,02 pts', 'Queda de nota'], ['12,7%', 'Gargalo Nordeste']],
    levers: [
      ['Descentralizar CD no Nordeste', '+R$ 0,42 mi', 'Implantar hub cross-docking para comprimir lead time de 19,5 para 13 dias.'],
      ['Rotas expressas Last-Mile', '+1.100 recompras', 'Renegociar contratos de entrega regional reduzindo atrasos em 45%.']
    ],
    decision: 'Aprovar alocação de CD regional avançado no Nordeste, protegendo R$ 1,5 mi de GMV sob risco de churn.',
    risk: 'Risco operacional: custo de estocagem descentralizada se o giro for mal dimensionado.',
    prem: ['Microdados reais: 96.478 pedidos em 27 UFs', 'Lead time médio nacional: 12,1 dias']
  },
  cd: {
    title: 'A alocação de um CD Regional protege até R$ 850 mil de GMV em risco.',
    text: 'A simulação elástica indica que uma redução de 3,5 dias no lead time e corte de 45% na taxa de atraso salva mais de 2.900 pedidos do atraso e preserva mais de 280 clientes adicionais na recompra, com ganho direto no CSAT ponderado.',
    metrics: [['+2.900', 'Pedidos salvos'], ['+R$ 410 mil', 'GMV protegido'], ['+0,09', 'Ganho CSAT']],
    levers: [
      ['CD Hub Express', '−3,5 dias', 'Compressão direta do tempo de trânsito interestadual.'],
      ['Proteção de LTV', '+280 clientes', 'Retenção garantida na carteira de compradores recorrentes.']
    ],
    decision: 'Priorizar piloto de CD regional com modelo satélite antes de investimento em infraestrutura pesada.',
    risk: 'Risco de capital de giro alocado em praças com densidade menor que o Sudeste.',
    prem: ['Simulador Vértice de Elasticidade Logística', 'Threshold de corte de atraso: 45%']
  },
  fallback: {
    title: 'Preciso de um recorte para responder com evidências.',
    text: 'Posso analisar margem, EBITDA, cenários, riscos, volume e contratos do 1S26. Reformule indicando o indicador ou a decisão que deseja avaliar.',
    metrics: [['3', 'Fontes conectadas'], ['1S26', 'Período'], ['08:42', 'Última carga']],
    levers: [], decision: null, risk: 'A IA apoia a análise. Decisões e validação final permanecem com a liderança.', prem: [],
  },
};

export const pick = (q) => {
  const s = q.toLowerCase();
  if (/sla|atraso|log[ií]stica|entrega|prazo|frete/.test(s)) return ANS.sla;
  if (/cd|centro de distribui[cç][aã]o|armaz[eé]m|hub/.test(s)) return ANS.cd;
  if (/volume|cair|queda/.test(s)) return ANS.volume;
  if (/contrato/.test(s)) return ANS.contratos;
  if (/cen[aá]rio|compar/.test(s)) return ANS.cenarios;
  if (/risco/.test(s)) return ANS.riscos;
  if (/margem|ebitda|recuper|meta/.test(s)) return ANS.margem;
  return ANS.fallback;
};
