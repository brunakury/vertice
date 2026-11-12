import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import { ChevronDown, Loader2, X, CircleCheck } from 'lucide-react';
import { C, fmt } from './data.js';

/* ============================ HOOKS ============================ */
const reduced = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

export const useInView = (threshold = 0.2) => {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setOn(true); io.disconnect(); }
    }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, on];
};

export const useCountUp = (target, { duration = 1400, active = true } = {}) => {
  const [v, setV] = useState(0);
  const cur = useRef(0);
  useEffect(() => {
    if (!active) return undefined;
    if (reduced()) { cur.current = target; setV(target); return undefined; }
    const from = cur.current;
    const t0 = performance.now();
    let raf;
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / duration);
      const e = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      cur.current = from + (target - from) * e;
      setV(cur.current);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active, duration]);
  return v;
};

export const useTypewriter = (text, active = true, speed = 16) => {
  const [n, setN] = useState(active ? 0 : text.length);
  useEffect(() => {
    if (!active) { setN(text.length); return undefined; }
    setN(0);
    let i = 0;
    const id = setInterval(() => {
      i += 2;
      setN(Math.min(i, text.length));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, active, speed]);
  return [text.slice(0, n), n >= text.length];
};

/* ============================ MOTION ============================ */
export const Reveal = ({ children, delay = 0, className = '', as: Tag = 'div', ...p }) => {
  const [ref, on] = useInView(0.15);
  return (
    <Tag ref={ref} style={{ transitionDelay: `${delay}ms` }} className={`rv ${on ? 'in' : ''} ${className}`} {...p}>
      {children}
    </Tag>
  );
};

/* parts: [[texto, classes], ...] — cada palavra sobe de uma máscara */
export const Words = ({ parts, className = '', delay = 0, immediate = false }) => {
  const [ref, seen] = useInView(0.15);
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 80); return () => clearTimeout(t); }, []);
  const on = immediate ? mounted : seen;
  let k = 0;
  return (
    <span ref={ref} className={`block ${on ? 'in' : ''} ${className}`}>
      {parts.flatMap(([text, cls = ''], pi) =>
        text.trim().split(/\s+/).map((w) => {
          const i = k++;
          return (
            <span key={`${pi}-${i}`} className={`mask ${cls}`} aria-hidden="true">
              <span style={{ transitionDelay: `${delay + i * 70}ms` }}>{w}</span>
            </span>
          );
        }),
      )}
    </span>
  );
};

export const Count = ({ to, d = 1, prefix = '', suffix = '', duration = 1400, className = '' }) => {
  const [ref, on] = useInView(0.2);
  const v = useCountUp(to, { active: on, duration });
  return <span ref={ref} className={className}>{prefix}{fmt(v, d)}{suffix}</span>;
};

export const Marquee = ({ children, className = '' }) => (
  <div className={`marquee overflow-hidden ${className}`}>
    <div className="track flex w-max animate-[marquee_48s_linear_infinite]">
      <div className="flex shrink-0 items-center">{children}</div>
      <div className="flex shrink-0 items-center" aria-hidden="true">{children}</div>
    </div>
  </div>
);

/* ============================ MARCA ============================ */
export const VMark = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
    <polygon points="0,6 36,6 50,30 64,6 100,6 50,100" fill={C.red} />
  </svg>
);

export const Logo = ({ size = 32, text = true, textSize = 28 }) => (
  <span className="inline-flex items-center gap-2">
    <VMark size={size} />
    {text && <span className="font-display leading-none text-[#F7F8FA]" style={{ fontSize: textSize }}>vertice</span>}
  </span>
);

/* ============================ CONTROLES ============================ */
const BTN = {
  primary: 'bg-[#D62828] text-[#F7F8FA] border border-[#D62828] hover:brightness-110',
  secondary: 'bg-[#1A2230] text-[#F7F8FA] border border-[#232C3B] hover:border-[#A8B0BF]',
  ghost: 'bg-transparent text-[#F7F8FA] border border-transparent hover:bg-[#1A2230]',
  danger: 'bg-[#E5484D] text-[#F7F8FA] border border-[#E5484D] hover:brightness-110',
  outline: 'bg-transparent text-[#F7F8FA] border border-[#A8B0BF] hover:bg-[#F7F8FA] hover:text-[#0B0F14]',
  dark: 'bg-[#0B0F14] text-[#F7F8FA] border border-[#0B0F14] hover:bg-[#121821]',
};

