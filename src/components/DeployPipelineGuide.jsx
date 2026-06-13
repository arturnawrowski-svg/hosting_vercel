import React, { useState, useEffect } from 'react';
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
  Cloud,
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
} from 'lucide-react';

import {
  BrowserFrame, Terminal,
  GithubRepoMockup, VercelAddNewMockup, VercelFrameworkMockup, VercelDeployedMockup,
  CloudflareNSMockup, CloudflareDNSMockup, ProxyToggleMockup, VercelDomainsMockup,
  CloudflareSettingsMockup,
} from './Mockups';



const stepHints = {
  'github-0': {
    description: 'Nadaj nazwę kebab-case bez spacji. Publiczne dla open source, prywatne dla projektów komercyjnych.',
    mockup: <GithubRepoMockup />,
    links: [{ label: 'Otwórz GitHub New', url: 'https://github.com/new', primary: true }],
    tips: ['Zostaw "Initialize with README" odznaczone jeśli masz już lokalny kod'],
  },
  'github-1': {
    description: 'Trzy ścieżki — wybierz tę pasującą do Twojego workflow.',
    tabs: [
      {
        label: 'Lokalnie',
        content: (
          <Terminal lines={['cd moj-projekt', 'git init', 'git remote add origin https://github.com/artur/moj-projekt.git']} />
        ),
      },
      {
        label: 'Lovable',
        content: (
          <div className="text-[12px] text-zinc-400 leading-relaxed space-y-1.5">
            <div className="text-zinc-300">
              <span className="font-medium text-zinc-100">Project Settings</span> →{' '}
              <span className="font-medium text-zinc-100">GitHub</span> →{' '}
              <span className="font-medium text-zinc-100">Connect to GitHub</span>
            </div>
            <div>Lovable automatycznie utworzy repo i wypchnie kod.</div>
          </div>
        ),
      },
      {
        label: 'AI Studio',
        content: (
          <div className="space-y-2.5">
            <div className="text-[12px] text-zinc-400 leading-relaxed">Pobierz ZIP z aplikacji, rozpakuj, potem ręcznie:</div>
            <Terminal lines={['cd ai-studio-export', 'git init', 'git add .']} />
          </div>
        ),
      },
    ],
    links: [
      { label: 'Lovable docs', url: 'https://docs.lovable.dev' },
      { label: 'AI Studio', url: 'https://aistudio.google.com' },
    ],
  },
  'github-2': {
    description: 'Klasyczna trójka komend git. Branch domyślny: main.',
    mockup: (
      <Terminal lines={['git add .', 'git commit -m "Initial commit"', 'git branch -M main', 'git push -u origin main']} />
    ),
    tips: ['Pierwszy push wymaga uwierzytelnienia — użyj Personal Access Token lub SSH'],
  },
  'vercel-0': {
    description: 'Logowanie przez GitHub daje natychmiastowy dostęp do listy Twoich repo.',
    links: [{ label: 'Vercel Signup', url: 'https://vercel.com/signup', primary: true }],
    tips: ['Plan Hobby (free) wystarczy do uruchomienia projektu pod własną domeną'],
  },
  'vercel-1': {
    description: 'Biały przycisk w prawym górnym rogu dashboardu.',
    mockup: <VercelAddNewMockup />,
    links: [{ label: 'Dashboard', url: 'https://vercel.com/dashboard', primary: true }],
  },
  'vercel-2': {
    description: 'Wybierz repozytorium z listy — Vercel wykryje framework automatycznie.',
    tips: [
      'Jeśli nie widzisz repo: Configure GitHub App — daj dostęp do organizacji',
      'Monorepo? Ustaw Root Directory w opcjach',
    ],
  },
  'vercel-3': {
    description: 'Auto-detekcja zazwyczaj jest poprawna. Build Command i Output Directory pojawią się automatycznie.',
    mockup: <VercelFrameworkMockup />,
    tips: ['Vite: build = vite build, output = dist', 'Next.js: nic nie ruszaj, defaults działają'],
  },
  'vercel-4': {
    description: 'Pierwszy deploy trwa zwykle 20–60s. URL będzie aktywny od razu po Ready.',
    mockup: <VercelDeployedMockup />,
    tips: ['Każdy push do main = nowy production deploy', 'Pull request = automatyczny preview URL'],
  },
  'cloudflare-0': {
    description: 'Cloudflare przeskanuje istniejące rekordy DNS u rejestratora — zaakceptuj to co się wczyta.',
    links: [{ label: 'Add a site', url: 'https://dash.cloudflare.com/?to=/:account/add-site', primary: true }],
    tips: ['Plan Free wystarczy w 100% do tego setupu'],
  },
  'cloudflare-1': {
    description: 'Cloudflare przydzieli Ci 2 dedykowane nameservery. Wklej je w panelu rejestratora w miejsce dotychczasowych.',
    mockup: <CloudflareNSMockup />,
    tips: [
      'Nameservery są unikalne dla Twojego konta — nie kopiuj cudzych',
      'Po zmianie NS rejestrator może wymagać odznaczenia "default DNS"',
    ],
  },
  'cloudflare-2': {
    description: 'Zwykle 5–30 minut, czasem do 48h. Sprawdź propagację globalnie.',
    links: [
      { label: 'whatsmydns.net', url: 'https://www.whatsmydns.net', primary: true },
      { label: 'dnschecker.org', url: 'https://dnschecker.org' },
    ],
    tips: ['Cloudflare wyśle Ci maila gdy domena będzie Active'],
  },
  'cloudflare-3': {
    description: 'Trzy szybkie ustawienia po aktywacji domeny — znacząco poprawiają bezpieczeństwo i wydajność strony.',
    mockup: <CloudflareSettingsMockup />,
    tabs: [
      {
        label: 'SSL/TLS',
        content: (
          <div className="space-y-2 text-[12px]">
            <p className="text-zinc-300">Przejdź do <span className="font-mono text-orange-300">SSL/TLS → Overview</span> i ustaw tryb na <strong className="text-white">Full (strict)</strong>.</p>
            <p className="text-zinc-500">Weryfikuje certyfikat Vercel — bez tego przeglądarki mogą pokazywać ostrzeżenie o bezpieczeństwie.</p>
          </div>
        ),
      },
      {
        label: 'Speed',
        content: (
          <div className="space-y-2 text-[12px]">
            <p className="text-zinc-300">Przejdź do <span className="font-mono text-orange-300">Speed → Optimization</span> i włącz <strong className="text-white">Auto Minify</strong> (HTML + CSS + JS).</p>
            <p className="text-zinc-500">Cloudflare usuwa zbędne spacje i komentarze — strona ładuje się szybciej.</p>
          </div>
        ),
      },
      {
        label: 'HTTPS redirect',
        content: (
          <div className="space-y-2 text-[12px]">
            <p className="text-zinc-300">Przejdź do <span className="font-mono text-orange-300">SSL/TLS → Edge Certificates</span> i włącz <strong className="text-white">Always Use HTTPS</strong>.</p>
            <p className="text-zinc-500">Każdy kto wejdzie przez http:// zostanie automatycznie przekierowany na https://.</p>
          </div>
        ),
      },
    ],
    tips: [
      'Te 3 ustawienia to absolutne minimum — zajmą łącznie 2 minuty',
      'Opcjonalnie: Bots Fight Mode (Security → Bots) dla ochrony przed botami',
    ],
  },
  'link-0': {
    description: 'Wpisz domenę bez https://. Vercel od razu zwróci listę rekordów do dodania.',
    mockup: <VercelDomainsMockup />,
  },
  'link-1': {
    description: 'Dwa typowe scenariusze — wybierz odpowiedni dla swojej domeny.',
    tabs: [
      {
        label: 'Apex (domena.pl)',
        content: <Terminal title="dns records" lines={['Type: A', 'Name: @', 'Value: 76.76.21.21']} />,
      },
      {
        label: 'Subdomena (www)',
        content: <Terminal title="dns records" lines={['Type: CNAME', 'Name: www', 'Value: cname.vercel-dns.com']} />,
      },
    ],
  },
  'link-2': {
    description: 'DNS → Records → Add record. Dla każdego rekordu osobny wpis.',
    mockup: <CloudflareDNSMockup />,
  },
  'link-3': {
    description: 'KRYTYCZNE: kliknij pomarańczową chmurką żeby zmieniła się na szarą. Inaczej Vercel nie wystawi certyfikatu SSL.',
    mockup: <ProxyToggleMockup />,
    tips: [
      'Pomarańczowa chmurka = ruch przez proxy Cloudflare (CDN + WAF)',
      'Szara chmurka = czyste DNS, ruch idzie bezpośrednio do Vercela',
      'Vercel sam świadczy CDN i SSL — nie potrzebujesz proxy Cloudflare',
    ],
  },
  'link-4': {
    description: "Po dodaniu rekordów Vercel automatycznie wyemituje certyfikat Let's Encrypt. Zielony status = gotowe.",
    tips: [
      'Pierwsza weryfikacja: 1–5 minut po dodaniu rekordów',
      'Jeśli zostaje "Invalid Configuration" — sprawdź czy proxy = DNS only',
    ],
  },
};

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

