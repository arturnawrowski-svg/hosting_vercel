import { useState, useRef, useCallback } from 'react';
import {
  Upload, ChevronRight, ChevronLeft, Check, X, Loader2,
  ExternalLink, Eye, EyeOff, AlertCircle, FileText, Zap,
  Rocket, Key, Globe, Sun, Moon,
} from 'lucide-react';
import { getT } from '../translations';

// ─── utilities ────────────────────────────────────────────────────────────────

function toBase64(file) {
  return new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(r.result.split(',')[1]);
    r.onerror = rej;
    r.readAsDataURL(file);
  });
}

function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
}

async function collectEntry(entry, prefix, out) {
  if (entry.isFile) {
    const file = await new Promise((res, rej) => entry.file(res, rej));
    file._wizPath = prefix + entry.name;
    out.push(file);
  } else if (entry.isDirectory) {
    const reader = entry.createReader();
    let batch;
    do {
      batch = await new Promise((res, rej) => reader.readEntries(res, rej));
      for (const e of batch) await collectEntry(e, prefix + entry.name + '/', out);
    } while (batch.length > 0);
  }
}

function detectFramework(paths) {
  const names = paths.map(p => p.split('/').pop().toLowerCase());
  if (names.some(n => n === 'next.config.js' || n === 'next.config.ts')) return 'nextjs';
  if (names.some(n => n.startsWith('vite.config'))) return 'vite';
  return null;
}

async function ghReq(path, token, init = {}) {
  const r = await fetch(`https://api.github.com${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'X-GitHub-Api-Version': '2022-11-28',
      ...(init.headers || {}),
    },
  });
  const json = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(json.message || `GitHub error ${r.status}`);
  return json;
}

async function verReq(path, token, init = {}) {
  const r = await fetch(`https://api.vercel.com${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...(init.headers || {}),
    },
  });
  const json = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(json.error?.message || json.message || `Vercel error ${r.status}`);
  return json;
}

// ─── sub-components ───────────────────────────────────────────────────────────

function ExpandGuide({ title, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-2 rounded-lg border border-zinc-700/50 overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-3 py-2 text-xs text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/60 transition-colors text-left"
      >
        <span>{title}</span>
        <ChevronRight className={`w-3 h-3 shrink-0 transition-transform ${open ? 'rotate-90' : ''}`} />
      </button>
      {open && (
        <div className="px-4 py-3 text-xs text-zinc-400 space-y-1.5 bg-zinc-900/60 border-t border-zinc-700/40">
          {children}
        </div>
      )}
    </div>
  );
}

