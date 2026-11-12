import React, { useEffect, useState } from 'react';
import { Check, FileText, Plus, ArrowUpRight } from 'lucide-react';
import { fmt, calc } from './data.js';
import { Badge, Btn, Reveal } from './ui.jsx';

const PageHead = ({ title, sub, right }) => (
  <header className="flex flex-wrap items-end justify-between gap-6 pb-12">
    <div>
      <h1 className="font-display max-w-[1000px] text-[clamp(40px,6vw,96px)] leading-[.96]">{title}</h1>
      <p className="mt-4 text-[18px] font-light text-[#A8B0BF]">{sub}</p>
    </div>
    {right}
  </header>
);

/* ------------------------------------------------------------------ */
/* Planejamento: linha do tempo (Gantt) com barras animadas            */
/* ------------------------------------------------------------------ */
const PLAN = [
  ['Reajuste seletivo de preço', 'Comercial', 0, 0.5, 40, '+R$ 0,72 mi', 'warn', 'Revisão necessária'],
  ['Eficiência de frete no Sudeste', 'Operações', 0, 1, 25, '+R$ 0,42 mi', 'gold', 'Em andamento'],
  ['Revisão de mix de contratos', 'Comercial', 0, 2, 10, 'A medir', 'warn', 'Revisão necessária'],
  ['Expansão de unidades no Sul', 'Diretoria', 0.5, 3, 60, 'A medir', 'ok', 'No prazo'],
];
const M2 = ['Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

export const Planning = ({ goto }) => {
  const [on, setOn] = useState(false);
  const [hot, setHot] = useState(null);
  useEffect(() => { const t = setTimeout(() => setOn(true), 150); return () => clearTimeout(t); }, []);
  return (
    <div>
      <PageHead title="Planejamento" sub="Iniciativas do 2S26 · Meta EBITDA R$ 10,08 mi" right={<Btn variant="secondary" icon={ArrowUpRight} onClick={() => goto('cenarios')}>Ver cenários</Btn>} />
      <div>
        <div>
          <div className="grid grid-cols-1 text-sm font-light text-[#A8B0BF] md:grid-cols-[280px_1fr]">
            <span className="hidden md:block" />
            <div className="grid grid-cols-6 border-b border-[#232C3B] pb-2">{M2.map((m) => <span key={m}>{m}</span>)}</div>
          </div>
          {PLAN.map(([t, o, s, e, p, imp, tn, st], i) => (
            <div key={t} onMouseEnter={() => setHot(i)} onMouseLeave={() => setHot(null)} className={`grid grid-cols-1 items-center gap-4 border-b md:grid-cols-[280px_1fr] border-[#232C3B] py-6 transition-colors ${hot === i ? 'bg-[#121821]' : ''}`}>
              <div className="pr-4">
                <p className="text-[18px] font-semibold leading-[1.2]">{t}</p>
                <p className="text-sm font-light text-[#A8B0BF]">{o} · {imp}</p>
                <div className="mt-2 md:hidden"><Badge tone={tn}>{st} · {p}%</Badge></div>
              </div>
              <div className="relative h-12" style={{ backgroundImage: 'linear-gradient(to right,#232C3B 1px,transparent 1px)', backgroundSize: 'calc(100%/6) 100%' }}>
                <div className="absolute top-2 h-8 overflow-hidden rounded bg-[#1A2230] transition-all duration-[1400ms] ease-[cubic-bezier(.2,.7,.2,1)]"
                  style={{ left: `${(s / 6) * 100}%`, width: on ? `${((e - s) / 6) * 100 || 3}%` : '0%', transitionDelay: `${i * 140}ms` }}>
                  <div className="h-8 bg-[#F4B942]" style={{ width: `${p}%` }} />
                </div>
                <span className={`absolute top-3 hidden text-sm font-medium transition-opacity md:block ${hot === i ? 'opacity-100' : 'opacity-0'}`} style={{ left: `calc(${(e / 6) * 100}% + 8px)` }}>
                  <Badge tone={tn}>{st} · {p}%</Badge>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Cenários                                                            */
/* ------------------------------------------------------------------ */
export const Scenarios = ({ sim, saved, setSaved, selected, setSelected, goto }) => {
  const [on, setOn] = useState(false);
  useEffect(() => { const t = setTimeout(() => setOn(true), 100); return () => clearTimeout(t); }, []);
  const d = calc(sim.price);
  const rows = [
    { id: 'cons', name: 'Conservador', receita: 96.4, margem: 17.2, prem: 'Demanda −6%' },
    { id: 'base', name: 'Base', receita: 102.8, margem: 18.4, prem: 'Ritmo atual' },
    ...saved.map((s) => ({ id: s.id, name: s.name, receita: s.receita, margem: s.margem, prem: `Preço +${fmt(s.price)}%`, del: true })),
    { id: 'draft', name: sim.name, receita: d.receita, margem: d.margem, prem: `Preço +${fmt(sim.price)}%`, draft: true },
  ];
  return (
    <div>
      <PageHead title="Cenários" sub="Receita anual e margem EBITDA · compare premissas antes de comprometer recursos" right={<Btn variant="secondary" icon={Plus} onClick={() => goto('visao')}>Criar cenário</Btn>} />
      <ul className="border-b border-[#232C3B]">
        {rows.map((r, i) => (
          <li key={r.id} className={`border-t border-[#232C3B] p-4 transition-colors duration-500 md:p-6 ${selected === r.id ? 'bg-[#121821]' : 'hover:bg-[#121821]'}`}>
            <div className="grid grid-cols-2 items-center gap-4 lg:grid-cols-[minmax(240px,1fr)_160px_120px_160px_auto]">
              <div className="col-span-2 lg:col-span-1">
                <p className="font-display text-[clamp(28px,3vw,44px)] leading-none">{r.name}</p>
                <p className="mt-1 flex items-center gap-2 text-sm font-light text-[#A8B0BF]">{r.prem}{r.draft && <Badge tone="gold">Rascunho</Badge>}</p>
              </div>
              <p className="text-[24px] font-semibold">R$ {fmt(r.receita)} mi</p>
              <p className={`text-[24px] font-semibold ${r.margem > 18.4 ? 'text-[#18A957]' : r.margem < 18.4 ? 'text-[#FFB020]' : ''}`}>{fmt(r.margem)}%</p>
              <div className="col-span-2 h-2 rounded bg-[#1A2230] lg:col-span-1" role="img" aria-label={`Receita relativa de ${r.name}`}>
                <div className="h-2 rounded bg-[#F4B942] transition-all duration-[1200ms] ease-[cubic-bezier(.2,.7,.2,1)]" style={{ width: on ? `${((r.receita - 90) / 30) * 100}%` : '0%', transitionDelay: `${i * 100}ms` }} />
              </div>
              <div className="col-span-2 flex flex-wrap gap-2 lg:col-span-1">
                <Btn variant={selected === r.id ? 'secondary' : 'outline'} icon={selected === r.id ? Check : undefined} onClick={() => setSelected(r.id)}>
                  {selected === r.id ? 'Cenário selecionado' : 'Selecionar'}
                </Btn>
                {r.del && <Btn variant="danger" onClick={() => { setSaved(saved.filter((s) => s.id !== r.id)); if (selected === r.id) setSelected('base'); }}>Excluir cenário</Btn>}
              </div>
            </div>
          </li>
        ))}
      </ul>
      {saved.length === 0 && (
        <Reveal className="mt-16">
          <p className="font-display text-[clamp(32px,4vw,56px)] leading-none">Seu próximo cenário começa aqui.</p>
          <p className="mt-2 max-w-[520px] text-[18px] font-light text-[#A8B0BF]">Compare premissas antes de comprometer recursos. Salve uma alternativa ao cenário-base no simulador.</p>
          <div className="mt-6"><Btn variant="primary" icon={Plus} onClick={() => goto('visao')}>Criar cenário</Btn></div>
        </Reveal>
      )}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Riscos: matriz probabilidade × impacto                              */
/* ------------------------------------------------------------------ */
const RISKS = [
  ['Concentração no Sudeste', 'danger', 'Alto', 2, 2, '3 contratos explicam 38% do desvio de margem. Renovações em julho; revisar preço e frete.', 'Diretoria comercial', '08 jul'],
  ['Perda de volume em contas sensíveis a preço', 'warn', 'Moderado', 1, 2, 'O reajuste pode reduzir a conversão. Monitorar semanalmente conversão e margem por contrato.', 'Comercial', 'Semanal'],
  ['Pontualidade na consolidação de rotas', 'warn', 'Moderado', 1, 1, 'Consolidar entregas do Sudeste sem reduzir o nível de serviço.', 'Operações', '31 jul'],
  ['Dependência de premissas de demanda', 'ok', 'Baixo', 0, 1, 'O cenário conservador (demanda −6%) mantém receita anual em R$ 96,4 mi.', 'Planejamento', 'Trimestral'],
];

export const Risks = () => {
  const [hot, setHot] = useState(0);
  return (
    <div>
      <PageHead title="Riscos que exigem atenção" sub="Passe o cursor sobre um risco para localizá-lo na matriz · revisão em 08 jul" />
      <div className="grid gap-12 lg:grid-cols-[minmax(280px,480px)_1fr]">
        <div>
          <div className="relative aspect-square w-full max-w-[480px]" role="img" aria-label="Matriz de probabilidade por impacto">
            <div className="grid h-full w-full grid-cols-3 grid-rows-3 gap-1">
              {Array.from({ length: 9 }).map((_, k) => {
                const col = k % 3; const row = 2 - Math.floor(k / 3);
                const sev = col + row;
                return <div key={k} className={`rounded transition-colors ${sev >= 4 ? 'bg-[#232C3B]' : sev >= 2 ? 'bg-[#1A2230]' : 'bg-[#121821]'}`} />;
              })}
            </div>
            {RISKS.map((r, i) => (
              <span key={r[0]} className="absolute flex h-8 w-8 items-center justify-center" style={{ left: `calc(${((r[3] + 0.5) / 3) * 100}% - 16px)`, bottom: `calc(${((r[4] + 0.5) / 3) * 100}% - 16px)`, transition: 'all .5s cubic-bezier(.2,.7,.2,1)' }}>
                {hot === i && <span className={`absolute h-8 w-8 animate-[ping2_1.6s_ease-out_infinite] rounded-full ${r[1] === 'danger' ? 'bg-[#E5484D]' : r[1] === 'warn' ? 'bg-[#FFB020]' : 'bg-[#18A957]'}`} />}
                <span className={`relative h-4 rounded-full transition-all duration-500 ${hot === i ? 'w-8 bg-[#F4B942]' : 'w-4 bg-[#A8B0BF]'}`} />
              </span>
            ))}
          </div>
          <div className="mt-2 flex justify-between text-sm font-light text-[#A8B0BF]"><span>Probabilidade baixa</span><span>Probabilidade alta →</span></div>
          <p className="text-sm font-light text-[#A8B0BF]">Eixo vertical: impacto na margem (baixo → alto)</p>
        </div>
        <ul>
          {RISKS.map(([t, tn, lvl, , , d, o, p], i) => (
            <li key={t} onMouseEnter={() => setHot(i)} onFocus={() => setHot(i)} tabIndex={0} className={`border-t border-[#232C3B] py-6 outline-offset-[-2px] transition-all duration-500 ${hot === i ? 'pl-4' : ''}`}>
              <Badge tone={tn}>{lvl}</Badge>
              <p className={`font-display mt-2 text-[clamp(28px,3vw,44px)] leading-[1.02] transition-colors ${hot === i ? 'text-[#F4B942]' : ''}`}>{t}</p>
              <div className={`grid transition-all duration-500 ${hot === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                <div className="overflow-hidden">
                  <p className="mt-2 max-w-[560px] text-[16px] font-light leading-[1.5] text-[#A8B0BF]">{d}</p>
                  <p className="mt-2 text-sm font-light text-[#A8B0BF]">Dono: <b className="font-semibold text-[#F7F8FA]">{o}</b> · Próxima revisão: <b className="font-semibold text-[#F7F8FA]">{p}</b></p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Relatórios                                                          */
/* ------------------------------------------------------------------ */
const REPORTS = [
  { id: '1s26', title: 'Executive Brief · 1S26', date: 'Rascunho atual', audience: 'Comitê executivo', period: '1º semestre de 2026', desc: 'Desempenho do semestre, cenários e a decisão solicitada ao comitê.', st: ['warn', 'Rascunho em revisão'] },
  { id: '1t26', title: 'Executive Brief · 1T26', date: '02 abr 2026', audience: 'Comitê executivo', period: '1º trimestre de 2026', desc: 'Fechamento do primeiro trimestre: receita, margem e prioridades para o 2T.', st: ['ok', 'Exportado'] },
  { id: 'orc26', title: 'Revisão de orçamento 2026', date: '15 jan 2026', audience: 'Conselho', period: '1º semestre de 2026', desc: 'Metas e premissas aprovadas para 2026, base da comparação de desempenho.', st: ['ok', 'Exportado'] },
];

export const Reports = ({ onBrief }) => {
  const [sel, setSel] = useState('1s26');
  const r = REPORTS.find((x) => x.id === sel);
  return (
    <div>
      <PageHead title="Uma visão pronta para o comitê." sub="Relatórios executivos · Grupo Alvora · selecione um relatório para abrir" right={<Badge tone={r.st[0]}>{r.st[1]}</Badge>} />
      <button key={r.id} onClick={() => onBrief({ period: r.period, audience: r.audience })} className="group flex w-full animate-[pageIn_.6s_cubic-bezier(.2,.7,.2,1)] items-center justify-between gap-6 rounded-2xl rounded-br-[32px] bg-[#F4B942] p-6 text-left text-[#0B0F14] lg:rounded-br-[64px] lg:p-12">
        <span>
          <span className="font-display block text-[clamp(36px,5vw,80px)] leading-[.98]">{r.title}</span>
          <span className="mt-2 block max-w-[640px] text-[18px] font-normal">{r.desc}</span>
          <span className="mt-2 block text-sm font-medium">Público: {r.audience} · Período: {r.period} · {r.date}</span>
        </span>
        <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-[#0B0F14] text-[#F7F8FA] transition-transform duration-500 group-hover:rotate-45"><FileText size={24} /></span>
      </button>
      <ul className="mt-12 border-b border-[#232C3B]" aria-label="Relatórios disponíveis">
        {REPORTS.map((x) => (
          <li key={x.id} className="border-t border-[#232C3B]">
            <button onClick={() => setSel(x.id)} aria-pressed={sel === x.id} className="group grid w-full gap-2 py-6 text-left md:grid-cols-[1fr_160px_200px_32px] md:items-center">
              <span className={`font-display text-[32px] leading-none transition-all duration-300 group-hover:translate-x-4 ${sel === x.id ? 'translate-x-4 text-[#F4B942]' : ''}`}>{x.title}</span>
              <span className="text-[16px] font-light text-[#A8B0BF]">{x.date}</span>
              <span className="text-[16px] font-light text-[#A8B0BF]">{x.audience}</span>
              <span className="text-[#F4B942]">{sel === x.id && <Check size={20} aria-label="Selecionado" />}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
