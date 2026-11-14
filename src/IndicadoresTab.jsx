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
import { C, fmt, signed, OLIST_REGIOES, OLIST_NATIONAL_TOTALS } from './data.js';
import { Badge, Btn, Count, Field, SelectBox } from './ui.jsx';

// ==========================================
// 1. DADOS PADRÃO EMBUTIDOS (olist_indicadores.json)
// ==========================================
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

  const statusTone = useMemo(() => {
    const tx = activeRecorte.taxa_atraso_pct;
    if (tx < 6.0) return 'ok';
    if (tx <= 10.0) return 'warn';
    return 'danger';
  }, [activeRecorte.taxa_atraso_pct]);

  const statusLabel = useMemo(() => {
    const tx = activeRecorte.taxa_atraso_pct;
    if (tx < 6.0) return 'SLA em Meta Excelente';
    if (tx <= 10.0) return 'Alerta Operacional de SLA';
    return 'Risco Crítico de Retenção';
  }, [activeRecorte.taxa_atraso_pct]);

  const deltaNota = activeRecorte.nota_media_no_prazo - activeRecorte.nota_media_atrasado;
  const deltaNotaPct = (deltaNota / activeRecorte.nota_media_no_prazo) * 100;
  const deltaRecompra = activeRecorte.taxa_recompra_no_prazo_pct - activeRecorte.taxa_recompra_atrasado_pct;

  return (
    <div className="flex flex-col gap-10">
      
      {/* ========================================================= */}
      {/* 1. CABEÇALHO & CONTROLE GEOGRÁFICO                        */}
      {/* ========================================================= */}
      <header className="flex flex-wrap items-end justify-between gap-6 border-b border-[#232C3B] pb-6">
        <div>
          <p className="text-[16px] font-light text-[#A8B0BF]">
            Comitê executivo · Malha logística e elasticidade de retenção
          </p>
          <h2 className="font-display mt-2 max-w-[1040px] text-[clamp(36px,4.8vw,64px)] leading-[.98]">
            Indicadores de SLA & <span className="font-sans font-extralight italic text-[#F4B942]">Impacto na Recompra</span>
          </h2>
          <p className="mt-3 text-[16px] font-light text-[#A8B0BF]">
            Base consolidada: <strong className="text-[#F7F8FA] font-medium">{formatNumber(activeRecorte.total_pedidos)} pedidos</strong> · GMV total de <strong className="text-[#F4B942] font-medium">{formatMoney(activeRecorte.gmv_total)}</strong>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Badge tone={statusTone}>
            {statusLabel} · {formatPct(activeRecorte.taxa_atraso_pct)}
          </Badge>
        </div>
      </header>

      {/* Barra de Filtro de Região */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#232C3B] bg-[#121821] p-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-light text-[#A8B0BF] flex items-center gap-2">
            <Building2 size={16} className="text-[#F4B942]" />
            Recorte:
          </span>

          <div className="relative min-w-[260px]">
            <select
              value={selectedUF}
              aria-label="Filtrar por Região ou Estado"
              onChange={(e) => setSelectedUF(e.target.value)}
              className="h-11 w-full appearance-none rounded-lg border border-[#232C3B] bg-[#0B0F14] px-4 pr-10 text-sm text-[#F7F8FA] transition-colors hover:border-[#A8B0BF] focus:border-[#F4B942] cursor-pointer"
            >
              <option value="TODOS">Consolidado Nacional (Todos os 27 Estados)</option>
              <optgroup label="Estados por Volume">
                {listaUFs.map((est) => (
                  <option key={est.uf} value={est.uf}>
                    {est.uf} — {formatNumber(est.total_pedidos)} pedidos ({formatPct(est.taxa_atraso_pct)} atraso)
                  </option>
                ))}
              </optgroup>
            </select>
            <ChevronDown size={16} aria-hidden="true" className="pointer-events-none absolute right-3 top-3.5 text-[#A8B0BF]" />
          </div>

          <div className="hidden lg:flex items-center gap-1.5 ml-2 border-l border-[#232C3B] pl-4">
            {['TODOS', 'SP', 'RJ', 'MG', 'RS', 'BA', 'CE'].map((uf) => (
              <button
                key={uf}
                onClick={() => setSelectedUF(uf)}
                className={`h-9 px-3 rounded-lg text-xs transition-colors ${
                  selectedUF === uf
                    ? 'bg-[#F4B942] font-semibold text-[#0B0F14]'
                    : 'bg-[#1A2230] text-[#A8B0BF] hover:bg-[#232C3B] hover:text-[#F7F8FA]'
                }`}
              >
                {uf === 'TODOS' ? 'Brasil' : uf}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-light text-[#A8B0BF]">
          <span>Lead time: <strong className="text-[#F7F8FA] font-medium">{activeRecorte.lead_time_medio_dias.toFixed(1)} dias</strong></span>
          <span className="text-[#232C3B]">|</span>
          <span>Atraso médio: <strong className="text-[#F7F8FA] font-medium">+{activeRecorte.atraso_medio_quando_atrasa_dias.toFixed(1)} dias</strong></span>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. CAMADA NATIVA DE IA ("DIAGNÓSTICO EXECUTIVO")           */}
      {/* ========================================================= */}
      <section className="rounded-2xl border border-[#232C3B] bg-[#121821] p-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#232C3B] pb-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1A2230] text-[#F4B942]">
              <Sparkles size={20} />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-[20px] font-semibold text-[#F7F8FA] leading-tight">
                  Diagnóstico Executivo por Recorte
                </h3>
                <Badge tone={aiDiagnosis?.source === 'gemini' ? 'gold' : 'neutral'}>
                  {aiDiagnosis?.source === 'gemini' ? 'Gemini 3.8 Flash' : 'Heurística Operacional'}
                </Badge>
              </div>
              <p className="text-sm font-light text-[#A8B0BF] mt-0.5">
                Diretrizes de operações logísticas para o recorte {activeRecorte.uf === 'TODOS' ? 'Nacional' : activeRecorte.uf}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Btn variant="secondary" icon={Key} onClick={() => setShowKeyModal(true)}>
              {customApiKey ? 'Chave ativa' : 'Configurar chave'}
            </Btn>
            <Btn variant="outline" icon={RefreshCw} onClick={() => fetchAIDiagnosis(activeRecorte, true)} loading={aiLoading}>
              Reavaliar
            </Btn>
          </div>
        </div>

        {/* Modal da API Key */}
        {showKeyModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
            <div className="w-full max-w-md rounded-2xl border border-[#232C3B] bg-[#121821] p-6 text-[#F7F8FA] space-y-4 animate-[pageIn_.3s_ease-out]">
              <div className="flex items-center justify-between border-b border-[#232C3B] pb-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-[#F4B942]">
                  <Key size={16} />
                  <span>Google AI Studio Key</span>
                </div>
                <button onClick={() => setShowKeyModal(false)} className="text-[#A8B0BF] hover:text-[#F7F8FA]">
                  <X size={16} />
                </button>
              </div>
              <p className="text-xs text-[#A8B0BF] leading-relaxed">
                Cole sua chave do Gemini 3.8 Flash. Ela será salva localmente no navegador (<code className="text-[#F4B942]">localStorage</code>).
              </p>
              <input
                type="password"
                placeholder="AIzaSy..."
                value={customApiKey}
                onChange={(e) => setCustomApiKey(e.target.value)}
                className="h-11 w-full rounded-lg border border-[#232C3B] bg-[#0B0F14] px-4 font-mono text-sm text-[#F7F8FA] focus:border-[#F4B942]"
              />
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => {
                    setCustomApiKey('');
                    if (typeof window !== 'undefined') localStorage.removeItem('VERTICE_GEMINI_API_KEY');
                    setShowKeyModal(false);
                    fetchAIDiagnosis(activeRecorte, true);
                  }}
                  className="text-xs text-[#E5484D] hover:underline"
                >
                  Remover chave
                </button>
                <div className="flex gap-2">
                  <Btn variant="secondary" onClick={() => setShowKeyModal(false)}>Cancelar</Btn>
                  <Btn
                    variant="primary"
                    onClick={() => {
                      if (typeof window !== 'undefined') {
                        if (customApiKey.trim()) localStorage.setItem('VERTICE_GEMINI_API_KEY', customApiKey.trim());
                        else localStorage.removeItem('VERTICE_GEMINI_API_KEY');
                      }
                      setShowKeyModal(false);
                      fetchAIDiagnosis(activeRecorte, true);
                    }}
                  >
                    Salvar
                  </Btn>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6">
          {aiLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-pulse">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 rounded-xl bg-[#1A2230] border border-[#232C3B]" />
              ))}
            </div>
          ) : aiDiagnosis ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-xl border border-[#232C3B] bg-[#1A2230] p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold text-[#FFB020] mb-2 uppercase tracking-wider">
                    <span className="flex items-center gap-1.5"><AlertTriangle size={14} /> Gargalo de SLA</span>
                  </div>
                  <p className="text-sm font-light leading-relaxed text-[#F7F8FA]">
                    {aiDiagnosis.bottleneck}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#232C3B] flex items-center justify-between text-xs text-[#A8B0BF]">
                  <span>Taxa de atraso:</span>
                  <strong className="text-[#F7F8FA] font-mono">{formatPct(activeRecorte.taxa_atraso_pct)}</strong>
                </div>
              </div>

              <div className="rounded-xl border border-[#232C3B] bg-[#1A2230] p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold text-[#E5484D] mb-2 uppercase tracking-wider">
                    <span className="flex items-center gap-1.5"><TrendingDown size={14} /> Impacto em LTV & Satisfação</span>
                  </div>
                  <p className="text-sm font-light leading-relaxed text-[#F7F8FA]">
                    {aiDiagnosis.impact}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#232C3B] flex items-center justify-between text-xs text-[#A8B0BF]">
                  <span>Queda de nota:</span>
                  <strong className="text-[#E5484D] font-mono">-{deltaNota.toFixed(2)} pts ({formatPct(deltaNotaPct, 0)})</strong>
                </div>
              </div>

              <div className="rounded-xl border border-[#232C3B] bg-[#1A2230] p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold text-[#18A957] mb-2 uppercase tracking-wider">
                    <span className="flex items-center gap-1.5"><CheckCircle2 size={14} /> Ação Imediata</span>
                  </div>
                  <p className="text-sm font-light leading-relaxed text-[#F7F8FA]">
                    {aiDiagnosis.recommendation}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#232C3B] flex items-center justify-between text-xs text-[#A8B0BF]">
                  <span>Lead time médio:</span>
                  <strong className="text-[#F7F8FA] font-mono">{activeRecorte.lead_time_medio_dias.toFixed(1)} dias</strong>
                </div>
              </div>
            </div>
          ) : null}

          {aiError && (
            <p className="mt-3 text-xs text-[#A8B0BF] flex items-center gap-1.5 font-light">
              <Info size={14} className="text-[#F4B942]" />
              {aiError}
            </p>
          )}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. LINHA DE 4 KPIS DE DECISÃO                             */}
      {/* ========================================================= */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* KPI 1 */}
        <div className="rounded-2xl border border-[#232C3B] bg-[#121821] p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-sm font-light text-[#A8B0BF] mb-2">
              <span>Volume & GMV</span>
              <DollarSign size={16} className="text-[#A8B0BF]" />
            </div>
            <div className="font-display text-[clamp(28px,3vw,44px)] leading-none text-[#F7F8FA]">
              {formatNumber(activeRecorte.total_pedidos)}
            </div>
            <p className="mt-2 text-sm font-light text-[#F4B942]">
              {formatMoney(activeRecorte.gmv_total)}
            </p>
          </div>
          <div className="mt-6 pt-3 border-t border-[#232C3B] flex items-center justify-between text-xs text-[#A8B0BF]">
            <span>Ticket médio:</span>
            <span className="text-[#F7F8FA] font-mono">{formatMoney(activeRecorte.gmv_total / activeRecorte.total_pedidos)}</span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="rounded-2xl border border-[#232C3B] bg-[#121821] p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-sm font-light text-[#A8B0BF] mb-2">
              <span>Taxa de Atraso (SLA)</span>
              <Clock size={16} className="text-[#A8B0BF]" />
            </div>
            <div className={`font-display text-[clamp(28px,3vw,44px)] leading-none ${
              activeRecorte.taxa_atraso_pct > 10 ? 'text-[#E5484D]' : activeRecorte.taxa_atraso_pct > 6 ? 'text-[#FFB020]' : 'text-[#18A957]'
            }`}>
              {formatPct(activeRecorte.taxa_atraso_pct)}
            </div>
            <p className="mt-2 text-sm font-light text-[#A8B0BF]">
              Atraso médio: <strong className="text-[#F7F8FA] font-normal">+{activeRecorte.atraso_medio_quando_atrasa_dias.toFixed(1)} dias</strong>
            </p>
          </div>
          <div className="mt-6 pt-3 border-t border-[#232C3B] flex items-center justify-between text-xs text-[#A8B0BF]">
            <span>Status SLA:</span>
            <Badge tone={statusTone}>{statusLabel}</Badge>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="rounded-2xl border border-[#232C3B] bg-[#121821] p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-sm font-light text-[#A8B0BF] mb-2">
              <span>Queda de Nota</span>
              <Star size={16} className="text-[#F4B942]" />
            </div>
            <div className="font-display text-[clamp(28px,3vw,44px)] leading-none text-[#E5484D]">
              -{deltaNota.toFixed(2)}
              <span className="text-[18px] font-sans font-light text-[#A8B0BF] ml-1">pts</span>
            </div>
            <p className="mt-2 text-sm font-light text-[#A8B0BF]">
              De {activeRecorte.nota_media_no_prazo.toFixed(2)} (prazo) para {activeRecorte.nota_media_atrasado.toFixed(2)}
            </p>
          </div>
          <div className="mt-6 pt-3 border-t border-[#232C3B] flex items-center justify-between text-xs text-[#A8B0BF]">
            <span>Erosão de CSAT:</span>
            <span className="text-[#E5484D] font-mono">-{deltaNotaPct.toFixed(1)}%</span>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="rounded-2xl border border-[#232C3B] bg-[#121821] p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-sm font-light text-[#A8B0BF] mb-2">
              <span>Impacto na Retenção</span>
              <Users size={16} className="text-[#A8B0BF]" />
            </div>
            <div className="font-display text-[clamp(28px,3vw,44px)] leading-none text-[#F7F8FA]">
              {formatPct(activeRecorte.taxa_recompra_no_prazo_pct)}
            </div>
            <p className="mt-2 text-sm font-light text-[#A8B0BF]">
              Cai para <strong className="text-[#F7F8FA] font-normal">{formatPct(activeRecorte.taxa_recompra_atrasado_pct)}</strong> no atraso
            </p>
          </div>
          <div className="mt-6 pt-3 border-t border-[#232C3B] flex items-center justify-between text-xs text-[#A8B0BF]">
            <span>Delta recompra:</span>
            <span className={`font-mono ${deltaRecompra > 0 ? 'text-[#E5484D]' : 'text-[#18A957]'}`}>
              {deltaRecompra > 0 ? `-${deltaRecompra.toFixed(2)} p.p.` : `+${Math.abs(deltaRecompra).toFixed(2)} p.p.`}
            </span>
          </div>
        </div>

      </section>

      {/* ========================================================= */}
      {/* 4. GRID PRINCIPAL (BLOCOS A & B)                          */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Bloco A: Gargalos de Malha por UF */}
        <div className="lg:col-span-7 rounded-2xl border border-[#232C3B] bg-[#121821] p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#232C3B] pb-4">
              <div>
                <p className="text-xs uppercase tracking-wider text-[#A8B0BF] font-mono">Pergunta 1 · Diagnóstico de Malha</p>
                <h3 className="text-[22px] font-semibold text-[#F7F8FA] mt-1">
                  Onde o SLA logístico estoura e compromete a malha?
                </h3>
              </div>
              <div className="flex items-center gap-1 bg-[#1A2230] p-1 rounded-lg text-xs">
                <button
                  onClick={() => setSortMetric('volume')}
                  className={`px-3 py-1 rounded-md transition-colors ${sortMetric === 'volume' ? 'bg-[#F4B942] text-[#0B0F14] font-semibold' : 'text-[#A8B0BF] hover:text-[#F7F8FA]'}`}
                >
                  Top Volume
                </button>
                <button
                  onClick={() => setSortMetric('atraso')}
                  className={`px-3 py-1 rounded-md transition-colors ${sortMetric === 'atraso' ? 'bg-[#F4B942] text-[#0B0F14] font-semibold' : 'text-[#A8B0BF] hover:text-[#F7F8FA]'}`}
                >
                  Maior Atraso
                </button>
              </div>
            </div>

            <p className="text-sm font-light text-[#A8B0BF] mt-4 mb-6">
              Taxa de atraso (%) das 10 principais praças. Destaque para rotas críticas acima da meta de 8%.
            </p>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dadosBlocoA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#232C3B" />
                  <XAxis dataKey="uf" tickLine={false} axisLine={{ stroke: '#232C3B' }} tick={{ fill: '#A8B0BF', fontSize: 12 }} />
                  <YAxis tickLine={false} axisLine={{ stroke: '#232C3B' }} tick={{ fill: '#A8B0BF', fontSize: 11 }} unit="%" />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (!active || !payload?.length) return null;
                      const item = payload[0].payload;
                      return (
                        <div className="rounded-lg border border-[#232C3B] bg-[#1A2230] p-3 text-xs text-[#F7F8FA] shadow-xl space-y-1">
                          <p className="font-semibold text-sm border-b border-[#232C3B] pb-1 mb-1 text-[#F4B942]">
                            Estado: {item.uf}
                          </p>
                          <div className="flex justify-between gap-4">
                            <span className="text-[#A8B0BF]">Taxa de Atraso:</span>
                            <span className="font-mono font-semibold">{item.taxa_atraso_pct}%</span>
                          </div>
                          <div className="flex justify-between gap-4">
                            <span className="text-[#A8B0BF]">Lead Time:</span>
                            <span className="font-mono">{item.lead_time_medio_dias} dias</span>
                          </div>
                          <div className="flex justify-between gap-4">
                            <span className="text-[#A8B0BF]">Volume:</span>
                            <span className="font-mono">{formatNumber(item.total_pedidos)} pedidos</span>
                          </div>
                        </div>
                      );
                    }}
                  />
                  <ReferenceLine y={8.0} stroke="#F4B942" strokeDasharray="3 3" label={{ value: 'Meta: 8%', fill: '#F4B942', fontSize: 10, position: 'insideTopRight' }} />
                  <Bar dataKey="taxa_atraso_pct" radius={[4, 4, 0, 0]}>
                    {dadosBlocoA.map((entry) => {
                      const color =
                        entry.taxa_atraso_pct > 12.0
                          ? '#E5484D'
                          : entry.taxa_atraso_pct > 7.0
                          ? '#F4B942'
                          : '#18A957';
                      return <Cell key={`cell-${entry.uf}`} fill={color} />;
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#232C3B] flex flex-wrap items-center justify-between text-xs text-[#A8B0BF] gap-2">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#18A957]" /> &lt;7% Controlado</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#F4B942]" /> 7–12% Alerta</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#E5484D]" /> &gt;12% Crítico</span>
            </div>
            <span className="font-mono">Ponto de corte: 8,0%</span>
          </div>
        </div>

        {/* Bloco B: Elasticidade de Retenção */}
        <div className="lg:col-span-5 rounded-2xl border border-[#232C3B] bg-[#121821] p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="border-b border-[#232C3B] pb-4">
              <p className="text-xs uppercase tracking-wider text-[#A8B0BF] font-mono">Pergunta 2 · Elasticidade de Retenção</p>
              <h3 className="text-[22px] font-semibold text-[#F7F8FA] mt-1">
                Qual o impacto do atraso na nota e recompra?
              </h3>
            </div>

            <p className="text-sm font-light text-[#A8B0BF] mt-4 mb-6">
              Recorte {activeRecorte.uf === 'TODOS' ? 'Nacional' : activeRecorte.uf}: comparação direta de avaliação e probabilidade de recompra.
            </p>

            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dadosBlocoB} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#232C3B" />
                  <XAxis dataKey="cenario" tickLine={false} axisLine={{ stroke: '#232C3B' }} tick={{ fill: '#F7F8FA', fontSize: 12 }} />
                  <YAxis tickLine={false} axisLine={{ stroke: '#232C3B' }} tick={{ fill: '#A8B0BF', fontSize: 11 }} domain={[0, 5]} />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (!active || !payload?.length) return null;
                      const data = payload[0].payload;
                      return (
                        <div className="rounded-lg border border-[#232C3B] bg-[#1A2230] p-3 text-xs text-[#F7F8FA] shadow-xl space-y-1">
                          <p className="font-semibold text-sm border-b border-[#232C3B] pb-1 mb-1 text-[#F4B942]">
                            {data.cenario}
                          </p>
                          <div className="flex justify-between gap-4">
                            <span className="text-[#A8B0BF]">Nota:</span>
                            <span className="font-mono text-[#F4B942] font-semibold">{data.nota} ★</span>
                          </div>
                          <div className="flex justify-between gap-4">
                            <span className="text-[#A8B0BF]">Recompra:</span>
                            <span className="font-mono font-semibold">{data.recompra}%</span>
                          </div>
                        </div>
                      );
                    }}
                  />
                  <Bar dataKey="nota" name="Nota Média" radius={[4, 4, 0, 0]}>
                    <Cell fill="#18A957" />
                    <Cell fill="#E5484D" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-6 rounded-xl border border-[#232C3B] bg-[#1A2230] p-4 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#A8B0BF]">Nota Prazo vs. Atrasado:</span>
                <span className="font-mono font-semibold text-[#E5484D]">
                  -{deltaNota.toFixed(2)} pts ({formatPct(deltaNotaPct, 0)})
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#A8B0BF]">Taxa de Recompra:</span>
                <span className="font-mono font-semibold text-[#F7F8FA]">
                  {formatPct(activeRecorte.taxa_recompra_no_prazo_pct)} → {formatPct(activeRecorte.taxa_recompra_atrasado_pct)}
                </span>
              </div>
            </div>
          </div>

          <p className="mt-4 text-xs font-light text-[#A8B0BF] leading-relaxed">
            *Atrasos na entrega quebram o ciclo de confiança do consumidor, reduzindo a chance de recompra subsequente e gerando alto custo de reaquisição.
          </p>
        </div>

      </div>

      {/* ========================================================= */}
      {/* 5. SIMULADOR DE ALOCAÇÃO DE CD REGIONAL (ESTILO VÉRTICE)   */}
      {/* ========================================================= */}
      <section className="rounded-2xl border border-[#232C3B] bg-[#121821] p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#232C3B] pb-6">
          <div>
            <p className="text-xs uppercase tracking-wider text-[#A8B0BF] font-mono">
              Pergunta 3 · Alavanca Estratégica de Decisão
            </p>
            <h3 className="font-display text-[clamp(24px,3vw,36px)] text-[#F7F8FA] mt-1 flex items-center gap-2">
              <Sliders size={24} className="text-[#F4B942]" />
              Simulador de Alocação de CD Regional Avançado
            </h3>
            <p className="text-sm font-light text-[#A8B0BF] mt-1">
              Projeção elástica de retorno para o recorte <strong className="text-[#F7F8FA] font-medium">{activeRecorte.uf === 'TODOS' ? 'Nacional' : activeRecorte.uf}</strong>.
            </p>
          </div>

          {/* Presets Rápidos */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-[#A8B0BF] mr-1 hidden sm:inline font-light">Cenários:</span>
            <button
              onClick={() => { setSimLeadTimeReduction(1.5); setSimDelayCutPct(20); }}
              className="h-9 px-3 rounded-lg border border-[#232C3B] bg-[#1A2230] text-xs text-[#F7F8FA] hover:border-[#A8B0BF] transition-colors"
            >
              Last-Mile Leve
            </button>
            <button
              onClick={() => { setSimLeadTimeReduction(3.5); setSimDelayCutPct(45); }}
              className="h-9 px-3 rounded-lg border border-[#232C3B] bg-[#1A2230] text-xs text-[#F7F8FA] hover:border-[#A8B0BF] transition-colors"
            >
              Cross-Docking
            </button>
            <button
              onClick={() => { setSimLeadTimeReduction(6.0); setSimDelayCutPct(70); }}
              className="h-9 px-3 rounded-lg bg-[#D62828] text-xs font-semibold text-[#F7F8FA] hover:brightness-110 transition-all shadow-xs"
            >
              CD Regional Dedicado
            </button>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Controles com Sliders Nativos .vx da Vértice */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Slider 1: Compressão de Lead Time */}
            <div>
              <div className="flex items-end justify-between">
                <label htmlFor="sim-lead-time" className="text-sm font-medium text-[#F7F8FA]">
                  Compressão de Lead Time
                </label>
                <span className="font-display text-[32px] leading-none text-[#F4B942]">
                  -{simLeadTimeReduction.toFixed(1)} <span className="font-sans text-sm font-light text-[#A8B0BF]">dias</span>
                </span>
              </div>
              <input
                id="sim-lead-time"
                type="range"
                className="vx mt-2"
                min="0"
                max="7"
                step="0.5"
                value={simLeadTimeReduction}
                style={{ '--p': `${(simLeadTimeReduction / 7) * 100}%` }}
                onChange={(e) => setSimLeadTimeReduction(parseFloat(e.target.value))}
              />
              <div className="flex justify-between text-xs font-light text-[#A8B0BF] mt-1">
                <span>0 dias</span>
                <span>Lead time atual: {activeRecorte.lead_time_medio_dias.toFixed(1)}d</span>
                <span>-7.0 dias</span>
              </div>
            </div>

            {/* Slider 2: Corte de Atraso */}
            <div>
              <div className="flex items-end justify-between">
                <label htmlFor="sim-delay-cut" className="text-sm font-medium text-[#F7F8FA]">
                  Corte na Taxa de Atraso (SLA)
                </label>
                <span className="font-display text-[32px] leading-none text-[#18A957]">
                  -{simDelayCutPct}%
                </span>
              </div>
              <input
                id="sim-delay-cut"
                type="range"
                className="vx mt-2"
                min="0"
                max="80"
                step="5"
                value={simDelayCutPct}
                style={{ '--p': `${(simDelayCutPct / 80) * 100}%` }}
                onChange={(e) => setSimDelayCutPct(parseInt(e.target.value, 10))}
              />
              <div className="flex justify-between text-xs font-light text-[#A8B0BF] mt-1">
                <span>0%</span>
                <span>Atraso atual: {formatPct(activeRecorte.taxa_atraso_pct)}</span>
                <span>-80%</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                onClick={() => { setSimLeadTimeReduction(3.0); setSimDelayCutPct(40); }}
                className="inline-flex items-center gap-1.5 text-xs text-[#A8B0BF] hover:text-[#F7F8FA] transition-colors"
              >
                <RotateCcw size={14} /> Redefinir parâmetros
              </button>
              <span className="text-xs text-[#A8B0BF] font-light">Microdados 100% ponderados</span>
            </div>

          </div>

          {/* Painel de Resultados do Simulador */}
          <div className="lg:col-span-7 rounded-xl border border-[#232C3B] bg-[#1A2230] p-6 flex flex-col justify-between space-y-6">
            <div className="flex items-center justify-between border-b border-[#232C3B] pb-3">
              <span className="text-xs uppercase tracking-wider text-[#A8B0BF] font-mono">
                Retorno Estimado em Tempo Real
              </span>
              <Badge tone="ok">Projeção otimizada</Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="rounded-xl border border-[#232C3B] bg-[#121821] p-4">
                <p className="text-xs font-light text-[#A8B0BF]">Pedidos Salvos do Atraso</p>
                <p className="font-display text-[32px] leading-[1.1] text-[#F4B942] mt-1">
                  +{formatNumber(simResults.pedidosSalvos)}
                </p>
                <p className="text-xs text-[#A8B0BF] mt-1">
                  Taxa cai de {formatPct(activeRecorte.taxa_atraso_pct)} para <strong className="text-[#18A957] font-semibold">{formatPct(simResults.novaTaxaAtraso)}</strong>
                </p>
              </div>

              <div className="rounded-xl border border-[#232C3B] bg-[#121821] p-4">
                <p className="text-xs font-light text-[#A8B0BF]">Elevação da Avaliação (CSAT)</p>
                <p className="font-display text-[32px] leading-[1.1] text-[#18A957] mt-1">
                  +{simResults.ganhoNota.toFixed(2)} pts
                </p>
                <p className="text-xs text-[#A8B0BF] mt-1">
                  Nota sobe para <strong className="text-[#F7F8FA] font-semibold">{simResults.novaNotaPonderada.toFixed(2)} ★</strong>
                </p>
              </div>

              <div className="rounded-xl border border-[#232C3B] bg-[#121821] p-4">
                <p className="text-xs font-light text-[#A8B0BF]">Clientes Retidos</p>
                <p className="font-display text-[32px] leading-[1.1] text-[#F7F8FA] mt-1">
                  +{formatNumber(simResults.clientesAdicionaisRetidos)}
                </p>
                <p className="text-xs text-[#A8B0BF] mt-1">
                  Recompras preservadas no ciclo
                </p>
              </div>

              <div className="rounded-xl border border-[#232C3B] bg-[#121821] p-4">
                <p className="text-xs font-light text-[#A8B0BF]">GMV Salvo do Atraso</p>
                <p className="font-display text-[32px] leading-[1.1] text-[#F4B942] mt-1">
                  {formatMoney(simResults.gmvProtegido)}
                </p>
                <p className="text-xs text-[#A8B0BF] mt-1">
                  Receita protegida contra atrito
                </p>
              </div>

            </div>

            <div className="pt-3 border-t border-[#232C3B] flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#A8B0BF] gap-2">
              <span>
                Novo lead time projetado: <strong className="text-[#F7F8FA] font-mono">{simResults.novoLeadTime.toFixed(1)} dias</strong> (era {activeRecorte.lead_time_medio_dias.toFixed(1)}d)
              </span>
              <span className="font-mono text-[#F4B942]">vertice · elasticidade de malha</span>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}

export default IndicadoresTab;
