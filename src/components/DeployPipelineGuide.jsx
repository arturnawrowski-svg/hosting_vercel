import React, { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  GitBranch as Github,
  Server,
  Globe,
  Shield,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  RotateCcw,
  ExternalLink,
  Check,
  Sparkles,
  HelpCircle,
  X,
  ChevronDown,
  Copy,
  Terminal as TerminalIcon,
  Link2,
  Lightbulb,
  Clock,
  Settings,
  MousePointerClick,
  Lock,
  Zap,
  BookOpen,
  Rocket,
  Sun,
  Moon,
  Download,
} from 'lucide-react';

import {
  BrowserFrame, Terminal,
  GithubRepoMockup, VercelAddNewMockup, VercelFrameworkMockup, VercelDeployedMockup,
  CloudflareNSMockup, CloudflareDNSMockup, ProxyToggleMockup, VercelDomainsMockup,
  CloudflareSettingsMockup,
} from './Mockups';

import { getT } from '../translations';

/* ── Static structure (language-independent) ── */
const PHASE_IDS = ['github', 'vercel', 'cloudflare', 'link'];
const PHASE_STEP_COUNTS = [3, 5, 4, 5];
const PHASE_ICONS = [Github, Server, Globe, Shield];
const PHASE_NUMBERS = ['01', '02', '03', '04'];

const ALL_STEP_KEYS = PHASE_IDS.flatMap((id, pi) =>
  Array.from({ length: PHASE_STEP_COUNTS[pi] }, (_, i) => `${id}-${i}`)
);

/* ── Build translated data from t ── */
function buildPhases(t) {
  return t.phases.map((ph, i) => ({
    id: PHASE_IDS[i],
    number: PHASE_NUMBERS[i],
    platform: ph.platform,
    description: ph.description,
    icon: PHASE_ICONS[i],
    badge: ph.badge,
    steps: ph.steps,
  }));
}

function buildStepMeta(t) {
  const sm = t.stepMeta;
  return {
    'github-0':     { Icon: MousePointerClick, color: 'text-blue-400',    bg: 'bg-blue-400/10',    label: sm.browser },
    'github-1':     { Icon: TerminalIcon,      color: 'text-emerald-400', bg: 'bg-emerald-400/10', label: sm.terminal },
    'github-2':     { Icon: TerminalIcon,      color: 'text-emerald-400', bg: 'bg-emerald-400/10', label: sm.terminal },
    'vercel-0':     { Icon: MousePointerClick, color: 'text-blue-400',    bg: 'bg-blue-400/10',    label: sm.browser },
    'vercel-1':     { Icon: MousePointerClick, color: 'text-blue-400',    bg: 'bg-blue-400/10',    label: sm.click },
    'vercel-2':     { Icon: MousePointerClick, color: 'text-blue-400',    bg: 'bg-blue-400/10',    label: sm.browser },
    'vercel-3':     { Icon: Settings,          color: 'text-violet-400',  bg: 'bg-violet-400/10',  label: sm.config },
    'vercel-4':     { Icon: CheckCircle,       color: 'text-emerald-400', bg: 'bg-emerald-400/10', label: sm.verify },
    'cloudflare-0': { Icon: MousePointerClick, color: 'text-blue-400',    bg: 'bg-blue-400/10',    label: sm.browser },
    'cloudflare-1': { Icon: Copy,             color: 'text-amber-400',   bg: 'bg-amber-400/10',   label: sm.copy },
    'cloudflare-2': { Icon: Clock,            color: 'text-amber-400',   bg: 'bg-amber-400/10',   label: sm.wait },
    'cloudflare-3': { Icon: Shield,           color: 'text-emerald-400', bg: 'bg-emerald-400/10', label: sm.config },
    'link-0':       { Icon: Settings,          color: 'text-violet-400',  bg: 'bg-violet-400/10',  label: sm.config },
    'link-1':       { Icon: Copy,             color: 'text-amber-400',   bg: 'bg-amber-400/10',   label: sm.copy },
    'link-2':       { Icon: MousePointerClick, color: 'text-blue-400',    bg: 'bg-blue-400/10',    label: sm.browser },
    'link-3':       { Icon: AlertTriangle,    color: 'text-red-400',     bg: 'bg-red-400/10',     label: sm.warning },
    'link-4':       { Icon: CheckCircle,       color: 'text-emerald-400', bg: 'bg-emerald-400/10', label: sm.verify },
  };
}

