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
  const params   = new URLSearchParams(window.location.search);
  const isWizard = params.has('wizard');
  const isPdf    = params.has('pdf');
  const [dark, toggleTheme] = useTheme();
  const [lang, toggleLang]  = useLanguage();

  function openWizard() {
    const q = lang === 'en' ? '?wizard&lang=en' : '?wizard';
    window.open(`${window.location.origin}/${q}`, '_blank');
  }
  function openPdf() {
    const q = lang === 'en' ? '?pdf&lang=en' : '?pdf';
    window.open(`${window.location.origin}/${q}`, '_blank');
  }
  function goHome()     { window.location.href = '/'; }

  if (isWizard) return <DeployWizard onBack={goHome} dark={dark} toggleTheme={toggleTheme} lang={lang} toggleLang={toggleLang} />;
  if (isPdf)    return <PdfGuide onClose={goHome} lang={lang} />;
  return (
    <DeployPipelineGuide
      onOpenWizard={openWizard}
      onOpenPdf={openPdf}
      dark={dark}
      toggleTheme={toggleTheme}
      lang={lang}
      toggleLang={toggleLang}
    />
  );
}
