import React, { useEffect, useMemo, useState } from 'react';
import {
  ResponsiveContainer, ComposedChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, LineChart,
} from 'recharts';
import { ArrowUpRight, FileText, GitBranch, Pencil, ChevronDown } from 'lucide-react';
import { C, fmt, signed, calc, series, UNITS, REAL } from './data.js';
import { Badge, Btn, Count, Field, Reveal, Ring, SelectBox, Tabs, tone } from './ui.jsx';
import IndicadoresTab from './IndicadoresTab.jsx';

/* ------------------------------------------------------------------ */
/* Simulador (console)                                                 */
/* ------------------------------------------------------------------ */
const Simulator = ({ sim, setSim, onCompare, onSave }) => {
  const r = calc(sim.price, sim.unit);
  return (
    <div className="rounded-2xl border border-[#232C3B] bg-[#121821] p-6">
      <h3 className="text-[24px] font-semibold leading-[1.2]">Simulador de elasticidade</h3>
      <p className="mt-1 text-sm font-light text-[#A8B0BF]">Mova a premissa e veja a projeção redesenhar o gráfico.</p>

      <div className="mt-6 flex flex-col gap-4">
        <Field id="s-nome" label="Nome do cenário">
          <div className="relative">
            <input id="s-nome" type="text" value={sim.name} onChange={(e) => setSim({ ...sim, name: e.target.value })}
              className="h-12 w-full rounded-lg border border-[#232C3B] bg-[#0B0F14] px-4 pr-8 text-sm text-[#F7F8FA] transition-colors hover:border-[#A8B0BF] focus:border-[#F4B942]" />
            <Pencil size={16} aria-hidden="true" className="pointer-events-none absolute right-4 top-4 text-[#A8B0BF]" />
          </div>
        </Field>

        <div>
          <div className="flex items-end justify-between">
            <label htmlFor="s-preco" className="text-[16px] font-medium">Reajuste seletivo de preço</label>
            <span className="font-display text-[48px] leading-none text-[#F4B942]" aria-live="polite">{fmt(sim.price)}%</span>
          </div>
          <input id="s-preco" type="range" className="vx mt-2" min="0" max="3" step="0.1" value={sim.price}
            style={{ '--p': `${(sim.price / 3) * 100}%` }}
            onChange={(e) => setSim({ ...sim, price: parseFloat(e.target.value) })} aria-valuetext={`${fmt(sim.price)} por cento`} />
          <div className="flex justify-between text-sm font-light text-[#A8B0BF]"><span>0% · Sem reajuste</span><span>3% · Teto da premissa</span></div>
        </div>

        <Field id="s-unid" label="Unidade de negócio">
          <SelectBox id="s-unid" value={sim.unit} onChange={(v) => setSim({ ...sim, unit: v })} options={Object.keys(UNITS)} />
        </Field>
      </div>

      <dl className="mt-6 grid grid-cols-1 gap-4 border-t border-[#232C3B] pt-6 sm:grid-cols-3">
        <div><dt className="text-sm font-light text-[#A8B0BF]">Receita anual</dt>
          <dd className="font-display text-[32px] leading-[1.1] text-[#F4B942]"><Count to={r.receita} d={1} prefix="R$ " duration={500} /></dd></div>
        <div><dt className="text-sm font-light text-[#A8B0BF]">Margem</dt>
          <dd className="font-display text-[32px] leading-[1.1] text-[#F4B942]"><Count to={r.margem} d={1} suffix="%" duration={500} /></dd></div>
        <div><dt className="text-sm font-light text-[#A8B0BF]">Risco de volume</dt>
          <dd className={`font-display text-[32px] leading-[1.1] ${tone(r.tone)}`}>{r.risco}</dd></div>
      </dl>
      <p className="mt-2 text-sm font-light text-[#A8B0BF]">
        {sim.unit === 'Todas as unidades' ? 'Efeito sobre todas as unidades' : `Contribuição de ${sim.unit}`}: {signed(r.unidade, 2)} mi/ano
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        <Btn variant="secondary" icon={GitBranch} onClick={onCompare}>Comparar cenários</Btn>
        <Btn variant="outline" onClick={onSave}>Salvar cenário</Btn>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Visão geral                                                         */
/* ------------------------------------------------------------------ */
const Geral = ({ sim, setSim, goto, saveScenario }) => {
  const [hover, setHover] = useState(null);
  const data = useMemo(() => series(sim.price), [sim.price]);
  const r = calc(sim.price);
  const h = hover != null ? data[hover] : null;
  const big = h ? (h.realizado ?? h.cenario) : 48.6;
  const label = h ? (hover < 6 ? `${h.m} · Realizado` : `${h.m} · Projeção · ${sim.name}`) : 'Receita líquida · 1S26';
  const sub = h
    ? hover < 6
      ? `Meta R$ ${fmt(h.meta)} mi · Desvio ${signed(h.realizado - h.meta)} mi`
      : `Base R$ ${fmt(h.base)} mi · Cenário ${signed(h.cenario - h.base, 2)} mi vs. base`
    : 'Meta R$ 50,4 mi · Desvio −R$ 1,8 mi · 1S25: R$ 43,2 mi';

  return (
    <div className="flex flex-col gap-16">
      {/* Leitura principal: número gigante + gráfico em sangria */}
      <div>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-[16px] font-light text-[#A8B0BF]">{label}</p>
            <p className="font-display text-[clamp(52px,12vw,176px)] leading-[.92] text-[#F7F8FA]">
              <Count to={big} d={1} prefix="R$ " suffix=" mi" duration={600} />
            </p>
            <p className="mt-2 text-[16px] font-light text-[#A8B0BF]">{sub}</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <Badge tone="ok" className="!bg-transparent !p-0">+12,5% vs. 1S25</Badge>
              <p className="mt-1 text-sm font-light text-[#A8B0BF]">Valores em milhões de reais</p>
            </div>
            <Ring value={96.4} size={120} textClass="text-[28px]" />
          </div>
        </div>

        <div className="-mx-4 mt-6 h-[280px] sm:-mx-6 md:h-[380px] lg:-mx-12" role="img" aria-label="Receita mensal em R$ milhões. Realizado de janeiro a junho, meta, e projeção base e cenário de julho a dezembro.">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={{ top: 16, right: 24, bottom: 0, left: 0 }} onMouseMove={(s) => setHover(s && s.isTooltipActive ? s.activeTooltipIndex : null)} onMouseLeave={() => setHover(null)}>
              <CartesianGrid stroke={C.s3} vertical={false} />
              <XAxis dataKey="m" tick={{ fill: C.t2, fontSize: 14 }} axisLine={false} tickLine={false} />
              <YAxis domain={[4, 12]} ticks={[4, 6, 8, 10, 12]} width={40} tick={{ fill: C.t2, fontSize: 14 }} axisLine={false} tickLine={false} />
              <Tooltip content={() => null} cursor={{ stroke: C.t2, strokeWidth: 1 }} />
              <ReferenceLine x="Jun" stroke={C.t2} strokeDasharray="2 4" label={{ value: 'Base: 30 jun', fill: C.t2, fontSize: 14, position: 'insideTopRight' }} />
              <Area type="linear" dataKey="realizado" stroke="none" fill={C.s2} animationDuration={1600} />
              <Line type="linear" dataKey="meta" stroke={C.t2} strokeWidth={1.5} strokeDasharray="2 4" dot={false} animationDuration={1600} />
              <Line type="linear" dataKey="base" stroke={C.t2} strokeWidth={2} dot={false} connectNulls animationDuration={1600} />
              <Line type="linear" dataKey="cenario" stroke={C.gold} strokeWidth={3} strokeDasharray="8 6" dot={{ r: 3, fill: C.gold, stroke: C.gold }} connectNulls animationDuration={400} />
              <Line type="linear" dataKey="realizado" stroke={C.gold} strokeWidth={3} dot={{ r: 5, fill: C.gold, stroke: C.gold }} activeDot={{ r: 8 }} animationDuration={1600} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-wrap gap-8 text-sm">
          <span className="font-semibold text-[#F4B942]">— Realizado · R$ 48,6 mi</span>
          <span className="font-light text-[#A8B0BF]">··· Meta · R$ 50,4 mi</span>
          <span className="font-light text-[#A8B0BF]">— Projeção base</span>
          <span className="font-semibold text-[#F4B942]">- - {sim.name}</span>
        </div>
      </div>

      {/* Faixa de indicadores — sem cards */}
      <div className="grid divide-y divide-[#232C3B] border-y border-[#232C3B] md:grid-cols-3 md:divide-x md:divide-y-0">
        <Reveal className="py-6 md:pr-6">
          <p className="text-[16px] font-light text-[#A8B0BF]">Margem EBITDA · 1S26</p>
          <p className="font-display text-[clamp(44px,6vw,88px)] leading-none"><Count to={18.4} suffix="%" /></p>
          <p className="mt-2 text-[16px] font-medium text-[#F4B942]">−1,6 p.p. da meta</p>
          <p className="text-sm font-light text-[#A8B0BF]">Meta 20,0% · 1S25: 19,6%</p>
        </Reveal>
        <Reveal delay={120} className="py-6 md:px-6">
          <p className="text-[16px] font-light text-[#A8B0BF]">EBITDA · 1S26</p>
          <p className="font-display text-[clamp(44px,6vw,88px)] leading-none"><Count to={8.94} d={2} prefix="R$ " suffix=" mi" /></p>
          <p className="mt-2 text-[16px] font-medium text-[#F4B942]">−R$ 1,14 mi da meta</p>
          <p className="text-sm font-light text-[#A8B0BF]">Meta R$ 10,08 mi · Potencial de recomposição</p>
        </Reveal>
        <Reveal delay={240} className="py-6 md:pl-6">
          <p className="text-[16px] font-light text-[#A8B0BF]">Margem no cenário · {sim.name}</p>
          <p className="font-display text-[clamp(44px,6vw,88px)] leading-none text-[#F4B942]"><Count to={r.margem} suffix="%" duration={500} /></p>
          <p className={`mt-2 text-[16px] font-medium ${r.margem >= 18.4 ? 'text-[#18A957]' : 'text-[#E5484D]'}`}>{signed(r.margem - 18.4)} p.p. vs. base</p>
          <p className="text-sm font-light text-[#A8B0BF]">Reajuste de {fmt(sim.price)}% · risco de volume {r.risco.toLowerCase()}</p>
        </Reveal>
      </div>

      {/* Diagnóstico + simulador */}
      <div className="grid items-start gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-6 lg:sticky lg:top-24">
          <Badge tone="gold">Leitura estratégica</Badge>
          <h2 className="font-display mt-4 text-[clamp(44px,5.4vw,84px)] leading-[.96]">Crescimento não está virando margem.</h2>
          <p className="mt-6 max-w-[560px] text-[20px] font-extralight leading-[1.4]">
            A receita cresce <b className="font-semibold text-[#F4B942]">12,5%</b>, mas a margem recua de <b className="font-semibold">19,6%</b> para <b className="font-semibold text-[#F4B942]">18,4%</b>.
            Frete e mix no Sudeste explicam <b className="font-semibold">38%</b> do desvio.
          </p>
          <button onClick={() => goto('riscos')} className="group mt-6 inline-flex h-12 items-center gap-2 text-[16px] font-medium text-[#F4B942]">
            <span className="border-b border-transparent transition-colors group-hover:border-[#F4B942]">Investigar 3 contratos prioritários</span>
            <ArrowUpRight size={16} aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-y-[2px] group-hover:translate-x-[2px]" />
          </button>
          <p className="text-sm font-light text-[#A8B0BF]">ERP + CRM · Confiança alta</p>
        </Reveal>
        <Reveal delay={150} className="lg:col-span-6">
          <Simulator sim={sim} setSim={setSim} onCompare={() => goto('cenarios')} onSave={saveScenario} />
        </Reveal>
      </div>

      {/* Recomendação — faixa em ouro */}
      <Reveal as="section" className="grid gap-8 rounded-2xl rounded-br-[32px] bg-[#F4B942] p-6 text-[#0B0F14] lg:grid-cols-[1fr_auto] lg:items-end lg:rounded-br-[64px] lg:p-12">
        <div>
          <p className="text-sm font-semibold">• Alta prioridade · até 15 jul</p>
          <h2 className="font-display mt-4 max-w-[860px] text-[clamp(40px,5vw,80px)] leading-[.98]">Recompor margem sem frear a expansão.</h2>
          <p className="mt-4 max-w-[560px] text-[18px] font-normal leading-[1.4]">Reajuste seletivo de 1,5% e revisão de frete. Potencial de +R$ 1,14 mi no EBITDA semestral. Responsável: Comercial + Operações.</p>
        </div>
        <Btn variant="dark" icon={ArrowUpRight} onClick={() => goto('planejamento')}>Revisar plano</Btn>
      </Reveal>

      <button onClick={() => goto('copiloto')} className="group flex w-full items-center justify-between gap-6 border-y border-[#232C3B] py-8 text-left">
        <span>
          <span className="block text-[16px] font-light text-[#A8B0BF]">Seu próximo movimento · 3 fontes conectadas</span>
          <span className="mt-2 block text-[clamp(24px,3vw,44px)] font-extralight italic leading-[1.1] transition-transform duration-500 group-hover:translate-x-4">“Como recuperar os R$ 1,14 mi de EBITDA sem comprometer o crescimento?”</span>
        </span>
        <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-[#1A2230] text-[#F4B942] transition-all duration-500 group-hover:bg-[#D62828] group-hover:text-[#F7F8FA]"><ArrowUpRight size={24} /></span>
      </button>

      <p className="text-sm font-light text-[#A8B0BF]">Fontes: ERP financeiro, CRM e orçamento 2026 · Valores gerenciais · Projeções sujeitas à revisão de premissas.</p>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Indicadores                                                         */
/* ------------------------------------------------------------------ */
const Indicators = () => {
  const [on, setOn] = useState(false);
  useEffect(() => { const t = setTimeout(() => setOn(true), 100); return () => clearTimeout(t); }, []);
  const regs = [['Sudeste', 24.3], ['Sul', 12.2], ['Nordeste', 7.3], ['Outras', 4.8]];
  const rows = [
    ['Receita líquida', 'R$ 48,6 mi', 'R$ 50,4 mi', '−R$ 1,8 mi', 'warn', 'Revisão necessária'],
    ['Margem EBITDA', '18,4%', '20,0%', '−1,6 p.p.', 'warn', 'Revisão necessária'],
    ['EBITDA', 'R$ 8,94 mi', 'R$ 10,08 mi', '−R$ 1,14 mi', 'warn', 'Revisão necessária'],
    ['Crescimento vs. 1S25', '+12,5%', '—', '—', 'ok', 'Evolução favorável'],
  ];
  return (
    <div className="flex flex-col gap-16">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h2 className="text-[32px] font-semibold leading-[1.2]">Receita por região · 1S26</h2>
          <p className="text-sm font-light text-[#A8B0BF]">R$ mi · Soma: R$ 48,6 mi</p>
          <ul className="mt-6 flex flex-col gap-6">
            {regs.map(([n, v], i) => (
              <li key={n} className="grid grid-cols-[96px_1fr_48px] items-center gap-2 sm:grid-cols-[120px_1fr_72px] sm:gap-4">
                <span className="font-display text-[22px] leading-none sm:text-[32px]">{n}</span>
                <div className="h-8 rounded bg-[#1A2230]" role="img" aria-label={`${n}: R$ ${fmt(v)} mi`}>
                  <div className="h-8 rounded bg-[#F4B942] transition-all duration-[1400ms] ease-[cubic-bezier(.2,.7,.2,1)]" style={{ width: on ? `${(v / 24.3) * 100}%` : '0%', transitionDelay: `${i * 120}ms` }} />
                </div>
                <span className="text-right text-[18px] font-semibold sm:text-[24px]">{fmt(v)}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col justify-between gap-8 lg:col-span-5">
          <div>
            <p className="text-[16px] font-light text-[#A8B0BF]">Receita · Jan–Jun 2026</p>
            <p className="font-display text-[clamp(48px,5vw,72px)] leading-none">+12,5% <span className="font-sans text-[24px] font-extralight">vs. 1S25</span></p>
            <div className="h-[72px] w-full max-w-[320px]"><ResponsiveContainer width="100%" height="100%"><LineChart data={REAL.map((v, i) => ({ i, v }))} margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
              <YAxis hide domain={['dataMin - 0.5', 'dataMax + 0.5']} />
              <Line type="linear" dataKey="v" stroke={C.ok} strokeWidth={3} dot={false} animationDuration={1600} />
            </LineChart></ResponsiveContainer></div>
          </div>
          <div className="flex items-center gap-6">
            <Ring value={96.4} size={128} textClass="text-[28px]" />
            <div><p className="text-[20px] font-semibold">Atingimento de receita</p><p className="text-sm font-light text-[#A8B0BF]">R$ 48,6 mi de R$ 50,4 mi 1S26 · Desvio de 3,6%</p></div>
          </div>
        </div>
      </div>

      <ul className="md:hidden">
        {rows.map((r) => (
          <li key={r[0]} className="border-t border-[#232C3B] py-4">
            <p className="font-display text-[28px] leading-none">{r[0]}</p>
            <p className="mt-2 text-[20px] font-semibold">{r[1]}</p>
            <p className="text-sm font-light text-[#A8B0BF]">Meta {r[2]} · Desvio {r[3]}</p>
            <div className="mt-2"><Badge tone={r[4]}>{r[5]}</Badge></div>
          </li>
        ))}
      </ul>
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[700px] text-left">
          <thead><tr className="text-sm font-light text-[#A8B0BF]">{['Indicador', 'Realizado', 'Meta', 'Desvio', 'Estado'].map((x) => <th key={x} className="pb-4 font-light">{x}</th>)}</tr></thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r[0]} className="group border-t border-[#232C3B] transition-colors hover:bg-[#121821]">
                <td className="py-6 pl-0 font-display text-[28px] transition-all duration-300 group-hover:pl-4">{r[0]}</td>
                <td className="text-[20px] font-semibold">{r[1]}</td><td className="text-[16px] font-light text-[#A8B0BF]">{r[2]}</td>
                <td className="text-[16px] font-light text-[#A8B0BF]">{r[3]}</td><td><Badge tone={r[4]}>{r[5]}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Decisões (acordeão)                                                 */
/* ------------------------------------------------------------------ */
const DEC = [
  ['Aprovar reajuste seletivo de 1,5%', 'Comitê executivo', 'até 15 jul', '+R$ 0,72 mi', 'warn', 'Pendente de aprovação', 'Aplicar nas contas com maior defasagem, preservando exceções para clientes estratégicos.'],
  ['Revisar contratos de frete do Sudeste', 'Operações', 'até 31 jul', '+R$ 0,42 mi', 'gold', 'Em análise', 'Renegociar rotas e consolidar entregas sem reduzir o nível de serviço.'],
  ['Manter plano de expansão do 2S26', 'Diretoria', '30 jun', 'Sem impacto no EBITDA', 'ok', 'Aprovada', 'Expansão no Sul mantida; revisar premissas de mix na próxima reunião.'],
];

const Decisions = ({ onBrief }) => {
  const [open, setOpen] = useState(0);
  return (
    <div>
      <ul className="border-b border-[#232C3B]">
        {DEC.map(([t, o, d, v, tn, s, det], i) => (
          <li key={t} className="border-t border-[#232C3B]">
            <button onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i} className="group grid w-full grid-cols-[64px_1fr_auto] items-center gap-4 py-6 text-left md:grid-cols-[96px_1fr_auto_auto]">
              <span className={`font-display text-[clamp(40px,5vw,72px)] leading-none transition-colors ${open === i ? 'text-[#F4B942]' : 'text-[#232C3B] group-hover:text-[#A8B0BF]'}`}>{String(i + 1).padStart(2, '0')}</span>
              <span className="text-[clamp(20px,2.4vw,32px)] font-semibold leading-[1.15]">{t}</span>
              <span className="hidden md:block"><Badge tone={tn}>{s}</Badge></span>
              <ChevronDown size={24} aria-hidden="true" className={`transition-transform duration-500 ${open === i ? 'rotate-180 text-[#F4B942]' : 'text-[#A8B0BF]'}`} />
            </button>
            <div className={`grid transition-all duration-500 ${open === i ? 'grid-rows-[1fr] pb-6' : 'grid-rows-[0fr]'}`}>
              <div className="overflow-hidden md:pl-[96px]">
                <div className="mb-4 md:hidden"><Badge tone={tn}>{s}</Badge></div>
                <p className="max-w-[640px] text-[18px] font-light leading-[1.5] text-[#A8B0BF]">{det}</p>
                <p className="mt-4 text-sm font-light text-[#A8B0BF]">Responsável: <b className="font-semibold text-[#F7F8FA]">{o}</b> · Prazo: <b className="font-semibold text-[#F7F8FA]">{d}</b> · Impacto: <b className="font-semibold text-[#F4B942]">{v}</b></p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-8"><Btn variant="primary" icon={FileText} onClick={onBrief}>Levar ao Executive Brief</Btn></div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Histórico (linha do tempo)                                          */
/* ------------------------------------------------------------------ */
const EVENTS = [
  ['02 jul 2026 · 09:14', 'Análise de margem concluída no copiloto', 'IA ativa · 3 fontes'],
  ['01 jul 2026 · 08:42', 'Carga de ERP + CRM validada', 'Dados atualizados'],
  ['28 jun 2026', 'Cenário “Expansão disciplinada” salvo', 'Marina Costa'],
  ['15 jun 2026', 'Orçamento 2026 · versão do comitê aprovada', 'Comitê executivo'],
];
const History = () => (
  <ol className="relative ml-2 border-l border-[#232C3B] pl-8">
    {EVENTS.map(([d, t, a], i) => (
      <Reveal as="li" key={d} delay={i * 100} className="relative pb-12 last:pb-0">
        <span className="absolute -left-[41px] top-2 h-4 w-4 rounded-full border-2 border-[#D62828] bg-[#0B0F14]" aria-hidden="true" />
        <p className="text-sm font-light text-[#A8B0BF]">{d}</p>
        <p className="font-display mt-1 text-[clamp(28px,3.4vw,48px)] leading-[1.05]">{t}</p>
        <p className="mt-1 text-[16px] font-extralight italic text-[#F4B942]">{a}</p>
      </Reveal>
    ))}
  </ol>
);

/* ------------------------------------------------------------------ */
/* Página                                                              */
/* ------------------------------------------------------------------ */
const Overview = ({ sim, setSim, onBrief, goto, saveScenario }) => {
  const [tab, setTab] = useState('Visão geral');
  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="text-[16px] font-light text-[#A8B0BF]">Comitê executivo · Grupo Alvora</p>
          <h1 className="font-display mt-2 max-w-[1040px] text-[clamp(40px,5.4vw,80px)] leading-[.98]">
            Visão Executiva: <span className="font-sans font-extralight italic text-[#F4B942]">Elasticidade de Ocupação</span> & Expansão
          </h1>
          <p className="mt-4 text-[18px] font-light text-[#A8B0BF]">O semestre avançou. A margem pede uma decisão.</p>
        </div>
        <Btn variant="primary" icon={FileText} onClick={onBrief}>Gerar resumo</Btn>
      </header>
      <Tabs tabs={['Visão geral', 'Indicadores', 'Decisões', 'Histórico']} value={tab} onChange={setTab} />
      <div key={tab} className="animate-[pageIn_.6s_cubic-bezier(.2,.7,.2,1)] pt-8">
        {tab === 'Visão geral' && <Geral sim={sim} setSim={setSim} goto={goto} saveScenario={saveScenario} />}
        {tab === 'Indicadores' && <IndicadoresTab />}
        {tab === 'Decisões' && <Decisions onBrief={onBrief} />}
        {tab === 'Histórico' && <History />}
      </div>
    </div>
  );
};

export default Overview;
