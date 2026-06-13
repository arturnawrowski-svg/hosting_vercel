import { useState } from 'react';
import DeployPipelineGuide from './components/DeployPipelineGuide';
import DeployWizard from './components/DeployWizard';
import PdfGuide from './components/PdfGuide';
import './index.css';

export default function App() {
  const params = new URLSearchParams(window.location.search);
  const isWizard = params.has('wizard');
  const isPdf    = params.has('pdf');

  function openWizard() { window.open(`${window.location.origin}/?wizard`, '_blank'); }
  function openPdf()    { window.open(`${window.location.origin}/?pdf`,    '_blank'); }
  function goHome()     { window.location.href = '/'; }

  if (isWizard) return <DeployWizard onBack={goHome} />;
  if (isPdf)    return <PdfGuide onClose={goHome} />;
  return <DeployPipelineGuide onOpenWizard={openWizard} onOpenPdf={openPdf} />;
}
