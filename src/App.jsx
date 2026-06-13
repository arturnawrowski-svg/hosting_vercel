import { useState, useEffect } from 'react';
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
  const isWizardUrl = params.has('wizard'); // legacy URL access
  const isPdf       = params.has('pdf');
  const [dark, toggleTheme] = useTheme();
  const [lang, toggleLang]  = useLanguage();
  const [wizardOpen, setWizardOpen] = useState(false);

  // Lifted from DeployPipelineGuide — shared between guide and wizard
  const [checked, setChecked] = useState({});

  // Called by wizard when it completes a step → immediately checks off guide steps
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

  // Legacy: direct ?wizard URL (bookmarks, old links)
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
    onOpenWizard: () => setWizardOpen(true),
    onOpenPdf: openPdf,
    dark,
    toggleTheme,
    lang,
    toggleLang,
    wizardOpen,
  };

  // Normal view (no wizard)
  if (!wizardOpen) return <DeployPipelineGuide {...guideProps} />;

  // Split-screen: guide left + wizard right
  return (
    <div className="flex h-screen overflow-hidden bg-zinc-950">
      {/* Left panel: Guide — narrower, hidden on mobile */}
      <div className="hidden lg:flex lg:flex-col lg:flex-none lg:w-[420px] overflow-y-auto">
        <DeployPipelineGuide {...guideProps} />
      </div>

      {/* Divider */}
      <div className="hidden lg:block w-px bg-zinc-800 flex-shrink-0" />

      {/* Right panel: Wizard — takes remaining space */}
      <div className="flex-1 overflow-y-auto">
        <DeployWizard
          onClose={() => setWizardOpen(false)}
          onStepsDone={onStepsDone}
          dark={dark}
          toggleTheme={toggleTheme}
          lang={lang}
        />
      </div>
    </div>
  );
}
