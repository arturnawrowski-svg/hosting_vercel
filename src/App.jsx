import { useState, useEffect } from 'react';
import { Rocket } from 'lucide-react';
import DeployPipelineGuide from './components/DeployPipelineGuide';
import DeployWizard from './components/DeployWizard';
import PdfGuide from './components/PdfGuide';
import { getT } from './translations';
import './index.css';

function useTheme() {
  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem('theme');
    if (stored !== null) return stored === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);
  return [dark, () => setDark(d => !d)];
}

function useLanguage() {
  const urlLang = new URLSearchParams(window.location.search).get('lang');
  const [lang, setLang] = useState(() => urlLang || localStorage.getItem('lang') || 'pl');

  useEffect(() => {
    localStorage.setItem('lang', lang);
    const url = new URL(window.location.href);
    if (lang === 'en') url.searchParams.set('lang', 'en');
    else url.searchParams.delete('lang');
    window.history.replaceState({}, '', url.toString());

    const t = getT(lang);
    document.title = t.meta.title;
    document.documentElement.setAttribute('lang', t.meta.lang);
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = t.meta.description;
  }, [lang]);

  const toggleLang = () => setLang(l => (l === 'pl' ? 'en' : 'pl'));
  return [lang, toggleLang];
}

export default function App() {
  const params      = new URLSearchParams(window.location.search);
  const isWizardUrl = params.has('wizard');
  const isPdf       = params.has('pdf');
  const [dark, toggleTheme] = useTheme();
  const [lang, toggleLang]  = useLanguage();
  const [wizardOpen, setWizardOpen]           = useState(false);
  const [wizardCollapsed, setWizardCollapsed] = useState(false);

  const [checked, setChecked] = useState({});

  const onStepsDone = (keys) => {
    setChecked(prev => {
      const next = { ...prev };
      keys.forEach(k => { next[k] = true; });
      return next;
    });
  };

  function openPdf() {
    const q = lang === 'en' ? '?pdf&lang=en' : '?pdf';
    window.open(`${window.location.origin}/${q}`, '_blank');
  }
  function goHome() { window.location.href = '/'; }

  function openWizard() {
    setWizardOpen(true);
    setWizardCollapsed(false);
  }

  if (isWizardUrl) return (
    <DeployWizard
      onClose={goHome}
      onStepsDone={onStepsDone}
      dark={dark}
      toggleTheme={toggleTheme}
      lang={lang}
    />
  );

  if (isPdf) return <PdfGuide onClose={goHome} lang={lang} />;

  const guideProps = {
    checked,
    setChecked,
    onOpenWizard: openWizard,
    onOpenPdf: openPdf,
    dark,
    toggleTheme,
    lang,
    toggleLang,
    wizardOpen,
  };

  if (!wizardOpen) return <DeployPipelineGuide {...guideProps} />;

  // Split-screen: guide left + wizard right (or collapsed tab)
  return (
    <div className="flex h-screen overflow-hidden bg-zinc-950">
      {/* Left panel: Guide — full width when collapsed, fixed 420px otherwise */}
      <div className={
        wizardCollapsed
          ? 'flex flex-col flex-1 min-w-0 overflow-y-auto'
          : 'hidden lg:flex lg:flex-col lg:flex-none lg:w-[420px] overflow-y-auto'
      }>
        <DeployPipelineGuide {...guideProps} />
      </div>

      {/* Divider */}
      {!wizardCollapsed && <div className="hidden lg:block w-px bg-zinc-800 flex-shrink-0" />}

      {/* Right: full wizard OR collapsed clickable tab */}
      {wizardCollapsed ? (
        <div
          className="hidden lg:flex flex-col items-center justify-start gap-3 pt-6 w-11 flex-shrink-0 border-l border-zinc-800 bg-zinc-950 hover:bg-zinc-900 cursor-pointer transition-colors"
          onClick={() => setWizardCollapsed(false)}
          title="Otwórz Kreator Wdrożenia"
        >
          <Rocket className="w-4 h-4 text-indigo-400" />
          <span
            className="text-[10px] font-semibold tracking-[0.12em] text-zinc-500 hover:text-indigo-400 transition-colors uppercase"
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            Kreator
          </span>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto">
          <DeployWizard
            onClose={() => setWizardCollapsed(true)}
            onStepsDone={onStepsDone}
            dark={dark}
            toggleTheme={toggleTheme}
            lang={lang}
          />
        </div>
      )}
    </div>
  );
}