export const Btn = ({ variant = 'secondary', icon: Icon, children, className = '', loading, ...p }) => (
  <button
    {...p}
    disabled={loading || p.disabled}
    className={`group inline-flex h-12 items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold transition-all duration-300 active:scale-[.97] disabled:cursor-not-allowed disabled:opacity-90 ${BTN[variant]} ${className}`}
  >
    {loading ? <Loader2 size={16} className="animate-spin" aria-hidden="true" /> : Icon && <Icon size={16} className="transition-transform duration-300 group-hover:translate-x-[2px]" aria-hidden="true" />}
    {children}
  </button>
);

const TONES = { ok: 'text-[#18A957]', warn: 'text-[#FFB020]', danger: 'text-[#E5484D]', gold: 'text-[#F4B942]', neutral: 'text-[#A8B0BF]' };
export const tone = (t) => TONES[t];

export const Badge = ({ tone: t = 'gold', children, className = '' }) => (
  <span className={`inline-flex items-center gap-2 rounded bg-[#1A2230] px-2 py-1 text-sm font-medium ${TONES[t]} ${className}`}>
    <span aria-hidden="true">•</span>{children}
  </span>
);

export const Field = ({ id, label, children }) => (
  <div className="flex flex-col gap-2">
    <label htmlFor={id} className="text-sm font-medium text-[#F7F8FA]">{label}</label>
    {children}
  </div>
);

export const SelectBox = ({ id, value, onChange, options, className = '' }) => (
  <div className={`relative ${className}`}>
    <select
      id={id} value={value} onChange={(e) => onChange(e.target.value)}
      className="h-12 w-full appearance-none rounded-lg border border-[#232C3B] bg-[#0B0F14] px-4 pr-8 text-sm text-[#F7F8FA] transition-colors hover:border-[#A8B0BF] focus:border-[#F4B942]"
    >
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
    <ChevronDown size={16} aria-hidden="true" className="pointer-events-none absolute right-4 top-4 text-[#A8B0BF]" />
  </div>
);

export const Tabs = ({ tabs, value, onChange }) => {
  const refs = useRef({});
  const [ind, setInd] = useState({ l: 0, w: 0 });
  useLayoutEffect(() => {
    const el = refs.current[value];
    if (el) setInd({ l: el.offsetLeft, w: el.offsetWidth });
  }, [value]);
  return (
    <div role="tablist" aria-label="Seções da visão" className="relative flex gap-8 overflow-x-auto border-b border-[#232C3B]">
      {tabs.map((t) => (
        <button
          key={t} ref={(el) => { refs.current[t] = el; }} role="tab" aria-selected={value === t} onClick={() => onChange(t)}
          className={`h-12 whitespace-nowrap text-[16px] transition-colors ${value === t ? 'font-semibold text-[#F7F8FA]' : 'font-light text-[#A8B0BF] hover:text-[#F7F8FA]'}`}
        >{t}</button>
      ))}
      <span aria-hidden="true" className="absolute bottom-0 h-[2px] bg-[#D62828] transition-all duration-500 ease-[cubic-bezier(.2,.7,.2,1)]" style={{ left: ind.l, width: ind.w }} />
    </div>
  );
};

export const Ring = ({ value = 96.4, size = 112, textClass = 'text-[24px]' }) => (
  <div className="relative shrink-0" style={{ width: size, height: size }} role="img" aria-label={`Atingimento de ${fmt(value)}%`}>
    <PieChart width={size} height={size}>
      <Pie data={[{ v: value }, { v: 100 - value }]} dataKey="v" startAngle={90} endAngle={-270} innerRadius={size / 2 - 6} outerRadius={size / 2 - 1} stroke="none" animationDuration={1600}>
        <Cell fill={C.gold} /><Cell fill={C.s3} />
      </Pie>
    </PieChart>
    <span className={`font-display absolute inset-0 flex items-center justify-center text-[#F7F8FA] ${textClass}`}>{fmt(value)}%</span>
  </div>
);

export const Toast = ({ toast, onClose }) =>
  toast ? (
    <div role="status" aria-live="polite" className="fixed bottom-24 left-4 right-4 z-[60] flex sm:left-auto sm:right-6 sm:max-w-[420px] animate-[toastIn_.5s_cubic-bezier(.2,.7,.2,1)] items-start gap-4 rounded-lg border border-[#232C3B] bg-[#1A2230] p-4 lg:bottom-6">
      <CircleCheck size={20} className="mt-1 shrink-0 text-[#18A957]" aria-hidden="true" />
      <div className="flex-1">
        <p className="text-[16px] font-semibold">{toast.title}</p>
        <p className="text-sm font-light text-[#A8B0BF]">{toast.msg}</p>
      </div>
      <button onClick={onClose} aria-label="Fechar notificação" className="text-[#A8B0BF] hover:text-[#F7F8FA]"><X size={16} /></button>
    </div>
  ) : null;