function SecretInput({ label, value, onChange, placeholder, guide, guideTitle }) {
  const [show, setShow] = useState(false);
  return (
    <div>
      <label className="block text-[13px] font-medium text-zinc-300 mb-1.5">{label}</label>
      <div className="relative">
        <input
          type={show ? 'text' : 'password'}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          spellCheck={false}
          autoComplete="off"
          className="w-full bg-zinc-800/80 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-zinc-100 font-mono placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/25 pr-10 transition-colors"
        />
        <button
          type="button"
          onClick={() => setShow(s => !s)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-300 transition-colors"
        >
          {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>
      {guide && <ExpandGuide title={guideTitle}>{guide}</ExpandGuide>}
    </div>
  );
}

// ─── token guide content (language-dependent JSX) ─────────────────────────────

function GhGuide({ lang }) {
  const ol = 'list-decimal list-inside space-y-1.5';
  const s = 'text-zinc-200';
  const c = 'text-indigo-300 bg-zinc-800 px-1 rounded';
  if (lang === 'en') return (
    <ol className={ol}>
      <li>Go to <strong className={s}>github.com</strong> → click your profile icon → <strong className={s}>Settings</strong></li>
      <li>At the bottom click <strong className={s}>Developer settings</strong></li>
      <li>Select <strong className={s}>Personal access tokens → Tokens (classic)</strong></li>
      <li>Click <strong className={s}>Generate new token (classic)</strong></li>
      <li>Check the entire <code className={c}>repo</code> checkbox</li>
      <li>Click <strong className={s}>Generate token</strong> — copy it right away!</li>
    </ol>
  );
  return (
    <ol className={ol}>
      <li>Otwórz <strong className={s}>github.com</strong> → kliknij ikonkę profilu → <strong className={s}>Settings</strong></li>
      <li>Na dole menu kliknij <strong className={s}>Developer settings</strong></li>
      <li>Wybierz <strong className={s}>Personal access tokens → Tokens (classic)</strong></li>
      <li>Kliknij <strong className={s}>Generate new token (classic)</strong></li>
      <li>Zaznacz cały checkbox <code className={c}>repo</code></li>
      <li>Kliknij <strong className={s}>Generate token</strong> — skopiuj od razu!</li>
    </ol>
  );
}

function VerGuide({ lang }) {
  const ol = 'list-decimal list-inside space-y-1.5';
  const s = 'text-zinc-200';
  const c = 'text-indigo-300 bg-zinc-800 px-1 rounded';
  const w = 'mt-1 text-zinc-500';
  const ws = 'text-zinc-300';
  if (lang === 'en') return (
    <ol className={ol}>
      <li>Go to <strong className={s}>vercel.com</strong> → click your avatar → <strong className={s}>Account Settings</strong></li>
      <li>Click the <strong className={s}>Tokens</strong> tab</li>
      <li>Click <strong className={s}>Create</strong></li>
      <li>Enter a name e.g. <code className={c}>wizard</code>, Scope: <strong className={s}>Full Account</strong></li>
      <li>Copy the token — it only appears once!</li>
      <p className={w}>⚠️ Make sure GitHub is connected in Vercel: <strong className={ws}>Settings → Integrations → GitHub</strong></p>
    </ol>
  );
  return (
    <ol className={ol}>
      <li>Otwórz <strong className={s}>vercel.com</strong> → kliknij swój avatar → <strong className={s}>Account Settings</strong></li>
      <li>Kliknij zakładkę <strong className={s}>Tokens</strong></li>
      <li>Kliknij <strong className={s}>Create</strong></li>
      <li>Wpisz nazwę np. <code className={c}>wizard</code>, Scope: <strong className={s}>Full Account</strong></li>
      <li>Skopiuj token — pojawi się tylko raz!</li>
      <p className={w}>⚠️ Upewnij się że masz podłączone GitHub w Vercel: <strong className={ws}>Settings → Integrations → GitHub</strong></p>
    </ol>
  );
}

// ─── cross-tab sync ───────────────────────────────────────────────────────────

function markWizardSteps(keys) {
  try {
    const current = JSON.parse(localStorage.getItem('wizard_steps') || '{}');
    keys.forEach(k => { current[k] = true; });
    localStorage.setItem('wizard_steps', JSON.stringify(current));
  } catch {}
}

// ─── constants ────────────────────────────────────────────────────────────────

const FRAMEWORK_IDS = [null, 'vite', 'nextjs'];
const CONFETTI = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#f97316'];

// ─── main export ──────────────────────────────────────────────────────────────

export default function DeployWizard({ onBack, onClose, onStepsDone, dark, toggleTheme, lang = 'pl' }) {
  const handleClose = onClose || onBack;
  const tw = getT(lang).wizard;
  const taskList = tw.deploying.tasks;
  const frameworks = FRAMEWORK_IDS.map((id, i) => ({ id, label: tw.project.frameworks[i] }));

  const [screen, setScreen]         = useState(0);
  const [ghToken, setGhToken]       = useState('');
  const [verToken, setVerToken]     = useState('');
  const [ghUser, setGhUser]         = useState('');
  const [projectName, setProjectName] = useState('');
  const [framework, setFramework]   = useState(null);
  const [files, setFiles]           = useState([]);
  const [dragging, setDragging]     = useState(false);
  const [tasks, setTasks]           = useState(taskList.map(() => ({ s: 'idle', msg: '' })));
  const [liveUrl, setLiveUrl]       = useState('');
  const [errorMsg, setErrorMsg]     = useState('');
  const [validating, setValidating] = useState(false);
  const fileRef = useRef();

  const setTask = (i, s, msg = '') =>
    setTasks(prev => prev.map((t, idx) => idx === i ? { s, msg } : t));

  // Syncs progress to both React state (split-screen) and localStorage (new-tab fallback)
  const stepsDone = (keys) => {
    onStepsDone?.(keys);
    markWizardSteps(keys);
  };

  // ── file handling ──────────────────────────────────────────────────────────

  const addRawFiles = useCallback(async (rawList) => {
    const arr = Array.from(rawList);
    const items = await Promise.all(arr.map(async f => ({
      name: f.name,
      path: f._wizPath || f.webkitRelativePath || f.name,
      base64: await toBase64(f),
    })));
    setFiles(prev => {
      const existing = new Set(prev.map(x => x.path));
      return [...prev, ...items.filter(x => !existing.has(x.path))];
    });
    const detected = detectFramework(arr.map(f => f._wizPath || f.webkitRelativePath || f.name));
    if (detected) setFramework(detected);
  }, []);

  const onDrop = useCallback(async (e) => {
    e.preventDefault();
    setDragging(false);
    const raw = [];
    for (const item of Array.from(e.dataTransfer.items)) {
      if (item.kind !== 'file') continue;
      const entry = item.webkitGetAsEntry?.();
      if (entry) await collectEntry(entry, '', raw);
      else { const f = item.getAsFile(); if (f) raw.push(f); }
    }
    if (raw.length) await addRawFiles(raw);
  }, [addRawFiles]);

  // ── validate tokens ────────────────────────────────────────────────────────

  async function validateTokens() {
    setErrorMsg('');
    setValidating(true);
    try {
      const [ghData] = await Promise.all([
        ghReq('/user', ghToken),
        verReq('/v2/user', verToken),
      ]);
      setGhUser(ghData.login);
      setScreen(2);
    } catch (e) {
      setErrorMsg(e.message);
    } finally {
      setValidating(false);
    }
  }

  // ── deploy flow ────────────────────────────────────────────────────────────

  async function runDeploy() {
    setScreen(3);
    setTasks(taskList.map(() => ({ s: 'idle', msg: '' })));
    setErrorMsg('');

    try {
      // 0 — GitHub token
      setTask(0, 'running');
      const ghData = await ghReq('/user', ghToken);
      const owner = ghData.login;
      setTask(0, 'done', owner);

      // 1 — Vercel token
      setTask(1, 'running');
      await verReq('/v2/user', verToken);
      setTask(1, 'done');

      // 2 — Create GitHub repo
      setTask(2, 'running');
      const slug = slugify(projectName);
      let repo;
      try {
        repo = await ghReq('/user/repos', ghToken, {
          method: 'POST',
          body: JSON.stringify({ name: slug, private: false, auto_init: false }),
        });
      } catch (e) {
        if (e.message.toLowerCase().includes('already exists')) {
          repo = await ghReq(`/repos/${owner}/${slug}`, ghToken);
        } else throw e;
      }
      setTask(2, 'done', repo.full_name);
      stepsDone(['github-0']);

      // 3 — Upload files sequentially
      setTask(3, 'running');
      const total = files.length;
      for (let i = 0; i < files.length; i++) {
        const f = files[i];
        const filePath = f.path;
        let sha;
        try {
          const existing = await ghReq(
            `/repos/${owner}/${slug}/contents/${encodeURIComponent(filePath)}`,
            ghToken
          );
          sha = existing.sha;
        } catch {}

        await ghReq(
          `/repos/${owner}/${slug}/contents/${encodeURIComponent(filePath)}`,
          ghToken,
          {
            method: 'PUT',
            body: JSON.stringify({
              message: sha ? `Update ${filePath}` : `Add ${filePath}`,
              content: f.base64,
              ...(sha ? { sha } : {}),
            }),
          }
        );
        setTask(3, 'running', `${i + 1}/${total}`);
      }
      setTask(3, 'done', `${total}`);
      stepsDone(['github-0', 'github-1', 'github-2']);

      // 4 — Create Vercel project
      setTask(4, 'running');
      let project;
      try {
        project = await verReq('/v9/projects', verToken, {
          method: 'POST',
          body: JSON.stringify({
            name: slug,
            ...(framework ? { framework } : {}),
            gitRepository: { type: 'github', repo: `${owner}/${slug}` },
          }),
        });
      } catch (e) {
        if (e.message.toLowerCase().includes('already exists')) {
          project = await verReq(`/v9/projects/${slug}`, verToken);
        } else throw e;
      }
      setTask(4, 'done', project.name);
      stepsDone(['vercel-0', 'vercel-1', 'vercel-2', 'vercel-3']);

      // 5 — Trigger deploy
      setTask(5, 'running');
      let deployUrl = '';
      try {
        const dep = await verReq('/v13/deployments', verToken, {
          method: 'POST',
          body: JSON.stringify({
            name: slug,
            project: project.id,
            gitSource: {
              type: 'github',
              repoId: String(repo.id),
              ref: repo.default_branch || 'main',
            },
          }),
        });
        deployUrl = dep.url || '';
      } catch {
        const deps = await verReq(`/v6/deployments?projectId=${project.id}&limit=1`, verToken);
        const latest = (deps.deployments || [])[0];
        if (latest) deployUrl = latest.url || '';
        else throw new Error(tw.deploying.couldNotDeploy);
      }
      setTask(5, 'done');

      // 6 — Poll until READY (max ~3 min)
      setTask(6, 'running');
      for (let attempt = 0; attempt < 60; attempt++) {
        await new Promise(r => setTimeout(r, 3000));
        const deps = await verReq(`/v6/deployments?projectId=${project.id}&limit=1`, verToken);
        const latest = (deps.deployments || [])[0];
        if (latest) {
          const state = latest.state || latest.readyState || '';
          setTask(6, 'running', state);
          if (state === 'READY') { deployUrl = latest.url || deployUrl; break; }
          if (state === 'ERROR' || state === 'CANCELED') throw new Error(`Deployment ${state}`);
        }
      }
      setTask(6, 'done');
      stepsDone(['vercel-4']);

      setLiveUrl(deployUrl
        ? (deployUrl.startsWith('http') ? deployUrl : `https://${deployUrl}`)
        : '');
      setScreen(4);
    } catch (e) {
      setErrorMsg(e.message);
      setTasks(prev => prev.map(t => t.s === 'running' ? { ...t, s: 'error' } : t));
    }
  }

  // ── render ─────────────────────────────────────────────────────────────────

  const doneTasks = tasks.filter(t => t.s === 'done').length;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <style>{`
        @keyframes confettiFall {
          0%   { transform: translateY(-30px) rotate(0deg);   opacity: 1; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }
        @keyframes wizSlide {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        .wiz-slide { animation: wizSlide 0.35s ease both; }
      `}</style>

      {/* Header */}
      <header className="sticky top-0 z-10 bg-zinc-950/90 backdrop-blur border-b border-zinc-800 px-5 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center">
            <Rocket className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-semibold text-sm">{tw.intro.heading}</span>
          <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-1.5 py-0.5 rounded-full font-medium">beta</span>
        </div>
        <div className="flex items-center gap-2">
          {toggleTheme && (
            <button
              onClick={toggleTheme}
              title={dark ? tw.header.lightMode : tw.header.darkMode}
              className="w-7 h-7 flex items-center justify-center rounded-lg border border-zinc-800 hover:bg-zinc-900 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              {dark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>
          )}
          <button
            onClick={handleClose}
            className="flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            {tw.header.back}
          </button>
        </div>
      </header>

      {/* Step pills */}
      {screen >= 1 && screen <= 3 && (
        <div className="flex items-center justify-center gap-1.5 py-3 bg-zinc-900/30 border-b border-zinc-800/50">
          {tw.steps.map((s, i) => {
            const idx = i + 1;
            const done   = screen > idx;
            const active = screen === idx;
            return (
              <div key={s} className="flex items-center gap-1.5">
                <div className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full transition-all ${
                  active ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40' :
                  done   ? 'text-emerald-400' : 'text-zinc-600'
                }`}>
                  {done ? <Check className="w-3 h-3" /> : <span>{idx}</span>}
                  <span>{s}</span>
                </div>
                {i < 2 && <ChevronRight className="w-3 h-3 text-zinc-700" />}
              </div>
            );
          })}
        </div>
      )}

      <main className="max-w-lg mx-auto px-5 py-10">

        {/* ── Screen 0: Intro ── */}
        {screen === 0 && (
          <div className="wiz-slide space-y-8 text-center">
            <div className="space-y-4">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-500/30 to-purple-500/20 rounded-3xl flex items-center justify-center mx-auto">
                <Rocket className="w-9 h-9 text-indigo-400" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">{tw.intro.heading}</h1>
                <p className="text-zinc-400 mt-2">{tw.intro.sub1}</p>
                <p className="text-zinc-500 text-sm mt-1">{tw.intro.sub2}</p>
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 text-left space-y-4">
              {tw.intro.features.map(({ e, t, d }) => (
                <div key={t} className="flex gap-3">
                  <span className="text-2xl leading-none">{e}</span>
                  <div>
                    <p className="text-sm font-medium text-zinc-200">{t}</p>
                    <p className="text-xs text-zinc-500 mt-0.5">{d}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setScreen(1)}
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-xl transition-colors text-sm shadow-lg shadow-indigo-500/20"
            >
              {tw.intro.startBtn} <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ── Screen 1: Tokens ── */}
        {screen === 1 && (
          <div className="wiz-slide space-y-6">
            <div>
              <h2 className="text-xl font-bold">{tw.tokens.heading}</h2>
              <p className="text-xs text-zinc-500 mt-1">{tw.tokens.sub}</p>
            </div>

            <SecretInput
              label={tw.tokens.ghLabel}
              value={ghToken}
              onChange={setGhToken}
              placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
              guideTitle={tw.tokens.ghGuide}
              guide={<GhGuide lang={lang} />}
            />

            <SecretInput
              label={tw.tokens.verLabel}
              value={verToken}
              onChange={setVerToken}
              placeholder="xxxxxxxxxxxxxxxxxxxx"
              guideTitle={tw.tokens.verGuide}
              guide={<VerGuide lang={lang} />}
            />

            {errorMsg && (
              <div className="flex items-start gap-2.5 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-sm text-red-300">
                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0 text-red-400" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="flex gap-3 pt-1">
              <button
                onClick={() => setScreen(0)}
                className="px-4 py-2.5 text-sm text-zinc-500 hover:text-zinc-200 transition-colors"
              >
                {tw.tokens.backBtn}
              </button>
              <button
                onClick={validateTokens}
                disabled={!ghToken.trim() || !verToken.trim() || validating}
                className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-xl transition-colors text-sm"
              >
                {validating
                  ? <><Loader2 className="w-4 h-4 animate-spin" /> {tw.tokens.verifying}</>
                  : <><Key className="w-4 h-4" /> {tw.tokens.nextBtn}</>}
              </button>
            </div>
          </div>
        )}

        {/* ── Screen 2: Project ── */}
        {screen === 2 && (
          <div className="wiz-slide space-y-6">
            <div>
              <h2 className="text-xl font-bold">{tw.project.heading}</h2>
              <p className="text-xs text-zinc-500 mt-1">
                {tw.project.loggedAs} <span className="text-indigo-300 font-mono">@{ghUser}</span>
              </p>
            </div>

            {/* Name */}
            <div>
              <label className="block text-[13px] font-medium text-zinc-300 mb-1.5">{tw.project.nameLabel}</label>
              <input
                type="text"
                value={projectName}
                onChange={e => setProjectName(slugify(e.target.value))}
                placeholder={tw.project.namePlaceholder}
                spellCheck={false}
                className="w-full bg-zinc-800/80 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-zinc-100 font-mono placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/25 transition-colors"
              />
              {projectName && (
                <p className="text-xs text-zinc-600 mt-1.5 font-mono">
                  github.com/{ghUser}/<span className="text-zinc-400">{projectName}</span>
                </p>
              )}
            </div>

            {/* Framework */}
            <div>
              <label className="block text-[13px] font-medium text-zinc-300 mb-1.5">{tw.project.frameworkLabel}</label>
              <div className="space-y-1.5">
                {frameworks.map(fw => (
                  <button
                    key={String(fw.id)}
                    onClick={() => setFramework(fw.id)}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl border text-sm transition-all text-left ${
                      framework === fw.id
                        ? 'border-indigo-500/60 bg-indigo-500/10 text-zinc-200'
                        : 'border-zinc-700/60 text-zinc-400 hover:border-zinc-600 hover:text-zinc-300'
                    }`}
                  >
                    <div className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      framework === fw.id ? 'border-indigo-400' : 'border-zinc-600'
                    }`}>
                      {framework === fw.id && <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />}
                    </div>
                    {fw.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Drop zone */}
            <div>
              <label className="block text-[13px] font-medium text-zinc-300 mb-1.5">
                {tw.project.filesLabel}
                <span className="text-zinc-600 font-normal ml-2">{tw.project.filesSub}</span>
              </label>
              <div
                onDragOver={e => { e.preventDefault(); setDragging(true); }}
                onDragLeave={e => { if (!e.currentTarget.contains(e.relatedTarget)) setDragging(false); }}
                onDrop={onDrop}
                onClick={() => fileRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
                  dragging
                    ? 'border-indigo-500 bg-indigo-500/10 scale-[1.01]'
                    : 'border-zinc-700 hover:border-zinc-500 hover:bg-zinc-900/40'
                }`}
              >
                <Upload className="w-7 h-7 text-zinc-500 mx-auto mb-2" />
                <p className="text-sm text-zinc-300 font-medium">{tw.project.dropText}</p>
                <p className="text-xs text-zinc-600 mt-0.5">{tw.project.dropSub}</p>
                <input
                  ref={fileRef}
                  type="file"
                  multiple
                  className="hidden"
                  onChange={e => addRawFiles(e.target.files)}
                />
              </div>

              {files.length > 0 && (
                <div className="mt-2 bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
                  <div className="flex items-center justify-between px-3.5 py-2 border-b border-zinc-800">
                    <span className="text-xs text-zinc-500">{tw.project.filesLoaded(files.length)}</span>
                    <button
                      onClick={() => setFiles([])}
                      className="text-xs text-zinc-600 hover:text-red-400 transition-colors"
                    >
                      {tw.project.removeAll}
                    </button>
                  </div>
                  <div className="max-h-44 overflow-y-auto">
                    {files.map((f, i) => (
                      <div key={i} className="flex items-center gap-2 px-3.5 py-1.5 hover:bg-zinc-800/40 group">
                        <FileText className="w-3 h-3 text-zinc-700 shrink-0" />
                        <span className="text-xs text-zinc-400 font-mono truncate flex-1">{f.path}</span>
                        <button
                          onClick={() => setFiles(prev => prev.filter((_, j) => j !== i))}
                          className="opacity-0 group-hover:opacity-100 text-zinc-600 hover:text-red-400 transition-all shrink-0"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-1">
              <button
                onClick={() => setScreen(1)}
                className="px-4 py-2.5 text-sm text-zinc-500 hover:text-zinc-200 transition-colors"
              >
                {tw.project.backBtn}
              </button>
              <button
                onClick={runDeploy}
                disabled={!projectName || files.length === 0}
                className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-xl transition-colors text-sm shadow-lg shadow-indigo-500/20"
              >
                <Zap className="w-4 h-4" /> {tw.project.deployBtn}
              </button>
            </div>
          </div>
        )}

        {/* ── Screen 3: Deploy progress ── */}
        {screen === 3 && (
          <div className="wiz-slide space-y-6">
            <div>
              <h2 className="text-xl font-bold">{tw.deploying.heading}</h2>
              <p className="text-sm text-zinc-500 mt-1">{tw.deploying.sub}</p>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-zinc-800 rounded-full h-1">
              <div
                className="bg-indigo-500 h-1 rounded-full transition-all duration-700"
                style={{ width: `${(doneTasks / taskList.length) * 100}%` }}
              />
            </div>

            <div className="space-y-1.5">
              {tasks.map(({ s, msg }, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
                    s === 'running' ? 'bg-indigo-500/10 border border-indigo-500/30' :
                    s === 'done'    ? 'bg-zinc-900/50 border border-zinc-800/50' :
                    s === 'error'   ? 'bg-red-500/10 border border-red-500/30' :
                    'border border-transparent'
                  }`}
                >
                  <div className="w-5 h-5 flex items-center justify-center shrink-0">
                    {s === 'idle'    && <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />}
                    {s === 'running' && <Loader2 className="w-4 h-4 text-indigo-400 animate-spin" />}
                    {s === 'done'    && <Check className="w-4 h-4 text-emerald-400" />}
                    {s === 'error'   && <X className="w-4 h-4 text-red-400" />}
                  </div>
                  <span className={`text-sm flex-1 ${
                    s === 'running' ? 'text-zinc-100' :
                    s === 'done'    ? 'text-zinc-500' :
                    s === 'error'   ? 'text-red-300'  :
                    'text-zinc-700'
                  }`}>
                    {taskList[i]}
                  </span>
                  {msg && <span className="text-xs font-mono text-zinc-500">{msg}</span>}
                </div>
              ))}
            </div>

            {errorMsg && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 space-y-2">
                <p className="text-sm font-medium text-red-300 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" /> {tw.deploying.errorTitle}
                </p>
                <p className="text-xs text-red-400/80 font-mono break-all">{errorMsg}</p>
                <button
                  onClick={() => setScreen(2)}
                  className="text-xs text-zinc-500 hover:text-zinc-300 underline"
                >
                  {tw.deploying.backBtn}
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── Screen 4: Done ── */}
        {screen === 4 && (
          <div className="wiz-slide text-center space-y-8">
            {/* Confetti */}
            {CONFETTI.flatMap((c, ci) =>
              [0, 1, 2].map(j => (
                <div
                  key={`${ci}-${j}`}
                  className="fixed top-0 pointer-events-none"
                  style={{
                    left: `${8 + ci * 13 + j * 5}%`,
                    width:  `${7 + (ci + j) % 4}px`,
                    height: `${7 + (ci + j) % 4}px`,
                    background: c,
                    borderRadius: j % 2 === 0 ? '50%' : '3px',
                    animation: `confettiFall ${1.6 + (ci + j) * 0.25}s ${(ci + j) * 0.12}s ease-in forwards`,
                  }}
                />
              ))
            )}

            <div className="space-y-3">
              <div className="text-5xl">🎉</div>
              <h2 className="text-3xl font-bold">{tw.done.heading}</h2>
              <p className="text-zinc-400 text-sm">{tw.done.sub}</p>
            </div>

            {liveUrl && (
              <div className="bg-zinc-900 border border-emerald-500/30 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-emerald-400" />
                  <p className="text-[11px] text-emerald-400 uppercase tracking-widest font-medium">{tw.done.siteLabel}</p>
                </div>
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-base font-mono text-emerald-300 hover:text-emerald-200 break-all transition-colors"
                >
                  {liveUrl}
                </a>
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors text-sm"
                >
                  {tw.done.openBtn} <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            )}

            <div className="space-y-1.5 pt-2">
              <button
                onClick={() => {
                  setScreen(0);
                  setFiles([]); setProjectName(''); setLiveUrl('');
                  setGhToken(''); setVerToken(''); setFramework(null);
                }}
                className="block w-full text-sm text-zinc-500 hover:text-zinc-300 transition-colors py-2"
              >
                {tw.done.deployAnother}
              </button>
              <button
                onClick={handleClose}
                className="block w-full text-sm text-zinc-500 hover:text-zinc-300 transition-colors py-2"
              >
                {tw.done.backBtn}
              </button>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
