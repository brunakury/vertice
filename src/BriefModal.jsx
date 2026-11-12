import React, { useEffect, useRef, useState } from 'react';
import { Check, Download, X } from 'lucide-react';
import { fmt } from './data.js';
import { Badge, Btn, Field, Logo, SelectBox } from './ui.jsx';

const Check4 = ({ id, label, checked, onChange }) => (
  <label htmlFor={id} className="flex cursor-pointer items-center gap-2 text-sm text-[#F7F8FA]">
    <input id={id} type="checkbox" checked={checked} onChange={onChange} className="peer sr-only" />
    <span className={`flex h-5 w-5 items-center justify-center rounded-[4px] border transition-colors peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-[#F4B942] ${checked ? 'border-[#D62828] bg-[#D62828]' : 'border-[#A8B0BF] bg-transparent'}`}>
      {checked && <Check size={14} strokeWidth={3} aria-hidden="true" />}
    </span>
    {label}
  </label>
);

const PERIODS = {
  '1º semestre de 2026': { rec: 'R$ 48,6 mi', g: '+12,5% vs. 1S25', mar: '18,4%', md: '−1,6 p.p. da meta', perf: 'Receita atingiu 96,4% da meta de R$ 50,4 mi. EBITDA de R$ 8,94 mi, com pressão de frete e mix no Sudeste. O cenário-base projeta receita anual de R$ 102,8 mi.' },
  '1º trimestre de 2026': { rec: 'R$ 22,1 mi', g: '+11,1% vs. 1T25', mar: '18,9%', md: '−1,1 p.p. da meta', perf: 'Receita atingiu 96,9% da meta de R$ 22,8 mi. Margem EBITDA de 18,9%, com início de pressão de frete e mix no Sudeste.' },
  '2º trimestre de 2026': { rec: 'R$ 26,5 mi', g: '+13,7% vs. 2T25', mar: '18,0%', md: '−2,0 p.p. da meta', perf: 'Receita atingiu 96,0% da meta de R$ 27,6 mi. A margem recuou para 18,0%, com frete e mix no Sudeste concentrando o desvio.' },
};

