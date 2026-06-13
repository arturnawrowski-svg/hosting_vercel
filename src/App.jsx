import { useState } from 'react';
import DeployPipelineGuide from './components/DeployPipelineGuide';
import DeployWizard from './components/DeployWizard';
import './index.css';

export default function App() {
  const isWizard = new URLSearchParams(window.location.search).has('wizard');
  const [showWizard] = useState(isWizard);

  function openWizard() {
    window.open(`${window.location.origin}/?wizard`, '_blank');
  }

  if (showWizard) {
    return <DeployWizard onBack={() => { window.location.href = '/'; }} />;
  }
  return <DeployPipelineGuide onOpenWizard={openWizard} />;
}
