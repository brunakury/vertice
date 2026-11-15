import React, { useRef, useState } from 'react';
import { LayoutGrid, Target, GitBranch, Shield, Sparkles, FileText, Search, Bell, ArrowUpRight } from 'lucide-react';
import { calc } from './data.js';
import { Badge, Logo, Toast, VMark } from './ui.jsx';
import Landing from './Landing.jsx';
import Overview from './Overview.jsx';
import { Planning, Scenarios, Risks, Reports } from './Pages.jsx';
import Copilot from './Copilot.jsx';
import BriefModal from './BriefModal.jsx';

const NAV = [
  { id: 'visao', label: 'Visão executiva', icon: LayoutGrid },
  { id: 'planejamento', label: 'Planejamento', icon: Target },
  { id: 'cenarios', label: 'Cenários', icon: GitBranch },
  { id: 'riscos', label: 'Riscos', icon: Shield },
  { id: 'copiloto', label: 'Copiloto estratégico', icon: Sparkles },
  { id: 'relatorios', label: 'Relatórios', icon: FileText },
];

/* Trilho lateral: 72px em repouso, 224px ao passar o cursor ou focar */
const Rail = ({ page, goto, onLogo, onToast }) => (
  <>
    <aside aria-label="Navegação lateral" className="group fixed inset-y-0 left-0 z-30 hidden w-[72px] flex-col overflow-hidden border-r border-[#232C3B] bg-[#121821] p-4 transition-[width] duration-500 ease-[cubic-bezier(.2,.7,.2,1)] focus-within:w-56 hover:w-56 lg:flex">
      <button onClick={onLogo} aria-label="Voltar ao site vertice" className="flex h-12 items-center gap-2 whitespace-nowrap">
        <span className="flex h-12 w-10 shrink-0 items-center justify-center"><VMark size={28} /></span>
        <span className="font-display text-[28px] leading-none opacity-0 transition-opacity duration-500 group-focus-within:opacity-100 group-hover:opacity-100">vertice</span>
      </button>

      <button onClick={() => onToast('Contexto ativo', 'Grupo Alvora · Comitê executivo · 1S26')} className="mt-4 flex h-0 flex-col items-start justify-center overflow-hidden whitespace-nowrap rounded-lg bg-[#1A2230] px-2 text-left opacity-0 transition-all duration-500 group-focus-within:h-16 group-focus-within:opacity-100 group-hover:h-16 group-hover:opacity-100">
        <span className="text-sm font-semibold">Grupo Alvora</span>
        <span className="flex items-center gap-1 text-sm font-light text-[#A8B0BF]">Comitê executivo <ArrowUpRight size={12} aria-hidden="true" /></span>
      </button>

      <nav aria-label="Estratégia" className="mt-6 flex flex-col gap-1">
        {NAV.map(({ id, label, icon: Icon }) => {
          const on = page === id;
          return (
            <button key={id} onClick={() => goto(id)} aria-current={on ? 'page' : undefined} aria-label={label}
              className={`flex h-12 items-center gap-2 whitespace-nowrap rounded-lg border-l-2 text-sm transition-colors ${on ? 'border-[#D62828] bg-[#1A2230] font-semibold text-[#F7F8FA]' : 'border-transparent font-normal text-[#A8B0BF] hover:bg-[#1A2230] hover:text-[#F7F8FA]'}`}>
              <span className="flex h-12 w-9 shrink-0 items-center justify-center"><Icon size={20} aria-hidden="true" /></span>
              <span className="opacity-0 transition-opacity duration-500 group-focus-within:opacity-100 group-hover:opacity-100">{label}</span>
            </button>
          );
        })}
      </nav>

      <div className="mt-auto flex flex-col gap-2 whitespace-nowrap">
        <div className="flex h-0 flex-col gap-1 overflow-hidden opacity-0 transition-all duration-500 group-focus-within:h-32 group-focus-within:opacity-100 group-hover:h-32 group-hover:opacity-100">
          <div><Badge tone="ok">Dados atualizados</Badge></div>
          <div className="text-sm font-light leading-[1.4] text-[#A8B0BF]">
            <p>ERP + CRM integrados</p>
            <p>Última carga: 08:42</p>
          </div>
          <div className="flex gap-4 text-sm font-light text-[#A8B0BF]">
            <button onClick={() => onToast('Configurações', 'Preferências da organização em breve.')} className="hover:text-[#F7F8FA]">Configurações</button>
            <button onClick={() => onToast('Central de ajuda', 'Guia do Executive Brief e do copiloto.')} className="hover:text-[#F7F8FA]">Ajuda</button>
          </div>
        </div>
        <div className="flex h-12 items-center gap-2">
          <span className="flex h-8 w-10 shrink-0 items-center justify-center"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#232C3B] text-sm font-semibold">MC</span></span>
          <span className="opacity-0 transition-opacity duration-500 group-focus-within:opacity-100 group-hover:opacity-100">
            <span className="block text-sm font-semibold">Marina Costa</span>
            <span className="block text-sm font-light text-[#A8B0BF]">Diretora de estratégia</span>
          </span>
        </div>
      </div>
    </aside>

    <nav aria-label="Navegação principal" className="fixed inset-x-0 bottom-0 z-30 flex border-t border-[#232C3B] bg-[#121821] pb-[env(safe-area-inset-bottom)] lg:hidden">
      {NAV.map(({ id, label, icon: Icon }) => (
        <button key={id} onClick={() => goto(id)} aria-label={label} aria-current={page === id ? 'page' : undefined}
          className={`flex h-16 flex-1 items-center justify-center border-t-2 ${page === id ? 'border-[#D62828] text-[#F7F8FA]' : 'border-transparent text-[#A8B0BF]'}`}>
          <Icon size={20} />
        </button>
      ))}
    </nav>
  </>
);

