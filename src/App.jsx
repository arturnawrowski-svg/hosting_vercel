import { useState, useEffect } from 'react';
import DeployPipelineGuide from './components/DeployPipelineGuide';
import DeployWizard from './components/DeployWizard';
import PdfGuide from './components/PdfGuide';
import './index.css';

function useTheme() {
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark');
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);
  return [dark, () => setDark(d => !d)];
}

export default function App() {
  const params   = new URLSearchParams(window.location.search);
  const isWizard = params.has('wizard');
  const isPdf    = params.has('pdf');
  const [dark, toggleTheme] = useTheme();

  function openWizard() { window.open(`${window.location.origin}/?wizard`, '_blank'); }
  function openPdf()    { window.open(`${window.location.origin}/?pdf`,    '_blank'); }
  function goHome()     { window.location.href = '/'; }

  if (isWizard) return <DeployWizard onBack={goHome} dark={dark} toggleTheme={toggleTheme} />;
  if (isPdf)    return <PdfGuide onClose={goHome} />;
  return <DeployPipelineGuide onOpenWizard={openWizard} onOpenPdf={openPdf} dark={dark} toggleTheme={toggleTheme} />;
}
