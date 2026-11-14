import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  TrendingDown,
  TrendingUp,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Sliders,
  Sparkles,
  RefreshCw,
  Building2,
  ShieldAlert,
  Info,
  DollarSign,
  Star,
  Users,
  ChevronDown,
  RotateCcw,
  Key,
  X
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
  Cell
} from 'recharts';

export const OLIST_ESTADOS_DATA = [
  {
    uf: "SP",
    total_pedidos: 40501,
    taxa_atraso_pct: 4.5,
    lead_time_medio_dias: 8.3,
    atraso_medio_quando_atrasa_dias: 8.3,
    nota_media_no_prazo: 4.33,
    nota_media_atrasado: 2.55,
    taxa_recompra_no_prazo_pct: 6.43,
    taxa_recompra_atrasado_pct: 4.84,
    gmv_total: 5067633.16
  },
  {
    uf: "RJ",
    total_pedidos: 12350,
    taxa_atraso_pct: 12.1,
    lead_time_medio_dias: 14.8,
    atraso_medio_quando_atrasa_dias: 13.5,
    nota_media_no_prazo: 4.24,
    nota_media_atrasado: 1.91,
    taxa_recompra_no_prazo_pct: 6.8,
    taxa_recompra_atrasado_pct: 5.95,
    gmv_total: 1759651.13
  },
  {
    uf: "MG",
    total_pedidos: 11354,
    taxa_atraso_pct: 4.6,
    lead_time_medio_dias: 11.5,
    atraso_medio_quando_atrasa_dias: 8.4,
    nota_media_no_prazo: 4.28,
    nota_media_atrasado: 2.36,
    taxa_recompra_no_prazo_pct: 6.05,
    taxa_recompra_atrasado_pct: 4.62,
    gmv_total: 1552481.83
  },
  {
    uf: "RS",
    total_pedidos: 5345,
    taxa_atraso_pct: 6.1,
    lead_time_medio_dias: 14.8,
    atraso_medio_quando_atrasa_dias: 10.2,
    nota_media_no_prazo: 4.31,
    nota_media_atrasado: 2.21,
    taxa_recompra_no_prazo_pct: 6.24,
    taxa_recompra_atrasado_pct: 7.08,
    gmv_total: 728897.47
  },
  {
    uf: "PR",
    total_pedidos: 4923,
    taxa_atraso_pct: 4.0,
    lead_time_medio_dias: 11.5,
    atraso_medio_quando_atrasa_dias: 8.3,
    nota_media_no_prazo: 4.3,
    nota_media_atrasado: 2.68,
    taxa_recompra_no_prazo_pct: 6.05,
    taxa_recompra_atrasado_pct: 5.03,
    gmv_total: 666063.51
  },
  {
    uf: "SC",
    total_pedidos: 3546,
    taxa_atraso_pct: 8.2,
    lead_time_medio_dias: 14.5,
    atraso_medio_quando_atrasa_dias: 8.3,
    nota_media_no_prazo: 4.29,
    nota_media_atrasado: 2.35,
    taxa_recompra_no_prazo_pct: 5.47,
    taxa_recompra_atrasado_pct: 5.5,
    gmv_total: 507012.13
  },
  {
    uf: "BA",
    total_pedidos: 3256,
    taxa_atraso_pct: 12.2,
    lead_time_medio_dias: 18.9,
    atraso_medio_quando_atrasa_dias: 12.0,
    nota_media_no_prazo: 4.14,
    nota_media_atrasado: 2.36,
    taxa_recompra_no_prazo_pct: 5.77,
    taxa_recompra_atrasado_pct: 5.81,
    gmv_total: 493584.14
  },
  {
    uf: "DF",
    total_pedidos: 2080,
    taxa_atraso_pct: 5.7,
    lead_time_medio_dias: 12.5,
    atraso_medio_quando_atrasa_dias: 7.4,
    nota_media_no_prazo: 4.26,
    nota_media_atrasado: 1.97,
    taxa_recompra_no_prazo_pct: 5.5,
    taxa_recompra_atrasado_pct: 11.86,
    gmv_total: 296498.41
  },
  {
    uf: "ES",
    total_pedidos: 1995,
    taxa_atraso_pct: 10.7,
    lead_time_medio_dias: 15.3,
    atraso_medio_quando_atrasa_dias: 11.3,
    nota_media_no_prazo: 4.26,
    nota_media_atrasado: 2.51,
    taxa_recompra_no_prazo_pct: 6.34,
    taxa_recompra_atrasado_pct: 5.14,
    gmv_total: 268643.45
  },
  {
    uf: "GO",
    total_pedidos: 1957,
    taxa_atraso_pct: 6.5,
    lead_time_medio_dias: 15.2,
    atraso_medio_quando_atrasa_dias: 11.4,
    nota_media_no_prazo: 4.23,
    nota_media_atrasado: 2.21,
    taxa_recompra_no_prazo_pct: 6.45,
    taxa_recompra_atrasado_pct: 3.12,
    gmv_total: 282836.7
  },
  {
    uf: "PE",
    total_pedidos: 1593,
    taxa_atraso_pct: 9.6,
    lead_time_medio_dias: 18.0,
    atraso_medio_quando_atrasa_dias: 12.0,
    nota_media_no_prazo: 4.3,
    nota_media_atrasado: 2.03,
    taxa_recompra_no_prazo_pct: 5.21,
    taxa_recompra_atrasado_pct: 3.92,
    gmv_total: 251889.49
  },
  {
    uf: "CE",
    total_pedidos: 1279,
    taxa_atraso_pct: 13.8,
    lead_time_medio_dias: 20.8,
    atraso_medio_quando_atrasa_dias: 15.2,
    nota_media_no_prazo: 4.24,
    nota_media_atrasado: 2.04,
    taxa_recompra_no_prazo_pct: 3.45,
    taxa_recompra_atrasado_pct: 2.27,
    gmv_total: 219757.38
  },
  {
    uf: "PA",
    total_pedidos: 946,
    taxa_atraso_pct: 11.2,
    lead_time_medio_dias: 23.3,
    atraso_medio_quando_atrasa_dias: 12.8,
    nota_media_no_prazo: 4.15,
    nota_media_atrasado: 1.92,
    taxa_recompra_no_prazo_pct: 4.76,
    taxa_recompra_atrasado_pct: 5.66,
    gmv_total: 174470.59
  },
  {
    uf: "MT",
    total_pedidos: 886,
    taxa_atraso_pct: 6.0,
    lead_time_medio_dias: 17.6,
    atraso_medio_quando_atrasa_dias: 10.6,
    nota_media_no_prazo: 4.25,
    nota_media_atrasado: 2.47,
    taxa_recompra_no_prazo_pct: 7.08,
    taxa_recompra_atrasado_pct: 1.89,
    gmv_total: 152191.62
  },
  {
    uf: "MA",
    total_pedidos: 717,
    taxa_atraso_pct: 17.4,
    lead_time_medio_dias: 21.1,
    atraso_medio_quando_atrasa_dias: 10.5,
    nota_media_no_prazo: 4.18,
    nota_media_atrasado: 2.18,
    taxa_recompra_no_prazo_pct: 4.9,
    taxa_recompra_atrasado_pct: 2.4,
    gmv_total: 117009.38
  },
  {
    uf: "MS",
    total_pedidos: 701,
    taxa_atraso_pct: 9.7,
    lead_time_medio_dias: 15.2,
    atraso_medio_quando_atrasa_dias: 8.3,
    nota_media_no_prazo: 4.36,
    nota_media_atrasado: 2.29,
    taxa_recompra_no_prazo_pct: 5.85,
    taxa_recompra_atrasado_pct: 1.47,
    gmv_total: 115429.97
  },
  {
    uf: "PB",
    total_pedidos: 517,
    taxa_atraso_pct: 10.4,
    lead_time_medio_dias: 20.0,
    atraso_medio_quando_atrasa_dias: 10.3,
    nota_media_no_prazo: 4.27,
    nota_media_atrasado: 2.37,
    taxa_recompra_no_prazo_pct: 4.97,
    taxa_recompra_atrasado_pct: 3.7,
    gmv_total: 112586.82
  },
  {
    uf: "PI",
    total_pedidos: 476,
    taxa_atraso_pct: 13.9,
    lead_time_medio_dias: 19.0,
    atraso_medio_quando_atrasa_dias: 13.3,
    nota_media_no_prazo: 4.27,
    nota_media_atrasado: 2.26,
    taxa_recompra_no_prazo_pct: 4.39,
    taxa_recompra_atrasado_pct: 6.06,
    gmv_total: 84721.0
  },
  {
    uf: "RN",
    total_pedidos: 474,
    taxa_atraso_pct: 9.3,
    lead_time_medio_dias: 18.8,
    atraso_medio_quando_atrasa_dias: 14.5,
    nota_media_no_prazo: 4.39,
    nota_media_atrasado: 1.77,
    taxa_recompra_no_prazo_pct: 4.65,
    taxa_recompra_atrasado_pct: 0.0,
    gmv_total: 82105.66
  },
  {
    uf: "AL",
    total_pedidos: 397,
    taxa_atraso_pct: 21.4,
    lead_time_medio_dias: 24.0,
    atraso_medio_quando_atrasa_dias: 9.5,
    nota_media_no_prazo: 4.3,
    nota_media_atrasado: 2.13,
    taxa_recompra_no_prazo_pct: 4.81,
    taxa_recompra_atrasado_pct: 5.88,
    gmv_total: 78855.72
  },
  {
    uf: "SE",
    total_pedidos: 335,
    taxa_atraso_pct: 15.2,
    lead_time_medio_dias: 21.0,
    atraso_medio_quando_atrasa_dias: 16.2,
    nota_media_no_prazo: 4.25,
    nota_media_atrasado: 1.94,
    taxa_recompra_no_prazo_pct: 4.93,
    taxa_recompra_atrasado_pct: 1.96,
    gmv_total: 56574.19
  },
  {
    uf: "TO",
    total_pedidos: 274,
    taxa_atraso_pct: 9.9,
    lead_time_medio_dias: 17.2,
    atraso_medio_quando_atrasa_dias: 6.5,
    nota_media_no_prazo: 4.3,
    nota_media_atrasado: 2.81,
    taxa_recompra_no_prazo_pct: 4.86,
    taxa_recompra_atrasado_pct: 7.41,
    gmv_total: 48402.51
  },
  {
    uf: "RO",
    total_pedidos: 243,
    taxa_atraso_pct: 2.9,
    lead_time_medio_dias: 18.9,
    atraso_medio_quando_atrasa_dias: 5.6,
    nota_media_no_prazo: 4.21,
    nota_media_atrasado: 2.57,
    taxa_recompra_no_prazo_pct: 9.32,
    taxa_recompra_atrasado_pct: 0.0,
    gmv_total: 45682.76
  },
  {
    uf: "AM",
    total_pedidos: 145,
    taxa_atraso_pct: 2.8,
    lead_time_medio_dias: 26.0,
    atraso_medio_quando_atrasa_dias: 30.2,
    nota_media_no_prazo: 4.31,
    nota_media_atrasado: 2.0,
    taxa_recompra_no_prazo_pct: 5.67,
    taxa_recompra_atrasado_pct: 0.0,
    gmv_total: 22155.84
  },
  {
    uf: "AC",
    total_pedidos: 80,
    taxa_atraso_pct: 3.8,
    lead_time_medio_dias: 20.6,
    atraso_medio_quando_atrasa_dias: 18.7,
    nota_media_no_prazo: 4.18,
    nota_media_atrasado: 1.67,
    taxa_recompra_no_prazo_pct: 7.79,
    taxa_recompra_atrasado_pct: 66.67,
    gmv_total: 15930.97
  },
  {
    uf: "AP",
    total_pedidos: 67,
    taxa_atraso_pct: 3.0,
    lead_time_medio_dias: 26.7,
    atraso_medio_quando_atrasa_dias: 72.5,
    nota_media_no_prazo: 4.23,
    nota_media_atrasado: 4.5,
    taxa_recompra_no_prazo_pct: 3.08,
    taxa_recompra_atrasado_pct: 0.0,
    gmv_total: 13374.81
  },
  {
    uf: "RR",
    total_pedidos: 41,
    taxa_atraso_pct: 12.2,
    lead_time_medio_dias: 29.0,
    atraso_medio_quando_atrasa_dias: 36.4,
    nota_media_no_prazo: 4.19,
    nota_media_atrasado: 1.8,
    taxa_recompra_no_prazo_pct: 5.56,
    taxa_recompra_atrasado_pct: 0.0,
    gmv_total: 7057.47
  }
];

