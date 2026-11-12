import React, { useEffect, useRef, useState } from 'react';
import { ArrowUp, Copy, FileText, Loader2, Paperclip, Plus, Sparkles, ThumbsUp } from 'lucide-react';
import { ANS, pick } from './data.js';
import { Badge, Btn, Logo, useTypewriter } from './ui.jsx';

const Answer = ({ a, fresh, onBrief, onToast }) => {
  const [prem, setPrem] = useState(false);
  const [liked, setLiked] = useState(false);
  const [typed, done] = useTypewriter(a.text, fresh, 12);
  const show = `transition-all duration-700 ${done ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`;

  const copy = async () => {
    try { await navigator.clipboard.writeText(`${a.title}\n${a.text}`); onToast('Resposta copiada', 'Texto disponível na área de transferência.'); }
    catch { onToast('Não foi possível copiar', 'Selecione o texto manualmente.'); }
  };

  return (
    <article className="border-t border-[#232C3B] pt-6">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-2 text-[16px] font-medium"><Logo size={20} text={false} /> vertice · Análise concluída</span>
        <Badge tone={a === ANS.fallback ? 'warn' : 'ok'}>Confiança {a === ANS.fallback ? 'baixa' : 'alta'}</Badge>
      </div>
      <h2 className="font-display mt-6 max-w-[860px] text-[clamp(28px,4vw,56px)] leading-[1.02]">{a.title}</h2>
      <p className={`mt-4 max-w-[760px] text-[18px] font-light leading-[1.5] text-[#A8B0BF] ${done ? '' : 'caret'}`}>{typed}</p>

      <div className={`${show} mt-8 grid divide-y divide-[#232C3B] border-y border-[#232C3B] sm:grid-cols-3 sm:divide-x sm:divide-y-0`}>
        {a.metrics.map(([v, l]) => (
          <div key={l} className="py-4 sm:px-6 sm:first:pl-0">
            <p className="font-display text-[clamp(28px,2.6vw,52px)] leading-none">{v}</p>
            <p className="mt-1 text-sm font-light text-[#A8B0BF]">{l}</p>
          </div>
        ))}
      </div>

      {a.levers.length > 0 && (
        <ol className={`${show} mt-8`} style={{ transitionDelay: '150ms' }}>
          {a.levers.map(([k, v, t], i) => (
            <li key={k} className="grid grid-cols-[56px_1fr_auto] items-baseline gap-4 border-b border-[#232C3B] py-4">
              <span className="font-display text-[32px] leading-none text-[#F4B942]">{String(i + 1).padStart(2, '0')}</span>
              <div><p className="text-[20px] font-semibold leading-[1.2]">{k}</p><p className="mt-1 text-sm font-light text-[#A8B0BF]">{t}</p></div>
              <span className="text-[20px] font-semibold text-[#18A957]">{v}</span>
            </li>
          ))}
        </ol>
      )}

      {a.decision && (
        <div className={`${show} mt-8 border-l-2 border-[#F4B942] pl-6`} style={{ transitionDelay: '300ms' }}>
          <p className="text-[16px] font-semibold text-[#F4B942]">Decisão sugerida ao comitê</p>
          <p className="mt-2 max-w-[760px] text-[20px] font-extralight leading-[1.4]">{a.decision}</p>
        </div>
      )}

      <p className={`${show} mt-6 max-w-[760px] text-sm font-light leading-[1.5] text-[#A8B0BF]`}>{a.risk}</p>

      {prem && a.prem.length > 0 && (
        <ul className="mt-4 list-disc pl-6 text-sm font-light text-[#A8B0BF]">{a.prem.map((p) => <li key={p}>{p}</li>)}</ul>
      )}

      <div className={`${show} mt-6 flex flex-wrap items-center gap-2`}>
        <Btn variant="primary" icon={FileText} onClick={onBrief}>Levar ao Executive Brief</Btn>
        <Btn variant="ghost" onClick={() => setPrem(!prem)} aria-expanded={prem}>Ver premissas</Btn>
        <button onClick={copy} aria-label="Copiar resposta" className="flex h-12 w-12 items-center justify-center rounded-lg text-[#A8B0BF] transition-colors hover:bg-[#1A2230] hover:text-[#F7F8FA]"><Copy size={20} /></button>
        <button onClick={() => setLiked(!liked)} aria-pressed={liked} aria-label="Resposta útil" className={`flex h-12 w-12 items-center justify-center rounded-lg transition-colors hover:bg-[#1A2230] ${liked ? 'text-[#F4B942]' : 'text-[#A8B0BF] hover:text-[#F7F8FA]'}`}><ThumbsUp size={20} /></button>
      </div>
    </article>
  );
};

