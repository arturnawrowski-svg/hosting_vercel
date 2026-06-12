import React from 'react';
import {
  ChevronDown,
  Copy,
  Cloud,
  X,
  Check,
  ExternalLink,
  ArrowRight,
  Terminal as TerminalLucide,
  Shield,
  Zap,
  Lock,
} from 'lucide-react';

export const BrowserFrame = ({ url, children }) => (
  <div className="rounded-lg overflow-hidden border border-zinc-800 bg-zinc-950/80 shadow-lg">
    <div className="flex items-center gap-2 px-3 py-2 bg-zinc-900/80 border-b border-zinc-800">
      <div className="flex gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
        <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
        <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
      </div>
      <div className="flex-1 mx-2 px-2.5 py-1 rounded bg-zinc-950 border border-zinc-800 text-[10.5px] font-mono text-zinc-500 truncate">
        {url}
      </div>
    </div>
    <div className="p-3.5">{children}</div>
  </div>
);

export const Terminal = ({ lines, title = 'bash' }) => (
  <div className="rounded-lg overflow-hidden border border-zinc-800 bg-black shadow-lg">
    <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-950 border-b border-zinc-800">
      <div className="flex gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
        <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
        <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
      </div>
      <TerminalLucide className="w-3 h-3 text-zinc-600 ml-1.5" />
      <span className="text-[10px] font-mono text-zinc-500">{title}</span>
    </div>
    <div className="p-3.5 font-mono text-[11.5px] space-y-1 leading-relaxed">
      {lines.map((line, i) => (
        <div key={i} className="flex gap-2.5">
          <span className="text-zinc-700 select-none">$</span>
          <span className="text-zinc-200">
            {line.split(/("[^"]*")/g).map((part, j) =>
              part.startsWith('"') ? (
                <span key={j} className="text-emerald-300">{part}</span>
              ) : (
                <span key={j}>{part}</span>
              )
            )}
          </span>
        </div>
      ))}
    </div>
  </div>
);

export const GithubRepoMockup = () => (
  <BrowserFrame url="github.com/new">
    <div className="space-y-3">
      <div>
        <div className="text-[9.5px] uppercase tracking-wider text-zinc-500 mb-1">Repository name</div>
        <div className="flex items-center gap-1.5">
          <div className="px-2 py-1 rounded bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-400 font-mono">artur /</div>
          <div className="flex-1 px-2 py-1 rounded bg-zinc-900 border border-indigo-500/50 text-[11px] text-zinc-100 font-mono">moj-projekt</div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="p-2 rounded border border-indigo-500/40 bg-indigo-500/[0.06]">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full border-2 border-indigo-400 flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-indigo-400" />
            </div>
            <span className="text-[10.5px] text-zinc-200 font-medium">Public</span>
          </div>
        </div>
        <div className="p-2 rounded border border-zinc-800">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full border border-zinc-600" />
            <span className="text-[10.5px] text-zinc-500">Private</span>
          </div>
        </div>
      </div>
      <div className="flex justify-end pt-1">
        <button className="px-3 py-1 rounded bg-emerald-600 text-[11px] font-medium text-white">Create repository</button>
      </div>
    </div>
  </BrowserFrame>
);

export const VercelAddNewMockup = () => (
  <BrowserFrame url="vercel.com/dashboard">
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-white flex items-center justify-center">
            <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-b-[8px] border-l-transparent border-r-transparent border-b-black" />
          </div>
          <span className="text-[11px] text-zinc-200 font-medium">Overview</span>
        </div>
        <div className="relative">
          <button className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white text-black text-[11px] font-medium shadow-[0_0_0_3px_rgba(99,102,241,0.25)]">
            Add New...
            <ChevronDown className="w-3 h-3" />
          </button>
          <div className="absolute top-full right-0 mt-1 w-32 rounded border border-zinc-800 bg-zinc-950 py-1 shadow-xl">
            <div className="px-2 py-1 text-[10.5px] text-indigo-300 bg-indigo-500/10">Project</div>
            <div className="px-2 py-1 text-[10.5px] text-zinc-500">Domain</div>
            <div className="px-2 py-1 text-[10.5px] text-zinc-500">Team</div>
          </div>
        </div>
      </div>
      <div className="h-12 rounded border border-dashed border-zinc-800 flex items-center justify-center text-[10px] text-zinc-600">No projects yet</div>
    </div>
  </BrowserFrame>
);