const formatMoney = (val) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(val);

const formatNumber = (val) =>
  new Intl.NumberFormat('pt-BR').format(Math.round(val));

const formatPct = (val, decimals = 1) =>
  `${val.toFixed(decimals).replace('.', ',')}%`;

function calcularConsolidadoNacional(estados) {
  const total_pedidos = estados.reduce((acc, e) => acc + e.total_pedidos, 0);
  const gmv_total = estados.reduce((acc, e) => acc + e.gmv_total, 0);

  const pedidos_atrasados = estados.reduce((acc, e) => acc + (e.total_pedidos * (e.taxa_atraso_pct / 100)), 0);
  const taxa_atraso_pct = (pedidos_atrasados / total_pedidos) * 100;

  const lead_time_medio_dias =
    estados.reduce((acc, e) => acc + (e.total_pedidos * e.lead_time_medio_dias), 0) / total_pedidos;

  const atraso_medio_quando_atrasa_dias =
    pedidos_atrasados > 0
      ? estados.reduce((acc, e) => acc + ((e.total_pedidos * (e.taxa_atraso_pct / 100)) * e.atraso_medio_quando_atrasa_dias), 0) / pedidos_atrasados
      : 0;

  const pedidos_no_prazo = total_pedidos - pedidos_atrasados;

  const nota_media_no_prazo =
    estados.reduce((acc, e) => {
      const np = e.total_pedidos * (1 - e.taxa_atraso_pct / 100);
      return acc + (np * e.nota_media_no_prazo);
    }, 0) / pedidos_no_prazo;

  const nota_media_atrasado =
    estados.reduce((acc, e) => {
      const atr = e.total_pedidos * (e.taxa_atraso_pct / 100);
      return acc + (atr * e.nota_media_atrasado);
    }, 0) / pedidos_atrasados;

  const taxa_recompra_no_prazo_pct =
    estados.reduce((acc, e) => {
      const np = e.total_pedidos * (1 - e.taxa_atraso_pct / 100);
      return acc + (np * e.taxa_recompra_no_prazo_pct);
    }, 0) / pedidos_no_prazo;

  const taxa_recompra_atrasado_pct =
    estados.reduce((acc, e) => {
      const atr = e.total_pedidos * (e.taxa_atraso_pct / 100);
      return acc + (atr * e.taxa_recompra_atrasado_pct);
    }, 0) / pedidos_atrasados;

  return {
    uf: 'TODOS',
    total_pedidos,
    taxa_atraso_pct,
    lead_time_medio_dias,
    atraso_medio_quando_atrasa_dias,
    nota_media_no_prazo,
    nota_media_atrasado,
    taxa_recompra_no_prazo_pct,
    taxa_recompra_atrasado_pct,
    gmv_total
  };
}