const VercelConnect = ({ token, onTokenChange, status, data }) => {
  const [input, setInput] = useState(token);

  const handleConnect = () => {
    const t = input.trim();
    if (!t) return;
    localStorage.setItem('vercel_token', t);
    onTokenChange(t);
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
          <span className="text-[12px] text-emerald-300 font-medium">Vercel API — połączono</span>
          {data && (
            <span className="text-[11px] text-zinc-500 hidden sm:inline">
              {data.projects.length} proj.{deployReady ? ' · READY ✓' : ''}
            </span>
          )}
        </div>
        <button onClick={handleDisconnect} className="flex-shrink-0 text-[11px] text-zinc-600 hover:text-zinc-400 transition-colors px-2 py-0.5 rounded border border-zinc-800 hover:border-zinc-700">
          rozłącz
        </button>
      </div>
    );
  }

  return (
    <div className="mx-5 sm:mx-6 mb-3 p-3 rounded-lg bg-zinc-900/50 border border-zinc-800/60 space-y-2">
      <div className="flex items-center justify-between gap-2">
        <span className="text-[12px] text-zinc-400 font-medium">Auto-weryfikacja przez Vercel API</span>
        <a href="https://vercel.com/account/tokens" target="_blank" rel="noopener noreferrer" className="text-[10.5px] text-zinc-600 hover:text-indigo-400 flex items-center gap-1 transition-colors">
          <ExternalLink className="w-2.5 h-2.5" />utwórz token
        </a>
      </div>
      {status === 'error' && (
        <div className="flex items-center gap-1.5 text-[11px] text-red-400">
          <AlertTriangle className="w-3 h-3 flex-shrink-0" strokeWidth={2} />
          Nieprawidłowy token lub brak uprawnień
        </div>
      )}
      <div className="flex gap-2">
        <input
          type="password"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleConnect()}
          placeholder="Wklej token Vercel..."
          className="flex-1 px-2.5 py-1.5 rounded-md bg-zinc-950 border border-zinc-800 text-[12px] font-mono text-zinc-300 placeholder-zinc-700 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 min-w-0"
        />
        <button
          onClick={handleConnect}
          disabled={!input.trim() || status === 'loading'}
          className="flex-shrink-0 px-3 py-1.5 rounded-md bg-indigo-500 hover:bg-indigo-400 disabled:opacity-40 disabled:cursor-not-allowed text-white text-[12px] font-medium transition-colors"
        >
          {status === 'loading' ? '...' : 'Połącz'}
        </button>
      </div>
      <p className="text-[10.5px] text-zinc-600">Token zapisywany lokalnie w przeglądarce — nie opuszcza Twojego urządzenia</p>
    </div>
  );
};

