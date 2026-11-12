import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ArrowDown, Plus } from 'lucide-react';
import { C, REAL, BASE_H2, calc } from './data.js';
import { Btn, Count, Logo, Marquee, Reveal, Words, useInView, useTypewriter } from './ui.jsx';

/* V facetado com paralaxe 3D (apenas cores da paleta, sem gradientes) */
const Prism = () => {
  const [t, setT] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const m = (e) => setT({ x: e.clientX / window.innerWidth - 0.5, y: e.clientY / window.innerHeight - 0.5 });
    window.addEventListener('mousemove', m);
    return () => window.removeEventListener('mousemove', m);
  }, []);
  return (
    <div aria-hidden="true" className="pointer-events-none absolute right-[-18%] top-[10%] h-[min(80vw,520px)] w-[min(80vw,520px)] opacity-40 sm:right-[-8%] sm:opacity-70 lg:right-[-6%] lg:top-[6%] lg:h-[min(80vh,760px)] lg:w-[min(80vh,760px)] lg:opacity-100" style={{ perspective: 1400 }}>
      <div className="h-full w-full animate-[floatY_9s_ease-in-out_infinite]">
        <div className="relative h-full w-full" style={{ transform: `rotateY(${t.x * 30}deg) rotateX(${-t.y * 22}deg)`, transformStyle: 'preserve-3d', transition: 'transform .5s cubic-bezier(.2,.7,.2,1)' }}>
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" style={{ transform: 'translateZ(-90px) scale(1.06)' }}>
            <polygon points="0,6 36,6 50,30 64,6 100,6 50,100" fill="none" stroke={C.s3} strokeWidth=".35" />
          </svg>
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" style={{ transform: 'translateZ(-40px) scale(1.03)' }}>
            <polygon points="0,6 36,6 50,30 64,6 100,6 50,100" fill={C.s1} />
          </svg>
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
            <polygon points="0,6 36,6 50,30 25,53" fill={C.red} />
            <polygon points="25,53 50,30 50,100" fill={C.danger} />
            <polygon points="50,30 64,6 100,6 74,53" fill={C.danger} />
            <polygon points="50,30 74,53 50,100" fill={C.red} />
            <polygon points="36,6 50,30 64,6" fill={C.bg} />
          </svg>
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" style={{ transform: 'translateZ(60px)' }}>
            <polygon points="46,58 50,66 54,58" fill={C.gold} />
          </svg>
        </div>
      </div>
    </div>
  );
};

const KPIS = [
  ['R$ 48,6 mi', 'receita líquida'], ['96,4%', 'da meta atingida'], ['−1,6 p.p.', 'margem vs. meta'],
  ['38%', 'do desvio em 3 contratos'], ['+12,5%', 'vs. 1S25'], ['R$ 1,14 mi', 'de EBITDA a recompor'],
];

/* ---------- História ancorada: o número muda conforme a leitura avança ---------- */
const STEPS = [
  { v: 48.6, p: 'R$ ', s: ' mi', t: ['A receita avançou ', '12,5%', ' e chegou a R$ 48,6 mi.'] },
  { v: 18.4, p: '', s: '%', t: ['Mas a margem recuou de 19,6% para ', '18,4%', '. Frete e mix no Sudeste explicam 38% do desvio.'] },
  { v: 108.6, p: 'R$ ', s: ' mi', t: ['Um reajuste seletivo de ', '1,5%', ' projeta receita anual de R$ 108,6 mi e margem de 19,1%.'] },
];

const X = (i) => 24 + i * 52;
const Y = (v) => 236 - ((v - 6) / (12 - 6)) * 200;
const path = (arr, from = 0) => arr.map((v, i) => `${i === 0 ? 'M' : 'L'}${X(i + from)},${Y(v)}`).join(' ');