const BriefModal = ({ onClose, onExported, calcState, initial = {} }) => {
  const [period, setPeriod] = useState(initial.period || '1º semestre de 2026');
  const [audience, setAudience] = useState(initial.audience || 'Comitê executivo');
  const [inc, setInc] = useState({ perf: true, cen: true, risk: true, plan: true });
  const [busy, setBusy] = useState(false);
  const closeRef = useRef(null);
  const pages = Math.max(1, Object.values(inc).filter(Boolean).length);
  const K = PERIODS[period];
  const toggle = (k) => setInc((s) => ({ ...s, [k]: !s[k] }));

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  const exportPdf = () => { setBusy(true); setTimeout(() => { setBusy(false); onExported(pages); }, 1200); };
  const sec = 'animate-[pageIn_.5s_cubic-bezier(.2,.7,.2,1)]';

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-[#0B0F14] p-4 md:p-8" role="dialog" aria-modal="true" aria-labelledby="brief-title">
      <div className="w-full max-w-[1040px] animate-[scaleIn_.6s_cubic-bezier(.2,.7,.2,1)] rounded-2xl border border-[#232C3B] bg-[#121821]">
        <div className="flex items-start justify-between border-b border-[#232C3B] p-4 sm:p-6">
          <div>
            <h2 id="brief-title" className="font-display text-[32px] leading-none sm:text-[40px]">Executive Brief</h2>
            <p className="mt-2 text-sm font-light text-[#A8B0BF]">Grupo Alvora · Preparado para o {audience.toLowerCase()}</p>
          </div>
          <button ref={closeRef} onClick={onClose} aria-label="Fechar" className="flex h-12 w-12 items-center justify-center rounded-lg text-[#A8B0BF] transition-colors hover:bg-[#1A2230] hover:text-[#F7F8FA]"><X size={20} /></button>
        </div>

        <div className="grid gap-8 p-4 sm:p-6 md:grid-cols-[288px_1fr]">
          <div className="flex flex-col gap-4">
            <h3 className="text-[20px] font-semibold">Personalize o resumo</h3>
            <Field id="b-periodo" label="Período de análise"><SelectBox id="b-periodo" value={period} onChange={setPeriod} options={['1º semestre de 2026', '1º trimestre de 2026', '2º trimestre de 2026']} /></Field>
            <Field id="b-publico" label="Público"><SelectBox id="b-publico" value={audience} onChange={setAudience} options={['Comitê executivo', 'Conselho', 'Diretoria comercial']} /></Field>
            <fieldset className="flex flex-col gap-2">
              <legend className="mb-2 text-sm font-light text-[#A8B0BF]">Incluir no documento</legend>
              <Check4 id="c1" label="Desempenho e metas" checked={inc.perf} onChange={() => toggle('perf')} />
              <Check4 id="c2" label="Cenários e premissas" checked={inc.cen} onChange={() => toggle('cen')} />
              <Check4 id="c3" label="Riscos prioritários" checked={inc.risk} onChange={() => toggle('risk')} />
              <Check4 id="c4" label="Plano de ação" checked={inc.plan} onChange={() => toggle('plan')} />
            </fieldset>
            <div><Badge tone="ok">Dados validados · 08:42</Badge></div>
            <p className="text-sm font-light text-[#A8B0BF]">PDF executivo · {pages} {pages === 1 ? 'página' : 'páginas'} · Fontes e premissas incluídas.</p>
          </div>

          <article className="rounded-lg bg-[#0B0F14] p-4 sm:p-6" aria-label="Prévia do documento">
            <div className="flex items-center justify-between">
              <Logo size={28} textSize={28} />
              <span className="text-sm font-light text-[#A8B0BF]">Prévia · 1/{pages}</span>
            </div>
            <h3 className="font-display mt-6 text-[clamp(32px,5vw,64px)] leading-[.98]">Crescer com <span className="font-sans font-extralight italic text-[#F4B942]">disciplina.</span></h3>
            <p className="mt-2 text-sm font-light text-[#A8B0BF]">{period} / Grupo Alvora</p>

            <div className="mt-6 grid grid-cols-1 gap-4 border-b border-[#232C3B] pb-6 sm:grid-cols-2">
              <div><p className="text-sm font-light text-[#A8B0BF]">Receita líquida</p><p className="font-display text-[32px] leading-none sm:text-[40px]">{K.rec}</p><p className="mt-1 text-sm text-[#18A957]">{K.g}</p></div>
              <div><p className="text-sm font-light text-[#A8B0BF]">Margem EBITDA</p><p className="font-display text-[32px] leading-none sm:text-[40px]">{K.mar}</p><p className="mt-1 text-sm text-[#F4B942]">{K.md}</p></div>
            </div>

            {inc.perf && (<div className={`mt-6 ${sec}`}><h4 className="text-[16px] font-semibold">Desempenho e perspectiva</h4>
              <p className="mt-2 text-sm font-light leading-[1.5] text-[#A8B0BF]">{K.perf}</p></div>)}
            {inc.cen && (<div className={`mt-6 ${sec}`}><h4 className="text-[16px] font-semibold">Cenários e premissas</h4>
              <p className="mt-2 text-sm font-light leading-[1.5] text-[#A8B0BF]">Base: R$ 102,8 mi · 18,4%. {calcState.name}: R$ {fmt(calcState.receita)} mi · {fmt(calcState.margem)}% (reajuste de {fmt(calcState.price)}%).</p></div>)}
            {inc.risk && (<div className={`mt-6 ${sec}`}><Badge tone="gold">Atenção · Margem</Badge>
              <p className="mt-2 text-sm leading-[1.5]">Três contratos do Sudeste concentram 38% do desvio de margem. Revisar condições antes da renovação de julho.</p></div>)}
            {inc.plan && (<div className={`mt-6 ${sec}`}><h4 className="text-[16px] font-semibold text-[#F4B942]">Decisão solicitada ao comitê</h4>
              <p className="mt-2 text-sm font-light leading-[1.5] text-[#A8B0BF]">Aprovar reajuste seletivo de 1,5% (+R$ 0,72 mi) e revisão de frete (+R$ 0,42 mi). Potencial de R$ 1,14 mi para atingir EBITDA de R$ 10,08 mi na base semestral.</p></div>)}
            <p className="mt-6 text-sm font-light leading-[1.5] text-[#A8B0BF]">Fontes: ERP financeiro e CRM · Base: 30 jun 2026. Projeções são estimativas, não garantias de resultado.</p>
          </article>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#232C3B] p-4 sm:p-6">
          <p className="text-sm font-light text-[#A8B0BF]">Uso interno · Revisão humana recomendada</p>
          <div className="flex gap-2">
            <Btn variant="secondary" onClick={onClose}>Cancelar</Btn>
            <Btn variant="primary" icon={Download} loading={busy} onClick={exportPdf}>{busy ? 'Gerando resumo…' : 'Exportar PDF'}</Btn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BriefModal;
