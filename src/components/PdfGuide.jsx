import React from 'react';
import {
  GithubRepoMockup, Terminal, VercelAddNewMockup, VercelFrameworkMockup,
  VercelDeployedMockup, CloudflareNSMockup, CloudflareDNSMockup,
  ProxyToggleMockup, VercelDomainsMockup, CloudflareSettingsMockup,
} from './Mockups';
import { getPdfT } from '../pdfTranslations';

const phaseColors = {
  '01': { bg: '#eef2ff', border: '#6366f1', text: '#4338ca', num: '#6366f1' },
  '02': { bg: '#f9fafb', border: '#374151', text: '#111827', num: '#374151' },
  '03': { bg: '#fff7ed', border: '#ea580c', text: '#9a3412', num: '#f6821f' },
  '04': { bg: '#ecfdf5', border: '#059669', text: '#065f46', num: '#10b981' },
};

/* Static mockup map — same for all languages */
const stepMockups = {
  '01-0': <GithubRepoMockup />,
  '01-1': <Terminal lines={['cd moj-projekt', 'git init', 'git remote add origin https://github.com/user/moj-projekt.git']} />,
  '01-2': <Terminal lines={['git add .', 'git commit -m "First version"', 'git branch -M main', 'git push -u origin main']} />,
  '02-0': null,
  '02-1': <VercelAddNewMockup />,
  '02-2': null,
  '02-3': <VercelFrameworkMockup />,
  '02-4': <VercelDeployedMockup />,
  '03-0': null,
  '03-1': <CloudflareNSMockup />,
  '03-2': null,
  '03-3': <CloudflareSettingsMockup />,
  '04-0': <VercelDomainsMockup />,
  '04-1': null,
  '04-2': <CloudflareDNSMockup />,
  '04-3': <ProxyToggleMockup />,
  '04-4': <VercelDeployedMockup />,
};

export default function PdfGuide({ onClose, lang = 'pl' }) {
  const t = getPdfT(lang);
  const { ui, phases } = t;

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-auto" style={{ fontFamily: '"EB Garamond", Garamond, "Times New Roman", ui-serif, serif' }}>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .page-break { page-break-before: always; }
          body { background: white !important; }
          #pdf-root { position: static !important; overflow: visible !important; }
        }
      `}</style>

      {/* Toolbar */}
      <div className="no-print sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between gap-4 shadow-sm">
        <div>
          <p className="text-sm font-semibold text-gray-800">{ui.toolbar.title}</p>
          <p className="text-xs text-gray-500">{ui.toolbar.hint}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => window.print()} className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors">
            {ui.toolbar.printBtn}
          </button>
          <button onClick={onClose} className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium transition-colors">
            {ui.toolbar.closeBtn}
          </button>
        </div>
      </div>

      {/* Document */}
      <div id="pdf-root" className="max-w-[760px] mx-auto px-10 py-12">

        {/* Cover */}
        <div className="text-center mb-14 pb-10 border-b-2 border-gray-200">
          <div className="inline-block px-4 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-medium uppercase tracking-widest mb-6">
            {ui.cover.badge}
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-3 leading-tight">{ui.cover.title}</h1>
          <p className="text-xl text-gray-500 mb-8">{ui.cover.subtitle}</p>
          <div className="flex items-center justify-center gap-6 text-sm text-gray-400">
            {ui.cover.flow.map((item, i) => <span key={i}>{item}</span>)}
          </div>
        </div>

        {/* Prerequisites */}
        <div className="mb-12 p-5 rounded-xl bg-amber-50 border border-amber-200">
          <p className="text-sm font-semibold text-amber-800 mb-2">{ui.prerequisites.title}</p>
          <ul className="text-sm text-amber-900 space-y-1">
            {ui.prerequisites.items.map((item, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: `✓ ${item}` }} />
            ))}
          </ul>
        </div>

        {/* Phases */}
        {phases.map((phase, phaseIdx) => {
          const c = phaseColors[phase.number];
          return (
            <div key={phase.number} className={phaseIdx > 0 ? 'page-break' : ''}>
              <div className="rounded-xl p-6 mb-6" style={{ backgroundColor: c.bg, borderLeft: `4px solid ${c.border}` }}>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg" style={{ backgroundColor: c.num }}>
                    {phase.number}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-0.5" style={{ color: c.text }}>{phase.platform}</h2>
                    <p className="text-sm font-medium" style={{ color: c.text, opacity: 0.7 }}>{phase.subtitle}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-gray-700 leading-relaxed">{phase.intro}</p>
              </div>

              <div className="space-y-8 mb-12">
                {phase.steps.map((step, i) => {
                  const mockupKey = `${phase.number}-${i}`;
                  const mockup = stepMockups[mockupKey];
                  return (
                    <div key={i} className="flex gap-4">
                      <div className="flex-shrink-0 flex flex-col items-center">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: c.num }}>
                          {i + 1}
                        </div>
                        {i < phase.steps.length - 1 && (
                          <div className="w-px flex-1 mt-1" style={{ backgroundColor: c.border, opacity: 0.2, minHeight: 20 }} />
                        )}
                      </div>
                      <div className="flex-1 pb-2">
                        <h3 className="text-base font-semibold text-gray-900 mb-3">{step.title}</h3>
                        <div className="grid gap-3">
                          <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{ui.labels.what}</p>
                            <p className="text-sm text-gray-700 leading-relaxed">{step.what}</p>
                          </div>
                          <div className="p-3 rounded-lg bg-white border border-gray-200">
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{ui.labels.how}</p>
                            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{step.how}</p>
                          </div>
                          {step.tip && (
                            <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
                              <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide mb-1">{ui.labels.tip}</p>
                              <p className="text-sm text-amber-800 leading-relaxed">{step.tip}</p>
                            </div>
                          )}
                          {mockup && (
                            <div className="rounded-xl overflow-hidden border border-gray-200 bg-[#0a0a0a] p-3">
                              {mockup}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Glossary */}
        <div className="page-break">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200">{ui.glossary.title}</h2>
          <div className="grid gap-3">
            {ui.glossary.items.map(({ term, def }) => (
              <div key={term} className="flex gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100">
                <span className="flex-shrink-0 font-semibold text-sm text-indigo-700 w-44">{term}</span>
                <span className="text-sm text-gray-700 leading-relaxed">{def}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t-2 border-gray-200 text-center space-y-1.5">
          <p className="text-sm text-gray-600">
            Created by{' '}
            <a href="mailto:artur.nawrowski@gmail.com" className="text-indigo-600 font-medium">ArChi</a>
            {' '}for{' '}
            <a href="https://webtolearn.pl" className="text-indigo-600 font-medium">WebToLearn</a>
          </p>
          <p className="text-xs text-gray-400">
            2026 Copyright by Krajowe Centrum Badań Sztucznej Inteligencji{' '}
            <a href="https://kcbsi.pl" className="text-gray-500">kcbsi.pl</a>
          </p>
        </div>

      </div>
    </div>
  );
}