const Story = () => {
  const [step, setStep] = useState(0);
  const [ref, inView] = useInView(0.1);
  const els = useRef([]);
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) setStep(Number(e.target.dataset.i));
    }), { rootMargin: window.innerWidth < 1024 ? '-62% 0px -28% 0px' : '-45% 0px -45% 0px' });
    els.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);
  const scen = BASE_H2.map((v) => +(v * ((54.2 + (calc(1.5).receita - 102.8)) / 54.2)).toFixed(2));
  const L = 520;
  return (
    <section id="sinal" ref={ref} className="mx-auto grid max-w-[1440px] gap-8 px-6 lg:grid-cols-2 lg:px-12">
      <div className="sticky top-20 z-10 self-start border-b border-[#232C3B] bg-[#0B0F14] pb-4 pt-2 lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:self-auto lg:border-0 lg:pb-0 lg:pt-0">
        <div className="font-display text-[clamp(56px,11vw,176px)] leading-[.9] text-[#F7F8FA]">
          <Count to={STEPS[step].v} d={1} prefix={STEPS[step].p} suffix={STEPS[step].s} duration={900} />
        </div>
        <svg viewBox="0 0 640 260" className="mt-2 max-h-[150px] w-full sm:max-h-[200px] lg:mt-8 lg:max-h-none" role="img" aria-label="Receita mensal: realizado, base e cenário com reajuste de 1,5%">
          {[6, 8, 10, 12].map((g) => (
            <g key={g}>
              <line x1="24" x2="636" y1={Y(g)} y2={Y(g)} stroke={C.s3} strokeWidth="1" />
              <text x="0" y={Y(g) + 4} fill={C.t2} fontSize="12">{g}</text>
            </g>
          ))}
          <path d={path(REAL)} fill="none" stroke={C.gold} strokeWidth="3" strokeDasharray={L} strokeDashoffset={inView ? 0 : L} style={{ transition: 'stroke-dashoffset 1.8s cubic-bezier(.2,.7,.2,1)' }} />
          {REAL.map((v, i) => <circle key={i} cx={X(i)} cy={Y(v)} r="4" fill={C.gold} style={{ opacity: inView ? 1 : 0, transition: `opacity .4s ${0.2 + i * 0.25}s` }} />)}
          <path d={path([REAL[5], ...BASE_H2], 5)} fill="none" stroke={C.t2} strokeWidth="2" strokeDasharray={L} strokeDashoffset={step >= 2 ? 0 : L} style={{ transition: 'stroke-dashoffset 1.4s cubic-bezier(.2,.7,.2,1)' }} />
          <path d={path([REAL[5], ...scen], 5)} fill="none" stroke={C.gold} strokeWidth="3" strokeDasharray="8 6" style={{ opacity: step >= 2 ? 1 : 0, transition: 'opacity 1s .5s' }} />
          <text x="24" y="256" fill={C.t2} fontSize="12">Jan</text>
          <text x="284" y="256" fill={C.t2} fontSize="12">Jun</text>
          <text x="596" y="256" fill={C.t2} fontSize="12">Dez</text>
        </svg>
        <div className="mt-2 h-8 lg:mt-4 lg:h-12">
          <div className="flex items-center gap-4 transition-opacity duration-700" style={{ opacity: step === 1 ? 1 : 0 }} aria-hidden={step !== 1}>
            <div className="h-2 flex-1 rounded bg-[#1A2230]">
              <div className="h-2 rounded bg-[#A8B0BF] transition-all duration-1000" style={{ width: step === 1 ? '100%' : '0%' }} />
            </div>
            <span className="text-sm font-light text-[#A8B0BF]">19,6% → 18,4%</span>
          </div>
        </div>
      </div>

      <div>
        {STEPS.map((s, i) => (
          <div key={i} ref={(el) => { els.current[i] = el; }} data-i={i} className="flex min-h-[42vh] items-center lg:min-h-[90vh]">
            <p className={`text-[clamp(28px,3.2vw,48px)] font-extralight leading-[1.15] transition-opacity duration-700 ${step === i ? 'opacity-100' : 'opacity-25'}`}>
              {s.t[0]}<span className="font-semibold text-[#F4B942]">{s.t[1]}</span>{s.t[2]}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

const Principle = ({ t, d, open, onOpen }) => (
  <li className="border-t border-[#232C3B]" onMouseEnter={onOpen}>
    <button onClick={onOpen} onFocus={onOpen} aria-expanded={open} className="group flex w-full items-center justify-between gap-4 py-6 text-left">
      <span className={`font-display text-[clamp(32px,5vw,72px)] leading-none transition-all duration-500 ${open ? 'translate-x-4 text-[#F4B942]' : 'text-[#F7F8FA]'}`}>{t}</span>
      <Plus size={32} aria-hidden="true" className={`shrink-0 transition-transform duration-500 ${open ? 'rotate-45 text-[#F4B942]' : 'text-[#A8B0BF]'}`} />
    </button>
    <div className={`grid transition-all duration-500 ${open ? 'grid-rows-[1fr] pb-6' : 'grid-rows-[0fr]'}`}>
      <p className="overflow-hidden pl-4 text-[18px] font-light text-[#A8B0BF] md:max-w-[640px]">{d}</p>
    </div>
  </li>
);

const PR = [
  ['Personalidade com método', 'Assinatura memorável, recortes próprios e variação de composição. Sem mascote, sem ruído.'],
  ['Maturidade corporativa', 'Hierarquia assimétrica, leitura imediata e densidade controlada. A informação vem antes do efeito.'],
  ['Linguagem reconhecível', 'Vertice geométrico, títulos assertivos e linhas finas. Interface silenciosa; decisões em destaque.'],
  ['Evidência, não decoração', 'Nenhum número sem unidade, período ou comparação. Cor nunca é o único sinal.'],
];

const Landing = ({ onEnter, onEnterCopilot }) => {
  const [prog, setProg] = useState(0);
  const [open, setOpen] = useState(0);
  const [cref, cin] = useInView(0.3);
  const ans = 'Há espaço para recuperar a margem sem um reajuste generalizado. Preço seletivo e frete somam R$ 1,14 mi, preservando as contas de expansão.';
  const [typed, done] = useTypewriter(ans, cin, 22);

  useEffect(() => {
    const f = () => setProg(window.scrollY / (document.body.scrollHeight - window.innerHeight));
    window.addEventListener('scroll', f, { passive: true });
    return () => window.removeEventListener('scroll', f);
  }, []);

  return (
    <div className="bg-[#0B0F14]">
      <div className="fixed left-0 top-0 z-50 h-[2px] bg-[#D62828]" style={{ width: `${prog * 100}%` }} aria-hidden="true" />

      <header className="fixed left-1/2 top-4 z-40 flex h-16 w-[min(960px,calc(100%-32px))] -translate-x-1/2 items-center justify-between rounded-lg border border-[#232C3B] bg-[#121821] px-4">
        <Logo size={28} textSize={28} />
        <nav aria-label="Principal" className="hidden items-center gap-8 md:flex">
          {[['Plataforma', '#sinal'], ['Copiloto', '#copiloto'], ['Princípios', '#principios']].map(([l, h]) => (
            <a key={l} href={h} className="text-sm font-light text-[#A8B0BF] transition-colors hover:text-[#F7F8FA]">{l}</a>
          ))}
        </nav>
        <Btn variant="primary" onClick={onEnter}><span className="hidden sm:inline">Acessar demonstração</span><span className="sm:hidden">Demonstração</span></Btn>
      </header>

      <main>
        {/* HERO */}
        <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden px-6 pb-16 pt-32 lg:px-12">
          <Prism />
          <div className="relative z-10 mx-auto w-full max-w-[1440px]">
            <h1 aria-label="Clareza no presente. Vantagem no próximo passo." className="text-[clamp(40px,9.6vw,156px)] leading-[.94] tracking-[-0.03em]">
              <Words immediate parts={[['Clareza', 'font-display'], ['no presente.', 'font-sans font-extralight']]} />
              <Words immediate delay={280} parts={[['Vantagem', 'font-display'], ['no', 'font-sans font-extralight'], ['próximo passo.', 'font-sans font-extralight italic text-[#F4B942]']]} />
            </h1>
            <div className="mt-12 flex flex-wrap items-end justify-between gap-8">
              <Reveal delay={900} className="max-w-[460px]">
                <p className="text-[18px] font-light leading-[1.5] text-[#A8B0BF]">
                  Simule a elasticidade de ocupação e preço, acompanhe a expansão e leve ao comitê uma decisão <span className="font-semibold text-[#F7F8FA]">com evidências</span>.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Btn variant="primary" icon={ArrowUpRight} onClick={onEnter}>Entrar na plataforma</Btn>
                  <Btn variant="outline" onClick={onEnterCopilot}>Ver o copiloto</Btn>
                </div>
              </Reveal>
              <a href="#sinal" aria-label="Rolar para a próxima seção" className="hidden h-12 w-12 items-center justify-center rounded-lg border border-[#232C3B] text-[#A8B0BF] transition-colors hover:border-[#F4B942] hover:text-[#F4B942] md:flex">
                <ArrowDown size={20} className="animate-bounce" />
              </a>
            </div>
          </div>
        </section>

        <Marquee className="border-y border-[#232C3B] py-6">
          {KPIS.map(([v, l]) => (
            <span key={l} className="flex items-baseline gap-4 pr-16">
              <span className="font-display text-[32px] leading-none text-[#F7F8FA] md:text-[48px]">{v}</span>
              <span className="text-[16px] font-light text-[#A8B0BF]">{l}</span>
              <span className="pl-12 text-[#D62828]" aria-hidden="true">◆</span>
            </span>
          ))}
        </Marquee>

        <div className="py-8 lg:py-16"><Story /></div>

        {/* COPILOTO */}
        <section id="copiloto" ref={cref} className="mx-4 grid gap-12 rounded-2xl rounded-br-[32px] bg-[#F4B942] p-6 text-[#0B0F14] md:mx-6 lg:rounded-br-[64px] lg:mx-12 lg:grid-cols-2 lg:p-16">
          <div className="flex flex-col justify-between gap-8">
            <h2 className="text-[clamp(44px,9vw,148px)] leading-[.9]">
              <Words parts={[['Pergunte.', 'font-display']]} />
              <Words delay={200} parts={[['Decida.', 'font-sans font-extralight italic']]} />
            </h2>
            <div>
              <p className="max-w-[420px] text-[18px] font-normal leading-[1.5]">
                O copiloto responde com fontes, premissas e confiança explícitas. A decisão final permanece com a liderança.
              </p>
              <div className="mt-8"><Btn variant="dark" icon={ArrowUpRight} onClick={onEnterCopilot}>Experimentar o copiloto</Btn></div>
            </div>
          </div>
          <div className="flex flex-col gap-4 self-end">
            <div className="max-w-[420px] self-end rounded-lg bg-[#0B0F14] p-4 text-[#F7F8FA]">
              <p className="text-[16px] font-light">Como recuperar os R$ 1,14 mi de EBITDA sem comprometer o crescimento?</p>
            </div>
            <div className="min-h-[160px] lg:min-h-[200px]">
              <p className={`text-[clamp(20px,2.2vw,32px)] font-medium leading-[1.25] ${done ? '' : 'caret'}`}>{typed}</p>
            </div>
            <div className={`grid grid-cols-1 gap-4 border-t border-[#0B0F14] sm:grid-cols-3 pt-4 transition-all duration-700 ${done ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              {[['+R$ 0,72 mi', 'preço'], ['+R$ 0,42 mi', 'frete'], ['R$ 1,14 mi', 'combinado']].map(([v, l]) => (
                <div key={l}><p className="font-display text-[clamp(24px,2.6vw,40px)] leading-none">{v}</p><p className="mt-1 text-sm font-normal">{l}</p></div>
              ))}
            </div>
          </div>
        </section>

        {/* PRINCÍPIOS */}
        <section id="principios" className="mx-auto max-w-[1440px] px-6 py-8 lg:px-12 lg:py-16">
          <Reveal>
            <h2 className="mb-12 max-w-[900px] text-[clamp(32px,4.4vw,64px)] leading-[1.05]">
              <span className="font-display">Menos ruído.</span> <span className="font-extralight italic text-[#A8B0BF]">Mais direção.</span>
            </h2>
          </Reveal>
          <ul className="border-b border-[#232C3B]">
            {PR.map(([t, d], i) => <Principle key={t} t={t} d={d} open={open === i} onOpen={() => setOpen(i)} />)}
          </ul>
        </section>
      </main>

      <footer className="overflow-hidden border-t border-[#232C3B]">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-4 px-6 py-6 text-sm font-light text-[#A8B0BF] lg:px-12">
          <span>vertice · Inteligência para decidir.</span>
          <button onClick={onEnter} className="inline-flex items-center gap-2 font-medium text-[#F7F8FA] hover:text-[#F4B942]">Acessar a plataforma <ArrowUpRight size={16} /></button>
          <span>Produto executivo / Especificação 1.0</span>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