const StepRow = ({ text, checked, onToggle, hint, hintOpen, onToggleHint, meta, disabled, apiVerified }) => (
  <div className="group/step">
    <div className={`flex items-start gap-2 py-2 px-2 -mx-2 rounded-md transition-colors duration-150 ${!disabled && !apiVerified ? 'hover:bg-white/[0.025]' : ''}`}>
      <button
        onClick={disabled || apiVerified ? undefined : onToggle}
        className={`mt-0.5 flex-shrink-0 ${disabled ? 'cursor-not-allowed' : apiVerified ? 'cursor-default' : ''}`}
        aria-label={disabled ? 'Zablokowane' : apiVerified ? 'Zweryfikowane przez API' : checked ? 'Oznacz jako niewykonane' : 'Oznacz jako wykonane'}
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
        className={`flex-1 text-left text-[13.5px] leading-relaxed transition-all duration-200 ${
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
          aria-label={hintOpen ? 'Ukryj podpowiedź' : 'Pokaż podpowiedź'}
          title={hintOpen ? 'Ukryj podpowiedź' : 'Pokaż podpowiedź'}
        >
          <HelpCircle className="w-3.5 h-3.5" strokeWidth={1.75} />
          <span className="text-[10px] font-medium hidden sm:inline">{hintOpen ? 'ukryj' : 'info'}</span>
        </button>
      )}
    </div>
    <HintPanel hint={hint} open={hintOpen} />
  </div>
);

const phases = [
  {
    id: 'github',
    number: '01',
    platform: 'GitHub',
    description: 'Kontrola wersji i repozytorium',
    descriptionEn: 'Source control & repository',
    icon: Github,
    steps: [
      'Utwórz repozytorium publiczne lub prywatne',
      'Zainicjuj git lokalnie lub eksportuj z Lovable / AI Studio',
      'Wykonaj pierwszy commit i push do origin/main',
    ],
  },
  {
    id: 'vercel',
    number: '02',
    platform: 'Vercel',
    description: 'Budowanie, hosting i wdrożenie',
    descriptionEn: 'Build, host & deploy',
    icon: Server,
    steps: [
      'Załóż konto na vercel.com (zaloguj przez GitHub)',
      'Kliknij "Add New Project"',
      'Zaimportuj repozytorium z GitHub',
      'Skonfiguruj framework preset (Vite / Next.js)',
      'Kliknij Deploy — zanotuj domyślny URL .vercel.app',
    ],
  },
  {
    id: 'cloudflare',
    number: '03',
    platform: 'Cloudflare DNS',
    description: 'Zarządzanie DNS i propagacja',
    descriptionEn: 'DNS management & propagation',
    icon: Globe,
    badge: 'maks. 48h',
    steps: [
      'Dodaj domenę do Cloudflare',
      'Skopiuj Nameservery i wklej w panelu rejestratora',
      'Poczekaj na propagację DNS',
      'Skonfiguruj SSL, Speed i HTTPS redirect',
    ],
  },
  {
    id: 'link',
    number: '04',
    platform: 'Vercel ↔ Cloudflare',
    description: 'Podłączenie domeny produkcyjnej',
    descriptionEn: 'Production domain connection',
    icon: Shield,
    steps: [
      'W Vercel → Project Settings → Domains dodaj własną domenę',
      'Skopiuj rekordy CNAME / A wskazane przez Vercela',
      'Wklej rekordy w Cloudflare → DNS → Records',
      'Wyłącz pomarańczową chmurę (Proxy OFF → DNS only)',
      'Zweryfikuj domenę po stronie Vercel',
    ],
  },
];

const ALL_STEP_KEYS = phases.flatMap((p) => p.steps.map((_, i) => `${p.id}-${i}`));

const stepMeta = {
  'github-0':    { Icon: MousePointerClick, color: 'text-blue-400',   bg: 'bg-blue-400/10',   label: 'przeglądarka' },
  'github-1':    { Icon: TerminalIcon,      color: 'text-emerald-400', bg: 'bg-emerald-400/10', label: 'terminal' },
  'github-2':    { Icon: TerminalIcon,      color: 'text-emerald-400', bg: 'bg-emerald-400/10', label: 'terminal' },
  'vercel-0':    { Icon: MousePointerClick, color: 'text-blue-400',   bg: 'bg-blue-400/10',   label: 'przeglądarka' },
  'vercel-1':    { Icon: MousePointerClick, color: 'text-blue-400',   bg: 'bg-blue-400/10',   label: 'kliknij' },
  'vercel-2':    { Icon: MousePointerClick, color: 'text-blue-400',   bg: 'bg-blue-400/10',   label: 'przeglądarka' },
  'vercel-3':    { Icon: Settings,          color: 'text-violet-400', bg: 'bg-violet-400/10', label: 'konfiguracja' },
  'vercel-4':    { Icon: CheckCircle,       color: 'text-emerald-400', bg: 'bg-emerald-400/10', label: 'weryfikacja' },
  'cloudflare-0':{ Icon: MousePointerClick, color: 'text-blue-400',   bg: 'bg-blue-400/10',   label: 'przeglądarka' },
  'cloudflare-1':{ Icon: Copy,             color: 'text-amber-400',  bg: 'bg-amber-400/10',  label: 'kopiuj' },
  'cloudflare-2':{ Icon: Clock,            color: 'text-amber-400',  bg: 'bg-amber-400/10',  label: 'oczekiwanie' },
  'cloudflare-3':{ Icon: Shield,           color: 'text-emerald-400', bg: 'bg-emerald-400/10', label: 'konfiguracja' },
  'link-0':      { Icon: Settings,          color: 'text-violet-400', bg: 'bg-violet-400/10', label: 'konfiguracja' },
  'link-1':      { Icon: Copy,             color: 'text-amber-400',  bg: 'bg-amber-400/10',  label: 'kopiuj' },
  'link-2':      { Icon: MousePointerClick, color: 'text-blue-400',   bg: 'bg-blue-400/10',   label: 'przeglądarka' },
  'link-3':      { Icon: AlertTriangle,    color: 'text-red-400',    bg: 'bg-red-400/10',    label: 'uwaga!' },
  'link-4':      { Icon: CheckCircle,       color: 'text-emerald-400', bg: 'bg-emerald-400/10', label: 'weryfikacja' },
};

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

const StatusBadge = ({ status }) => {
  const config = {
    pending: { label: 'Oczekuje', cls: 'bg-zinc-800/60 text-zinc-400 border-zinc-700/50', dot: 'bg-zinc-500' },
    progress: { label: 'W toku', cls: 'bg-amber-500/10 text-amber-300 border-amber-500/30', dot: 'bg-amber-400 animate-pulse' },
    done: { label: 'Gotowe', cls: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30', dot: 'bg-emerald-400' },
  };
  const c = config[status];
  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10.5px] font-medium uppercase tracking-wider border ${c.cls}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {c.label}
    </div>
  );
};

const PhaseCard = ({ phase, status, checked, onToggle, openHints, onToggleHint, index, isLocked, topWidget, apiVerified, optional }) => {
  const Icon = phase.icon;
  const done = status === 'done';
  return (
    <div className={`relative pl-12 sm:pl-16 transition-opacity duration-500 ${isLocked ? 'opacity-50' : 'opacity-100'}`} style={{ animation: `fadeUp 0.5s ease-out ${0.1 * index + 0.3}s both` }}>
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
              KROK {phase.number}
            </Badge>
            {optional && (
              <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700 uppercase tracking-wider">Opcjonalne</span>
            )}
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className={`text-[15px] sm:text-base font-semibold tracking-tight ${isLocked ? 'text-zinc-500' : 'text-zinc-100'}`}>{phase.platform}</h3>
                {phase.badge && (
                  <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 uppercase tracking-wider">{phase.badge}</span>
                )}
              </div>
              <p className="text-[12.5px] text-zinc-500 mt-0.5">{phase.description}</p>
              {phase.descriptionEn && <p className="text-[10.5px] text-zinc-700 mt-0">{phase.descriptionEn}</p>}
            </div>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="hidden sm:block">
              {isLocked
                ? <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10.5px] font-medium uppercase tracking-wider border bg-zinc-900/60 text-zinc-600 border-zinc-800/50"><Lock className="w-3 h-3" strokeWidth={2} />Zablokowane</div>
                : <StatusBadge status={status} />
              }
            </div>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-colors duration-300 ${done ? 'bg-indigo-500/10 border-indigo-500/30' : 'bg-zinc-900 border-zinc-800'}`}>
              <Icon className={`w-5 h-5 transition-colors duration-300 ${done ? 'text-indigo-300' : isLocked ? 'text-zinc-600' : 'text-zinc-400'}`} strokeWidth={1.5} />
            </div>
          </div>
        </div>
        <div className="sm:hidden px-5 pb-2">
          {isLocked
            ? <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10.5px] font-medium uppercase tracking-wider border bg-zinc-900/60 text-zinc-600 border-zinc-800/50"><Lock className="w-3 h-3" strokeWidth={2} />Zablokowane</div>
            : <StatusBadge status={status} />
          }
        </div>
        {isLocked && (
          <div className="mx-5 sm:mx-6 mb-3 flex items-center gap-2 px-3 py-2 rounded-md bg-zinc-900/60 border border-zinc-800/50">
            <Lock className="w-3 h-3 text-zinc-600 flex-shrink-0" strokeWidth={2} />
            <span className="text-[11.5px] text-zinc-600">
              Ukończ fazę {String(index).padStart(2, '0')}, żeby odblokować
            </span>
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
              />
            );
          })}
        </div>
      </Card>
    </div>
  );
};