function buildStepHints(t) {
  const h = t.hints;
  const cf3 = h['cloudflare-3'];
  return {
    'github-0': {
      description: h['github-0'].description,
      mockup: <GithubRepoMockup />,
      links: [{ label: h['github-0'].linkLabel, url: 'https://github.com/new', primary: true }],
      tips: h['github-0'].tips,
    },
    'github-1': {
      description: h['github-1'].description,
      tabs: [
        {
          label: h['github-1'].tabLocal,
          content: <Terminal lines={['cd moj-projekt', 'git init', 'git remote add origin https://github.com/user/moj-projekt.git']} />,
        },
        {
          label: h['github-1'].tabLovable,
          content: (
            <div className="text-[12px] text-zinc-400 leading-relaxed space-y-1.5">
              <div className="text-zinc-300">
                <span className="font-medium text-zinc-100">Project Settings</span> →{' '}
                <span className="font-medium text-zinc-100">GitHub</span> →{' '}
                <span className="font-medium text-zinc-100">Connect to GitHub</span>
              </div>
              <div>{h['github-1'].lovableText}</div>
            </div>
          ),
        },
        {
          label: h['github-1'].tabAiStudio,
          content: (
            <div className="space-y-2.5">
              <div className="text-[12px] text-zinc-400 leading-relaxed">{h['github-1'].aiStudioText}</div>
              <Terminal lines={['cd ai-studio-export', 'git init', 'git add .']} />
            </div>
          ),
        },
      ],
      links: [
        { label: h['github-1'].linkLovable, url: 'https://docs.lovable.dev' },
        { label: h['github-1'].linkAiStudio, url: 'https://aistudio.google.com' },
      ],
    },
    'github-2': {
      description: h['github-2'].description,
      mockup: <Terminal lines={['git add .', 'git commit -m "Initial commit"', 'git branch -M main', 'git push -u origin main']} />,
      tips: h['github-2'].tips,
    },
    'vercel-0': {
      description: h['vercel-0'].description,
      links: [{ label: h['vercel-0'].linkLabel, url: 'https://vercel.com/signup', primary: true }],
      tips: h['vercel-0'].tips,
    },
    'vercel-1': {
      description: h['vercel-1'].description,
      mockup: <VercelAddNewMockup />,
      links: [{ label: h['vercel-1'].linkLabel, url: 'https://vercel.com/dashboard', primary: true }],
    },
    'vercel-2': {
      description: h['vercel-2'].description,
      tips: h['vercel-2'].tips,
    },
    'vercel-3': {
      description: h['vercel-3'].description,
      mockup: <VercelFrameworkMockup />,
      tips: h['vercel-3'].tips,
    },
    'vercel-4': {
      description: h['vercel-4'].description,
      mockup: <VercelDeployedMockup />,
      tips: h['vercel-4'].tips,
    },
    'cloudflare-0': {
      description: h['cloudflare-0'].description,
      links: [{ label: h['cloudflare-0'].linkLabel, url: 'https://dash.cloudflare.com/?to=/:account/add-site', primary: true }],
      tips: h['cloudflare-0'].tips,
    },
    'cloudflare-1': {
      description: h['cloudflare-1'].description,
      mockup: <CloudflareNSMockup />,
      tips: h['cloudflare-1'].tips,
    },
    'cloudflare-2': {
      description: h['cloudflare-2'].description,
      links: [
        { label: h['cloudflare-2'].linkWhatsmydns, url: 'https://www.whatsmydns.net', primary: true },
        { label: h['cloudflare-2'].linkDnschecker, url: 'https://dnschecker.org' },
      ],
      tips: h['cloudflare-2'].tips,
    },
    'cloudflare-3': {
      description: cf3.description,
      mockup: <CloudflareSettingsMockup />,
      tabs: [
        {
          label: cf3.tabSSL,
          content: (
            <div className="space-y-2 text-[12px]">
              <p className="text-zinc-300">
                {cf3.goto}{' '}
                <span className="font-mono text-orange-300">{cf3.sslPath}</span>{' '}
                {cf3.sslMid}{' '}
                <strong className="text-white">{cf3.sslValue}</strong>.
              </p>
              <p className="text-zinc-500">{cf3.sslDesc}</p>
            </div>
          ),
        },
        {
          label: cf3.tabSpeed,
          content: (
            <div className="space-y-2 text-[12px]">
              <p className="text-zinc-300">
                {cf3.goto}{' '}
                <span className="font-mono text-orange-300">{cf3.speedPath}</span>{' '}
                {cf3.speedMid}{' '}
                <strong className="text-white">{cf3.speedValue}</strong> (HTML + CSS + JS).
              </p>
              <p className="text-zinc-500">{cf3.speedDesc}</p>
            </div>
          ),
        },
        {
          label: cf3.tabHTTPS,
          content: (
            <div className="space-y-2 text-[12px]">
              <p className="text-zinc-300">
                {cf3.goto}{' '}
                <span className="font-mono text-orange-300">{cf3.httpsPath}</span>{' '}
                {cf3.httpsMid}{' '}
                <strong className="text-white">{cf3.httpsValue}</strong>.
              </p>
              <p className="text-zinc-500">{cf3.httpsDesc}</p>
            </div>
          ),
        },
      ],
      tips: cf3.tips,
    },
    'link-0': {
      description: h['link-0'].description,
      mockup: <VercelDomainsMockup />,
    },
    'link-1': {
      description: h['link-1'].description,
      tabs: [
        {
          label: h['link-1'].tabApex,
          content: <Terminal title="dns records" lines={['Type: A', 'Name: @', 'Value: 76.76.21.21']} />,
        },
        {
          label: h['link-1'].tabWww,
          content: <Terminal title="dns records" lines={['Type: CNAME', 'Name: www', 'Value: cname.vercel-dns.com']} />,
        },
      ],
    },
    'link-2': {
      description: h['link-2'].description,
      mockup: <CloudflareDNSMockup />,
    },
    'link-3': {
      description: h['link-3'].description,
      mockup: <ProxyToggleMockup />,
      tips: h['link-3'].tips,
    },
    'link-4': {
      description: h['link-4'].description,
      tips: h['link-4'].tips,
    },
  };
}

/* ── Hooks ── */

function useInView(threshold = 0.08) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function ScrollReveal({ children }) {
  const [ref, visible] = useInView(0.1);
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'none' : 'translateY(14px)',
      transition: 'opacity 0.55s ease-out, transform 0.55s ease-out',
    }}>
      {children}
    </div>
  );
}

/* ── Sub-components ── */