function gerarFallbackHeuristico(recorte) {
  const isNacional = recorte.uf === 'TODOS';
  const labelUF = isNacional ? 'malha nacional consolidada' : `praça ${recorte.uf}`;
  const quedaNota = (recorte.nota_media_no_prazo - recorte.nota_media_atrasado).toFixed(2);
  const quedaPctNota = (((recorte.nota_media_no_prazo - recorte.nota_media_atrasado) / recorte.nota_media_no_prazo) * 100).toFixed(0);
  const deltaRecompra = recorte.taxa_recompra_no_prazo_pct - recorte.taxa_recompra_atrasado_pct;

  let bottleneck = '';
  if (recorte.taxa_atraso_pct >= 12.0) {
    bottleneck = `Taxa de atraso crítica de ${formatPct(recorte.taxa_atraso_pct)} na ${labelUF}, com lead time de ${recorte.lead_time_medio_dias.toFixed(1)} dias e estouro médio de ${recorte.atraso_medio_quando_atrasa_dias.toFixed(1)} dias na entrega com falha.`;
  } else if (recorte.taxa_atraso_pct >= 6.5) {
    bottleneck = `SLA sob pressão moderada (${formatPct(recorte.taxa_atraso_pct)} de atraso) e lead time de ${recorte.lead_time_medio_dias.toFixed(1)} dias na ${labelUF}, gerando desvios na última milha regional.`;
  } else {
    bottleneck = `SLA em conformidade operacional (${formatPct(recorte.taxa_atraso_pct)} de atraso), porém com lead time de ${recorte.lead_time_medio_dias.toFixed(1)} dias passível de compressão em rotas secundárias.`;
  }

  let impact = '';
  if (deltaRecompra > 0) {
    impact = `Atrasos derrubam a nota do cliente de ${recorte.nota_media_no_prazo.toFixed(2)} para ${recorte.nota_media_atrasado.toFixed(2)} (-${quedaNota} pts / -${quedaPctNota}%), contraindo a recompra em ${deltaRecompra.toFixed(1)} p.p.`;
  } else {
    impact = `O atraso corrói drasticamente a percepção de serviço com nota caindo para ${recorte.nota_media_atrasado.toFixed(2)} (-${quedaNota} pts), gerando atrito grave de CS e churn reputacional.`;
  }

  let recommendation = '';
  if (recorte.taxa_atraso_pct >= 10.0) {
    recommendation = `Implantar ponto avançado de cross-docking e renegociar contratos com operadoras de last-mile para conter o risco de cancelamento e resguardar GMV.`;
  } else if (recorte.lead_time_medio_dias > 14.0) {
    recommendation = `Posicionar estoque de giro rápido (curva A) mais próximo do consumidor e antecipar despachos em até 48h para amortecer a variância de trânsito.`;
  } else {
    recommendation = `Manter consolidação centralizada e testar rotas expressas de fulfillment para blindar a fidelidade dos top compradores locais.`;
  }

  return {
    bottleneck,
    impact,
    recommendation,
    source: 'heuristic',
    uf: recorte.uf
  };
}