export const VercelFrameworkMockup = () => (
  <BrowserFrame url="vercel.com/new">
    <div className="space-y-2.5">
      <div>
        <div className="text-[9.5px] uppercase tracking-wider text-zinc-500 mb-1">Framework Preset</div>
        <div className="flex items-center justify-between px-2.5 py-1.5 rounded border border-indigo-500/50 bg-zinc-900 shadow-[0_0_0_3px_rgba(99,102,241,0.15)]">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gradient-to-br from-purple-400 to-yellow-400" />
            <span className="text-[11px] text-zinc-100 font-medium">Vite</span>
          </div>
          <ChevronDown className="w-3 h-3 text-zinc-500" />
        </div>
        <div className="mt-1 ml-1 space-y-0.5">
          {['Next.js', 'Astro', 'SvelteKit', 'Remix'].map((f) => (
            <div key={f} className="text-[10px] text-zinc-600">· {f}</div>
          ))}
        </div>
      </div>
      <button className="w-full py-1.5 rounded bg-white text-black text-[11px] font-medium">Deploy</button>
    </div>
  </BrowserFrame>
);

export const VercelDeployedMockup = () => (
  <BrowserFrame url="vercel.com/artur/moj-projekt">
    <div className="space-y-2.5">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
        <span className="text-[11px] text-zinc-100 font-medium">Ready</span>
        <span className="text-[10px] text-zinc-500">· 23s</span>
      </div>
      <div className="p-2 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-between gap-2">
        <span className="font-mono text-[11px] text-indigo-300 truncate">moj-projekt.vercel.app</span>
        <button className="flex-shrink-0 p-1 rounded hover:bg-zinc-800">
          <ExternalLink className="w-3 h-3 text-zinc-400" />
        </button>
      </div>
    </div>
  </BrowserFrame>
);

export const CloudflareNSMockup = () => (
  <BrowserFrame url="dash.cloudflare.com">
    <div className="space-y-2">
      <div className="text-[9.5px] uppercase tracking-wider text-zinc-500">Cloudflare nameservers</div>
      {['amir.ns.cloudflare.com', 'rita.ns.cloudflare.com'].map((ns) => (
        <div key={ns} className="flex items-center justify-between gap-2 p-2 rounded bg-zinc-900 border border-zinc-800">
          <span className="font-mono text-[11px] text-indigo-300 truncate">{ns}</span>
          <div className="flex-shrink-0 flex items-center gap-1 px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700">
            <Copy className="w-2.5 h-2.5 text-zinc-400" />
            <span className="text-[9px] text-zinc-400 uppercase tracking-wider">Copy</span>
          </div>
        </div>
      ))}
    </div>
  </BrowserFrame>
);

export const CloudflareDNSMockup = () => (
  <BrowserFrame url="dash.cloudflare.com/.../dns">
    <div className="text-[10px]">
      <div className="grid grid-cols-[42px_1fr_1.7fr_70px] gap-2 pb-1.5 mb-1.5 border-b border-zinc-800 text-zinc-500 uppercase tracking-wider text-[8.5px]">
        <span>Type</span><span>Name</span><span>Content</span><span>Proxy</span>
      </div>
      <div className="grid grid-cols-[42px_1fr_1.7fr_70px] gap-2 py-1.5 items-center">
        <span className="font-mono text-[10.5px] text-zinc-300">CNAME</span>
        <span className="font-mono text-[10.5px] text-zinc-200">@</span>
        <span className="font-mono text-[10.5px] text-zinc-300 truncate">cname.vercel-dns.com</span>
        <div className="flex items-center gap-1"><Cloud className="w-3 h-3 text-zinc-500" /><span className="text-[9px] text-zinc-500">DNS</span></div>
      </div>
      <div className="grid grid-cols-[42px_1fr_1.7fr_70px] gap-2 py-1.5 items-center border-t border-zinc-900">
        <span className="font-mono text-[10.5px] text-zinc-300">A</span>
        <span className="font-mono text-[10.5px] text-zinc-200">@</span>
        <span className="font-mono text-[10.5px] text-zinc-300">76.76.21.21</span>
        <div className="flex items-center gap-1"><Cloud className="w-3 h-3 text-zinc-500" /><span className="text-[9px] text-zinc-500">DNS</span></div>
      </div>
    </div>
  </BrowserFrame>
);