const HintPanel = ({ hint, open }) => {
  const [activeTab, setActiveTab] = useState(0);
  if (!hint) return null;
  return (
    <div className={`grid transition-all duration-300 ease-out ${open ? 'grid-rows-[1fr] opacity-100 mt-2' : 'grid-rows-[0fr] opacity-0 mt-0'}`}>
      <div className="overflow-hidden">
        <div className="ml-7 p-3.5 rounded-lg bg-zinc-950/60 border border-zinc-800/80 space-y-3">
          {hint.description && (
            <div className="flex items-start gap-2">
              <Lightbulb className="w-3.5 h-3.5 text-indigo-400 mt-0.5 flex-shrink-0" strokeWidth={1.75} />
              <p className="text-[12.5px] text-zinc-300 leading-relaxed">{hint.description}</p>
            </div>
          )}
          {hint.tabs && (
            <div>
              <div className="flex items-center gap-1 mb-2 border-b border-zinc-800/80">
                {hint.tabs.map((tab, i) => (
                  <button
                    key={tab.label}
                    onClick={() => setActiveTab(i)}
                    className={`px-2.5 py-1.5 text-[11px] font-medium border-b-2 transition-colors -mb-px ${activeTab === i ? 'text-indigo-300 border-indigo-400' : 'text-zinc-500 border-transparent hover:text-zinc-300'}`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <div>{hint.tabs[activeTab].content}</div>
            </div>
          )}
          {hint.mockup && !hint.tabs && <div>{hint.mockup}</div>}
          {hint.tips && hint.tips.length > 0 && (
            <ul className="space-y-1 pt-1">
              {hint.tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-2 text-[11.5px] text-zinc-500">
                  <span className="text-zinc-700 mt-0.5">›</span>
                  <span className="leading-relaxed">{tip}</span>
                </li>
              ))}
            </ul>
          )}
          {hint.links && hint.links.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {hint.links.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[11px] font-medium transition-colors ${link.primary ? 'bg-indigo-500 hover:bg-indigo-400 text-white border border-indigo-400/50' : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800'}`}
                >
                  <Link2 className="w-3 h-3" strokeWidth={2} />
                  {link.label}
                  <ExternalLink className="w-2.5 h-2.5 opacity-60" strokeWidth={2} />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const VercelConnect = ({ token, onTokenChange, status, data, t }) => {
  const [input, setInput] = useState(token);
  const tv = t.vercel;

  const handleConnect = () => {
    const val = input.trim();
    if (!val) return;
    localStorage.setItem('vercel_token', val);
    onTokenChange(val);
  };

  const handleDisconnect = () => {
    localStorage.removeItem('vercel_token');
    onTokenChange('');
    setInput('');
  };

  if (status === 'connected') {
    const deployReady = data?.latestDeployment?.readyState === 'READY';
    return (
      <div className="mx-5 sm:mx-6 mb-3 flex items-center justify-between gap-3 px-3 py-2 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.5)] flex-shrink-0 animate-pulse" />
          <span className="text-[12px] text-emerald-300 font-medium">{tv.connected}</span>
          {data && (
            <span className="text-[11px] text-zinc-500 hidden sm:inline">
              {data.projects.length} {tv.projects}{deployReady ? ' · READY ✓' : ''}
            </span>
          )}
        </div>
        <button onClick={handleDisconnect} className="flex-shrink-0 text-[11px] text-zinc-600 hover:text-zinc-400 transition-colors px-2 py-0.5 rounded border border-zinc-800 hover:border-zinc-700">
          {tv.disconnect}
        </button>
      </div>
    );
  }

  return (
    <div className="mx-5 sm:mx-6 mb-3 p-3 rounded-lg bg-zinc-900/50 border border-zinc-800/60 space-y-2">
      <div className="flex items-center justify-between gap-2">
        <span className="text-[12px] text-zinc-400 font-medium">{tv.autoVerify}</span>
        <a href="https://vercel.com/account/tokens" target="_blank" rel="noopener noreferrer" className="text-[10.5px] text-zinc-600 hover:text-indigo-400 flex items-center gap-1 transition-colors">
          <ExternalLink className="w-2.5 h-2.5" />{tv.createToken}
        </a>
      </div>
      {status === 'error' && (
        <div className="flex items-center gap-1.5 text-[11px] text-red-400">
          <AlertTriangle className="w-3 h-3 flex-shrink-0" strokeWidth={2} />
          {tv.invalidToken}
        </div>
      )}
      <div className="flex gap-2">
        <input
          type="password"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleConnect()}
          placeholder={tv.tokenPlaceholder}
          className="flex-1 px-2.5 py-1.5 rounded-md bg-zinc-950 border border-zinc-800 text-[12px] font-mono text-zinc-300 placeholder-zinc-700 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 min-w-0"
        />
        <button
          onClick={handleConnect}
          disabled={!input.trim() || status === 'loading'}
          className="flex-shrink-0 px-3 py-1.5 rounded-md bg-indigo-500 hover:bg-indigo-400 disabled:opacity-40 disabled:cursor-not-allowed text-white text-[12px] font-medium transition-colors"
        >
          {status === 'loading' ? '...' : tv.connect}
        </button>
      </div>
      <p className="text-[10.5px] text-zinc-600">{tv.tokenNote}</p>
    </div>
  );
};

const StepRow = ({ text, checked, onToggle, hint, hintOpen, onToggleHint, meta, disabled, apiVerified, t }) => (
  <div className="group/step">
    <div className={`flex items-start gap-2 py-2 px-2 -mx-2 rounded-md transition-colors duration-150 ${!disabled && !apiVerified ? 'hover:bg-white/[0.025]' : ''}`}>
      <button
        onClick={disabled || apiVerified ? undefined : onToggle}
        className={`mt-0.5 flex-shrink-0 ${disabled ? 'cursor-not-allowed' : apiVerified ? 'cursor-default' : ''}`}
        aria-label={disabled ? t.phase.locked : apiVerified ? 'API verified' : checked ? 'uncheck' : 'check'}
      >
        <div className={`w-[18px] h-[18px] rounded-[5px] border flex items-center justify-center transition-all duration-200 ease-out ${
          disabled
            ? 'border-zinc-800 bg-zinc-950/50'
            : apiVerified
              ? 'bg-emerald-500/20 border-emerald-500/50 shadow-[0_0_0_3px_rgba(52,211,153,0.08)]'
              : checked
                ? 'bg-indigo-500 border-indigo-500 shadow-[0_0_0_3px_rgba(99,102,241,0.15)]'
                : 'border-zinc-700 bg-zinc-950 group-hover/step:border-zinc-500'
        }`}>
          {disabled
            ? <Lock className="w-2.5 h-2.5 text-zinc-700" strokeWidth={2.5} />
            : apiVerified
              ? <Check className="w-3 h-3 text-emerald-400" strokeWidth={3.5} />
              : <Check className={`w-3 h-3 text-white transition-all duration-200 ${checked ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`} strokeWidth={3.5} />
          }
        </div>
      </button>
      <button
        onClick={disabled || apiVerified ? undefined : onToggle}
        disabled={disabled || apiVerified}
        className={`flex-1 text-left text-[15.5px] leading-relaxed transition-all duration-200 ${
          disabled
            ? 'text-zinc-600 cursor-not-allowed'
            : apiVerified
              ? 'text-zinc-500 line-through decoration-zinc-700 cursor-default'
              : checked
                ? 'text-zinc-500 line-through decoration-zinc-700'
                : 'text-zinc-300'
        }`}
      >
        {text}
      </button>
      {apiVerified && (
        <span className="mt-0.5 flex-shrink-0 inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9.5px] font-medium text-emerald-400 bg-emerald-400/10">
          <Zap className="w-3 h-3" strokeWidth={1.75} />
          <span className="hidden sm:inline">live</span>
        </span>
      )}
      {!apiVerified && meta && (
        <span className={`mt-0.5 flex-shrink-0 inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9.5px] font-medium ${disabled ? 'text-zinc-700 bg-zinc-900/30' : `${meta.color} ${meta.bg}`}`}>
          <meta.Icon className="w-3 h-3" strokeWidth={1.75} />
          <span className="hidden sm:inline">{meta.label}</span>
        </span>
      )}
      {hint && (
        <button
          onClick={onToggleHint}
          className={`mt-0.5 flex-shrink-0 h-6 rounded-md flex items-center justify-center gap-1 px-1.5 transition-all duration-200 ${hintOpen ? 'bg-indigo-500/15 text-indigo-300 ring-1 ring-indigo-500/30' : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-indigo-300 hover:border-zinc-700 hover:bg-zinc-800'}`}
          aria-label={hintOpen ? t.hint.hide : t.hint.show}
          title={hintOpen ? t.hint.hide : t.hint.show}
        >
          <HelpCircle className="w-3.5 h-3.5" strokeWidth={1.75} />
          <span className="text-[10px] font-medium hidden sm:inline">{hintOpen ? t.hint.hideShort : t.hint.showShort}</span>
        </button>
      )}
    </div>
    <HintPanel hint={hint} open={hintOpen} />
  </div>
);

const StatusBadge = ({ status, t }) => {
  const config = {
    pending: { label: t.status.pending, cls: 'bg-zinc-800/60 text-zinc-400 border-zinc-700/50', dot: 'bg-zinc-500' },
    progress: { label: t.status.progress, cls: 'bg-amber-500/10 text-amber-300 border-amber-500/30', dot: 'bg-amber-400 animate-pulse' },
    done: { label: t.status.done, cls: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30', dot: 'bg-emerald-400' },
  };
  const c = config[status];
  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10.5px] font-medium uppercase tracking-wider border ${c.cls}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {c.label}
    </div>
  );
};

const PipelineNode = ({ icon: Icon, label, delay = 0 }) => (
  <div className="flex flex-col items-center gap-2.5" style={{ animation: `fadeUp 0.6s ease-out ${delay}s both` }}>
    <div className="relative">
      <div className="absolute inset-0 rounded-2xl bg-indigo-500/20 blur-xl" />
      <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 flex items-center justify-center shadow-2xl">
        <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-zinc-200" strokeWidth={1.5} />
      </div>
    </div>
    <span className="text-[11px] uppercase tracking-[0.15em] text-zinc-500 font-medium">{label}</span>
  </div>
);

const PhaseCard = ({ phase, status, checked, onToggle, openHints, onToggleHint, index, isLocked, topWidget, apiVerified, optional, stepHints, stepMeta, t }) => {
  const Icon = phase.icon;
  const done = status === 'done';
  const [cardRef, inView] = useInView(0.06);
  return (
    <div
      ref={cardRef}
      className="relative pl-12 sm:pl-16"
      style={{
        opacity: !inView ? 0 : isLocked ? 0.5 : 1,
        transform: inView ? 'none' : 'translateY(18px)',
        transition: `opacity 0.6s ease-out, transform 0.6s ease-out`,
      }}
    >
      <div className="absolute left-0 top-6 flex flex-col items-center">
        <div className={`relative w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center font-mono text-[11px] sm:text-[12px] font-semibold transition-all duration-300 ${
          done
            ? 'bg-indigo-500 text-white shadow-[0_0_20px_-2px_rgba(99,102,241,0.6)]'
            : isLocked
              ? 'bg-zinc-950 text-zinc-600 border border-zinc-800/50'
              : 'bg-zinc-900 text-zinc-400 border border-zinc-800'
        }`}>
          {done ? <Check className="w-4 h-4" strokeWidth={3} /> : isLocked ? <Lock className="w-4 h-4" strokeWidth={2} /> : phase.number}
        </div>
      </div>
      <Card className={`group relative overflow-hidden border bg-gradient-to-br backdrop-blur-sm transition-all duration-300 ${
        done
          ? 'from-zinc-900/60 to-zinc-950/80 border-indigo-500/40 shadow-[0_0_40px_-12px_rgba(99,102,241,0.4)]'
          : isLocked
            ? 'from-zinc-950/40 to-zinc-950/60 border-zinc-900/50'
            : 'from-zinc-900/60 to-zinc-950/80 border-zinc-800/80 hover:border-zinc-700 hover:shadow-[0_0_40px_-15px_rgba(99,102,241,0.35)]'
      }`}>
        <div className={`absolute -right-20 -top-20 w-48 h-48 rounded-full blur-3xl transition-opacity duration-500 ${done ? 'bg-indigo-500/10 opacity-100' : 'bg-indigo-500/5 opacity-0 group-hover:opacity-100'}`} />
        <div className="relative flex items-start justify-between gap-4 p-5 sm:p-6 pb-4">
          <div className="flex items-start gap-3 sm:gap-4 min-w-0">
            <Badge variant="outline" className={`font-mono text-[10.5px] px-2 py-0.5 rounded-md flex-shrink-0 ${isLocked ? 'bg-zinc-900/50 border-zinc-800 text-zinc-600' : 'bg-indigo-500/10 border-indigo-500/30 text-indigo-300'}`}>
              {t.phase.step} {phase.number}
            </Badge>
            {optional && (
              <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700 uppercase tracking-wider">{t.phase.optional}</span>
            )}
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className={`text-base sm:text-[17px] font-semibold tracking-tight ${isLocked ? 'text-zinc-500' : 'text-zinc-100'}`}>{phase.platform}</h3>
                {phase.badge && (
                  <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 uppercase tracking-wider">{phase.badge}</span>
                )}
              </div>
              <p className="text-[14px] text-zinc-500 mt-0.5">{phase.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="hidden sm:block">
              {isLocked
                ? <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10.5px] font-medium uppercase tracking-wider border bg-zinc-900/60 text-zinc-600 border-zinc-800/50"><Lock className="w-3 h-3" strokeWidth={2} />{t.phase.locked}</div>
                : <StatusBadge status={status} t={t} />
              }
            </div>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-colors duration-300 ${done ? 'bg-indigo-500/10 border-indigo-500/30' : 'bg-zinc-900 border-zinc-800'}`}>
              <Icon className={`w-5 h-5 transition-colors duration-300 ${done ? 'text-indigo-300' : isLocked ? 'text-zinc-600' : 'text-zinc-400'}`} strokeWidth={1.5} />
            </div>
          </div>
        </div>
        <div className="sm:hidden px-5 pb-2">
          {isLocked
            ? <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10.5px] font-medium uppercase tracking-wider border bg-zinc-900/60 text-zinc-600 border-zinc-800/50"><Lock className="w-3 h-3" strokeWidth={2} />{t.phase.locked}</div>
            : <StatusBadge status={status} t={t} />
          }
        </div>
        {isLocked && (
          <div className="mx-5 sm:mx-6 mb-3 flex items-center gap-2 px-3 py-2 rounded-md bg-zinc-900/60 border border-zinc-800/50">
            <Lock className="w-3 h-3 text-zinc-600 flex-shrink-0" strokeWidth={2} />
            <span className="text-[11.5px] text-zinc-600">{t.phase.unlockHint(String(index).padStart(2, '0'))}</span>
          </div>
        )}
        <div className="h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent mx-5 sm:mx-6" />
        {topWidget}
        <div className="px-5 sm:px-6 py-4 space-y-0.5">
          {phase.steps.map((step, i) => {
            const key = `${phase.id}-${i}`;
            return (
              <StepRow
                key={key}
                text={step}
                checked={!!checked[key]}
                onToggle={() => onToggle(key)}
                hint={stepHints[key]}
                hintOpen={!!openHints[key]}
                onToggleHint={() => onToggleHint(key)}
                meta={stepMeta[key]}
                disabled={isLocked}
                apiVerified={!!(apiVerified && apiVerified[key])}
                t={t}
              />
            );
          })}
        </div>
      </Card>
    </div>
  );
};

/* ── Mobile overflow menu ── */

const MobileMenu = ({ onOpenPdf, onShare, onReset, onToggleLang, copied, lang, t, onInstall, canInstall }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const btn = 'flex items-center gap-2.5 w-full px-3 py-2.5 rounded-lg text-[13px] text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors';

  return (
    <div ref={ref} className="relative sm:hidden flex-shrink-0">
      <button
        onClick={() => setOpen(v => !v)}
        className={`h-9 w-9 flex items-center justify-center rounded-md border text-zinc-400 hover:text-zinc-200 transition-colors ${open ? 'bg-zinc-800 border-zinc-700' : 'bg-transparent border-zinc-800 hover:bg-zinc-900 hover:border-zinc-700'}`}
        aria-label="Więcej opcji"
      >
        <span className="text-lg leading-none font-bold tracking-tighter">···</span>
      </button>
      {open && (
        <div className="absolute right-0 top-11 w-48 rounded-xl border border-zinc-800 bg-zinc-950/95 backdrop-blur-xl shadow-2xl p-1.5 z-50">
          <button onClick={() => { onOpenPdf(); setOpen(false); }} className={btn}>
            <BookOpen className="w-4 h-4 text-purple-400 flex-shrink-0" />
            {t.header.ebookBtn}
          </button>
          <button onClick={() => { onShare(); setOpen(false); }} className={btn}>
            {copied ? <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" /> : <Copy className="w-4 h-4 text-zinc-400 flex-shrink-0" />}
            {copied ? t.header.copiedBtn : t.header.shareBtn}
          </button>
          <button onClick={() => { onReset(); setOpen(false); }} className={btn}>
            <RotateCcw className="w-4 h-4 text-zinc-400 flex-shrink-0" />
            {t.header.resetBtn}
          </button>
          <div className="h-px bg-zinc-800 my-1" />
          <button onClick={() => { onToggleLang(); setOpen(false); }} className={btn}>
            <Globe className="w-4 h-4 text-zinc-400 flex-shrink-0" />
            <span className="font-mono font-semibold">{lang === 'pl' ? '→ EN' : '→ PL'}</span>
          </button>
          {canInstall && (
            <button onClick={() => { onInstall(); setOpen(false); }} className={btn}>
              <Download className="w-4 h-4 text-zinc-400 flex-shrink-0" />
              <span>{lang === 'en' ? 'Install app' : 'Zainstaluj aplikację'}</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

/* ── Encoding helpers ── */
function encodeChecked(checked) {
  let bits = 0;
  ALL_STEP_KEYS.forEach((key, i) => { if (checked[key]) bits |= 1 << i; });
  return bits.toString(16);
}

function decodeChecked(s) {
  const bits = parseInt(s, 16);
  if (isNaN(bits)) return {};
  const out = {};
  ALL_STEP_KEYS.forEach((key, i) => { if (bits & (1 << i)) out[key] = true; });
  return out;
}

const quickLinks = [
  { label: 'GitHub', host: 'github.com', url: 'https://github.com', icon: Github },
  { label: 'Vercel', host: 'vercel.com', url: 'https://vercel.com', icon: Server },
  { label: 'Cloudflare', host: 'cloudflare.com', url: 'https://cloudflare.com', icon: Globe },
];

/* ── Main component ── */
export default function DeployPipelineGuide({ onOpenWizard, onOpenPdf, dark, toggleTheme, lang, toggleLang }) {
  const t = getT(lang);
  const phases    = buildPhases(t);
  const stepHints = buildStepHints(t);
  const stepMeta  = buildStepMeta(t);

  const [checked, setChecked] = useState(() => {
    try {
      const params = new URLSearchParams(window.location.hash.slice(1));
      const s = params.get('s');
      if (s) return decodeChecked(s);
    } catch {}
    return {};
  });
  const [openHints, setOpenHints] = useState({});
  const [copied, setCopied] = useState(false);
  const [noDomain, setNoDomain] = useState(false);
  const [vercelToken, setVercelToken] = useState(() => localStorage.getItem('vercel_token') || '');
  const [vercelApiStatus, setVercelApiStatus] = useState('idle');
  const [vercelApiData, setVercelApiData] = useState(null);
  const [apiVerified, setApiVerified] = useState({});
  const [installPrompt, setInstallPrompt] = useState(null);

  useEffect(() => {
    if (!vercelToken) { setVercelApiStatus('idle'); setApiVerified({}); return; }
    let cancelled = false;
    const check = async () => {
      if (!cancelled) setVercelApiStatus('loading');
      try {
        const res = await fetch('/api/vercel-status', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: vercelToken }),
        });
        if (!res.ok) throw new Error(res.status === 401 ? 'invalid_token' : 'error');
        const { projects = [], latestDeployment = null, domains = [] } = await res.json();
        if (cancelled) return;
        const verified = { 'vercel-0': true };
        if (projects.length > 0) {
          verified['vercel-1'] = true;
          if (projects.some(p => p.link?.type === 'github' || p.link?.repoId != null)) verified['vercel-2'] = true;
        }
        if (latestDeployment?.readyState === 'READY') verified['vercel-4'] = true;
        if (domains.length > 0 && domains.some(d => d.verified)) verified['link-4'] = true;
        setApiVerified(verified);
        setVercelApiData({ projects, latestDeployment, domains });
        setVercelApiStatus('connected');
      } catch (e) {
        if (!cancelled) { setVercelApiStatus('error'); setApiVerified({}); }
      }
    };
    check();
    const id = setInterval(check, 30000);
    return () => { cancelled = true; clearInterval(id); };
  }, [vercelToken]);

  useEffect(() => {
    const handler = (e) => { e.preventDefault(); setInstallPrompt(e); };
    window.addEventListener('beforeinstallprompt', handler);
    window.addEventListener('appinstalled', () => setInstallPrompt(null));
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const toggleStep = (key) => setChecked((prev) => ({ ...prev, [key]: !prev[key] }));
  const toggleHint = (key) => setOpenHints((prev) => ({ ...prev, [key]: !prev[key] }));
  const reset = () => { setChecked({}); setOpenHints({}); window.history.replaceState(null, '', window.location.pathname); };

  const share = async () => {
    const url = `${window.location.href.split('#')[0]}#s=${encodeChecked(checked)}`;
    if (navigator.share) {
      try { await navigator.share({ title: t.hero.title, url }); return; } catch {}
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const installApp = async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    await installPrompt.userChoice;
    setInstallPrompt(null);
  };

  const actionsRef = useRef({});
  actionsRef.current = { share, reset, toggleTheme, toggleLang, onOpenWizard };

  useEffect(() => {
    const handler = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      switch (e.key.toLowerCase()) {
        case 'r': actionsRef.current.reset(); break;
        case 's': actionsRef.current.share(); break;
        case 't': actionsRef.current.toggleTheme?.(); break;
        case 'l': actionsRef.current.toggleLang?.(); break;
        case 'w': actionsRef.current.onOpenWizard?.(); break;
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const isStepDone = (key) => !!checked[key] || !!apiVerified[key];
  const totalSteps = ALL_STEP_KEYS.length;
  const completedSteps = ALL_STEP_KEYS.filter(isStepDone).length;
  const progress = totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0;

  const getPhaseStatus = (phase) => {
    const keys = phase.steps.map((_, i) => `${phase.id}-${i}`);
    const done = keys.filter(isStepDone).length;
    if (done === 0) return 'pending';
    if (done === keys.length) return 'done';
    return 'progress';
  };

  const isPhaseDone = (phase) => {
    const keys = phase.steps.map((_, i) => `${phase.id}-${i}`);
    return keys.every(isStepDone);
  };

  const getPhaseIsLocked = (index) => {
    if (index === 0) return false;
    if (noDomain && index >= 2) return false;
    for (let i = 0; i < index; i++) {
      if (!isPhaseDone(phases[i])) return true;
    }
    return false;
  };

  const allDone = noDomain
    ? isPhaseDone(phases[0]) && isPhaseDone(phases[1])
    : completedSteps === totalSteps && totalSteps > 0;

  return (
    <>
    <div
      className="min-h-screen bg-zinc-950 text-zinc-100 antialiased relative overflow-x-hidden"
      style={{ fontFamily: '"EB Garamond", Garamond, "Times New Roman", ui-serif, serif' }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&family=JetBrains+Mono:wght@500;600&display=swap');
        @keyframes fadeUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes confettiFall { 0% { transform: translateY(-20px) rotate(0deg) scale(1); opacity:1; } 80% { opacity:1; } 100% { transform: translateY(220px) rotate(540deg) scale(0.5); opacity:0; } }
        @keyframes popIn { 0% { transform: scale(0.85); opacity:0; } 60% { transform: scale(1.04); } 100% { transform: scale(1); opacity:1; } }
        .font-mono { font-family: "JetBrains Mono", ui-monospace, SFMono-Regular, monospace; }
        .grid-bg {
          background-image: linear-gradient(var(--grid-color) 1px, transparent 1px), linear-gradient(90deg, var(--grid-color) 1px, transparent 1px);
          background-size: 56px 56px;
          mask-image: radial-gradient(ellipse 70% 50% at 50% 0%, black 30%, transparent 80%);
          -webkit-mask-image: radial-gradient(ellipse 70% 50% at 50% 0%, black 30%, transparent 80%);
        }
        .timeline-rail { background: linear-gradient(to bottom, transparent 0%, var(--rail-color) 8%, var(--rail-color) 92%, transparent 100%); }
      `}</style>

      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-500/[0.07] blur-3xl rounded-full pointer-events-none" />

      <header className="sticky top-0 z-30 backdrop-blur-xl bg-zinc-950/80 border-b border-zinc-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-4">
          <div className="flex items-center gap-2.5 flex-shrink-0">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center">
              <Sparkles className="w-4.5 h-4.5 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-[15px] font-semibold tracking-tight hidden sm:block">{t.header.appTitle}</span>
          </div>
          <div className="flex-1 flex items-center gap-2 sm:gap-3 min-w-0">
            {/* Progress bar */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[12px] uppercase tracking-[0.18em] text-zinc-500 font-medium hidden sm:block">{t.header.progress}</span>
                <span className="text-[13px] font-mono text-zinc-300">{completedSteps}/{totalSteps} · {Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2 bg-zinc-900 [&>div]:bg-gradient-to-r [&>div]:from-indigo-500 [&>div]:to-indigo-400 [&>div]:transition-all [&>div]:duration-500" />
            </div>

            {/* Wizard — always visible */}
            {onOpenWizard && (
              <Button onClick={onOpenWizard} variant="outline" size="sm" title={t.header.wizardTitle} className="bg-transparent border-zinc-800 hover:bg-zinc-900 hover:border-indigo-700/60 text-indigo-400/80 hover:text-indigo-300 text-sm h-9 px-3 sm:px-3.5 flex-shrink-0 gap-1.5">
                <Rocket className="w-4 h-4" />
                <span className="hidden sm:inline">{t.header.wizardBtn}</span>
              </Button>
            )}

            {/* Ebook — hidden on mobile (in ⋯ menu) */}
            <Button onClick={onOpenPdf} variant="outline" size="sm" className="hidden sm:flex bg-transparent border-zinc-800 hover:bg-zinc-900 hover:border-zinc-700 text-purple-400/80 hover:text-purple-300 text-sm h-9 px-3.5 flex-shrink-0 gap-1.5" title={t.header.ebookBtn}>
              <BookOpen className="w-4 h-4" />
              <span>{t.header.ebookBtn}</span>
            </Button>

            {/* Share — hidden on mobile */}
            <Button onClick={share} variant="outline" size="sm" title={t.header.shareBtn} className="hidden sm:flex bg-transparent border-zinc-800 hover:bg-zinc-900 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200 text-sm h-9 px-3.5 flex-shrink-0 gap-1.5">
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? t.header.copiedBtn : t.header.shareBtn}</span>
            </Button>

            {/* Reset — hidden on mobile */}
            <Button onClick={reset} variant="outline" size="sm" title={t.header.resetBtn} className="hidden sm:flex bg-transparent border-zinc-800 hover:bg-zinc-900 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200 text-sm h-9 px-3.5 flex-shrink-0 gap-1.5">
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t.header.resetBtn}</span>
            </Button>

            {/* Lang toggle — hidden on mobile */}
            <Button onClick={toggleLang} variant="outline" size="sm" title={t.header.langToggle} className="hidden sm:flex bg-transparent border-zinc-800 hover:bg-zinc-900 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200 h-9 px-2.5 flex-shrink-0 items-center gap-1">
              <Globe className="w-3.5 h-3.5" />
              <span className="text-[11px] font-mono font-semibold">{lang.toUpperCase()}</span>
            </Button>

            {/* Install PWA — hidden on mobile, appears when prompt available */}
            {installPrompt && (
              <Button onClick={installApp} variant="outline" size="sm" className="hidden sm:flex bg-transparent border-zinc-800 hover:bg-zinc-900 hover:border-indigo-700/60 text-indigo-400/80 hover:text-indigo-300 text-sm h-9 px-3.5 flex-shrink-0 gap-1.5">
                <Download className="w-4 h-4" />
                <span className="text-[12px]">{lang === 'en' ? 'Install' : 'Instaluj'}</span>
              </Button>
            )}

            {/* Theme toggle — always visible */}
            <Button onClick={toggleTheme} variant="outline" size="sm" title={dark ? t.header.lightMode : t.header.darkMode} className="bg-transparent border-zinc-800 hover:bg-zinc-900 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200 h-9 w-9 px-0 flex-shrink-0 flex items-center justify-center">
              {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>

            {/* ⋯ more menu — mobile only */}
            <MobileMenu
              onOpenPdf={onOpenPdf}
              onShare={share}
              onReset={reset}
              onToggleLang={toggleLang}
              copied={copied}
              lang={lang}
              t={t}
              onInstall={installApp}
              canInstall={!!installPrompt}
            />
          </div>
        </div>
      </header>

      <main className="relative max-w-3xl mx-auto px-4 sm:px-6 pt-24 sm:pt-32 pb-32">
        <section className="text-center mb-16 sm:mb-24" style={{ animation: 'fadeUp 0.6s ease-out' }}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            <span className="text-[11px] uppercase tracking-[0.15em] text-indigo-300 font-medium">{t.hero.badge}</span>
          </div>
          <h1 className={`text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-b bg-clip-text text-transparent mb-4 ${dark ? 'from-white to-zinc-400' : 'from-zinc-100 to-zinc-400'}`}>
            {t.hero.title}
          </h1>
          <p className="text-base sm:text-lg text-zinc-500 mb-4 max-w-xl mx-auto leading-relaxed">
            <span className="text-zinc-300 font-medium">GitHub</span>
            <span className="mx-2 text-zinc-700">→</span>
            <span className="text-zinc-300 font-medium">Vercel</span>
            <span className="mx-2 text-zinc-700">→</span>
            <span className="text-zinc-300 font-medium">Cloudflare</span>
          </p>
          <p className="text-[12.5px] text-zinc-600 mb-12 max-w-md mx-auto flex items-center justify-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5" strokeWidth={1.75} />
            {t.hero.subtitle}
          </p>
          <div className="flex items-center justify-center gap-3 sm:gap-6">
            <PipelineNode icon={Github} label="GitHub" delay={0.2} />
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-700 -mt-6" strokeWidth={1.5} style={{ animation: 'fadeUp 0.6s ease-out 0.3s both' }} />
            <PipelineNode icon={Server} label="Vercel" delay={0.4} />
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-700 -mt-6" strokeWidth={1.5} style={{ animation: 'fadeUp 0.6s ease-out 0.5s both' }} />
            <PipelineNode icon={Globe} label="Cloudflare" delay={0.6} />
          </div>
        </section>

        <section className="relative">
          <div className="absolute left-4 sm:left-5 top-0 bottom-0 w-px timeline-rail" />
          <div className="space-y-6 sm:space-y-8">
            {phases.map((phase, idx) => (
              <React.Fragment key={phase.id}>
                {idx === 2 && (
                  <div className="pl-12 sm:pl-16">
                  <ScrollReveal>
                    <button
                      onClick={() => setNoDomain(v => !v)}
                      className={`w-full flex items-center justify-between gap-4 p-3.5 rounded-xl border transition-all duration-200 text-left ${
                        noDomain
                          ? 'border-indigo-500/40 bg-indigo-500/[0.07]'
                          : 'border-zinc-800 bg-zinc-900/40 hover:border-zinc-700'
                      }`}
                    >
                      <div>
                        <p className="text-[13px] font-medium text-zinc-200">{t.noDomain.label}</p>
                        <p className="text-[11.5px] text-zinc-500 mt-0.5">
                          {noDomain ? t.noDomain.active : t.noDomain.inactive}
                        </p>
                      </div>
                      <div className={`relative flex-shrink-0 w-10 h-6 rounded-full transition-colors duration-200 ${noDomain ? 'bg-indigo-500' : 'bg-zinc-700'}`}>
                        <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${noDomain ? 'translate-x-5' : 'translate-x-1'}`} />
                      </div>
                    </button>
                  </ScrollReveal>
                  </div>
                )}
                {idx === 3 && (
                  <div className="pl-12 sm:pl-16">
                  <ScrollReveal>
                    <Alert className="bg-amber-500/[0.04] border-amber-500/30 backdrop-blur-sm">
                      <AlertTriangle className="w-4 h-4 !text-amber-400" />
                      <AlertTitle className="text-amber-300 font-semibold text-[13px]">
                        {t.alert.title}
                      </AlertTitle>
                      <AlertDescription className="text-amber-200/70 text-[12.5px] leading-relaxed mt-1">
                        {t.alert.body}
                        <span className="font-mono text-amber-200">{t.alert.dnsOnly}</span>
                        {t.alert.bodySuffix}
                      </AlertDescription>
                    </Alert>
                  </ScrollReveal>
                  </div>
                )}
                <PhaseCard
                  phase={phase}
                  status={getPhaseStatus(phase)}
                  checked={checked}
                  onToggle={toggleStep}
                  openHints={openHints}
                  onToggleHint={toggleHint}
                  index={idx}
                  isLocked={getPhaseIsLocked(idx)}
                  apiVerified={apiVerified}
                  optional={noDomain && idx >= 2}
                  stepHints={stepHints}
                  stepMeta={stepMeta}
                  t={t}
                  topWidget={phase.id === 'vercel' && !getPhaseIsLocked(idx) ? (
                    <VercelConnect
                      token={vercelToken}
                      onTokenChange={setVercelToken}
                      status={vercelApiStatus}
                      data={vercelApiData}
                      t={t}
                    />
                  ) : null}
                />
              </React.Fragment>
            ))}
          </div>
        </section>

        {allDone && (() => {
          const liveUrl = vercelApiData?.domains?.find(d => d.verified)?.name
            ? `https://${vercelApiData.domains.find(d => d.verified).name}`
            : vercelApiData?.latestDeployment?.url
              ? `https://${vercelApiData.latestDeployment.url}`
              : null;
          const confettiPieces = [
            { left:'8%', delay:'0s', color:'#6366f1', rect:false },
            { left:'16%', delay:'0.15s', color:'#10b981', rect:true },
            { left:'24%', delay:'0.3s', color:'#f59e0b', rect:false },
            { left:'32%', delay:'0.05s', color:'#ec4899', rect:true },
            { left:'42%', delay:'0.25s', color:'#3b82f6', rect:false },
            { left:'52%', delay:'0.1s', color:'#6366f1', rect:true },
            { left:'62%', delay:'0.35s', color:'#10b981', rect:false },
            { left:'70%', delay:'0.2s', color:'#f59e0b', rect:true },
            { left:'80%', delay:'0.4s', color:'#ec4899', rect:false },
            { left:'90%', delay:'0.08s', color:'#3b82f6', rect:true },
            { left:'12%', delay:'0.45s', color:'#10b981', rect:false },
            { left:'55%', delay:'0.18s', color:'#6366f1', rect:true },
            { left:'76%', delay:'0.32s', color:'#f59e0b', rect:false },
            { left:'36%', delay:'0.42s', color:'#ec4899', rect:true },
          ];
          return (
            <div className="mt-10 pl-12 sm:pl-16" style={{ animation: 'popIn 0.6s cubic-bezier(.34,1.56,.64,1) both' }}>
              <div className="relative overflow-hidden rounded-2xl border border-indigo-500/40 bg-gradient-to-br from-indigo-500/10 via-zinc-900/60 to-emerald-500/[0.06] p-8 text-center shadow-[0_0_60px_-10px_rgba(99,102,241,0.35)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.18),transparent_65%)] pointer-events-none" />
                {confettiPieces.map((p, i) => (
                  <div key={i} style={{
                    position:'absolute', left:p.left, top:'0', width: p.rect ? 7 : 8, height: p.rect ? 7 : 8,
                    background: p.color, borderRadius: p.rect ? 2 : '50%',
                    animation: `confettiFall 2.2s ease-in ${p.delay} both`,
                    pointerEvents: 'none',
                  }} />
                ))}
                <div className="relative">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center shadow-[0_0_30px_-4px_rgba(99,102,241,0.7)]">
                      <CheckCircle className="w-7 h-7 text-white" strokeWidth={2} />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-zinc-100 mb-2">
                    {noDomain ? t.done.titleNoDomain : t.done.titleDomain}
                  </h3>
                  <p className="text-sm text-zinc-400 mb-6 max-w-xs mx-auto leading-relaxed">
                    {noDomain ? t.done.bodyNoDomain : t.done.bodyDomain}
                  </p>
                  {liveUrl && (
                    <a
                      href={liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors shadow-lg"
                    >
                      <ExternalLink className="w-4 h-4" />
                      {liveUrl.replace('https://', '')}
                    </a>
                  )}
                  {!liveUrl && (
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-300 text-sm">
                      <CheckCircle className="w-4 h-4 text-emerald-400" strokeWidth={2} />
                      {t.done.liveAlt}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })()}

        <footer className="mt-20 pt-8 border-t border-zinc-800 text-center space-y-1.5">
          <p className="text-sm text-zinc-400">
            {t.footer.createdBy}{' '}
            <a href="mailto:artur.nawrowski@gmail.com" className="text-indigo-400 hover:text-indigo-300 transition-colors font-medium">ArChi</a>
            {' '}{t.footer.for}{' '}
            <a href="https://webtolearn.pl" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 transition-colors font-medium">WebToLearn</a>
          </p>
          <p className="text-xs text-zinc-500">
            {t.footer.copyright}{' '}
            <a href="https://kcbsi.pl" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors">kcbsi.pl</a>
          </p>
        </footer>
      </main>

      <aside className="hidden lg:block fixed right-6 top-1/2 -translate-y-1/2 z-20">
        <div className="w-52 rounded-xl border border-zinc-800 bg-zinc-950/80 backdrop-blur-xl p-3 shadow-2xl">
          <div className="flex items-center gap-2 px-2 pb-2 mb-1 border-b border-zinc-900">
            <ExternalLink className="w-3 h-3 text-zinc-500" />
            <span className="text-[10.5px] uppercase tracking-[0.15em] text-zinc-500 font-medium">{t.sidebar.label}</span>
          </div>
          <div className="space-y-1">
            {quickLinks.map((link) => {
              const I = link.icon;
              return (
                <a key={link.host} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-2 px-2 py-2 rounded-md text-zinc-300 hover:bg-white/[0.04] hover:text-white transition-colors group">
                  <span className="flex items-center gap-2.5 min-w-0">
                    <I className="w-3.5 h-3.5 text-zinc-500 group-hover:text-indigo-400 transition-colors" strokeWidth={1.5} />
                    <span className="text-[13px] font-medium">{link.label}</span>
                  </span>
                  <span className="text-[11px] font-mono text-zinc-600 group-hover:text-zinc-400 transition-colors truncate">{link.host}</span>
                </a>
              );
            })}
          </div>
        </div>
      </aside>

      <div className="lg:hidden fixed bottom-4 left-4 right-4 z-20">
        <div className="rounded-xl border border-zinc-800 bg-zinc-950/90 backdrop-blur-xl p-2 shadow-2xl flex items-center gap-2">
          {quickLinks.map((link) => {
            const I = link.icon;
            return (
              <a key={link.host} href={link.url} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-1.5 px-2 py-2 rounded-lg text-zinc-300 hover:bg-white/[0.05] hover:text-white transition-colors text-[12px] font-medium">
                <I className="w-3.5 h-3.5" strokeWidth={1.5} />
                <span>{link.label}</span>
              </a>
            );
          })}
        </div>
      </div>
    </div>
    </>
  );
}