const Topbar = ({ page, goto, onToast }) => {
  const [q, setQ] = useState('');
  const [bell, setBell] = useState(false);
  const label = NAV.find((n) => n.id === page)?.label;
  const search = (e) => {
    e.preventDefault();
    const s = q.trim().toLowerCase();
    if (!s) return;
    const hit = NAV.find((n) => n.label.toLowerCase().includes(s));
    if (hit) { goto(hit.id); setQ(''); } else onToast('Nenhum resultado', `Não encontramos “${q}” na vertice.`);
  };
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-2 border-b border-[#232C3B] bg-[#0B0F14] px-4 sm:gap-4 sm:px-6 lg:px-12">
      <nav aria-label="Trilha de contexto" className="flex min-w-0 items-center gap-2 text-sm font-light text-[#A8B0BF]">
        <span className="hidden sm:inline">Grupo Alvora</span><span className="hidden sm:inline">/</span><span className="truncate font-medium text-[#F7F8FA]">{label}</span>
      </nav>
      <div className="relative flex shrink-0 items-center gap-2">
        <form onSubmit={search} role="search" className="relative shrink-0">
          <label htmlFor="busca" className="sr-only">Buscar na vertice</label>
          <input id="busca" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar na vertice"
            className="h-12 w-28 rounded-lg border border-[#232C3B] bg-[#121821] px-4 pr-8 text-sm font-light text-[#F7F8FA] transition-all duration-500 placeholder:text-[#A8B0BF] focus:w-44 focus:border-[#F4B942] sm:w-36 sm:focus:w-72" />
          <button type="submit" aria-label="Buscar" className="absolute right-0 top-0 flex h-12 w-12 items-center justify-center text-[#A8B0BF] hover:text-[#F7F8FA]"><Search size={20} /></button>
        </form>
        <button onClick={() => setBell(!bell)} aria-label="Notificações" aria-expanded={bell} className="flex h-12 w-12 items-center justify-center rounded-lg text-[#A8B0BF] transition-colors hover:bg-[#1A2230] hover:text-[#F7F8FA]"><Bell size={20} /></button>
        {bell && (
          <div className="absolute right-0 top-14 w-[min(320px,calc(100vw-32px))] animate-[pageIn_.4s_cubic-bezier(.2,.7,.2,1)] rounded-lg border border-[#232C3B] bg-[#1A2230] p-4">
            <p className="text-sm font-semibold">Notificações</p>
            <p className="mt-2 text-sm font-light text-[#A8B0BF]">• Carga ERP + CRM validada às 08:42.</p>
            <p className="mt-2 text-sm font-light text-[#A8B0BF]">• Renovações do Sudeste em julho: revisar condições.</p>
          </div>
        )}
      </div>
    </header>
  );
};

export default function App() {
  const [view, setView] = useState('landing');
  const [page, setPage] = useState('visao');
  const [brief, setBrief] = useState(null);
  const [toast, setToast] = useState(null);
  const [sim, setSim] = useState({ name: 'Expansão disciplinada', price: 1.5, unit: 'Todas as unidades' });
  const [saved, setSaved] = useState([]);
  const [selected, setSelected] = useState('base');
  const timer = useRef(null);

  const notify = (title, msg) => {
    setToast({ title, msg });
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(null), 4000);
  };
  const openBrief = (initial) => setBrief(initial || {});
  const goto = (id) => { setPage(id); window.scrollTo({ top: 0 }); };
  const enter = (id = 'visao') => { setView('app'); goto(id); };

  const saveScenario = () => {
    const r = calc(sim.price);
    setSaved((s) => [...s, { id: `s${Date.now()}`, name: sim.name || 'Cenário sem nome', price: sim.price, receita: r.receita, margem: r.margem }]);
    notify('Cenário salvo', `${sim.name} · Agora disponível para revisão.`);
  };
  const r = calc(sim.price);
  const calcState = { name: sim.name, price: sim.price, receita: r.receita, margem: r.margem };

  if (view === 'landing') return <Landing onEnter={() => enter('visao')} onEnterCopilot={() => enter('copiloto')} />;

  return (
    <div className="min-h-screen bg-[#0B0F14] text-[#F7F8FA]">
      <Rail page={page} goto={goto} onLogo={() => { setView('landing'); window.scrollTo({ top: 0 }); }} onToast={notify} />
      <div className="pb-24 lg:ml-[72px] lg:pb-0">
        <Topbar page={page} goto={goto} onToast={notify} />
        <main className="mx-auto w-full max-w-[1440px] px-4 py-8 sm:px-6 lg:px-12">
          <div key={page} className="animate-[pageIn_.7s_cubic-bezier(.2,.7,.2,1)]">
            {page === 'visao' && <Overview sim={sim} setSim={setSim} onBrief={openBrief} goto={goto} saveScenario={saveScenario} />}
            {page === 'planejamento' && <Planning goto={goto} />}
            {page === 'cenarios' && <Scenarios sim={sim} saved={saved} setSaved={setSaved} selected={selected} setSelected={setSelected} goto={goto} />}
            {page === 'riscos' && <Risks />}
            {page === 'copiloto' && <Copilot onBrief={openBrief} onToast={notify} />}
            {page === 'relatorios' && <Reports onBrief={openBrief} />}
          </div>
        </main>
      </div>
      {brief && (
        <BriefModal initial={brief} calcState={calcState} onClose={() => setBrief(null)}
          onExported={(pages) => { setBrief(null); notify('Resumo exportado com sucesso', `Executive Brief · 1S26 · PDF de ${pages} ${pages === 1 ? 'página' : 'páginas'} pronto para compartilhar com o comitê.`); }} />
      )}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
