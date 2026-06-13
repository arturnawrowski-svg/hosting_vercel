import { useState } from 'react';
import DeployPipelineGuide from './components/DeployPipelineGuide';
import DeployWizard from './components/DeployWizard';
import './index.css';

export default function App() {
  const [showWizard, setShowWizard] = useState(false);
  return showWizard
    ? <DeployWizard onBack={() => setShowWizard(false)} />
    : <DeployPipelineGuide onOpenWizard={() => setShowWizard(true)} />;
}