const Copilot = ({ onBrief, onToast }) => {
  const [msgs, setMsgs] = useState([
    { r: 'u', t: 'Como recuperar os R$ 1,14 mi de EBITDA que faltam para a meta sem comprometer o crescimento?' },
    { r: 'a', a: ANS.margem, fresh: false },
  ]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const endRef = useRef(null);
  useEffect(() => { endRef.current?.scrollIntoView({ block: 'end', behavior: 'smooth' }); }, [msgs.length, busy]);

  const send = (text) => {
    const q = (text ?? input).trim();
    if (!q || busy) return;
    setMsgs((m) => [...m, { r: 'u', t: q }]);
    setInput(''); setBusy(true);
    setTimeout(() => { setMsgs((m) => [...m, { r: 'a', a: pick(q), fresh: true }]); setBusy(false); }, 1100);
  };

  return (
    <div className="grid gap-12 xl:grid-cols-[1fr_320px]">
      <div className="min-w-0">
        <header className="flex flex-wrap items-end justify-between gap-6 pb-8">
          <div>
            <h1 className="font-display text-[clamp(40px,6vw,96px)] leading-[.96]">Copiloto estratégico</h1>
            <p className="mt-4 text-[18px] font-light text-[#A8B0BF]">Da pergunta à decisão, com <span className="font-semibold text-[#F7F8FA]">evidências do seu negócio</span>.</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge tone="gold">IA ativa · 3 fontes</Badge>
            <Btn variant="secondary" icon={Plus} onClick={() => setMsgs([])}>Nova análise</Btn>
          </div>
        </header>

        {msgs.length === 0 && (
          <div className="py-16">
            <Sparkles size={32} className="text-[#F4B942]" aria-hidden="true" />
            <p className="font-display mt-4 text-[clamp(32px,4vw,56px)] leading-none">Sua próxima análise começa aqui.</p>
            <p className="mt-2 text-[18px] font-light text-[#A8B0BF]">Pergunte sobre indicadores, cenários ou decisões do 1S26.</p>
          </div>
        )}

        <div className="flex flex-col gap-8" aria-live="polite">
          {msgs.map((m, i) =>
            m.r === 'u' ? (
              <div key={i} className="flex items-start gap-4 animate-[pageIn_.5s_cubic-bezier(.2,.7,.2,1)]">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#232C3B] text-sm font-semibold">MC</span>
                <p className="text-[clamp(20px,2.2vw,28px)] font-extralight italic leading-[1.3]">{m.t}</p>
              </div>
            ) : (
              <Answer key={i} a={m.a} fresh={m.fresh} onBrief={onBrief} onToast={onToast} />
            ),
          )}
          {busy && (
            <div className="flex items-center gap-2 text-[16px]">
              <Loader2 size={16} className="animate-spin text-[#F4B942]" aria-hidden="true" /> Consolidando indicadores…
              <span className="text-sm font-light text-[#A8B0BF]">Validando ERP financeiro e CRM · Etapa 2 de 3</span>
            </div>
          )}
          <div ref={endRef} />
        </div>

        <div className="sticky bottom-20 mt-12 bg-[#0B0F14] pb-4 pt-4 lg:bottom-0">
          <div className="mb-4 flex flex-wrap gap-2">
            {['E se o volume cair 2%?', 'Detalhar os 3 contratos', 'Comparar cenários'].map((c) => (
              <button key={c} onClick={() => send(c)} className="h-12 rounded-lg border border-[#232C3B] bg-[#1A2230] px-4 text-sm font-semibold transition-colors hover:border-[#F4B942]">{c}</button>
            ))}
          </div>
          <div className="rounded-2xl border border-[#232C3B] bg-[#121821] p-4 transition-colors focus-within:border-[#F4B942]">
            <label htmlFor="cp-input" className="sr-only">Pergunta ao copiloto</label>
            <textarea id="cp-input" rows={2} value={input} onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }}
              placeholder="Pergunte sobre indicadores, cenários ou decisões…"
              className="w-full resize-none bg-transparent text-[16px] font-light text-[#F7F8FA] placeholder:text-[#A8B0BF] focus:outline-none" />
            <div className="mt-2 flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm font-light text-[#A8B0BF]"><Paperclip size={16} aria-hidden="true" /> Grupo Alvora · 1S26</span>
              <Btn variant="primary" icon={ArrowUp} onClick={() => send()} disabled={!input.trim() || busy}>Enviar</Btn>
            </div>
          </div>
          <p className="mt-2 text-sm font-light text-[#A8B0BF]">A IA apoia a análise. Decisões e validação final permanecem com a liderança.</p>
        </div>
      </div>

      <aside className="flex flex-col gap-8 xl:border-l xl:border-[#232C3B] xl:pl-8">
        <div>
          <p className="text-[20px] font-semibold">Contexto em uso</p>
          <div className="mt-2"><Badge tone="ok">1S26 · Base validada</Badge></div>
          <p className="mt-4 text-sm font-light leading-[1.5] text-[#A8B0BF]">Organização Grupo Alvora · Cenário selecionado Base · Receita anual R$ 102,8 mi</p>
          <p className="mt-2 text-sm font-light leading-[1.5] text-[#A8B0BF]">Escopo: todas as unidades · Dados até 30 jun 2026</p>
        </div>
        <div>
          <p className="text-[20px] font-semibold">Evidências da análise</p>
          {[['[1] ERP financeiro', 'Receita, EBITDA e frete · Atualizado às 08:42'], ['[2] CRM comercial', 'Contratos e renovações · Atualizado às 08:40'], ['[3] Orçamento 2026', 'Meta e premissas aprovadas · Versão do comitê: jun/26']].map(([t, d]) => (
            <div key={t} className="mt-4 border-t border-[#232C3B] pt-4"><p className="text-sm font-semibold">{t}</p><p className="text-sm font-light text-[#A8B0BF]">{d}</p></div>
          ))}
        </div>
        <div className="border-t border-[#F4B942] pt-4">
          <p className="text-sm font-light text-[#F4B942]">Próxima revisão</p>
          <p className="font-display text-[56px] leading-none">08 jul</p>
          <p className="mt-2 text-[16px] font-semibold">Acompanhar o resultado</p>
          <p className="text-sm font-light leading-[1.5] text-[#A8B0BF]">Comercial + Operações. Revisar elasticidade de preço e validar ganhos de frete antes de aprovar a execução.</p>
        </div>
      </aside>
    </div>
  );
};

export default Copilot;