export const ProxyToggleMockup = () => (
  <div className="rounded-lg border border-amber-500/20 bg-gradient-to-br from-amber-500/[0.04] to-transparent p-4">
    <div className="flex items-center justify-center gap-5">
      <div className="flex flex-col items-center gap-1.5">
        <div className="relative w-14 h-14 rounded-xl bg-orange-500/15 border border-orange-500/40 flex items-center justify-center">
          <Cloud className="w-7 h-7 text-orange-400" fill="currentColor" fillOpacity={0.3} />
          <div className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-red-500 flex items-center justify-center ring-2 ring-zinc-950">
            <X className="w-2.5 h-2.5 text-white" strokeWidth={3.5} />
          </div>
        </div>
        <span className="text-[10px] text-orange-300 font-medium uppercase tracking-wider">Proxied</span>
        <span className="text-[9px] text-zinc-500">Breaks SSL</span>
      </div>
      <ArrowRight className="w-5 h-5 text-zinc-600 -mt-3" strokeWidth={1.5} />
      <div className="flex flex-col items-center gap-1.5">
        <div className="relative w-14 h-14 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center">
          <Cloud className="w-7 h-7 text-zinc-500" />
          <div className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center ring-2 ring-zinc-950">
            <Check className="w-2.5 h-2.5 text-white" strokeWidth={3.5} />
          </div>
        </div>
        <span className="text-[10px] text-zinc-300 font-medium uppercase tracking-wider">DNS only</span>
        <span className="text-[9px] text-emerald-400">SSL works</span>
      </div>
    </div>
  </div>
);

export const CloudflareSettingsMockup = () => (
  <BrowserFrame url="dash.cloudflare.com/.../ssl-tls">
    <div className="space-y-3">
      <div className="flex gap-2 border-b border-zinc-800 pb-2 text-[10px]">
        {['Overview', 'Edge Certs', 'Custom Hostnames'].map((t, i) => (
          <span key={t} className={i === 0 ? 'text-orange-400 border-b border-orange-400 pb-1 -mb-2.5 font-medium' : 'text-zinc-500'}>{t}</span>
        ))}
      </div>
      <div>
        <div className="text-[9.5px] uppercase tracking-wider text-zinc-500 mb-2">SSL/TLS encryption mode</div>
        <div className="grid grid-cols-2 gap-1.5">
          {[
            { label: 'Off', sub: 'No SSL', active: false },
            { label: 'Flexible', sub: 'Half-encrypted', active: false },
            { label: 'Full', sub: 'Self-signed cert ok', active: false },
            { label: 'Full (strict)', sub: 'Vercel cert ✓', active: true },
          ].map(({ label, sub, active }) => (
            <div key={label} className={`p-2 rounded border text-[10px] ${active ? 'border-orange-500/60 bg-orange-500/[0.08]' : 'border-zinc-800 bg-zinc-900/40'}`}>
              <div className={`flex items-center gap-1.5 font-medium ${active ? 'text-orange-300' : 'text-zinc-500'}`}>
                {active && <div className="w-2 h-2 rounded-full bg-orange-400 flex-shrink-0" />}
                {!active && <div className="w-2 h-2 rounded-full border border-zinc-600 flex-shrink-0" />}
                {label}
              </div>
              <div className={`text-[9px] mt-0.5 ml-3.5 ${active ? 'text-orange-400/70' : 'text-zinc-600'}`}>{sub}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 pt-1">
        <div className="p-2 rounded border border-emerald-500/20 bg-emerald-500/[0.04] flex items-center gap-2">
          <Zap className="w-3 h-3 text-emerald-400 flex-shrink-0" />
          <div>
            <div className="text-[10px] text-zinc-300 font-medium">Speed</div>
            <div className="text-[9px] text-zinc-500">Auto Minify ON</div>
          </div>
        </div>
        <div className="p-2 rounded border border-emerald-500/20 bg-emerald-500/[0.04] flex items-center gap-2">
          <Lock className="w-3 h-3 text-emerald-400 flex-shrink-0" />
          <div>
            <div className="text-[10px] text-zinc-300 font-medium">HTTPS redirect</div>
            <div className="text-[9px] text-zinc-500">Always ON</div>
          </div>
        </div>
      </div>
    </div>
  </BrowserFrame>
);

export const VercelDomainsMockup = () => (
  <BrowserFrame url="vercel.com/.../settings/domains">
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <input readOnly value="moj-projekt.pl" className="flex-1 px-2 py-1 rounded bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-200" />
        <button className="px-2.5 py-1 rounded bg-white text-black text-[11px] font-medium">Add</button>
      </div>
      <div className="p-2 rounded bg-amber-500/[0.06] border border-amber-500/20 text-[10px] text-amber-300/90">
        Invalid Configuration — add DNS records to verify
      </div>
    </div>
  </BrowserFrame>
);