export function IndicadoresTab({
  initialData = OLIST_ESTADOS_DATA,
  apiKey
}) {
  const [selectedUF, setSelectedUF] = useState('TODOS');
  const [sortMetric, setSortMetric] = useState('volume');
  const [simLeadTimeReduction, setSimLeadTimeReduction] = useState(3.0);
  const [simDelayCutPct, setSimDelayCutPct] = useState(40);

  const [aiDiagnosis, setAiDiagnosis] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState(null);

  const [showKeyModal, setShowKeyModal] = useState(false);
  const [customApiKey, setCustomApiKey] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('VERTICE_GEMINI_API_KEY') || '';
    }
    return '';
  });

  const aiCache = useRef({});
  const abortControllerRef = useRef(null);

  const consolidadoNacional = useMemo(() => calcularConsolidadoNacional(initialData), [initialData]);

  const activeRecorte = useMemo(() => {
    if (selectedUF === 'TODOS') return consolidadoNacional;
    const found = initialData.find((e) => e.uf === selectedUF);
    return found || consolidadoNacional;
  }, [selectedUF, initialData, consolidadoNacional]);

  const listaUFs = useMemo(() => {
    return [...initialData].sort((a, b) => b.total_pedidos - a.total_pedidos);
  }, [initialData]);

  const fetchAIDiagnosis = async (recorte, forceRefresh = false) => {
    const cacheKey = recorte.uf;

    if (!forceRefresh && aiCache.current[cacheKey]) {
      setAiDiagnosis(aiCache.current[cacheKey]);
      setAiError(null);
      return;
    }

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    const activeKey =
      apiKey ||
      customApiKey ||
      (typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.VITE_GEMINI_API_KEY : '') ||
      (typeof process !== 'undefined' && process.env ? process.env.VITE_GEMINI_API_KEY : '');

    if (!activeKey) {
      const fallback = gerarFallbackHeuristico(recorte);
      aiCache.current[cacheKey] = fallback;
      setAiDiagnosis(fallback);
      setAiError(null);
      return;
    }

    setAiLoading(true);
    setAiError(null);

    try {
      const promptPayload = {
        uf: recorte.uf === 'TODOS' ? 'Brasil (Nacional)' : recorte.uf,
        total_pedidos: recorte.total_pedidos,
        taxa_atraso_pct: Number(recorte.taxa_atraso_pct.toFixed(1)),
        lead_time_medio_dias: Number(recorte.lead_time_medio_dias.toFixed(1)),
        atraso_medio_quando_atrasa_dias: Number(recorte.atraso_medio_quando_atrasa_dias.toFixed(1)),
        nota_media_no_prazo: Number(recorte.nota_media_no_prazo.toFixed(2)),
        nota_media_atrasado: Number(recorte.nota_media_atrasado.toFixed(2)),
        queda_de_nota: Number((recorte.nota_media_no_prazo - recorte.nota_media_atrasado).toFixed(2)),
        taxa_recompra_no_prazo_pct: Number(recorte.taxa_recompra_no_prazo_pct.toFixed(2)),
        taxa_recompra_atrasado_pct: Number(recorte.taxa_recompra_atrasado_pct.toFixed(2)),
        gmv_total_brl: Math.round(recorte.gmv_total)
      };

      const systemInstructionText =
        'Você é um diretor de operações logísticas e supply chain executivo da plataforma Vértice. ' +
        'Analise os indicadores deste recorte e retorne exatamente 3 bullet points curtos, diretos e acionáveis sobre: ' +
        '(1) principal gargalo de SLA, (2) impacto na satisfação/recompra e (3) ação imediata recomendada. ' +
        'Formate a resposta estritamente com os marcadores [GARGALO], [IMPACTO] e [ACAO], sem introdução e sem encerramento.';

      const userMessageText = `Recorte Operacional (${promptPayload.uf}):\n${JSON.stringify(promptPayload, null, 2)}`;

      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${activeKey}`;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: abortControllerRef.current.signal,
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: `${systemInstructionText}\n\n${userMessageText}` }]
            }
          ],
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 500
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Status ${response.status}: falha na comunicação com o Gemini`);
      }

      const json = await response.json();
      const rawText = json.candidates?.[0]?.content?.parts?.[0]?.text || '';

      let bottleneck = '';
      let impact = '';
      let recommendation = '';

      if (rawText.includes('[GARGALO]') && rawText.includes('[IMPACTO]') && rawText.includes('[ACAO]')) {
        const partsA = rawText.split('[IMPACTO]');
        bottleneck = partsA[0].replace('[GARGALO]', '').trim();
        const partsB = partsA[1].split('[ACAO]');
        impact = partsB[0].trim();
        recommendation = partsB[1].trim();
      } else {
        const lines = rawText
          .split('\n')
          .map((l) => l.replace(/^[-*•\d.)\s]+/, '').trim())
          .filter((l) => l.length > 10);

        bottleneck = lines[0] || 'Gargalo operacional detectado nas rotas com lead time expandido.';
        impact = lines[1] || 'Degradação mensurável de nota e perda de engajamento na recompra.';
        recommendation = lines[2] || 'Avançar malha de estocagem descentralizada para mitigar desvios.';
      }

      const parsedDiagnosis = {
        bottleneck,
        impact,
        recommendation,
        source: 'gemini',
        uf: recorte.uf
      };

      aiCache.current[cacheKey] = parsedDiagnosis;
      setAiDiagnosis(parsedDiagnosis);
    } catch (err) {
      if (err?.name === 'AbortError') return;
      const fallback = gerarFallbackHeuristico(recorte);
      setAiDiagnosis(fallback);
      setAiError('Operando via diagnóstico heurístico de redundância local.');
    } finally {
      setAiLoading(false);
    }
  };

  useEffect(() => {
    fetchAIDiagnosis(activeRecorte);
    return () => {
      if (abortControllerRef.current) abortControllerRef.current.abort();
    };
  }, [activeRecorte]);

  const simResults = useMemo(() => {
    const pedidosAtuais = activeRecorte.total_pedidos;
    const taxaAtrasoAtual = activeRecorte.taxa_atraso_pct;
    const pedidosAtrasadosAtuais = pedidosAtuais * (taxaAtrasoAtual / 100);
    const pedidosNoPrazoAtuais = pedidosAtuais - pedidosAtrasadosAtuais;

    const fatorCorte = simDelayCutPct / 100;
    const pedidosSalvos = Math.round(pedidosAtrasadosAtuais * fatorCorte);
    const novaTaxaAtraso = taxaAtrasoAtual * (1 - fatorCorte);
    const novoLeadTime = Math.max(1.0, activeRecorte.lead_time_medio_dias - simLeadTimeReduction);

    const notaAtualPonderada =
      (pedidosNoPrazoAtuais * activeRecorte.nota_media_no_prazo +
        pedidosAtrasadosAtuais * activeRecorte.nota_media_atrasado) /
      pedidosAtuais;

    const novaNotaPonderada =
      ((pedidosNoPrazoAtuais + pedidosSalvos) * activeRecorte.nota_media_no_prazo +
        (pedidosAtrasadosAtuais - pedidosSalvos) * activeRecorte.nota_media_atrasado) /
      pedidosAtuais;

    const ganhoNota = novaNotaPonderada - notaAtualPonderada;

    const taxaNoPrazo = activeRecorte.taxa_recompra_no_prazo_pct / 100;
    const taxaAtrasado = activeRecorte.taxa_recompra_atrasado_pct / 100;

    const clientesRetidosAtuais =
      pedidosNoPrazoAtuais * taxaNoPrazo + pedidosAtrasadosAtuais * taxaAtrasado;

    const novosClientesRetidos =
      (pedidosNoPrazoAtuais + pedidosSalvos) * taxaNoPrazo +
      (pedidosAtrasadosAtuais - pedidosSalvos) * taxaAtrasado;

    const clientesAdicionaisRetidos = Math.round(novosClientesRetidos - clientesRetidosAtuais);

    const ticketMedio = activeRecorte.gmv_total / pedidosAtuais;
    const gmvProtegido = pedidosSalvos * ticketMedio;

    return {
      pedidosSalvos,
      novaTaxaAtraso,
      novoLeadTime,
      notaAtualPonderada,
      novaNotaPonderada,
      ganhoNota,
      clientesAdicionaisRetidos,
      gmvProtegido
    };
  }, [activeRecorte, simLeadTimeReduction, simDelayCutPct]);

  const dadosBlocoA = useMemo(() => {
    const list = [...initialData];
    if (sortMetric === 'volume') {
      list.sort((a, b) => b.total_pedidos - a.total_pedidos);
    } else {
      list.sort((a, b) => b.taxa_atraso_pct - a.taxa_atraso_pct);
    }
    return list.slice(0, 10).map((e) => ({
      uf: e.uf,
      taxa_atraso_pct: Number(e.taxa_atraso_pct.toFixed(1)),
      lead_time_medio_dias: Number(e.lead_time_medio_dias.toFixed(1)),
      total_pedidos: e.total_pedidos
    }));
  }, [initialData, sortMetric]);

  const dadosBlocoB = useMemo(() => {
    return [
      {
        cenario: 'No Prazo',
        nota: Number(activeRecorte.nota_media_no_prazo.toFixed(2)),
        recompra: Number(activeRecorte.taxa_recompra_no_prazo_pct.toFixed(2))
      },
      {
        cenario: 'Com Atraso',
        nota: Number(activeRecorte.nota_media_atrasado.toFixed(2)),
        recompra: Number(activeRecorte.taxa_recompra_atrasado_pct.toFixed(2))
      }
    ];
  }, [activeRecorte]);

  const statusSLA = useMemo(() => {
    const tx = activeRecorte.taxa_atraso_pct;
    if (tx < 6.0) {
      return {
        label: 'SLA em Meta Excelente',
        badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200',
        dotClass: 'bg-emerald-500'
      };
    }
    if (tx <= 10.0) {
      return {
        label: 'Alerta Operacional de SLA',
        badgeClass: 'bg-amber-50 text-amber-800 border-amber-200',
        dotClass: 'bg-amber-500'
      };
    }
    return {
      label: 'Risco Crítico de Retenção',
      badgeClass: 'bg-[#FFF7ED] text-[#C2410C] border-[#FDBA74]',
      dotClass: 'bg-[#C2410C]'
    };
  }, [activeRecorte.taxa_atraso_pct]);

  const deltaNota = activeRecorte.nota_media_no_prazo - activeRecorte.nota_media_atrasado;
  const deltaNotaPct = (deltaNota / activeRecorte.nota_media_no_prazo) * 100;
  const deltaRecompra = activeRecorte.taxa_recompra_no_prazo_pct - activeRecorte.taxa_recompra_atrasado_pct;

  return (
    <div className="w-full text-neutral-900 antialiased font-sans pb-16">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Cabeçalho de Controle e Filtros */}
        <header className="border-b border-neutral-200/80 pb-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[11px] font-semibold uppercase tracking-widest text-neutral-400 font-mono">
                  Painel de Decisão Operacional
                </span>
                <span className="text-neutral-500">•</span>
                <span className="text-[11px] font-medium text-neutral-400">
                  Malha Logística & Elasticidade de Retenção
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-[#F7F8FA] font-serif">
                Indicadores de SLA & <span className="italic font-serif text-[#F4B942]">Impacto na Recompra</span>
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <div
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium ${statusSLA.badgeClass}`}
              >
                <span className={`w-2 h-2 rounded-full ${statusSLA.dotClass} animate-pulse`} />
                <span>{statusSLA.label}</span>
                <span className="font-mono font-semibold ml-0.5">
                  ({formatPct(activeRecorte.taxa_atraso_pct)})
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 bg-white p-3.5 rounded-xl border border-neutral-200/80 shadow-xs">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mr-1 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-neutral-400" />
                Recorte Geográfico:
              </span>

              <div className="relative">
                <select
                  value={selectedUF}
                  aria-label="Filtrar por Região ou Estado"
                  onChange={(e) => setSelectedUF(e.target.value)}
                  className="appearance-none bg-neutral-50 hover:bg-neutral-100/80 text-neutral-900 font-medium text-xs rounded-lg pl-3 pr-8 py-2 border border-neutral-300 transition-colors cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-neutral-900/10"
                >
                  <option value="TODOS">Consolidado Nacional (Todos os 27 Estados)</option>
                  <optgroup label="Estados Individuais (Ordenados por Volume)">
                    {listaUFs.map((est) => (
                      <option key={est.uf} value={est.uf}>
                        {est.uf} — {formatNumber(est.total_pedidos)} pedidos ({formatPct(est.taxa_atraso_pct)} atraso)
                      </option>
                    ))}
                  </optgroup>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-neutral-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              <div className="hidden lg:flex items-center gap-1.5 ml-2 border-l border-neutral-200 pl-3">
                {['TODOS', 'SP', 'RJ', 'MG', 'RS', 'BA', 'CE'].map((uf) => (
                  <button
                    key={uf}
                    onClick={() => setSelectedUF(uf)}
                    className={`px-2.5 py-1 text-xs rounded-md font-medium transition-all ${
                      selectedUF === uf
                        ? 'bg-neutral-900 text-white shadow-xs'
                        : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200/70 hover:text-neutral-900'
                    }`}
                  >
                    {uf === 'TODOS' ? 'Brasil' : uf}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs text-neutral-500">
              <span className="font-mono">
                Amostra: <strong className="text-neutral-900 font-semibold">{formatNumber(activeRecorte.total_pedidos)}</strong> pedidos
              </span>
              <span className="text-neutral-300">|</span>
              <span className="font-mono">
                GMV: <strong className="text-neutral-900 font-semibold">{formatMoney(activeRecorte.gmv_total)}</strong>
              </span>
            </div>
          </div>
        </header>

        {/* 2. Camada Nativa de IA (Diagnóstico) */}
        <section className="bg-white rounded-xl border border-neutral-200 shadow-xs overflow-hidden transition-all">
          <div className="px-5 py-4 border-b border-neutral-200/70 flex flex-wrap items-center justify-between gap-3 bg-neutral-50/50">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-neutral-900 text-white flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-amber-300" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold tracking-tight text-neutral-950">
                    Diagnóstico Executivo por Recorte
                  </h3>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-mono font-medium bg-neutral-100 text-neutral-600 border border-neutral-200">
                    {aiDiagnosis?.source === 'gemini' ? 'Gemini 3.8 Flash' : 'Heurística Operacional'}
                  </span>
                </div>
                <p className="text-xs text-neutral-500">
                  Síntese acionável para o comitê de operações · Recorte {activeRecorte.uf === 'TODOS' ? 'Nacional' : activeRecorte.uf}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowKeyModal(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-700 bg-white hover:bg-neutral-100 border border-neutral-200 rounded-lg shadow-xs transition-colors cursor-pointer"
                title="Configurar chave da API Gemini"
              >
                <Key className="w-3.5 h-3.5 text-neutral-500" />
                <span>{customApiKey ? 'Chave Ativa' : 'Configurar Chave'}</span>
              </button>

              <button
                onClick={() => fetchAIDiagnosis(activeRecorte, true)}
                disabled={aiLoading}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-700 bg-white hover:bg-neutral-100 border border-neutral-200 rounded-lg shadow-xs transition-colors disabled:opacity-50 cursor-pointer"
                title="Regenerar análise com IA"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-neutral-500 ${aiLoading ? 'animate-spin' : ''}`} />
                <span>{aiLoading ? 'Processando...' : 'Reavaliar'}</span>
              </button>
            </div>
          </div>

          {showKeyModal && (
            <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl border border-neutral-200 shadow-xl max-w-md w-full p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                  <div className="flex items-center gap-2">
                    <Key className="w-4 h-4 text-neutral-800" />
                    <h3 className="text-sm font-semibold text-neutral-950">Chave da API Gemini</h3>
                  </div>
                  <button
                    onClick={() => setShowKeyModal(false)}
                    className="p-1 rounded-md text-neutral-400 hover:text-neutral-700 transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs text-neutral-600 leading-relaxed">
                  Caso seu ambiente não possua arquivo <code className="px-1.5 py-0.5 rounded-sm bg-neutral-100 font-mono text-neutral-800">.env</code> com <code className="px-1.5 py-0.5 rounded-sm bg-neutral-100 font-mono text-neutral-800">VITE_GEMINI_API_KEY</code>, você pode colar sua chave diretamente abaixo. Ela ficará salva localmente no seu navegador (<span className="font-mono text-neutral-800">localStorage</span>).
                </p>

                <div className="space-y-1.5">
                  <label htmlFor="modal-gemini-key-tab" className="text-xs font-semibold text-neutral-700">
                    Google AI Studio Key:
                  </label>
                  <input
                    id="modal-gemini-key-tab"
                    type="password"
                    placeholder="AIzaSy..."
                    value={customApiKey}
                    onChange={(e) => setCustomApiKey(e.target.value)}
                    className="w-full h-10 px-3 text-xs font-mono rounded-lg border border-neutral-300 focus:outline-hidden focus:ring-2 focus:ring-neutral-900/20"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => {
                      setCustomApiKey('');
                      if (typeof window !== 'undefined') {
                        localStorage.removeItem('VERTICE_GEMINI_API_KEY');
                      }
                      setShowKeyModal(false);
                      fetchAIDiagnosis(activeRecorte, true);
                    }}
                    className="text-xs text-neutral-500 hover:text-red-700 font-medium transition-colors"
                  >
                    Remover Chave
                  </button>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowKeyModal(false)}
                      className="px-3 py-1.5 text-xs font-medium rounded-lg border border-neutral-200 text-neutral-700 hover:bg-neutral-50 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={() => {
                        if (typeof window !== 'undefined') {
                          if (customApiKey.trim()) {
                            localStorage.setItem('VERTICE_GEMINI_API_KEY', customApiKey.trim());
                          } else {
                            localStorage.removeItem('VERTICE_GEMINI_API_KEY');
                          }
                        }
                        setShowKeyModal(false);
                        fetchAIDiagnosis(activeRecorte, true);
                      }}
                      className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-neutral-950 text-white hover:bg-neutral-800 shadow-xs transition-colors"
                    >
                      Salvar & Aplicar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="p-5">
            {aiLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-pulse">
                {[1, 2, 3].map((idx) => (
                  <div key={idx} className="p-4 rounded-lg bg-neutral-100/70 h-28 flex flex-col justify-between">
                    <div className="w-24 h-4 bg-neutral-200 rounded-sm" />
                    <div className="w-full h-8 bg-neutral-200 rounded-sm" />
                  </div>
                ))}
              </div>
            ) : aiDiagnosis ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-neutral-50/70 border border-neutral-200/80 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2 text-xs font-semibold uppercase tracking-wider text-amber-700">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>Gargalo de SLA</span>
                    </div>
                    <p className="text-xs leading-relaxed text-neutral-800">
                      {aiDiagnosis.bottleneck}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-neutral-200/60 flex items-center justify-between text-[11px] text-neutral-500 font-mono">
                    <span>Taxa de atraso:</span>
                    <strong className="text-neutral-900">{formatPct(activeRecorte.taxa_atraso_pct)}</strong>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-neutral-50/70 border border-neutral-200/80 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2 text-xs font-semibold uppercase tracking-wider text-[#C2410C]">
                      <TrendingDown className="w-3.5 h-3.5 text-[#C2410C] shrink-0" />
                      <span>Impacto em Satisfação & LTV</span>
                    </div>
                    <p className="text-xs leading-relaxed text-neutral-800">
                      {aiDiagnosis.impact}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-neutral-200/60 flex items-center justify-between text-[11px] text-neutral-500 font-mono">
                    <span>Queda de nota:</span>
                    <strong className="text-[#C2410C]">-{deltaNota.toFixed(2)} pts ({formatPct(deltaNotaPct, 0)})</strong>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-neutral-50/70 border border-neutral-200/80 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2 text-xs font-semibold uppercase tracking-wider text-emerald-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Ação Imediata Recomendada</span>
                    </div>
                    <p className="text-xs leading-relaxed text-neutral-800">
                      {aiDiagnosis.recommendation}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-neutral-200/60 flex items-center justify-between text-[11px] text-neutral-500 font-mono">
                    <span>Lead time médio:</span>
                    <strong className="text-neutral-900">{activeRecorte.lead_time_medio_dias.toFixed(1)} dias</strong>
                  </div>
                </div>
              </div>
            ) : null}

            {aiError && (
              <p className="mt-3 text-[11px] text-neutral-500 flex items-center gap-1.5 font-mono">
                <Info className="w-3.5 h-3.5 text-neutral-400" />
                {aiError}
              </p>
            )}
          </div>
        </section>

        {/* 3. Linha de 4 KPIs */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-neutral-500 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider">Volume & GMV</span>
                <DollarSign className="w-4 h-4 text-neutral-400" />
              </div>
              <div className="text-2xl font-bold tracking-tight text-neutral-950 font-sans">
                {formatNumber(activeRecorte.total_pedidos)}
                <span className="text-xs font-normal text-neutral-500 ml-1.5">pedidos</span>
              </div>
              <div className="text-sm font-semibold text-neutral-700 mt-1">
                {formatMoney(activeRecorte.gmv_total)}
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
              <span>Ticket Médio:</span>
              <span className="font-mono font-medium text-neutral-900">
                {formatMoney(activeRecorte.gmv_total / activeRecorte.total_pedidos)}
              </span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-neutral-500 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider">Taxa de Atraso (SLA)</span>
                <Clock className="w-4 h-4 text-neutral-400" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className={`text-2xl font-bold tracking-tight ${
                  activeRecorte.taxa_atraso_pct > 10.0
                    ? 'text-[#C2410C]'
                    : activeRecorte.taxa_atraso_pct > 6.0
                    ? 'text-amber-600'
                    : 'text-emerald-700'
                }`}>
                  {formatPct(activeRecorte.taxa_atraso_pct)}
                </span>
                <span className="text-xs text-neutral-500">dos pedidos</span>
              </div>
              <div className="text-xs text-neutral-500 mt-1">
                Atraso médio: <strong className="text-neutral-800">+{activeRecorte.atraso_medio_quando_atrasa_dias.toFixed(1)} dias</strong>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
              <span>Status Operacional:</span>
              <span className={`px-2 py-0.5 rounded-md text-[11px] font-medium ${statusSLA.badgeClass}`}>
                {activeRecorte.taxa_atraso_pct > 10.0 ? 'Crítico' : activeRecorte.taxa_atraso_pct > 6.0 ? 'Atenção' : 'Dentro da Meta'}
              </span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-neutral-500 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider">Queda de Nota</span>
                <Star className="w-4 h-4 text-amber-500" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold tracking-tight text-[#C2410C]">
                  -{deltaNota.toFixed(2)}
                </span>
                <span className="text-xs font-medium text-neutral-500">pontos</span>
              </div>
              <div className="text-xs text-neutral-500 mt-1">
                De <strong className="text-neutral-900">{activeRecorte.nota_media_no_prazo.toFixed(2)}</strong> (prazo) para <strong className="text-[#C2410C]">{activeRecorte.nota_media_atrasado.toFixed(2)}</strong> (atraso)
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
              <span>Erosão Relativa:</span>
              <span className="font-mono font-medium text-[#C2410C]">
                -{deltaNotaPct.toFixed(1)}% na satisfação
              </span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-neutral-500 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider">Impacto na Retenção</span>
                <Users className="w-4 h-4 text-neutral-400" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold tracking-tight text-neutral-950">
                  {formatPct(activeRecorte.taxa_recompra_no_prazo_pct)}
                </span>
                <span className="text-xs text-neutral-500">recompra no prazo</span>
              </div>
              <div className="text-xs text-neutral-500 mt-1">
                Vs. <strong className="text-neutral-800">{formatPct(activeRecorte.taxa_recompra_atrasado_pct)}</strong> quando sofre atraso
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
              <span>Variação de Recompra:</span>
              <span className={`font-mono font-medium ${deltaRecompra > 0 ? 'text-[#C2410C]' : 'text-neutral-700'}`}>
                {deltaRecompra > 0 ? `-${deltaRecompra.toFixed(2)} p.p.` : `+${Math.abs(deltaRecompra).toFixed(2)} p.p.`}
              </span>
            </div>
          </div>
        </section>

        {/* 4. Grid Principal (Bloco A e B) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 bg-white p-6 rounded-xl border border-neutral-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-100">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 font-mono">
                    Pergunta 1 · Diagnóstico de Malha
                  </span>
                  <h3 className="text-lg font-semibold text-neutral-950 tracking-tight">
                    Onde o SLA logístico estoura e compromete a malha?
                  </h3>
                </div>

                <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded-lg text-xs">
                  <button
                    onClick={() => setSortMetric('volume')}
                    className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                      sortMetric === 'volume' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-500 hover:text-neutral-900'
                    }`}
                  >
                    Top Volume
                  </button>
                  <button
                    onClick={() => setSortMetric('atraso')}
                    className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                      sortMetric === 'atraso' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-500 hover:text-neutral-900'
                    }`}
                  >
                    Maior Atraso
                  </button>
                </div>
              </div>

              <p className="text-xs text-neutral-500 mt-3 mb-6">
                Comparativo de Lead Time Médio (dias) e Taxa de Atraso de SLA (%) nas 10 principais praças. Barra colorida por severidade de atraso (&gt;12% risco crítico).
              </p>

              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dadosBlocoA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                    <XAxis dataKey="uf" tickLine={false} axisLine={{ stroke: '#E2E8F0' }} tick={{ fill: '#64748B', fontSize: 12 }} />
                    <YAxis tickLine={false} axisLine={{ stroke: '#E2E8F0' }} tick={{ fill: '#64748B', fontSize: 11 }} unit="%" />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (!active || !payload?.length) return null;
                        const item = payload[0].payload;
                        return (
                          <div className="bg-neutral-900 text-white p-3 rounded-lg text-xs shadow-lg space-y-1">
                            <div className="font-semibold text-sm border-b border-neutral-700 pb-1 mb-1">
                              Estado: {item.uf}
                            </div>
                            <div className="flex justify-between gap-4">
                              <span className="text-neutral-400">Taxa de Atraso:</span>
                              <span className="font-mono font-semibold">{item.taxa_atraso_pct}%</span>
                            </div>
                            <div className="flex justify-between gap-4">
                              <span className="text-neutral-400">Lead Time Médio:</span>
                              <span className="font-mono">{item.lead_time_medio_dias} dias</span>
                            </div>
                            <div className="flex justify-between gap-4">
                              <span className="text-neutral-400">Volume Total:</span>
                              <span className="font-mono">{formatNumber(item.total_pedidos)} ped.</span>
                            </div>
                          </div>
                        );
                      }}
                    />
                    <ReferenceLine y={8.0} stroke="#D97706" strokeDasharray="3 3" label={{ value: 'Meta SLA: 8%', fill: '#D97706', fontSize: 10, position: 'insideTopRight' }} />
                    <Bar dataKey="taxa_atraso_pct" radius={[4, 4, 0, 0]}>
                      {dadosBlocoA.map((entry) => {
                        const color =
                          entry.taxa_atraso_pct > 12.0
                            ? '#C2410C'
                            : entry.taxa_atraso_pct > 7.0
                            ? '#D97706'
                            : '#059669';
                        return <Cell key={`cell-${entry.uf}`} fill={color} />;
                      })}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-neutral-100 flex flex-wrap items-center justify-between text-xs text-neutral-500 gap-2">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#059669]" /> Sob controle (&lt;7%)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#D97706]" /> Alerta (7-12%)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#C2410C]" /> Crítico (&gt;12%)
                </span>
              </div>
              <span className="font-mono text-[11px] text-neutral-400">
                Ponto de corte de tolerância: 8,0%
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white p-6 rounded-xl border border-neutral-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="pb-4 border-b border-neutral-100">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 font-mono">
                  Pergunta 2 · Elasticidade de Retenção
                </span>
                <h3 className="text-lg font-semibold text-neutral-950 tracking-tight">
                  Qual o impacto do atraso na nota e recompra?
                </h3>
              </div>

              <p className="text-xs text-neutral-500 mt-3 mb-6">
                Recorte <strong className="text-neutral-900">{activeRecorte.uf === 'TODOS' ? 'Nacional' : activeRecorte.uf}</strong>: comparação direta de satisfação (1-5) e taxa de recompra quando o pedido sofre atraso de entrega.
              </p>

              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dadosBlocoB} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                    <XAxis dataKey="cenario" tickLine={false} axisLine={{ stroke: '#E2E8F0' }} tick={{ fill: '#334155', fontSize: 12, fontWeight: 500 }} />
                    <YAxis tickLine={false} axisLine={{ stroke: '#E2E8F0' }} tick={{ fill: '#64748B', fontSize: 11 }} domain={[0, 5]} />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (!active || !payload?.length) return null;
                        const data = payload[0].payload;
                        return (
                          <div className="bg-neutral-900 text-white p-3 rounded-lg text-xs shadow-lg space-y-1">
                            <div className="font-semibold text-sm border-b border-neutral-700 pb-1 mb-1">
                              Cenário: {data.cenario}
                            </div>
                            <div className="flex justify-between gap-4">
                              <span className="text-neutral-400">Nota Média:</span>
                              <span className="font-mono font-semibold text-amber-300">{data.nota} ★</span>
                            </div>
                            <div className="flex justify-between gap-4">
                              <span className="text-neutral-400">Taxa de Recompra:</span>
                              <span className="font-mono font-semibold">{data.recompra}%</span>
                            </div>
                          </div>
                        );
                      }}
                    />
                    <Bar dataKey="nota" name="Nota Média" radius={[4, 4, 0, 0]}>
                      <Cell fill="#059669" />
                      <Cell fill="#C2410C" />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-4 p-3.5 rounded-lg bg-neutral-50 border border-neutral-200/80 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-600 font-medium">Nota no Prazo vs. Atrasado:</span>
                  <span className="font-mono font-bold text-[#C2410C]">
                    -{deltaNota.toFixed(2)} pts ({formatPct(deltaNotaPct, 0)})
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-600 font-medium">Retenção de Clientes (Recompra):</span>
                  <span className="font-mono font-bold text-neutral-900">
                    {formatPct(activeRecorte.taxa_recompra_no_prazo_pct)} → {formatPct(activeRecorte.taxa_recompra_atrasado_pct)}
                  </span>
                </div>
              </div>
            </div>

            <p className="mt-4 text-[11px] text-neutral-500 leading-normal">
              *Atrasos na entrega quebram o ciclo de confiança do consumidor, reduzindo a chance de recompra subsequente e gerando alto custo de reaquisição.
            </p>
          </div>
        </div>

        {/* 5. Simulador de CD Regional */}
        <section className="bg-white rounded-xl border border-neutral-200 shadow-xs overflow-hidden">
          <div className="p-6 border-b border-neutral-100 bg-neutral-50/40">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 font-mono">
                  Pergunta 3 · Alavanca de Decisão Estratégica
                </span>
                <h3 className="text-xl font-semibold text-neutral-950 tracking-tight flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-neutral-800" />
                  Simulador de Alocação de CD Regional Avançado
                </h3>
                <p className="text-xs text-neutral-500 mt-1">
                  Projeção de retorno operacional ao implantar infraestrutura logística ou cross-docking no recorte selecionado (<strong className="text-neutral-900">{activeRecorte.uf === 'TODOS' ? 'Consolidado Nacional' : activeRecorte.uf}</strong>).
                </p>
              </div>

              <div className="flex items-center gap-1.5 self-start md:self-auto">
                <span className="text-xs text-neutral-500 mr-1 hidden sm:inline">Cenários:</span>
                <button
                  onClick={() => {
                    setSimLeadTimeReduction(1.5);
                    setSimDelayCutPct(20);
                  }}
                  className="px-2.5 py-1 text-xs font-medium rounded-md border border-neutral-200 hover:bg-neutral-100 transition-colors text-neutral-700"
                >
                  Last-Mile Leve
                </button>
                <button
                  onClick={() => {
                    setSimLeadTimeReduction(3.5);
                    setSimDelayCutPct(45);
                  }}
                  className="px-2.5 py-1 text-xs font-medium rounded-md border border-neutral-200 hover:bg-neutral-100 transition-colors text-neutral-700"
                >
                  Cross-Docking
                </button>
                <button
                  onClick={() => {
                    setSimLeadTimeReduction(6.0);
                    setSimDelayCutPct(70);
                  }}
                  className="px-2.5 py-1 text-xs font-medium rounded-md bg-neutral-900 text-white hover:bg-neutral-800 transition-colors shadow-xs"
                >
                  CD Regional Dedicado
                </button>
              </div>
            </div>
          </div>

          <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <label htmlFor="sim-lead-time-tab" className="font-semibold text-neutral-800 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-neutral-500" />
                    Compressão de Lead Time:
                  </label>
                  <span className="font-mono font-bold text-neutral-900 bg-neutral-100 px-2 py-0.5 rounded-sm">
                    -{simLeadTimeReduction.toFixed(1)} dias
                  </span>
                </div>
                <input
                  id="sim-lead-time-tab"
                  type="range"
                  min="0"
                  max="7"
                  step="0.5"
                  value={simLeadTimeReduction}
                  onChange={(e) => setSimLeadTimeReduction(parseFloat(e.target.value))}
                  className="w-full accent-neutral-900 cursor-pointer h-2 bg-neutral-200 rounded-lg"
                />
                <div className="flex justify-between text-[11px] text-neutral-400 font-mono">
                  <span>0 dias</span>
                  <span>Lead Time Atual: {activeRecorte.lead_time_medio_dias.toFixed(1)}d</span>
                  <span>-7.0 dias</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <label htmlFor="sim-delay-cut-tab" className="font-semibold text-neutral-800 flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5 text-neutral-500" />
                    Corte na Taxa de Atraso (SLA):
                  </label>
                  <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-sm border border-emerald-200">
                    -{simDelayCutPct}%
                  </span>
                </div>
                <input
                  id="sim-delay-cut-tab"
                  type="range"
                  min="0"
                  max="80"
                  step="5"
                  value={simDelayCutPct}
                  onChange={(e) => setSimDelayCutPct(parseInt(e.target.value, 10))}
                  className="w-full accent-neutral-900 cursor-pointer h-2 bg-neutral-200 rounded-lg"
                />
                <div className="flex justify-between text-[11px] text-neutral-400 font-mono">
                  <span>0%</span>
                  <span>Atraso Atual: {formatPct(activeRecorte.taxa_atraso_pct)}</span>
                  <span>-80%</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  onClick={() => {
                    setSimLeadTimeReduction(3.0);
                    setSimDelayCutPct(40);
                  }}
                  className="inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-900 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Redefinir Parâmetros Padrão
                </button>
                <span className="text-[11px] text-neutral-400">
                  Modelo elástico baseado nos microdados reais
                </span>
              </div>
            </div>

            <div className="lg:col-span-7 bg-neutral-50/70 p-5 rounded-xl border border-neutral-200 flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-200/70 pb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-600">
                  Retorno Estimado em Tempo Real
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                  Cenário Otimizado
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border border-neutral-200/80 shadow-xs">
                  <div className="text-xs text-neutral-500 font-medium">Pedidos Livres do Atraso</div>
                  <div className="text-2xl font-bold text-neutral-950 font-mono mt-1">
                    +{formatNumber(simResults.pedidosSalvos)}
                  </div>
                  <div className="text-xs text-neutral-500 mt-1 flex items-center gap-1">
                    <span>Taxa cai de {formatPct(activeRecorte.taxa_atraso_pct)} para:</span>
                    <strong className="text-emerald-700 font-semibold">{formatPct(simResults.novaTaxaAtraso)}</strong>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-neutral-200/80 shadow-xs">
                  <div className="text-xs text-neutral-500 font-medium">Elevação da Avaliação (CSAT)</div>
                  <div className="text-2xl font-bold text-emerald-700 font-mono mt-1 flex items-baseline gap-1">
                    +{simResults.ganhoNota.toFixed(2)}
                    <span className="text-xs font-normal text-neutral-500">pts</span>
                  </div>
                  <div className="text-xs text-neutral-500 mt-1">
                    Nota média sobe para <strong className="text-neutral-900">{simResults.novaNotaPonderada.toFixed(2)} ★</strong>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-neutral-200/80 shadow-xs">
                  <div className="text-xs text-neutral-500 font-medium">Clientes Adicionais Retidos</div>
                  <div className="text-2xl font-bold text-neutral-950 font-mono mt-1">
                    +{formatNumber(simResults.clientesAdicionaisRetidos)}
                  </div>
                  <div className="text-xs text-neutral-500 mt-1">
                    Recompras preservadas pela entrega no prazo
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-neutral-200/80 shadow-xs">
                  <div className="text-xs text-neutral-500 font-medium">GMV Salvo do Atraso</div>
                  <div className="text-2xl font-bold text-neutral-900 font-mono mt-1">
                    {formatMoney(simResults.gmvProtegido)}
                  </div>
                  <div className="text-xs text-neutral-500 mt-1">
                    Receita de clientes que não sofrerão atrito
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-neutral-200/70 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-neutral-600 gap-2">
                <span>
                  Novo lead time projetado: <strong className="text-neutral-950 font-mono">{simResults.novoLeadTime.toFixed(1)} dias</strong> (era {activeRecorte.lead_time_medio_dias.toFixed(1)}d)
                </span>
                <span className="text-neutral-400 font-mono text-[11px]">
                  Simulação Vértice · Elasticidade Logística
                </span>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

export default IndicadoresTab;