const quickLinks = [
  { label: 'GitHub', host: 'github.com', url: 'https://github.com', icon: Github },
  { label: 'Vercel', host: 'vercel.com', url: 'https://vercel.com', icon: Server },
  { label: 'Cloudflare', host: 'cloudflare.com', url: 'https://cloudflare.com', icon: Globe },
];

export default function DeployPipelineGuide({ onOpenWizard, onOpenPdf, dark, toggleTheme }) {
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

  const toggleStep = (key) => setChecked((prev) => ({ ...prev, [key]: !prev[key] }));
  const toggleHint = (key) => setOpenHints((prev) => ({ ...prev, [key]: !prev[key] }));
  const reset = () => { setChecked({}); setOpenHints({}); window.history.replaceState(null, '', window.location.pathname); };

  const share = () => {
    const url = `${window.location.href.split('#')[0]}#s=${encodeChecked(checked)}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

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
  const phaseIsLocked = (idx) => getPhaseIsLocked(idx);

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
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="w-7 h-7 rounded-md bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-sm font-semibold tracking-tight hidden sm:block">Pipeline Wdrożeniowy</span>
          </div>
          <div className="flex-1 flex items-center gap-3 min-w-0">
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10.5px] uppercase tracking-[0.18em] text-zinc-500 font-medium">Postęp</span>
                <span className="text-[11px] font-mono text-zinc-300">{completedSteps}/{totalSteps} · {Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-1.5 bg-zinc-900 [&>div]:bg-gradient-to-r [&>div]:from-indigo-500 [&>div]:to-indigo-400 [&>div]:transition-all [&>div]:duration-500" />
            </div>
            {onOpenWizard && (
              <Button onClick={onOpenWizard} variant="outline" size="sm" title="Auto Deploy Wizard — wgraj pliki i deployuj automatycznie" className="bg-transparent border-zinc-800 hover:bg-zinc-900 hover:border-indigo-700/60 text-indigo-400/80 hover:text-indigo-300 text-xs h-8 px-3 flex-shrink-0 gap-1.5">
                <Rocket className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Wizard</span>
              </Button>
            )}
            <Button onClick={onOpenPdf} variant="outline" size="sm" className="bg-transparent border-zinc-800 hover:bg-zinc-900 hover:border-zinc-700 text-purple-400/80 hover:text-purple-300 text-xs h-8 px-3 flex-shrink-0 gap-1.5" title="Przewodnik ebook">
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Ebook</span>
            </Button>
            <Button onClick={share} variant="outline" size="sm" title="Udostępnij link do tej strony" className="bg-transparent border-zinc-800 hover:bg-zinc-900 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200 text-xs h-8 px-3 flex-shrink-0">
              {copied ? <Check className="w-3 h-3 mr-1.5 text-emerald-400" /> : <Copy className="w-3 h-3 mr-1.5" />}
              <span className="hidden sm:inline">{copied ? 'Skopiowano!' : 'Udostępnij'}</span>
            </Button>
            <Button onClick={reset} variant="outline" size="sm" title="Resetuj pasek postępu" className="bg-transparent border-zinc-800 hover:bg-zinc-900 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200 text-xs h-8 px-3 flex-shrink-0">
              <RotateCcw className="w-3 h-3 mr-1.5" />
              <span className="hidden sm:inline">Resetuj</span>
            </Button>
            <Button onClick={toggleTheme} variant="outline" size="sm" title={dark ? 'Przełącz na tryb jasny ☀️' : 'Przełącz na tryb ciemny 🌙'} className="bg-transparent border-zinc-800 hover:bg-zinc-900 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200 text-xs h-8 w-8 px-0 flex-shrink-0 flex items-center justify-center">
              {dark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </Button>
          </div>
        </div>
      </header>

      <main className="relative max-w-3xl mx-auto px-4 sm:px-6 pt-12 sm:pt-20 pb-32">
        <section className="text-center mb-16 sm:mb-24" style={{ animation: 'fadeUp 0.6s ease-out' }}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            <span className="text-[11px] uppercase tracking-[0.15em] text-indigo-300 font-medium">Workflow Produkcyjny</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent mb-4">
            Konfiguracja Pipeline Wdrożeniowego
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
            Kliknij ikonkę przy kroku, żeby zobaczyć podpowiedź wizualną
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
                  <div className="pl-12 sm:pl-16" style={{ animation: `fadeUp 0.5s ease-out 0.1s both` }}>
                    <button
                      onClick={() => setNoDomain(v => !v)}
                      className={`w-full flex items-center justify-between gap-4 p-3.5 rounded-xl border transition-all duration-200 text-left ${
                        noDomain
                          ? 'border-indigo-500/40 bg-indigo-500/[0.07]'
                          : 'border-zinc-800 bg-zinc-900/40 hover:border-zinc-700'
                      }`}
                    >
                      <div>
                        <p className="text-[13px] font-medium text-zinc-200">Nie mam własnej domeny</p>
                        <p className="text-[11.5px] text-zinc-500 mt-0.5">
                          {noDomain ? 'Fazy 3 i 4 są opcjonalne — strona jest live na .vercel.app' : 'Fazy 3 i 4 staną się opcjonalne — strona działa też na .vercel.app'}
                        </p>
                      </div>
                      <div className={`relative flex-shrink-0 w-10 h-6 rounded-full transition-colors duration-200 ${noDomain ? 'bg-indigo-500' : 'bg-zinc-700'}`}>
                        <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${noDomain ? 'translate-x-5' : 'translate-x-1'}`} />
                      </div>
                    </button>
                  </div>
                )}
                {idx === 3 && (
                  <div className="pl-12 sm:pl-16" style={{ animation: `fadeUp 0.5s ease-out ${0.1 * idx + 0.25}s both` }}>
                    <Alert className="bg-amber-500/[0.04] border-amber-500/30 backdrop-blur-sm">
                      <AlertTriangle className="w-4 h-4 !text-amber-400" />
                      <AlertTitle className="text-amber-300 font-semibold text-[13px]">
                        Wyłącz Cloudflare Proxy dla domeny Vercel
                      </AlertTitle>
                      <AlertDescription className="text-amber-200/70 text-[12.5px] leading-relaxed mt-1">
                        Pomarańczowa chmurka (Proxy ON) blokuje weryfikację certyfikatu SSL przez Vercela. Ustaw{' '}
                        <span className="font-mono text-amber-200">DNS only</span> — szara chmurka — przed zapisaniem rekordów.
                      </AlertDescription>
                    </Alert>
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
                  isLocked={phaseIsLocked(idx)}
                  apiVerified={apiVerified}
                  optional={noDomain && idx >= 2}
                  topWidget={phase.id === 'vercel' && !phaseIsLocked(idx) ? (
                    <VercelConnect
                      token={vercelToken}
                      onTokenChange={setVercelToken}
                      status={vercelApiStatus}
                      data={vercelApiData}
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
                    {noDomain ? 'Strona jest live! 🚀' : 'Pipeline gotowy! 🎉'}
                  </h3>
                  <p className="text-sm text-zinc-400 mb-6 max-w-xs mx-auto leading-relaxed">
                    {noDomain
                      ? 'Aplikacja wdrożona na Vercelu i dostępna publicznie. Możesz podłączyć własną domenę w dowolnym momencie.'
                      : 'Wszystkie fazy ukończone. Twoja aplikacja działa pod własną domeną z SSL i CDN Cloudflare.'}
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
                      Strona dostępna publicznie
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })()}

        <footer className="mt-20 pt-8 border-t border-zinc-800 text-center space-y-1.5">
          <p className="text-sm text-zinc-400">
            Created by{' '}
            <a href="mailto:artur.nawrowski@gmail.com" className="text-indigo-400 hover:text-indigo-300 transition-colors font-medium">ArChi</a>
            {' '}for{' '}
            <a href="https://webtolearn.pl" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 transition-colors font-medium">WebToLearn</a>
          </p>
          <p className="text-xs text-zinc-500">
            Copyright by Krajowe Centrum Badań Sztucznej Inteligencji{' '}
            <a href="https://kcbsi.pl" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors">kcbsi.pl</a>
            {' '}2026
          </p>
        </footer>
      </main>

      <aside className="hidden lg:block fixed right-6 top-1/2 -translate-y-1/2 z-20">
        <div className="w-52 rounded-xl border border-zinc-800 bg-zinc-950/80 backdrop-blur-xl p-3 shadow-2xl">
          <div className="flex items-center gap-2 px-2 pb-2 mb-1 border-b border-zinc-900">
            <ExternalLink className="w-3 h-3 text-zinc-500" />
            <span className="text-[10.5px] uppercase tracking-[0.15em] text-zinc-500 font-medium">Szybkie linki</span>
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
